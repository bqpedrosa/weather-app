<template>
  <div class="weather">
    <WeatherHeader
      v-model="cityChosen"
      title="Weather App"
      @handleInputClick="handleInputClick"
    />

    <NavigationBar
      class="weather__navigation"
      :getAllItems="weatherItems"
      :activeItem="typeOfWeather"
      @handleNavigationBarItemClick="handleItemClick"
    />

    <div class="weather__main">
      <WeatherForecast
        @handleDeleteButton="handleDeleteButton"
        :weather="weatherForecast"
        v-if="typeOfWeather === 'forecast'"
      />

      <WeatherCurrent
        @handleDeleteButton="handleDeleteButton"
        :weather="weatherCurrent"
        v-else
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import WeatherCurrent from "@/components/WeatherCurrent/WeatherCurrent.vue";
import WeatherForecast from "@/components/WeatherForecast/WeatherForecast.vue";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import WeatherHeader from "@/components/WeatherHeader/WeatherHeader.vue";

const defaultWeatherValue = "today";

export default {
  name: "Weather",

  components: {
    WeatherCurrent,
    WeatherForecast,
    NavigationBar,
    WeatherHeader,
  },

  data() {
    return {
      cityChosen: "",
      typeOfWeather: defaultWeatherValue,
      weatherItems: ["Today", "Forecast"],
    };
  },

  computed: {
    ...mapState("weather", [
      "weatherCurrent",
      "weatherForecast",
      "userLocation",
    ]),
  },

  async mounted() {
    this.handleTypeOfWeather(this.$route.query?.weather);

    await this.getUserLocation();
    await this.getCurrentWeather(this.userLocation);
  },

  methods: {
    ...mapActions("weather", [
      "getUserLocation",
      "getCurrentWeather",
      "deleteCity",
    ]),

    handleTypeOfWeather(weather) {
      if (weather === "today" || weather === "forecast") {
        this.typeOfWeather = weather;

        return;
      }

      this.$router.push({ query: { weather: defaultWeatherValue } });
    },

    async handleInputClick(newValue) {
      const payload = { city: newValue };

      await this.getCurrentWeather(payload);

      this.cityChosen = "";
    },

    handleItemClick(item) {
      const itemLowerCase = item.toLowerCase();

      this.typeOfWeather = itemLowerCase;
      this.$router.push({ query: { weather: itemLowerCase } });
    },

    handleDeleteButton(name) {
      this.deleteCity(name);
    },
  },
};
</script>

<style lang="scss" scoped>
.weather {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.weather__main {
  padding-top: 16px;
}

.weather__card {
  width: 100px;
  margin: 16px;
}

.weather__forecast {
  display: flex;
  flex-wrap: wrap;
}
</style>
