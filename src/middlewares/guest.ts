import Cookies from "js-cookie";
import { UserUseCases } from "@/Domain/UseCases/User/UserUseCases";

export async function guest(next: any, router: any) {
  // console.log("middleware-guest")
// cookieのx-access-tokenに値がない、かつrefreshTokenもない（or 期限切れ)ならば、ログインしていない。ログインしていない場合、そのまま次に移る。
  if (!Cookies.get("x-access-token")){
    // console.log("middleware-guest")
    const isSuccess: boolean = await new UserUseCases().refreshToken();
    if(!isSuccess){
      console.log("middleware-guest")
      return next();
    }else{
      router.push("/dashboard");  
    }
  }else{
    // ログインしている場合は
    router.push("/dashboard");
  }
}
