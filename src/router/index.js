import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/pages/Home.vue";
import Login from "../views/pages/auth/Login.vue";
import Register from "../views/pages/auth/Register.vue";
import NotFound from "../views/pages/NotFound.vue";
import dataTable from "../components/plane/data-plane-table.vue"
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
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
 
 
    {
    path: "/login",
    name: "login",
    component: Login,
   
  },
 
   {
    path: "/register",
    name: "register",
    component: Register,
   
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
