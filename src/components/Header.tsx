import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { countries } from "country-data";
import { ICON_URL } from "@/utils/weatherService";
interface HeaderProps {
  weatherData: {
    name: string;
    sys: {
      country: string;
    };
    main: {
      temp: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  };
}

function Header({ weatherData }: HeaderProps) {
  const { name } = weatherData;
  const { country } = weatherData.sys;
  const { temp } = weatherData.main;
  const { description, icon } = weatherData.weather[0];
  return (
    <div className="header-wrapper">
      <div className="icons-wrapper">
        <CiSearch />
        <CiLocationOn />
      </div>
      <div className="location-wrapper">
        <div className="city">{name}</div>
        <div className="country">{countries[country].name}</div>
      </div>
      <div className="temperature-wrapper">
        <div className="">
          <div className="temperature">{Math.round(temp)}°</div>
          <div className="description">
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </div>
        </div>
        <div className="weather-icon">
          <img src={ICON_URL+icon+".png"} alt="a" />
        </div>
      </div>
    </div>
  );
}

export default Header;
