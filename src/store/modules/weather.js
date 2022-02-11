import {
  getLocationWeather,
  getCurrentWeather,
} from "@/api/weather/weather.api.js";

const state = {
  weatherCurrent: [],
  weatherForecast: [],
  userLocation: {},
};

const actions = {
  async getUserLocation({ commit, dispatch }) {
    const getPosition = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    };

    await getPosition()
      .then((position) => {
        const payload = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        commit("SET_USER_LOCATION", payload);
      })
      .catch((error) => {
        dispatch("notificationMessage/setMessage", error.message, {
          root: true,
        });
      });
  },

  async getCurrentWeather({ commit, dispatch }, response) {
    const { lat, lon, city } = response;

    try {
      const data = await getCurrentWeather({ lat, lon, city });

      const cityExists = state.weatherCurrent.some(
        (value) => value.name === data.name
      );

      if (!cityExists) {
        const payload = {
          city: data.name,
          lat: data.coord.lat,
          lon: data.coord.lon,
        };

        dispatch("getForecastWeather", payload);
        commit("SET_CURRENT_WEATHER", data);
        dispatch("notificationMessage/setMessage", `City ${data.name} added`, {
          root: true,
        });
      } else {
        dispatch(
          "notificationMessage/setMessage",
          `City ${data.name} already exists`,
          { root: true }
        );
      }
    } catch (error) {
      dispatch("notificationMessage/setMessage", error, { root: true });
    }
  },

  async getForecastWeather({ commit, dispatch }, response) {
    const { lat, lon, city } = response;

    try {
      const data = await getLocationWeather({
        lat,
        lon,
      });

      const payload = { name: city, data };

      commit("SET_FORECAST_WEATHER", payload);
    } catch (error) {
      dispatch("notificationMessage/setMessage", error, { root: true });
    }
  },

  deleteCity({ commit, dispatch }, response) {
    const message = `${response} deleted`;

    const weatherCurrentPayload = state.weatherCurrent.findIndex(
      (x) => x.name === response
    );
    const weatherForecastPayload = state.weatherForecast.findIndex(
      (x) => x.name === response
    );

    if (weatherCurrentPayload !== -1) {
      commit("DELETE_CITY_WEATHER_CURRENT", weatherCurrentPayload);
      dispatch("notificationMessage/setMessage", message, { root: true });
    }

    if (weatherForecastPayload !== -1) {
      commit("DELETE_CITY_WEATHER_FORECAST", weatherForecastPayload);
      dispatch("notificationMessage/setMessage", message, { root: true });
    }
  },
};

const mutations = {
  SET_USER_LOCATION(state, data) {
    state.userLocation = data;
  },

  DELETE_CITY_WEATHER_CURRENT(state, data) {
    state.weatherCurrent.splice(data, 1);
  },

  DELETE_CITY_WEATHER_FORECAST(state, data) {
    state.weatherForecast.splice(data, 1);
  },

  SET_CURRENT_WEATHER(state, data) {
    state.weatherCurrent.unshift(data);
  },

  SET_FORECAST_WEATHER(state, data) {
    state.weatherForecast.unshift(data);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
