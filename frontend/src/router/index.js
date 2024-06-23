import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Calendar from "@/views/Calendar.vue";
import LoginForm from "@/components/LoginForm.vue";
import Modules from "@/views/Modules.vue";
import Exams from "@/views/Exams.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/modules",
    name: "Modules",
    component: Modules,
  },
  {
    path: "/exams",
    name: "Exams",
    component: Exams,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
