<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <section class="pt-0.5 pt-lg-5 mb-2.25 mb-lg-3.5">
      <div class="row">
        <div class="col-lg-6 offset-lg-1 mb-2.25 mb-lg-0">
          <h2 class="fs-3 fs-lg-2 lh-base fw-light text-dark text-center
            text-lg-start ls-1 mb-1">探索
            <span class="border-bottom border-3 border-secondary">台灣之美</span><br/>
            讓我們更親近這片土地
          </h2>
          <p class="d-flex justify-content-center justify-content-lg-start align-items-center
              fs-8 fs-lg-6 text-light-3 text-center ls-1 mb-0">
            <i class="material-icons text-secondary fs-4"> place </i>
            台灣旅遊景點導覽<span class="ms-0.25">Taiwan Travel Guide</span>
          </p>
        </div>
        <div class="col-lg-4">
          <select class="form-select text-primary mb-0.5" v-model="searchData.page">
            <option value="ScenicSpot">探索景點</option>
            <option value="Activity">節慶活動</option>
            <option value="Restaurant">品嚐美食</option>
          </select>
          <input type="text" class="form-control bg-light text-light-2 mb-0.5"
            placeholder="你想去哪裡？請輸入關鍵字" v-model="searchData.keyword"
          />
          <button type="button" class="btn btn-primary text-white w-100" @click="passSearchData">
            <i class="bi bi-search me-1"></i>搜 尋
          </button>
        </div>
      </div>
    </section>
    <CarouselSwiper class="mb-2.5 mb-lg-3.5" :swiperData="carouselSwiperData"></CarouselSwiper>
    <!-- 近期活動 -->
    <section class="mb-2.5 mb-lg-3.5">
      <div class="d-flex justify-content-between align-items-center mb-1.5">
        <h3 class="fs-4 fs-lg-2 text-dark fw-light">近期活動</h3>
        <a class="hvr-forward d-block text-secondary-2 d-flex" href="#/activity">
          查看更多活動<i class="material-icons-outlined"> chevron_right </i>
        </a>
      </div>
      <div class="row gy-1">
        <div class="col-lg-6" v-for="item in activityData" :key="item.ActivityID">
          <RecentActivityCard :cardData="item"></RecentActivityCard>
        </div>
      </div>
    </section>
    <!-- 熱門打卡景點 -->
    <section class="mb-2.5 mb-lg-3.5">
      <div class="d-flex justify-content-between align-items-center mb-1.5">
        <h3 class="fs-4 fs-lg-2 text-dark fw-light">熱門打卡景點</h3>
        <a class="hvr-forward d-block text-secondary-2 d-flex" href="#/scenicspot">
          查看更多景點<i class="material-icons-outlined"> chevron_right </i>
        </a>
      </div>
      <HotSpotSwiper :swiperData="popularSpotSwiperData"></HotSpotSwiper>
    </section>
    <!-- 一再回訪美食 -->
    <section class="mb-4.5 mb-lg-7.5">
      <div class="d-flex justify-content-between align-items-center mb-1.5">
        <h3 class="fs-4 fs-lg-2 text-dark fw-light">一再回訪美食</h3>
        <a class="hvr-forward d-block text-secondary-2 d-flex" href="#/restaurant">
          查看更多美食<i class="material-icons-outlined"> chevron_right </i>
        </a>
      </div>
      <RestaurantSwiper :swiperData="restaurantSwiperData"></RestaurantSwiper>
    </section>
  </div>
</template>

<script>
import CarouselSwiper from '@/components/CarouselSwiper.vue';
import RecentActivityCard from '@/components/RecentActivityCard.vue';
import HotSpotSwiper from '@/components/HotSpotSwiper.vue';
import RestaurantSwiper from '@/components/RestaurantSwiper.vue';

import getRandomScenicByCity from '@/methods/scenicSpotRequestByCity';
import getRandomActivityByCity from '@/methods/activityRequestByCity';
import getRandomRestaurantByCity from '@/methods/restaurantRequestByCity';
import getRepeatApi from '@/methods/getRepeatApi';

export default {
  name: 'Home',
  components: {
    CarouselSwiper,
    RecentActivityCard,
    HotSpotSwiper,
    RestaurantSwiper,
  },
  data() {
    return {
      isLoading: false,
      carouselSwiperData: '',
      activityData: '',
      popularSpotSwiperData: '',
      restaurantSwiperData: '',
      searchData: {
        page: 'ScenicSpot',
        keyword: '',
      },
    };
  },
  methods: {
    getAllApi() {
      this.isLoading = true;
      Promise.all([
        getRepeatApi(getRandomScenicByCity, 5),
        getRepeatApi(getRandomActivityByCity, 4),
        getRepeatApi(getRandomScenicByCity, 4),
        getRepeatApi(getRandomRestaurantByCity, 4),
      ]).then((res) => {
        this.isLoading = false;
        [
          this.carouselSwiperData,
          this.activityData,
          this.popularSpotSwiperData,
          this.restaurantSwiperData,
        ] = res;
      });
    },
    passSearchData() {
      const indexSearch = this.searchData;
      this.$router.push({
        name: indexSearch.page,
        params: { indexSearch: JSON.stringify(indexSearch) },
      });
    },
  },
  mounted() {
    this.getAllApi();
  },
};
</script>
