import Cookies from "js-cookie";
import {state} from "@/Presentation/AuthStore"
// import VueRouter, { RouteConfig, Route } from "vue-router";

// ログインが必要なパスのミドルウェア
export function auth(next: any, router: any) {
  // cookieのx-access-tokenに値がなければ、ログインしていない。ログインしている場合、ログインページへと遷移
  if (!Cookies.get("x-access-token")) {
    return router.push("/login");
  }

  // ログインしている場合はそのままそのページへとすすむ
  return next();
}
