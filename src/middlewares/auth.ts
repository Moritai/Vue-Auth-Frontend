import Cookies from "js-cookie";
import { UserUseCases } from "@/Domain/UseCases/User/UserUseCases";

// ログインが必要なパスのミドルウェア
export async function auth(next: Function, router: any) {
  // cookieのx-access-tokenに値がない、かつrefreshTokenもない（or 期限切れ)ならば、ログインしていない。ログインしていない場合、ログインページへと遷移
  if (!Cookies.get("x-access-token")){
    // 
    const isSuccess: boolean = await new UserUseCases().refreshToken()
    // リフレッシュトークンも有効期限切れになっており、エラーが返ってきた場合
    if(!isSuccess){
      router.push("/login");
    }else{
      // 
      return  next();
    }
    
  }else{
    // ログインしている場合はそのままそのページへとすすむ
    return  next();
  }

  // if (!Cookies.get("x-access-token")){
  //   await new UserUseCases().refreshToken().then(()=>{
  //     router.push("/login")
  //   }).catch(errors=>{
  //     console.log(errors)
  //     return  next();
  //   }
  //   )
  // }
}
