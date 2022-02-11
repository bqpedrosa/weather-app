<template>
  <nav class="navigation-bar">
    <div
      @click="handleItemClick(item, index)"
      :class="[
        'navigation-bar__item',
        { 'navigation-bar__item--active': handleActiveIndex(index) },
      ]"
      v-for="(item, index) in getAllItems"
      :key="item"
    >
      {{ item }}
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",

  props: {
    title: {
      type: String,
      default: "Title",
    },

    getAllItems: {
      type: Array,
      required: true,
    },

    activeItem: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      activeIndex: 0,
    };
  },

  computed: {
    getItemIndex() {
      return this.getAllItems?.findIndex(
        (category) => this.activeItem.toLowerCase() === category.toLowerCase()
      );
    },
  },

  methods: {
    handleItemClick(item, index) {
      this.activeIndex = index;

      this.$emit("handleNavigationBarItemClick", item);
    },

    handleActiveIndex(index) {
      return this.activeItem
        ? this.getItemIndex === index
        : this.activeIndex === index;
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation-bar {
  display: flex;
  flex-direction: row;

  .navigation-bar__item {
    cursor: pointer;
    text-align: center;
    padding: 8px;
    font-size: 20px;
    line-height: 20px;

    &:hover {
      background: white;
    }
  }

  .navigation-bar__item--active {
    cursor: default;
    font-weight: bold;
    background: white;
  }
}
</style>
