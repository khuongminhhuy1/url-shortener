import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/user/Login.vue";
import Register from "../views/user/Register.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/login", name: "login", component: Login, meta: { noHeader: true } },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { noHeader: true },
  },
];
const router = createRouter({ history: createWebHistory(), routes });
export default router;
