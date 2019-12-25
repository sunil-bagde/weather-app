import React from "react";
import Alert from "react-bootstrap/Alert";
import "./Weather.css";
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Weather = ({ weather, ...props }) => {
  if (Object.keys(weather).length == 0) {
    return null;
  }

  return weather.data?.map((item, index) => {
    /*
      Using index as key its not proper way but api dont have any Unique Indentification
    */
    const {
      location = {},
      current_observation: currentData = {},
      forecasts = [],
    } = item ?? {};
    const day = new Date().getDay();

    const hasLocation = Object.keys(location).length !== 0;

    const todayWeather = forecasts.filter(forecast => {
      return forecast.day == days[day];
    });
    const firstForcast = todayWeather[0] ?? {};

    return hasLocation ? (
      <div className="card weather-card" key={index}>
        <div className="card-body pb-1">
          <h4 className="card-title font-weight-bold">{location.city ?? ""}</h4>
          <p className="card-text text-muted">
            {firstForcast.day + "," ?? ""} {firstForcast?.text ?? ""}
          </p>
          <div className="d-flex justify-content-between">
            <p className="display-3 degree">
              {currentData?.condition?.temperature}
              <sup className="text-secondary">.C</sup>
            </p>
          </div>

          <hr className="" />
          <div className="d-flex justify-content-between mb-4">
            <p>
              <i className="fas fa-tint fa-lg text-info pr-2"></i>
              {""}
            </p>
            <p className="text-secondary">
              <i className="fas fa-leaf fa-lg text-secondary pr-2"></i>
              {currentData?.wind?.speed} km/h Winds
            </p>
          </div>

          <hr className="" />
          <div className="collapse-content">
            <div className="collapse show" id="collapseExample">
              <table className="table table-borderless table-sm mb-0">
                <tbody>
                  {forecasts.map(({ day, date, text, low, high }) => {
                    return (
                      <tr key={date}>
                        <td className="font-weight-normal align-middle">
                          {day}
                        </td>
                        <td className="float-right font-weight-normal">
                          <p className="mb-1">
                            {high}&deg;
                            <span className="text-muted">/{low}&deg;</span>
                          </p>
                        </td>
                        <td className="float-right mr-3">
                          <i className="fas fa-sun fa-lg amber-text"></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  });
};

export default Weather;
