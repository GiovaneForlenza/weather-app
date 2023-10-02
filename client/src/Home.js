import React, { useCallback, useEffect, useState } from "react";

import "./style.scss";

let resp = "";
let data;
const API_KEY = "e37ac004829824b7fe9c4723fed7bd07";
let weatherIconURL, cityCoordFromNameLink;

function Home() {
  const [weatherData, setWeatherData] = useState({
    name: "",
    country_name: "",
    temp: "",
    temp_max: "",
    temp_min: "",
    date_day_long: "",
    date_day_short: "",
    date_hour: "",
    date_minute: "",
  });

  const [cityLat, setCityLat] = useState("40.7127281");
  const [cityLon, setCityLon] = useState("-74.0060152");
  const [searchTerm, setSearchTerm] = useState("");

  //GETS THE DAILY TEMPERATURE
  const getWeather = useCallback(async () => {
    try {
      resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${API_KEY}&units=metric`
      );
      data = await resp.json();
      updateWeatherData();
    } catch (error) {
      console.log(error);
    }
  });

  //UPDATES THE OBJECT WITH THE DATA
  function updateWeatherData() {
    weatherIconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const date = convertUnixToDate(data.dt);
    setWeatherData({
      name: data.name,
      country_name: data.sys.country,
      temp: Math.round(data.main.temp),
      temp_max: Math.round(data.main.temp_max),
      temp_min: Math.round(data.main.temp_min),
      date_day_long: date.toLocaleString("en-US", { weekday: "long" }),
      date_day_short: date.toLocaleString("en-US", { weekday: "short" }),
      date_time: date.toLocaleString("en-US", { timeStyle: "short" }),
    });
  }

  //GETS THE WEEKLY FORECAST
  const getWeeklyForecast = useCallback(async () => {
    try {
      let resp = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${API_KEY}&units=metric`
      );

      let data = await resp.json();
      console.log(data);
    } catch (error) {}
  });

  function convertUnixToDate(data) {
    return new Date(data * 1000);
  }

  //UPDATES THE CITY SEARCH BAR
  const updateSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  //SUBMITS THE FORM AND STARTS THE LOOK UP PROCESS
  function submitForm(e) {
    e.preventDefault();
    getCityCoords();
  }

  //TRANSFORMS THE CITY NAME INTO LAT AND LON COORDS
  const getCityCoords = useCallback(async () => {
    getCityCoordsLink();
    try {
      let resp = await fetch(`${cityCoordFromNameLink}`);
      let data = await resp.json();
      const cityLat = data[0].lat,
        cityLon = data[0].lon;
      setCityLat(cityLat);
      setCityLon(cityLon);
      getWeather();
    } catch (error) {
      console.log(error);
    }

    function getCityCoordsLink() {
      let rep = "%20";
      let ogSearch = searchTerm;
      for (let i = 0; i < ogSearch.length; i++) {
        if (ogSearch[i] == " ") ogSearch = ogSearch.replace(ogSearch[i], rep);
      }
      cityCoordFromNameLink =
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
        ogSearch +
        "&appid=" +
        API_KEY;
    }
  });

  useEffect(() => {
    getWeather();
    getWeeklyForecast();
  }, [cityLat]);

  return (
    <div id="home-container">
      <div className="header">
        <form action="" onSubmit={submitForm}>
          <input
            type="text"
            name=""
            id=""
            value={searchTerm}
            placeholder="Search a city..."
            onChange={updateSearchTerm}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="content">
        <div className="line">
          <img src={weatherIconURL} alt="" />
          <span id="cityName">{weatherData.name}, {weatherData.country_name}</span>
        </div>
        <div className="weatherInfo">
          <span id="dateTime">
            {weatherData.date_day_long}, {weatherData.date_time}
          </span>
          <span className="temperature">{weatherData.temp} ºC</span>
          Min {weatherData.temp_min}º | Max {weatherData.temp_max}º
        </div>
      </div>
    </div>
  );
}

export default Home;
