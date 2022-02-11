import WeatherForecast from "./WeatherForecast.model.js";
import { format } from "date-fns";

describe("Given WeatherForecast", () => {
  const payload = {
    dt: 1636286400,
    sunrise: 1636269205,
    sunset: 1636305825,
    moonrise: 1636280640,
    moonset: 1636313460,
    moon_phase: 0.1,
    temp: {
      day: 14.79,
      min: 10.57,
      max: 15.05,
      night: 13.96,
      eve: 14.54,
      morn: 10.69,
    },
    feels_like: {
      day: 13.81,
      night: 12.72,
      eve: 13.64,
      morn: 9.2,
    },
    pressure: 1028,
    humidity: 57,
    dew_point: 6.36,
    wind_speed: 4.47,
    wind_deg: 333,
    wind_gust: 4.64,
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    clouds: 0,
    pop: 0,
    uvi: 2.63,
  };

  const weatherForecast = new WeatherForecast(payload);

  it("Should getWeatherDescription return an object with icon and description", () => {
    const fn = weatherForecast.getWeatherDescription(payload.weather);

    const expected = {
      icon: payload.weather[0].icon,
      description: payload.weather[0].main,
    };

    expect(fn).toStrictEqual(expected);
  });

  it("Should getDate return date formatted", () => {
    const fn = weatherForecast.getDate(payload.dt);

    const expected = format(new Date(payload.dt * 1000), "dd/MM");

    expect(fn).toBe(expected);
  });

  it("Should getWeatherTemperature return temp_max and temp_min", () => {
    const fn = weatherForecast.getWeatherTemperature(payload.temp);

    const expected = {
      temp_max: payload.temp.max.toFixed(0),
      temp_min: payload.temp.min.toFixed(0),
    };

    expect(fn).toStrictEqual(expected);
  });
});
