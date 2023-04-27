import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    isLogin: false, //로그인 상태
    verifiedInfo: [],
    isAdmin: "CHECK",
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
      state.isAdmin = "CHECK";
    },

    //admin유무
    isAdmin(state) {
      state.isAdmin = "ADMIN";
    },

    //로그인검증성공시 사용자정보
    verifiedInfo(state, { verifiedInfo, isAdmin }) {
      state.verifiedInfo = verifiedInfo;
      state.isAdmin = isAdmin;
    },
  },

  actions: {
    getMemberInfo({ commit }) {
      //페이지 새로고침시 토큰 유효성 확인
      axios
        .post(`/api/members/logincheck`)
        .then((res) => {
          commit("login");
          commit("verifiedInfo", {
            verifiedInfo: res.data,
            isAdmin: res.data.roles[0],
          });
        })
        .catch((err) => {
          console.log(err);
          commit("logout");
        });
    },
  },

  modules: {},
});
