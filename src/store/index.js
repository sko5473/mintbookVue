import { createStore } from "vuex";

export default createStore({
  state: {
    isLogin: false, //로그인 상태
    verifiedInfo: [],
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
    },

    //로그인검증성공시 사용자정보
    verifiedInfo(state, verifiedInfo) {
      state.verifiedInfo = verifiedInfo;
    },
  },

  actions: {},

  modules: {},
});
