<template>
  <router-view />
</template>

<script>
// import { onMounted } from "vue";
// import axios from "axios";
// import { useStore } from "vuex";
export default {
  components: {},
  setup() {
    // const store = useStore();

    // const logincheck = async () => {
    //   await axios
    //     .post(`/api/members/logincheck`)
    //     .then((res) => {
    //       console.log(res);
    //       store.commit("login");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       store.commit("logout");
    //     });
    // };

    // onMounted(() => {
    //   logincheck();
    // });
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
