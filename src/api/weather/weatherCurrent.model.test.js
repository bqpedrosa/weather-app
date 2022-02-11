import WeatherCurrent from "./weatherCurrent.model.js";
import { format } from "date-fns";

describe("Given WeatherCurrent", () => {
  const payload = {
    coord: {
      lon: -8.721,
      lat: 41.2375,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    base: "stations",
    main: {
      temp: 14.59,
      feels_like: 13.59,
      temp_min: 13.93,
      temp_max: 15.73,
      pressure: 1028,
      humidity: 57,
    },
    visibility: 10000,
    wind: {
      speed: 3.6,
      deg: 80,
    },
    clouds: {
      all: 0,
    },
    dt: 1636284489,
    sys: {
      type: 1,
      id: 6900,
      country: "PT",
      sunrise: 1636269204,
      sunset: 1636305826,
    },
    timezone: 0,
    id: 8012780,
    name: "Lavra",
    cod: 200,
  };

  const weatherCurrent = new WeatherCurrent(payload);

  it("Should getWeatherDescription return an object with icon and description", () => {
    const fn = weatherCurrent.getWeatherDescription(payload.weather);

    const expected = {
      icon: payload.weather[0].icon,
      description: payload.weather[0].main,
    };

    expect(fn).toStrictEqual(expected);
  });

  it("Should getDate return date formatted", () => {
    const fn = weatherCurrent.getDate(payload.dt);

    const expected = format(new Date(payload.dt * 1000), "dd/MM");

    expect(fn).toBe(expected);
  });
});
