<template>
  <div class="weather-forecast">
    <div class="weather-forecast__city" v-for="(city, i) in weather" :key="i">
      <div class="weather-forecast__city-name">
        <h1 class="weather-forecast__city-name-text">{{ city.name }}</h1>
        <button
          class="weather-forecast__city-name-button"
          @click="handleDeleteButton(city.name)"
        >
          Remove
        </button>
      </div>
      <div class="weather-forecast__city-cards">
        <WeatherForecastCard
          class="weather-forecast__city-day"
          v-for="day in city.data"
          :key="day.lat"
          :weather="day"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherForecastCard from "@/components/WeatherForecastCard/WeatherForecastCard";

export default {
  name: "WeatherForecast",

  components: {
    WeatherForecastCard,
  },

  props: {
    weather: {
      type: Array,
      required: true,
    },
  },

  methods: {
    handleDeleteButton(index) {
      this.$emit("handleDeleteButton", index);
    },
  },
};
</script>

<style lang="scss">
.weather-forecast__city {
  padding: 8px;
}

.weather-forecast__city-cards {
  display: flex;
  flex-wrap: wrap;

  .weather-forecast__city-day.weather-card {
    width: 340px;
  }
}

.weather-forecast__city-name-text {
  padding: 0 16px 0 0;
}

.weather-forecast__city-name {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
