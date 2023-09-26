import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

let resp = "";
let data;
const API_KEY = "e37ac004829824b7fe9c4723fed7bd07";
let weatherIconURL;

function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const getWeather = useCallback(async () => {
    try {
      resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Atibaia&appid=${API_KEY}&units=metric`
      );
      data = await resp.json();

      console.log("info", data);
      weatherIconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      setWeatherData([
        data.name,
        data.main.temp,
        data.main.temp_max,
        data.main.temp_min,
      ]);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getWeather();
  }, []);
  return (
    <div>
      city: {weatherData[0]} <br />
      temp {weatherData[1]}
      <br />
      max temp {weatherData[2]}
      <br />
      min temp {weatherData[3]} <br />
      <img src={weatherIconURL} alt="" />
    </div>
  );
}

export default Home;
