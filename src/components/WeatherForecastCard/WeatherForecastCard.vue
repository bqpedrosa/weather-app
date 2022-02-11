<template>
  <div class="weather-card-forecast">
    <div class="weather-card-forecast__header">
      {{ weather.date.day }}
    </div>

    <div class="weather-card-forecast__temperature">
      <div class="weather-card-forecast__temperature-celsius">
        <span class="weather-card-forecast__temperature-celsius--interval">
          <span class="weather-card-forecast__temperature--max">{{
            weather.temperature.temp_max
          }}</span>
          <span class="weather-card-forecast__temperature--min"
            >/{{ weather.temperature.temp_min }}ºC</span
          >
        </span>
        <img
          :src="`http://openweathermap.org/img/w/${weather.weatherDescription.icon}.png`"
          class="weather-card-forecast__temperature-icon"
        />
      </div>
    </div>

    <div class="weather-card-forecast__description">
      {{ weather.weatherDescription.description }}
    </div>
  </div>
</template>

<script>
import WeatherForecast from "@/api/weather/weatherForecast.model.js";

export default {
  name: "WeatherForecastCard",

  props: {
    weather: {
      type: [WeatherForecast, Object],
      required: true,
    },

    title: {
      type: String,
      default: "Title",
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-card-forecast {
  margin: 4px;
  padding: 4px 0 4px 0;
  background: white;
  width: 120px;
  min-width: 120px;
  display: flex;
  flex-direction: column;
}

.weather-card-forecast__header {
  font-weight: bold;
  text-align: center;
}

.weather-card-forecast__temperature-celsius {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.weather-card-forecast__temperature-icon {
  height: 40px;
  width: 40px;
}

.weather-card-forecast__description {
  text-align: center;
}

.weather-card-forecast__temperature-celsius--interval {
  .weather-card-forecast__temperature--max {
    font-weight: bold;
    font-size: 32px;
  }
}
</style>
