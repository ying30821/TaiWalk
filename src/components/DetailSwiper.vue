<template>
  <swiper class="mySwiper" :pagination="pagination">
    <swiper-slide v-for="item in swiperData" :key="item.id">
      <div class="ratio ratio-16x9 ratio-lg-11x4">
        <img :src="item.url" :alt="item.alt" @error="replaceErrorImg"
          class="d-block object-cover w-100 rounded-24px"/>
      </div>
    </swiper-slide>
    <div class="swiper-pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Pagination } from 'swiper/core';
// import 'swiper/swiper.min.css';
// import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use(Pagination);

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
  },
};
</script>
