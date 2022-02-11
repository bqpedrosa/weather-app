import axios from "axios";

import WeatherCurrent from "./weatherCurrent.model.js";
import WeatherForecast from "./weatherForecast.model.js";

const apiKey = "8a88acb64ae5d8fa3623e5f984ba86de";
const defaultLat = "39.74362";
const defaultLon = "-8.80705";

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
