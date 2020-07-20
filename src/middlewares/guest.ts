import Cookies from "js-cookie";

export function guest(next: any, router: any) {
  // cookieのx-access-tokenに値がなければ、ログインしていない。ログインしている場合、ログインページへと遷移
  console.log("aaaaass")
  if (!Cookies.get("x-access-token")) {
      console.log("ddddd")
    // ログインしていない場合はそのままそのページへとすすむ
    return next();
  }

  // ログインしている場合は
  router.push({ name: "dashboard" });
}
