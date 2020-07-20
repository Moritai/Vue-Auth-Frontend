<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button v-on:click="getData">test</button>
  </div>
</template>

<script lag="ts">
import { Vue } from "vue-property-decorator";
import axios from "axios";

export default class About extends Vue {
  getData() {
    console.log("about");
    try {
      //カスタムヘッダーを作成
      const config = {
        header: {
          "Access-Control-Allow-Origin": "cors"
        }
      };
      //カスタムヘッダーを付与してgetリクエストを送信
      const res = axios.get("http://127.0.0.1:8000/api/user", config);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
}
</script>
