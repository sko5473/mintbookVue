import { createStore } from "vuex";

export default createStore({
  state: {
    isLogin: false, //로그인 상태
  },

  getters: {},

  mutations: {
    //로그인
    login(state) {
      state.isLogin = true;
    },

    //로그아웃
    logout(state) {
      state.isLogin = false;
      state.accessToken = "";
      state.refreshToken = "";
    },
  },

  actions: {},

  modules: {},
});
