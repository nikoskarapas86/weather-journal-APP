// Personal API Key for OpenWeatherMap API
//this is my api key you shall create your own api key by visiting https://home.openweathermap.org/api_keys
const apiKey = 'fe687cea13aad4e42201b7956911b7ca&units=imperial';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Event listener for the 'Generate' button
document.getElementById('generate').addEventListener('click', performAction);

// Main function to handle the click event
async function performAction() {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  if (!zipCode) {
    alert('Please enter a valid ZIP code.');
    return;
  }

  try {
    // Fetch weather data
    const weatherData = await getWeatherData(baseUrl, zipCode, apiKey);

    // Prepare data for POST request
    const data = {
      temperature: weatherData.main.temp,
      date: new Date().toLocaleDateString(),
      userResponse: feelings,
    };

    // Send data to server
    await postData('/add', data);

    // Update UI
    await updateUI();
  } catch (error) {
    console.error('Error during performAction:', error);
  }
}

// Function to fetch weather data
async function getWeatherData(baseUrl, zip, key) {
  const response = await fetch(`${baseUrl}${zip}&appid=${key}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return await response.json();
}

// Function to send data to the server
async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to send data to the server');
  }
  return await response.json();
}

// Function to update the UI
async function updateUI() {
  const response = await fetch('/all');
  if (!response.ok) {
    throw new Error('Failed to fetch data from server');
  }

  const data = await response.json();

  document.getElementById('temp').innerHTML = `${Math.round(
    data.temperature
  )}°F`;
  document.getElementById('date').innerHTML = data.date;
  document.getElementById('content').innerHTML = data.userResponse;
}
