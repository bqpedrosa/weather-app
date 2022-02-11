<template>
  <div class="weather-current">
    <div v-for="current in weather" :key="current.id">
      <button
        class="weather-forecast__city-name-button"
        @click="handleDeleteButton(current.name)"
      >
        Remove
      </button>
      <WeatherCard title="Current Weather" :weather="current" />
    </div>
  </div>
</template>

<script>
import WeatherCard from "@/components/WeatherCard/WeatherCard";

export default {
  name: "WeatherCurrent",

  components: {
    WeatherCard,
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
