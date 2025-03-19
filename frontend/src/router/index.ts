import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/authStore";
import Home from "../views/Home.vue";
import Login from "../views/user/Login.vue";
import Register from "../views/user/Register.vue";
import Dashboard from "../views/user/Dashboard.vue";
import RedirectPage from "../views/redirect/RedirectPage.vue";
import ResetPassword from "../views/password/ResetPassword.vue";
import ForgotPassword from "../views/password/ForgotPassword.vue";
import Verified from "../views/verification/Verified.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/login", name: "login", component: Login, meta: { noHeader: true } },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { noHeader: true },
  },
  { path: "/:shortCode", name: "redirect-page", component: RedirectPage },
  {
    path: "/reset-password",
    name: "reset-password",
    component: ResetPassword,
    meta: { noHeader: true },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
    meta: { noHeader: true },
  },
  {
    path: "/verified",
    name: "verified",
    component: Verified,
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, _, next) => {
  // Ignore `from` by using `_`
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});
export default router;
