import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/Presentation/pages/Home.vue";
import Login from "../Presentation/pages/Login.vue";
import Register from "../Presentation/pages/Register.vue";
import Dashboard from "@/Presentation/pages/Dashboard.vue";
import { auth } from "@/middlewares/auth";
import { guest } from "@/middlewares/guest";
import { test } from "@/middlewares/test";

// import Dashboard from "../Presentation/views/pages/Dashboard.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      middleware: [guest]
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      middleware: [guest]
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      middleware: [auth]
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});




// ルーティング処理が行われる前に毎回行われる処理
/*引数
to: 遷移先のルート
例
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta:{
      middleware: [guest]
    }
from: 遷移元のルート
next:続く処理(vue-routerが算出する)*/
router.beforeEach((to, from, next) => {
  // 行き先のルートのmetaにmiddlewareが設定されていたら
  if (to.meta.middleware) {
    // meta.middlewareがarrayでなければarrayにする。
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    return middleware[0](next, router);
  }

  // 行き先のルートのmetaにmiddlewareがなければ、そのままそのページに遷移する。
  return next();
});

export default router;
