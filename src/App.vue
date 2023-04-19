<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/login">login</router-link> |
  </nav>
  <header-view/>
  <router-view/>
  <footer-view/>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';

export default {
  components: {
    HeaderView,
    FooterView,
  },
  setup() {

    return {
    };
  }
}
</script>

<style>
*{ padding: 0; margin:0;}
li{ list-style: none; }
a{ text-decoration: none; color: inherit;}
button{cursor: pointer;}

</style>
