<template>
  <nav class="navbar bg-white sticky-top py-lg-1.5">
    <div class="container-fluid">
      <h1 class="mx-auto mb-0" ref="logo">
        <router-link to="/" @click="checkReload('/')" class="logo">台灣走走</router-link>
      </h1>
      <button type="button" class="btn d-lg-none p-0" @click="open">
        <img src="../assets/images/menu-mobile.svg" alt="menu-mobile" />
      </button>
      <!-- show in phone -->
      <div class="backdrop d-none" ref="nav">
        <div class="myNav">
          <div class="d-flex justify-content-between align-items-center">
            <router-link to="/" @click="checkReload('/')"
              class="logo d-block ms-1.25">台灣走走</router-link>
            <button type="button" class="btn" @click="close">
              <img src="../assets/images/menu-mobile-close.png"
                alt="menu-mobile-close"/>
            </button>
          </div>
          <ul class="list-unstyled m-0">
            <li class="list-border">
              <router-link to="/scenicSpot" @click="checkReload('/scenicSpot')"
                class="hvr-underline-from-left d-block text-light-3 fs-5
                  ls-1 text-center px-0.625 py-1.5">
                探索景點
              </router-link>
            </li>
            <li class="list-border">
              <router-link to="/activity" @click="checkReload('/activity')"
                class="hvr-underline-from-left d-block text-light-3
                fs-5 ls-1 text-center px-0.625 py-1.5">
                節慶活動
              </router-link>
            </li>
            <li class="list-border">
              <router-link to="/restaurant" @click="checkReload('/restaurant')"
                class="hvr-underline-from-left d-block text-light-3
                fs-5 ls-1 text-center px-0.625 py-1.5">
                品嚐美食
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- show in desktop -->
      <ul class="d-none d-lg-flex list-unstyled justify-content-end
        flex-grow-1 pe-3 m-0">
        <li>
          <router-link to="/scenicSpot" @click="checkReload('/scenicSpot')"
            class="hvr-underline-from-left d-block text-light-3
            fs-6 ls-1 text-center px-0.625 py-0.5">探索景點
          </router-link>
        </li>
        <li>
          <router-link to="/activity" @click="checkReload('/activity')"
            class="hvr-underline-from-left d-block text-light-3
            fs-6 ls-1 text-center px-0.625 py-0.5">節慶活動
          </router-link>
        </li>
        <li>
          <router-link to="/restaurant" @click="checkReload('/restaurant')"
            class="hvr-underline-from-left d-block text-light-3
            fs-6 ls-1 text-center px-0.625 py-0.5">品嚐美食
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "../assets/style/helpers/variables";
@import "~bootstrap/scss/mixins";

.logo {
  background-image: url(../assets/images/Logo-mobile.svg);
  width: 118px;
  height: 30px;
  display: block;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;

  @include media-breakpoint-up(lg) {
    background-image: url(../assets/images/Logo-desktop.svg);
    width: 241px;
    height: 32px;
  }
}
.backdrop {
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(4px);
  background-color: rgba($color: #000000, $alpha: 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
}
.myNav {
  background-color: #fff;
  width: 276px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1045;
  border-radius: 0 0 0 30px;
  padding: 8px 8px 32px 8px;
  margin-right: 16px;
}
.list-border {
  border-bottom: 1px solid #e5e5e5;
  &:last-child {
    border-bottom-width: 0;
  }
}
</style>

<script>
import 'bootstrap/dist/js/bootstrap.bundle';

export default {
  inject: ['reload'],
  data() {
    return {
      nav: '',
      logo: '',
    };
  },
  methods: {
    open() {
      this.nav.classList.remove('d-none');
      this.logo.classList.add('opacity-0');
    },
    close() {
      this.nav.classList.add('d-none');
      this.logo.classList.remove('opacity-0');
    },
    checkReload(myPath) {
      if (this.$route.fullPath.match(myPath)) {
        this.reload();
      }
    },
  },
  mounted() {
    this.nav = this.$refs.nav;
    this.logo = this.$refs.logo;
  },
};
</script>
