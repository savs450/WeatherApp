import React, { useState, useEffect } from "react";
import "./weather.css";
import {useDate} from '../utils/time'

import cloud from "../asset/weatherIcons/cloud.png";
import fog from "../asset/weatherIcons/fog.png";
import rain from "../asset/weatherIcons/rain.png";
import snow from "../asset/weatherIcons/snow.png";
import storm from "../asset/weatherIcons/storm.png";
import sun from "../asset/weatherIcons/sun.png";
import windy from "../asset/weatherIcons/windy.png";

function Weathercard({ obj }) {
  const [icon, setIcon] = useState(sun);


  const {
    place,
    temperature,
    windSpeed,
    humidity,
    heatIndex,
    conditions,
    weather
  } = obj;

  useEffect(() => {
    handleWeatherImages(weather);
  }, [weather]);

  const handleWeatherImages = (weather) => {
    switch (weather) {
      case "Clear":
        setIcon(sun);
        return;
      case "Clouds":
      case "Haze":
        setIcon(cloud);
        return;
      case "Rain":
        setIcon(rain);
        return;
      case "Snow":
        setIcon(snow);
        return;
      case "Storm":
        setIcon(storm);
        return;
      default:
        setIcon(sun);
        return;
    }
  };
  function capitialize(str){
    let result = str.split(' ').map(word => word.charAt(0).toUpperCase()+ word.slice(1)).join(' ')
    return result
  }


let currentDate = new Date();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let ampm = hours >= 12 ? 'PM' : 'AM';

hours = hours % 12;
hours = hours ? hours : 12; 

minutes = minutes < 10 ? '0' + minutes : minutes;
let currentTime = hours + ':' + minutes + ' ' + ampm;

  return (
    <div className="weathercard-container">
      <div className="weatherCard">
        <div className="temperature">
          <img src={icon} alt={weather}></img>
          <h2>{temperature}&deg;C</h2>
        </div>
        <p className="city">{place}</p>
        <div className="date">
          <p>{new Date().toDateString()}</p>
          <p>{currentTime}</p>
        </div>
        <div className="other_details">
          <div className="windSpeed">
            <span>WindSpeed</span>
            <span>{windSpeed}km/h</span>
          </div>
          <div className="humidity">
            <span>Humidity</span>
            <span>{humidity}</span>
          </div>
        </div>
        <div className="heatIndex">
          <p>Heat Index</p>
          <p>{heatIndex}</p>
        </div>
        <div className="border"></div>
        <div className="condition">{capitialize(conditions)}</div>
      </div>
    </div>
  );
}

export default Weathercard;
