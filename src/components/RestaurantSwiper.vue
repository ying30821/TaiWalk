<template>
  <swiper :slides-per-view="1.3" :space-between="30"
    :breakpoints="{
      768: {
        slidesPerView: 2.5,
      },
      992: {
        slidesPerView: 4,
      },
    }">
    <swiper-slide v-for="item in swiperData" :key="item.RestaurantID">
      <a class="hvr-card d-block" href="#" @click.prevent="pushToPage(item.RestaurantID)">
        <div class="shadow-style ratio ratio-4x3 rounded-20px mb-0.75">
          <img
            :src="item.Picture.PictureUrl1"
            class="object-cover"
            :alt="item.Picture.PictureDescription1"
            @error="replaceErrorImg"
          />
        </div>
        <h4 class="fs-6 fs-lg-5 text-dark-2 ls-1 mb-0.25">
          {{ item.RestaurantName }}
        </h4>
        <p class="text-light-3 d-flex">
          <i class="material-icons-outlined fs-4"> place </i>{{ item.City }}
        </p>
      </a>
    </swiper-slide>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';

export default {
  props: ['swiperData'],
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    replaceErrorImg(e) {
      e.target.src = require('@/assets/images/NoImage-255x200.png');
    },
    pushToPage(id) {
      this.$router.push(`/restaurant/${id}`);
    },
  },
};
</script>
