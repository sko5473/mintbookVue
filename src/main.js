import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Cookies from "js-cookie";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import initializeFacebookSDK from "@/js/Facebookinit"
// import axios from 'axios';
// import VueAxios from 'vue-axios';

const app = createApp({
  extends: App,
  beforeCreate() {
    this.$store.dispatch("getMemberInfo");
  },
});

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8088', // 원하는 기본 URL로 설정
//   headers: {
//     'Content-Type': 'application/json',
//     // 토큰을 헤더에 추가하는 예시
//     'Authorization': `Bearer ${res.authResponse.accessToken}`
//   }
// });

app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(Cookies);
// app.use.use(VueAxios, axios);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");

initializeFacebookSDK();
