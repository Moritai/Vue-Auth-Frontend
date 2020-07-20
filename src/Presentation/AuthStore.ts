import Vue from "vue";

type State = {
  token: string | null;
};

// State型のオブジェクト（Vue.observable<State>でオブジェクトの要素の変更をリアクティブにする）
export const state = Vue.observable<State>({
  token: null
});

// オブジェクトの形で、状態を変更するメソッド群を格納。
export const mutation = {
  setToken(token: string) {
    state.token = token;
  },

  removeToken() {
    state.token = null;
  }
};
