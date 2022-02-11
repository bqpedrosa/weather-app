<template>
  <div class="weather-current">
    <div
      class="weather-current__box"
      v-for="current in weather"
      :key="current.id"
    >
      <button
        class="weather-current__box-button"
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

<style lang="scss" scoped>
.weather-current__box {
  padding: 8px;
}
</style>
