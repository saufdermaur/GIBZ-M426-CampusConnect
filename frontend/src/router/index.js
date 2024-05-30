import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import APITest from "../views/APITest.vue";
import Calendar from "@/views/Calendar.vue";
import LoginForm from "@/components/LoginForm.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/apiTest",
        name: "API Test",
        component: APITest
    },
    {
        path: "/calendar",
        name: "Calendar",
        component: Calendar
    },
    {
        path: "/about",
        name: "About",
        component: About
    },
    {
        path: "/login",
        name: "Login",
        component: LoginForm
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});	

export default router;