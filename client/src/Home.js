import React, { useCallback, useEffect, useState } from "react";

let resp = "";
let data;
const API_KEY = "e37ac004829824b7fe9c4723fed7bd07";
let weatherIconURL, cityCoordFromNameLink;

/*

1 LOAD THE PAGE - default NY
2 SEARCH FOR CITY
3 PARSE COORDS
4 GET CITY INFO
5 DISPLAY CITY INFO

1 LOAD PAGE - USE EFFECT
2 Search bar - ENTER
3 Get city coords

*/

function Home() {
  const [weatherData, setWeatherData] = useState({
    name: "",
    temp: "",
    temp_max: "",
    temp_min: "",
  });

  const [cityLat, setCityLat] = useState("40.7127281");
  const [cityLon, setCityLon] = useState("-74.0060152");
  const [searchTerm, setSearchTerm] = useState("");

  function updateWeatherData() {
    weatherIconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    setWeatherData({
      name: data.name,
      temp: data.main.temp,
      temp_max: data.main.temp_max,
      temp_min: data.main.temp_min,
    });
  }

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

  const updateSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  function submitForm(e) {
    e.preventDefault();
    getCityCoords();
  }

  const getCityCoords = useCallback(async () => {
    getCityCoordsLink();
    try {
      const a = await fetch(`${cityCoordFromNameLink}`);
      const b = await a.json();
      const cityLat = b[0].lat,
        cityLon = b[0].lon;
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
  }, [cityLat]);

  return (
    <div>
      <form action="" onSubmit={submitForm}>
        <input
          type="text"
          name=""
          id=""
          value={searchTerm}
          onChange={updateSearchTerm}
        />
      </form>
      city: {weatherData.name} <br />
      temp {weatherData.temp}
      <br />
      max temp {weatherData.temp_max}
      <br />
      min temp {weatherData.temp_min} <br />
      <img src={weatherIconURL} alt="" />
    </div>
  );
}

export default Home;
