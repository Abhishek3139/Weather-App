import React from "react";
import { useState } from "react";
import { apiKey, day, unit, weatherData } from "./Data";
import "./Weather.css";
function Weather() {
  let time = new Date().toLocaleTimeString();
  let dayName = day[new Date().getDay()];
  // let todaysDate = new Date().getDate();
  const [datas, setDatas] = useState([]);
  const [input, setInput] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [sec, setSec] = useState(time);

  const timeNow = () => {
    time = new Date().toLocaleTimeString();
    setSec(time);
  };
  setInterval(timeNow, 1000);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=${unit}`;
  const data = async () => {
    const response = await fetch(url);
    const user = await response.json();
    console.log(user);
    setDatas(user);
  };
  function handleChange(e) {
    setInput(e.target.value);
  }
  function handleClick() {
    data();
    setShowDate(true);
    setInput("");
  }

  return (
    <div className="container">
      <h1 id="big-head">Weather Forecast</h1>
      <div className="input-box">
        <input
          type="text"
          onChange={handleChange}
          value={input}
          placeholder="Please enter the city name here"
        />

        <button onClick={handleClick} className="btn">
          Serach
        </button>
      </div>
      {showDate && datas.name ? (
        <div className="info-box">
          <div style={{ height: "45px", margin: "0px" }}>
            <h2>
              {datas.name} , {datas.sys.country}
            </h2>
          </div>
          <div style={{ display: "flex", height: "151px" }}>
            <div className="img-box">
              {weatherData.map((value) => {
                const { img, description } = value;
                return datas.name &&
                  datas.weather[0].description === description ? (
                  <img src={img} id="sun" />
                ) : null;
              })}
              <span>{datas.name && datas.weather[0].description}</span>
            </div>

            <h1 id="h1">{datas.name && datas.main.temp} °c</h1>
            <div className="wind-box">
              Wind: {datas.name && datas.wind.speed}km/h
              <br />
              Pressure: {datas.name && datas.main.pressure} mb
              <br />
              Humidity: {datas.name && datas.main.humidity} %
              <br />
            </div>
          </div>
          <div className="date-div">
            {`${dayName} , ${datas.name ? sec : "Error"}`}
          </div>
        </div>
      ) : (
        <div
          className="info-box"
          style={{ textAlign: "center", height: "auto" }}
        >
          <h2>Please enter the valid number</h2>
        </div>
      )}
    </div>
  );
}

export default Weather;
