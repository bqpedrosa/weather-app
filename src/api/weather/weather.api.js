import axios from "axios";

import WeatherCurrent from "./weatherCurrent.model.js";
import WeatherForecast from "./weatherForecast.model.js";

const apiKey = process.env.VUE_APP_WEATHER_API_KEY || "";
const defaultLat = "41.245368270623544";
const defaultLon = "-8.722135782373774";

export const getLocationWeather = async ({ lat = "", lon = "", city = "" }) => {
  const getLat = lat || defaultLat;
  const getLon = lon || defaultLon;

  const formatUrl = city
    ? `https://api.openweathermap.org/data/2.5/onecall?q=${city}&units=metric&exclude=current,minutely,hourly,alerts&appid=${apiKey}`
    : `https://api.openweathermap.org/data/2.5/onecall?lat=${getLat}&lon=${getLon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;

  const response = await axios.get(formatUrl);

  return response.data?.daily.map((day) => new WeatherForecast(day));
};

export const getCurrentWeather = async ({ lat, lon, city }) => {
  const getLat = lat || defaultLat;
  const getLon = lon || defaultLon;

  const formatUrl = city
    ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    : `https://api.openweathermap.org/data/2.5/weather?lat=${getLat}&lon=${getLon}&units=metric&appid=${apiKey}`;

  const response = await axios.get(formatUrl);
  return new WeatherCurrent(response.data);
};
