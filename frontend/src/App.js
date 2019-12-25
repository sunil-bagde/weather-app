import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { selectCity, loadWeather } from "./reducers/weather";
import { getWeather } from "./lib/weatherService";
//

import Navbar from "./components/Navbar";
import CityList from "./components/CityList";
import Weather from "./components/Weather";

const onButtonClick = (dispatch, cityName) => {
  getWeather(cityName).then(weather => dispatch(loadWeather(weather)));
};

let App = ({ props }) => {
  const weather = useSelector(state => state.weather);
  const city = useSelector(state => state.city);
  const dispatch = useDispatch();

  return (
    <>
      <div className="container">
        <Navbar />
        {/* Columns are always 50% wide, on mobile and desktop */}
        <Container>
          <Row>
            <Col xs={4}>
              <CityList />
              <div className="float-righ  ">
                <Button
                  onClick={() => onButtonClick(dispatch, city)}
                  variant="outline-primary"
                  className=" pt-2 mt-2  "
                  disabled={city == "" ? true : false}
                >
                  {city === "" ? "Select city" : `${city}`}
                </Button>
              </div>
            </Col>
            <Col xs={8}>
              <Weather weather={weather} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default App;
