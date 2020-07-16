import Vue from "vue";
import App from "./App.vue";
import router from "./router";
/* Bootstrapここから */
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
/* ここまで */
// validation機能をグローバルに使用できるようにインポート
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate) // use as a Vue plugin

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
