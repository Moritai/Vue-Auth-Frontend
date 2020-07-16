<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script lag="ts">
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  created() {
    console.log("home");
    axios.defaults.baseURL = "http://127.0.0.1:8000";
    try {
      //カスタムヘッダーを付与してgetリクエストを送信
      const res = axios.get("api/user");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
}
</script>
