import React from "react";
import TodayListItem from "./list-items/TodayListItem";

function DisplayedListToday({ forecastData }) {
  return (
    <div className="displayed-list-today-wrapper">
      {forecastData &&
        forecastData.list.map((forecast, index) => (
          <TodayListItem key={index} forecast={forecast} />
        ))}
    </div>
  );
}

export default DisplayedListToday;
