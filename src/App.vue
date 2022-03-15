<template>
<div class="wrapper">
  <Navbar class="header"></Navbar>
  <main class="main">
    <router-view v-if="isRouterAlive" :key="key"/>
  </main>
  <footer class="footer bg-primary-darken fs-8 text-white text-center p-1.25">
    Copyright © 2021 TaiWalk. All rights reserved.
    <span class="ms-0.5">Design : Breakfast , Front Developed : lumei.</span>
  </footer>
</div>
</template>

<style lang="scss">
@import './assets/style/all';

.main {
  min-height: calc(100vh - 129px) ;
  @include media-breakpoint-up(lg) {
    min-height: calc(100vh - 152px) ;
  }
}
</style>

<script>
import Navbar from './components/Navbar.vue';
import getAuthorizationHeader from './methods/getApiToken';

export default {
  computed: {
    key() {
      return this.$route.path + Date.now();
    },
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      height: 0,
    };
  },
  methods: {
    reload() {
      console.log('reload');
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
  components: {
    Navbar,
  },
  mounted() {
    this.axios.defaults.headers = getAuthorizationHeader();
  },
};
</script>
