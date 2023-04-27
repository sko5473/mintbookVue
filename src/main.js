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

const app = createApp({
  extends: App,
  beforeCreate() {
    this.$store.dispatch("getMemberInfo");
  },
});
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(Cookies);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
