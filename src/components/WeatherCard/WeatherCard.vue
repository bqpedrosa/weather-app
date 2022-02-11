<template>
  <div class="weather-card">
    <div class="weather-card__header">
      <span v-if="weather.name" class="weather-card__city">
        {{ weather.name }} ({{ weather.country }})
      </span>

      <span class="weather-card__header-title">
        {{ title }}
      </span>
    </div>

    <div class="weather-card__temperature">
      <img
        :src="`http://openweathermap.org/img/w/${weather.weatherDescription.icon}.png`"
        class="weather-card__temperature-icon"
      />
      <div class="weather-card__temperature-celsius">
        <span class="weather-card__temperature-celsius--actual">
          {{ weather.temperature }}ºC
        </span>
      </div>
    </div>
    <div class="weather-card__description">
      <span class="weather-card__description-text">
        {{ weather.weatherDescription.description }}
      </span>
      <span class="weather-card__date">{{ weather.date }}</span>
    </div>
  </div>
</template>

<script>
import WeatherCurrent from "@/api/weather/weatherCurrent.model.js";

export default {
  name: "WeatherCard",

  props: {
    weather: {
      type: [WeatherCurrent, Object, Array],
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
.weather-card {
  margin: 8px 0 8px 0;
  padding: 16px;
  background: var(--white);
  min-width: 100px;
  width: 400px;
}

.weather-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weather-card__header-title {
  display: flex;
  flex-direction: column;
}

.weather-card__city {
  font-size: 22px;
}

.weather-card__header-title,
.weather-card__date,
.weather-card__city {
  font-weight: 500;
}

.weather-card__temperature {
  display: flex;
  justify-content: center;
  align-items: center;
}

.weather-card__temperature-celsius--actual {
  font-size: 32px;
  font-weight: bold;
}

.weather-card__temperature-icon {
  height: 40px;
  width: 40px;
  padding-right: 8px;
}

.weather-card__description {
  display: flex;
  justify-content: space-between;
}
</style>
