import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Followed from "../views/Followed.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/followed", component: Followed },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;