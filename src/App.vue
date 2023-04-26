<template>
  <header-page />
  <router-view />
  <footer-page />
</template>
<script>
import { onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import HeaderPage from "@/components/HeaderPage.vue";
import FooterPage from "@/components/FooterPage.vue";

export default {
  components: {
    HeaderPage: HeaderPage,
    FooterPage: FooterPage,
  },
  setup() {
    const store = useStore();

    //로그인 검증로직
    const logincheck = async () => {
      await axios
        .post(`/api/members/logincheck`)
        .then((res) => {
          console.log(res);
          store.commit("login");
          store.commit("verifiedInfo", res.data);
        })
        .catch((err) => {
          console.log(err);
          store.commit("logout");
        });
    };

    onMounted(() => {
      logincheck();
    });
    return {};
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}
button {
  cursor: pointer;
}
</style>
