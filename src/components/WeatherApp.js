import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./weather.css";
import axios from "axios";
import Weathercard from "./WeatherCard";
import clear from "../asset/BackgroundImages/Clear.jpg";
import cloudy from "../asset/BackgroundImages/Cloudy.jpg";
import fog from "../asset/BackgroundImages/fog.png";
import rainy from "../asset/BackgroundImages/Rainy.jpg";
import snowy from "../asset/BackgroundImages/snow.jpg";
import stormy from "../asset/BackgroundImages/Stormy.jpg";
import sunny from "../asset/BackgroundImages/Sunny.jpg";

function WeatherApp() {
  const [inputVal, setInputVal] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [filterObj, setFilterObj] = useState(null);
  const [background, setBackground] = useState(sunny);
  const apiKey = "fd1b03aaa923a18074d819a1fe44f8f2";

  async function fetchData() {
    // console.log("fetchData is calling..");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=Metric&appid=${apiKey}`;
    if (inputVal.trim() !== "") {
      try {
        let response = await axios.get(url);
        setWeatherData(response.data);
        // console.log("response", response.data);
      } catch (err) {
        console.warn("something went wrong", err);
      }
    }
    setInputVal("");
  }

  useEffect(() => {
    if (weatherData !== null) {
      const { main, name, weather, wind } = weatherData;
      setFilterObj({
        temperature: main.temp,
        windSpeed: wind.speed,
        humidity: main.humidity,
        place: name,
        heatIndex: main.feels_like,
        weather: weather[0].main,
        conditions: weather[0].description,
      });
      switch (weather[0].main) {
        case "Clear":
          setBackground(clear);
          break;
        case "Clouds":
        case "Haze":
          setBackground(cloudy);
          break;
        case "Rain":
          setBackground(rainy);
          break;
        case "Snow":
          setBackground(snowy);
          break;
        case "Storm":
          setBackground(stormy);
          break;
        default:
          setBackground(sunny);
      }
    }
  }, [weatherData]);

 
  //   handleWeatherImages(conditions);
  // }, [conditions]);

  // const handleWeatherBackground = (weather) => {
  //   switch (weather) {
  //     case "Clear":
  //       setBackground(sunny);
  //       return;
  //     case "Clouds":
  //     case "Haze":
  //       setBackground(cloudy);
  //       return;
  //     case "Rain":
  //       setBackground(rainy);
  //       return;
  //     case "Snow":
  //       setBackground(snowy);
  //       return;
  //     case "Storm":
  //       setBackground(stormy);
  //       return;
  //     default:
  //       setBackground(clear);
  //       return;
  //   }
  // };
  return (
    <div className="main_conatiner" style={{ backgroundImage: `url(${background})` }}>
      <h1 className="heading">Weather Application</h1>
      <div className="search_input">
        <input
          placeholder="Search city...."
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? fetchData() : "")}
        ></input>
        <span>
          <SearchIcon />
        </span>
      </div>
     {filterObj !== null && <Weathercard obj={filterObj} />}
    </div>
  );
}

export default WeatherApp;
