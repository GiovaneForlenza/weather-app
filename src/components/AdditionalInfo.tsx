import React from "react";

interface WeatherData {
  main: {
    feels_like: number;
    humidity: number;
    temp_max: number;
    temp_min: number;
  };
}

function AdditionalInfo({ weatherData }: { weatherData: WeatherData }) {
  const { feels_like, humidity, temp_max, temp_min } = weatherData.main;
  return (
    <div className="additional-info-wrapper">
      <div className="block">
        <div className="icon"></div>
        <div className="text">
          {Math.round(feels_like)}°<p>Feels like</p>
        </div>
      </div>
      <div className="block">
        <div className="icon"></div>
        <div className="text">
          {humidity}%<p>Humidity</p>
        </div>
      </div>
      <div className="block">
        <div className="icon"></div>
        <div className="text">
          {Math.round(temp_max)}°<p>Max</p>
        </div>
      </div>
      <div className="block">
        <div className="icon"></div>
        <div className="text">
          {Math.round(temp_min)}°<p>Min</p>
        </div>
      </div>
    </div>
  );
}

export default AdditionalInfo;
