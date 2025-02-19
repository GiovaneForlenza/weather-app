import { ICON_URL } from "@/utils/weatherService";
import React from "react";

function TodayListItem({ forecast }) {
  const { dt_txt } = forecast;
  const { temp_min, temp_max } = forecast.main;
  const { icon } = forecast.weather[0];
  return (
    <div className="today-list-item-wrapper">
      <div className="time">{dt_txt}</div>
      <div className="temperatures">
        <div className="min">{Math.round(temp_min)}° -</div>
        <div className="max">{Math.round(temp_max)}°</div>
      </div>
      <div className="icon">
        <img src={ICON_URL + icon + ".png"} alt="" />
      </div>
    </div>
  );
}

export default TodayListItem;
