import React, { useState } from "react";
import DisplayedListToday from "./DisplayedListToday";
import DisplayedListWeek from "./DisplayedListWeek";

interface ForecastData {
  // Define the structure of forecastData here
  // For example:
  date: string;
  temperature: number;
}

function TemperatureList({ forecastData }: { forecastData: ForecastData[] }) {
  const [listDisplay, setListDisplay] = useState("Today");
  return (
    <div className="temperature-list-wrapper">
      <div className="list-selection-wrapper">
        <p
          className={`${listDisplay === "Today" ? "selected" : ""}`}
          onClick={() => setListDisplay("Today")}
        >
          Today
        </p>
        <p
          className={`${listDisplay === "Week" ? "selected" : ""}`}
          onClick={() => setListDisplay("Week")}
        >
          Week
        </p>
      </div>
      <div className="displayed-list-wrapper">
        {listDisplay === "Today" ? (
          <DisplayedListToday forecastData={forecastData} />
        ) : (
          <DisplayedListWeek forecastData={forecastData} />
        )}
      </div>
    </div>
  );
}

export default TemperatureList;
