import { getForecastData, getWeatherData } from "@/utils/weatherService";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import AdditionalInfo from "./AdditionalInfo";
import TemperatureList from "./displayed-lists/TemperatureList";

function Dashboard() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  useEffect(() => {
    getWeatherData().then((data) => {
      setWeatherData(data);
    });
    getForecastData().then((data) => {
      setForecastData(data);
    });
  }, []);
  // console.log(forecastData);

  return (
    <>
      {weatherData ? (
        <div className="dashboard-wrapper">
          <Header weatherData={weatherData} />
          <AdditionalInfo weatherData={weatherData} />
          <TemperatureList forecastData={forecastData} />
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
}

export default Dashboard;
