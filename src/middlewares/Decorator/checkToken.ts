import { UserUseCases } from "@/Domain/UseCases/User/UserUseCases";
import Cookies from "js-cookie";

export function checkToken(router: any){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;  // 元のメソッドを退避
        // 処理が実行される = descriptor.valueに格納されているの内容が実行（apply）される。
        // この特性を生かして、descriptor.value に、元のメソッドに独自の処理を挟んだメソッドを格納する。
        descriptor.value = function () {
            if (!Cookies.get("x-access-token")){
                new UserUseCases().refreshToken().catch((err)=>{
                    router.push("/login");
                })
            }
            const ret = originalMethod.apply(this, arguments);  // 元のメソッド(デコレート対象のメソッド)を実行
            return ret;
        }
    }
 
}