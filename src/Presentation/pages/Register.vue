<template>
  <div>
    <h1>Register</h1>
    <!-- https://getbootstrap.com/docs/4.5/components/forms/ -->
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          name="email"
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
        <label for="name">Name</label>
        <input
          type="name"
          class="form-control"
          name="name"
          v-model="name"
          @blur="$v.name.$touch()"
          :class="{ error: $v.name.$error }"
        />
        <div v-if="$v.name.$error">
          <span v-if="!$v.name.required">名前が入力されていません。</span>
          <!-- <span v-if="!$v.email.email"
            >メールアドレスの形式が正しくありません。</span
          > -->
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
          <span v-if="!$v.email.required"
            >パスワードが入力されていません。</span
          >
          <!-- <span v-if="!$v.email.email"
            >メールアドレスの形式が正しくありません。</span
          > -->
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <router-link to="/login">login</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { required, email } from "vuelidate/lib/validators";
import { UserUseCases } from "@/Domain/UseCases/User/UserUseCases";
// import axios from "axios"
Component.registerHooks(["validations"]);

@Component
export default class Register extends Vue {
  private name = "";
  private email = "";
  private password = "";

  validations() {
    return {
      email: { required, email },
      password: { required },
      name: { required }
    };
  }
  submitForm() {
    (this as any).$v.$touch();
    if ((this as any).$v.$invalid) {
      console.log("バリデーションエラー");
    } else {
      console.log("submit");
      new UserUseCases().register(this.name, this.email, this.password);

      // axios.post("http://127.0.0.1:8000").then(res: String){}
      // (this as any).$router.push("/login"); //submitに成功したら、"/login"パスへと遷移する。
    }
  }
}
</script>
