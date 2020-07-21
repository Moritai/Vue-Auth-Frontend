import axios from "axios";
import Cookies from "js-cookie";
import { mutation } from "@/Presentation/AuthStore";

export class UserUseCases {
  // 本当はInfrastractureに記述
  axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    withCredentials: true, //cookieもともに送る場合、これを記
  });

  async register(name: string, email: string, password: string): Promise<void> {
    const form = {
      name: name,
      email: email,
      password: password
    };

    // 本当はInfrastractureに記述
    try {
      const res = await this.axiosInstance.post("register", form);
      this.setToken(res.data.token, res.data.expiresIn);
    } catch (err) {
      console.log(err);
    }
  }

  async login(email: string, password: string): Promise<void> {
    const form = {
      email: email,
      password: password
    };

    // 本当はInfrastractureに記述
    try {
      // console.log(form);
      const res = await this.axiosInstance.post("login", form);
      // console.log(res);
      // console.log(res.data.token);
      // console.log(res.data.expiresIn);
      this.setToken(res.data.token, res.data.expiresIn);
    } catch (err) {
      console.log(err);
    }
  }

  // cookieにtokenを格納（その際、有効期限も記載して起き、期限切れになるとそのcookieが消滅するようにしておく）
  setToken(token: string, expiresIn: number) {
    // 有効期限が切れる日時を算出(expiresInは)
    const expiryTime = new Date(new Date().getTime() + expiresIn * 1000);
    console.log(expiryTime);
    Cookies.set("x-access-token", token, { expires: expiryTime });
    mutation.setToken(token);
  }

  // tokenの有効期限が切れていた場合に実行される
  async refreshToken(): Promise<boolean> {
    try{
      console.log("go to fetch refresh-token")
      const res = await this.axiosInstance.post("refresh-token");
      console.log("Got data")
      this.setToken(res.data.token, res.data.expiresIn);
      const isSuccess = true
      return isSuccess;
    }catch(err){
      const isSuccess = false;
      console.log("failed to fecth refresh token")
      return(isSuccess)
    }
  }

  logout() {
    // cookieに保存したtokenを取り除く。
    Cookies.remove("x-access-token");
    mutation.removeToken();
  }
}
