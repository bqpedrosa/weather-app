<template>
  <div class="weather-header">
    <Notification class="weather__notification" />

    <h1 class="weather-header__title">{{ title }}</h1>
    <input
      class="weather-header__input"
      type="text"
      v-model="searchInput"
      placeholder="Search a city"
    />
    <button class="header-header__button" @click="handleButtonClick">
      Search
    </button>
  </div>
</template>

<script>
import Notification from "@/components/Notification/Notification";

export default {
  name: "WeatherHeader",

  components: {
    Notification,
  },

  props: {
    title: {
      type: String,
      default: "Title",
    },
    value: {
      type: String,
      default: "",
    },
  },

  computed: {
    searchInput: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },

  methods: {
    handleButtonClick() {
      this.$emit("handleInputClick", this.searchInput);
    },
  },
};
</script>

<style lang="scss" scoped>
.weather__notification {
  z-index: 2;
  position: absolute;
  top: 0;
  right: 0;
}

.weather-header {
  width: 100%;
  text-align: center;
  color: var(--white);
  background: var(--black);

  .weather-header__title {
    text-align: center;
    width: 100%;
  }

  .weather-header__input {
    padding: 4px;
    margin: 8px;
  }
}
</style>
