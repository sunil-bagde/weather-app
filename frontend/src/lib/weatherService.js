const BASE_URL = "http://localhost:5000/api";

const getWeather = (cityName = "") => {
  return fetch(`${BASE_URL}/weather?city=${cityName}`).then(response => {
    return response.json();
  });
};

const getWeatherByZip = (zip = "") => {
  return fetch(`${BASE_URL}/weather?zip=${zip}`).then(response => {
    return response.json();
  });
};

export { getWeather, getWeatherByZip };
