import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RangoView from "../views/RangoView.vue";
import MovesView from "../views/MovesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/listado",
      name: "listado",
      component: RangoView,
    },
    {
      path: "/movimientos/:pokemon",
      name: "movimientos",
      component: MovesView,
    },
  ],
});

export default router;
