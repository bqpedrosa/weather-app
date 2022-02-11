import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const weatherRoute = [
  {
    path: "/weather",
    name: "weather",
    alias: "/",
    component: () => import("@/components/Pages/Weather/Weather.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes: weatherRoute,
});

export default router;
