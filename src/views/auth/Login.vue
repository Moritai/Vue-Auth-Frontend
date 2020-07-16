<template>
  <div>
    <h1>Login</h1>
    <!-- https://getbootstrap.com/docs/4.5/components/forms/ -->
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          v-model="email"
          @blur="$v.email.$touch()"
          :class="{ error: $v.email.$error }"
        />
        <div v-if="$v.email.$error">
          <span v-if="!$v.email.required"
            >メールドレスが入力されていません。</span
          >
          <span v-if="!$v.email.email"
            >メールアドレスの形式が正しくありません。</span
          >
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          name="password"
          v-model="password"
          @blur="$v.password.$touch()"
          :class="{ error: $v.password.$error }"
        />
        <div v-if="$v.password.$error">
          <span v-if="!$v.password.required"
            >パスワードが入力されていません。</span
          >
          <!-- <span v-if="!$v.email.email"
            >メールアドレスの形式が正しくありません。</span
          > -->
        </div>
        <!-- /> -->
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
    <router-link to="/register">register</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";
Component.registerHooks(["validations"]);

@Component
export default class Login extends Vue {
  private email = "";
  private password = "";
  validations() {
    return {
      email: { required, email },
      password: { required }
    };
  }
  submitForm() {
    (this as any).$v.$touch();
    if ((this as any).$v.$invalid) {
      console.log("バリデーションエラー");
    } else {
      console.log("submit");
      axios
        .post("http://127.0.0.1:8000/api/login", {
          crossdomain: true,
          email: this.email,
          password: this.password
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }
}
</script>

<style>
.error {
  color: #8a0421;
  border-color: #dd0f3b;
  background-color: #ffd9d9;
}
</style>
