import weather from "./weather";

import * as weatherApi from "@/api/weather/weather.api.js";

const { actions, mutations, state } = weather;
const commit = jest.fn();
const dispatch = jest.fn();

const currentApi = {
  coord: { lon: -8.7196, lat: 41.2418 },
  weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
  base: "stations",
  main: {
    temp: 15.42,
    feels_like: 14.48,
    temp_min: 14.25,
    temp_max: 16.61,
    pressure: 1028,
    humidity: 56,
  },
  visibility: 10000,
  wind: { speed: 4.12, deg: 330 },
  clouds: { all: 0 },
  dt: 1636215845,
  sys: {
    type: 1,
    id: 6900,
    country: "PT",
    sunrise: 1636182732,
    sunset: 1636219490,
  },
  timezone: 0,
  id: 8012780,
  name: "Lavra",
  cod: 200,
};

const apiCall = {
  lat: 41.2418,
  lon: -8.7196,
  timezone: "Europe/Lisbon",
  timezone_offset: 0,
  current: {
    dt: 1636215897,
    sunrise: 1636182732,
    sunset: 1636219490,
    temp: 15.42,
    feels_like: 14.48,
    pressure: 1028,
    humidity: 56,
    dew_point: 6.7,
    uvi: 0.57,
    clouds: 0,
    visibility: 10000,
    wind_speed: 4.12,
    wind_deg: 330,
    weather: [
      { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
    ],
  },
  minutely: [{ dt: 1636215900, precipitation: 0 }],
  hourly: [
    {
      dt: 1636214400,
      temp: 15.42,
      feels_like: 14.48,
      pressure: 1028,
      humidity: 56,
      dew_point: 6.7,
      uvi: 0.57,
      clouds: 0,
      visibility: 10000,
      wind_speed: 4.62,
      wind_deg: 340,
      wind_gust: 4.63,
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
      ],
      pop: 0,
    },
  ],
  daily: [
    {
      dt: 1636200000,
      sunrise: 1636182732,
      sunset: 1636219490,
      moonrise: 1636189560,
      moonset: 1636223940,
      moon_phase: 0.06,
      temp: {
        day: 14.75,
        min: 10.38,
        max: 15.43,
        night: 12.22,
        eve: 14.7,
        morn: 10.56,
      },
      feels_like: { day: 13.53, night: 11.19, eve: 13.82, morn: 9.5 },
      pressure: 1030,
      humidity: 48,
      dew_point: 3.86,
      wind_speed: 5.15,
      wind_deg: 339,
      wind_gust: 6.72,
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
      ],
      clouds: 2,
      pop: 0,
      uvi: 2.68,
    },
  ],
};

describe("Given weather", () => {
  beforeEach(() => {
    state.weatherCurrent = [];
    state.weatherForecast = [];
    state.userLocation = {};

    jest.clearAllMocks();
  });

  describe("Actions", () => {
    it("Should getForecastWeather call getLocationWeather and commit mutation", async () => {
      const response = {
        lat: "test lat",
        lon: "test lon",
        city: "test name",
      };

      const expected = { name: response.city, data: apiCall };

      weatherApi.getLocationWeather = jest.fn(() => apiCall);

      await actions.getForecastWeather({ commit, dispatch }, response);

      const [type, payload] = commit.mock.calls[0];

      expect(type).toBe("SET_FORECAST_WEATHER");
      expect(payload).toStrictEqual(expected);
    });

    it("Should getForecastWeather dispatch error", async () => {
      const response = {
        lat: "test lat",
        lon: "test lon",
        city: "test name",
      };

      const expected = { name: response.city, data: apiCall };

      weatherApi.getLocationWeather = jest.fn(() => {
        throw "error";
      });

      await actions.getForecastWeather({ commit, dispatch }, response);

      const [type, payload] = dispatch.mock.calls[0];

      expect(type).toBe("notificationMessage/setMessage");
      expect(payload).toBe("error");
    });

    it("Should getCurrentWeather call getCurrentWeather, commit mutation and dispatch action", async () => {
      const response = {
        lat: "test lat",
        lon: "test lon",
      };

      state.weatherCurrent = [];

      weatherApi.getCurrentWeather = jest.fn(() => currentApi);

      await actions.getCurrentWeather({ commit, dispatch }, response);

      const [type, payload] = commit.mock.calls[0];

      expect(type).toBe("SET_CURRENT_WEATHER");
      expect(payload).toBe(currentApi);
      expect(dispatch.mock.calls[0][0]).toBe("getForecastWeather");
      expect(dispatch.mock.calls[1][0]).toBe("notificationMessage/setMessage");
    });

    it("Should getCurrentWeather dispatch notification with error", async () => {
      const response = {
        lat: "test lat",
        lon: "test lon",
      };

      state.weatherCurrent = [];

      weatherApi.getCurrentWeather = jest.fn(() => {
        throw "error";
      });

      await actions.getCurrentWeather({ commit, dispatch }, response);

      const [type, payload] = dispatch.mock.calls[0];

      expect(type).toBe("notificationMessage/setMessage");
      expect(payload).toBe("error");
    });

    it("Should getCurrentWeather dispatch notification with message if city already exists", async () => {
      const response = {
        lat: "test lat",
        lon: "test lon",
      };

      state.weatherCurrent = [{ name: "Lavra" }];

      weatherApi.getCurrentWeather = jest.fn(() => currentApi);

      await actions.getCurrentWeather({ commit, dispatch }, response);

      const [type, payload] = dispatch.mock.calls[0];

      expect(type).toBe("notificationMessage/setMessage");
      expect(payload).toBe(`City ${currentApi.name} already exists`);
    });

    it("Should deleteCity commit mutation DELETE_CITY_WEATHER_CURRENT", () => {
      state.weatherCurrent = [{ name: "data 1" }];
      const response = "data 1";
      const message = `${response} deleted`;
      const expected = 0;

      actions.deleteCity({ commit, dispatch }, response);

      const [type, payload] = commit.mock.calls[0];
      const [dispatchName, dispatchPayload] = dispatch.mock.calls[0];

      expect(type).toBe("DELETE_CITY_WEATHER_CURRENT");
      expect(payload).toBe(expected);
      expect(dispatchName).toBe("notificationMessage/setMessage");
      expect(dispatchPayload).toBe(message);
    });

    it("Should deleteCity commit mutation DELETE_CITY_WEATHER_FORECAST", () => {
      state.weatherForecast = [{ name: "data 1" }];
      const response = "data 1";
      const message = `${response} deleted`;
      const expected = 0;

      actions.deleteCity({ commit, dispatch }, response);

      const [type, payload] = commit.mock.calls[0];
      const [dispatchName, dispatchPayload] = dispatch.mock.calls[0];

      expect(type).toBe("DELETE_CITY_WEATHER_FORECAST");
      expect(payload).toBe(expected);
      expect(dispatchName).toBe("notificationMessage/setMessage");
      expect(dispatchPayload).toBe(message);
    });
  });

  describe("Mutations", () => {
    it("Should SET_CURRENT_WEATHER change the state based on response data", () => {
      const state = {
        weatherCurrent: [],
        weatherForecast: [],
      };

      const data = { test: "weather test" };

      mutations.SET_CURRENT_WEATHER(state, data);

      expect(state.weatherCurrent).toStrictEqual([data]);
    });

    it("Should SET_FORECAST_WEATHER change the state based on response data", () => {
      const state = {
        weatherCurrent: [],
        weatherForecast: [],
      };

      const data = [{ test: "weather test" }];

      mutations.SET_FORECAST_WEATHER(state, data);

      expect(state.weatherForecast).toStrictEqual([data]);
    });

    it("Should SET_USER_LOCATION set userLocation data", () => {
      const state = {
        userLocation: {},
        weatherCurrent: [],
        weatherForecast: [],
      };

      const data = { lat: "lat", lon: "lon" };

      mutations.SET_USER_LOCATION(state, data);

      expect(state.userLocation).toStrictEqual(data);
    });

    it("Should DELETE_CITY_WEATHER_CURRENT delete city selected", () => {
      const state = {
        userLocation: {},
        weatherCurrent: ["data 1", "data 2"],
        weatherForecast: ["data 1", "data 2"],
      };

      const data = 0;

      mutations.DELETE_CITY_WEATHER_CURRENT(state, data);

      expect(state.weatherCurrent).toStrictEqual(["data 2"]);
      expect(state.weatherForecast).toStrictEqual(["data 1", "data 2"]);
    });

    it("Should DELETE_CITY_WEATHER_FORECAST delete city selected", () => {
      const state = {
        userLocation: {},
        weatherCurrent: ["data 1", "data 2"],
        weatherForecast: ["data 1", "data 2"],
      };

      const data = 0;

      mutations.DELETE_CITY_WEATHER_FORECAST(state, data);

      expect(state.weatherForecast).toStrictEqual(["data 2"]);
      expect(state.weatherCurrent).toStrictEqual(["data 1", "data 2"]);
    });
  });
});
