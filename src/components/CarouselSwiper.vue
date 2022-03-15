<template>
  <swiper class="mySwiper" :pagination="pagination"
    :autoplay="{'delay': 2500, 'disableOnInteraction': false}">
    <swiper-slide v-for="item in swiperData" :key="item.ScenicSpotID">
      <a class="d-block position-relactive rounded-24px overflow-hidden" href="#"
        @click.prevent="pushToPage(item.ScenicSpotID)">
        <div class="ratio ratio-16x9 ratio-lg-11x4">
          <img :src="item.Picture.PictureUrl1"
            class="d-block object-cover w-100"
            :alt="item.Picture.PictureDescription1" @error="replaceErrorImg"/>
        </div>
        <h3 class="filter-blur fs-5 fs-lg-3 position-absolute top-50 start-50
          translate-middle text-white text-center">
          {{ item.City }} | {{ item.ScenicSpotName }}
        </h3>
      </a>
    </swiper-slide>
    <div class="swiper-pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay, Pagination } from 'swiper/core';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Autoplay, Pagination]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ['swiperData'],
  data() {
    return {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletClass: 'swiper-my-bullet',
        bulletActiveClass: 'swiper-my-bullet-active',
      },
    };
  },
  methods: {
    replaceErrorImg(e) {
      e.target.src = require('@/assets/images/NoImage-1100x400.png');
    },
    pushToPage(id) {
      this.$router.push(`/scenicSpot/${id}`);
    },
  },

};
</script>
