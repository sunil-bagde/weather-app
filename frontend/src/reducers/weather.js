import { getWeather } from "../lib/weatherService";
import { useSelector, useDispatch } from "react-redux";
const initialState = {
  weather: {},
  city: "",
};

const WEATHER_LOAD = "WEATHER_LOAD";
const SELECT_CITY = "SELECT_CITY";
const SEARCH_WEATHER = "SEARCH_WEATHER";

const loadWeather = weather => ({
  type: WEATHER_LOAD,
  payload: weather,
});

const selectCity = city => ({
  type: SELECT_CITY,
  payload: city,
});

const searchWeather = weather =>
  console.log(weather) || {
    type: SEARCH_WEATHER,
    payload: weather,
  };
// getWeather().then(weather => dispatch(loadWeather(weather)));
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WEATHER_LOAD:
      return { ...state, weather: action.payload };
    case SELECT_CITY:
      return { ...state, city: action.payload };
    case SEARCH_WEATHER:
      return { ...state, weather: action.payload };
    default:
      return state;
  }
};
export { loadWeather, selectCity, searchWeather, reducer as default };
