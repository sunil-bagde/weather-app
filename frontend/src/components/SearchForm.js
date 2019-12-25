import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { getWeatherByZip } from "../lib/weatherService";
import { searchWeather } from "../reducers/weather";

const SearchForm = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const submitHandler = event => {
    event.preventDefault();
    getWeatherByZip(search)
      .then(weather => dispatch(searchWeather(weather)))
      .then(() => setSearch(""));
  };
  return (
    <form onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          required
          placeholder="city or zip (,) separated"
          aria-label="Multiple city name or zip (,)"
          aria-describedby="zip"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        <InputGroup.Append>
          <InputGroup.Text id="zip">Hit Enter</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </form>
  );
};

export default SearchForm;
