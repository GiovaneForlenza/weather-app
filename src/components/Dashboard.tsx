import { getWeatherData } from "@/utils/weatherService";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { countries } from "country-data";
import AdditionalInfo from "./AdditionalInfo";

function Dashboard() {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    getWeatherData().then((data) => {
      setWeatherData(data);
    });
  }, []);
  console.log(weatherData);

  return (
    <>
      {weatherData ? (
        <div className="dashboard-wrapper">
          <Header weatherData={weatherData} />
          <AdditionalInfo weatherData={weatherData} />
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
}

export default Dashboard;
