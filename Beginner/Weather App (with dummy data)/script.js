const weatherData = [
  {
    city: "Mumbai",
    temperature: 32,
    condition: "Sunny",
    humidity: 78,
    windSpeed: 14,
  },

  {
    city: "Delhi",
    temperature: 40,
    condition: "cloudy",
    humidity: 50,
    windSpeed: 10,
  },
];

// update function

function updateWeather(index) {
  const data = weatherData[index];

  document.querySelector(".city").textContent = data.city;
  document.querySelector(
    ".temperature"
  ).textContent = `Temperature: ${data.temperature}°C`;
  document.querySelector(
    ".condition"
  ).textContent = `Condition: ${data.condition}`;
  document.querySelector(
    ".humidity"
  ).textContent = `Humidity: ${data.humidity}%`;
  document.querySelector(
    ".wind"
  ).textContent = `Wind Speed: ${data.windSpeed} km/h`;
}

updateWeather(0);

document.getElementById("citySelect").addEventListener("change", function () {
  const selectedIndex = this.value;
  updateWeather(Number(selectedIndex));
});
