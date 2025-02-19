import { getWeatherData } from "@/utils/weatherService";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [weatherData, setWeatherData] = useState();
  useEffect(() => {
    getWeatherData().then((data) => {
      setWeatherData(data);
    });
  }, []);

  return (
    // <div className="dashboard-wrapper">
    <>
      {weatherData && weatherData.list.map((item) => (
        <div key={item.dt}>
          <h2>{item.dt_txt}</h2>
          <p>Feels like: {item.main.feels_like}</p>
          <p>Humidity: {item.main.humidity}</p>
          <p>Temp: {item.main.temp}</p>
          <p>Temp Max: {item.main.temp_max}</p>
          <p>Temp Min: {item.main.temp_min}</p>
        </div>
      ))}
    </>
    // </div>
  );
}

export default Dashboard;
