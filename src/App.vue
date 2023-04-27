<template>
  <header-page />
  <router-view />
  <footer-page />
</template>
<script>
import HeaderPage from "@/components/HeaderPage.vue";
import FooterPage from "@/components/FooterPage.vue";

export default {
  components: {
    HeaderPage: HeaderPage,
    FooterPage: FooterPage,
  },
  setup() {
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
