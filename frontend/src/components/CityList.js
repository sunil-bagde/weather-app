import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector, useDispatch } from "react-redux";

import SearchForm from "./SearchForm";

import { selectCity } from "../reducers/weather";
import { getWeather } from "../lib/weatherService";
import { cities } from "./city";

const onCitySelect = (dispatch, cityName) => {
  dispatch(selectCity(cityName));
};
const CityList = props => {
  const dispatch = useDispatch();
  const selectedCity = useSelector(state => state.city);

  return (
    <ListGroup>
      <ListGroup.Item>
        <SearchForm />
      </ListGroup.Item>
      {cities.map(city => (
        <ListGroup.Item
          key={city.id}
          onClick={() => onCitySelect(dispatch, city.name)}
          style={{ color: selectedCity === city.name ? "blue" : "black" }}
        >
          {city.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
// export default connect(
//   ({ weather }) => ({
//     weather,
//   }),
//   { fetchWeather }
// )(CityList);
export default CityList;
