<template>
  <div class="weather">
    <div class="weather__header">
      <WeatherHeader
        v-model="cityChosen"
        title="Weather App"
        @handleInputClick="handleInputClick"
      />

      <NavigationBar
        class="weather__header-navigation"
        :getAllItems="weatherItems"
        :activeItem="typeOfWeather"
        @handleNavigationBarItemClick="handleItemClick"
      />
    </div>

    <div class="weather__main">
      <WeatherForecast
        @handleDeleteButton="handleDeleteButton"
        :weather="weatherForecast"
        v-if="typeOfWeather === 'forecast'"
      />

      <WeatherCurrent
        @handleDeleteButton="handleDeleteButton"
        :weather="weatherCurrent"
        v-if="typeOfWeather === 'today'"
      />

      <span class="weather__main-no-city" v-if="!weatherCurrent.length">
        There are no cities added.
      </span>
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
  display: grid;
  grid-template-rows: [header] min-content [main] auto;
  grid-template-columns: auto;
  height: 100%;
}

.weather__header {
  grid-row-start: header;
}

.weather__header-navigation {
  display: flex;
  justify-content: center;
}

.weather__main {
  grid-row-start: main;
  display: flex;
  justify-content: center;
  padding: 16px;
  overflow: auto;
}

.weather__main-no-city {
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  align-self: center;
}
</style>
