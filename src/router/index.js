import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/pages/Home.vue";
import About from "../views/pages/About.vue";
///import Contact from "../views/pages/Contact.vue";
import Taskboard from "../views/pages/Taskboard.vue";
import Login from "../views/pages/auth/Login.vue";
import Register from "../views/pages/auth/Register.vue";
import RequestResetPassword from "../views/pages/auth/RequestResetPassword.vue";
import ResetPassword from "../views/pages/auth/ResetPassword.vue";
import NotFound from "../views/pages/NotFound.vue";
import Profile from "../views/pages/auth/Profile.vue";
import dataTable from "../components/data-table.vue"
import dataUserTable from "../components/user/data-user-table.vue"
import flightLine from "@/components/flight-line/data-flight-line-table.vue"
import Contact from "@/components/contact/data-table.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/plane",
    name: "dataTable",
    component: dataTable,
  },
  
  {
    path: "/light-line",
    name: "flightLine ",
    component: flightLine ,
  },
  {
    path: "/user",
    name: "user",
    component: dataUserTable ,
  },
  {
    path: "/role",
    //name: "role",
    //component: Role,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/Taskboard",
    name: "Taskboard",
    component: Taskboard,
  },
 
 
    {
    path: "/login",
    name: "login",
    component: Login,
   
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
   
  },
   {
    path: "/register",
    name: "register",
    component: Register,
   
  },
    {
    path: "/request_token",
    name: "RequestResetPassword",
    component: RequestResetPassword,
   
  },
   {
    path: "/reset_password",
    name: "ResetPassword",
    component: ResetPassword,
   
  },
   {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
   
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
