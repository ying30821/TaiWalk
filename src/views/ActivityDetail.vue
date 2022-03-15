<template>
  <Loading :active="isLoading"></Loading>
  <div class="container pt-3.75 pb-7.5">
    <nav aria-label="breadcrumb mb-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">首頁</a></li>
        <li class="breadcrumb-item"><a href="#/activity">節慶活動</a></li>
        <li class="breadcrumb-item active">{{ activityData.ActivityName }}</li>
      </ol>
    </nav>
    <section class="mb-3.75">
      <DetailSwiper :swiperData="activityImg" class="mb-1.875"></DetailSwiper>
      <h2 class="fs-4 fs-lg-2 fw-light mb-1">{{ activityData.ActivityName }}</h2>
      <div class="mb-2">
        <span class="badge rounded-pill text-secondary fw-normal border border-secondary me-0.5"
          v-show="activityData.Class1">
          #{{ activityData.Class1 }}
        </span>
        <span class="badge rounded-pill text-secondary fw-normal border border-secondary"
          v-show="activityData.Class2">
          #{{ activityData.Class2 }}
        </span>
      </div>
      <h3 class="fs-6 fs-lg-5 text-dark-2 fw-bold mb-1">活動介紹：</h3>
      <p class="fs-7 fs-lg-6 mb-3.75">{{ activityData.Description }}</p>
      <div class="row gy-1 gy-lg-0">
        <div class="col-lg-6">
          <ul class="d-grid list-unstyled bg-light rounded-12px fs-7 fs-lg-6 gap-0.75 p-1.875 mb-0">
            <li v-show="activityData.OpenTime">
              <span class="fs-6 fs-lg-5 fw-bold text-dark-2">開放時間：</span>{{ activityData.OpenTime }}
            </li>
            <li v-show="activityData.Phone">
              <span class="fs-6 fs-lg-5 fw-bold text-dark-2">聯絡電話：</span>
              <a :href="{tel:+activityData.Phone}">{{ activityData.Phone }}</a>
            </li>
            <li v-show="activityData.Organizer">
              <span class="fs-6 fs-lg-5 fw-bold text-dark-2">主辦單位：</span>
              {{ activityData.Organizer }}
            </li>
            <li v-show="activityData.Address">
              <span class="fs-6 fs-lg-5 fw-bold text-dark-2">活動地點：</span>{{ activityData.Address }}
            </li>
            <li v-show="activityData.WebsiteUrl">
              <span class="fs-6 fs-lg-5 fw-bold text-dark-2">官方網站：</span>
              <a :href="activityData.WebsiteUrl">{{ activityData.WebsiteUrl }}</a>
            </li>
            <li v-show="activityData.Charge">
              <span class="fs-6 fs-lg-5 fw-bold text-dark-2">活動費用：</span>{{ activityData.Charge }}
            </li>
            <li v-show="activityData.Remarks">
              <span class="fs-6 fs-lg-5 fw-bold text-dark-2">注意事項：</span>{{ activityData.Remarks }}
            </li>
          </ul>
        </div>
        <div class="col-lg-6">
          <div id="map" class="w-100 rounded-12px mb-2"></div>
          <h3 class="fs-5 text-dark-2 fw-bold mb-1.25">周邊資訊：</h3>
          <div class="row gy-0.5 gy-lg-0">
            <div class="col-lg-4">
              <div class="d-flex flex-column justify-content-center align-items-center
              border border-primary-lighten rounded-12px px-1 py-1.5">
              <img src="@/assets/images/nearby-scene30.png" class="mb-0.5" alt="附近景點">
              <p class="text-primary fw-bold ls-1">附近景點</p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="d-flex flex-column justify-content-center align-items-center
              border border-primary-lighten rounded-12px px-1 py-1.5">
              <img src="@/assets/images/nearby-event30.png" class="mb-0.5" alt="附近活動">
              <p class="text-primary fw-bold ls-1">附近活動</p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="d-flex flex-column justify-content-center align-items-center
              border border-primary-lighten rounded-12px px-1 py-1.5">
              <img src="@/assets/images/nearby-food30.png" class="mb-0.5" alt="附近美食">
              <p class="text-primary fw-bold ls-1">附近美食</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="d-flex justify-content-between align-items-center mb-0.75">
        <h2 class="fs-4 fs-lg-2 text-dark fw-light mb-0.5 mb-lg-0.75">還有這些不能錯過的景點</h2>
        <a class="hvr-forward d-block text-secondary-2 d-flex" href="#/scenicSpot">
          查看更多景點<i class="material-icons-outlined"> chevron_right </i>
        </a>
      </div>
      <ActivitySwiper :swiperData="recommendActivity"></ActivitySwiper>
    </section>
  </div>
</template>

<style lang="scss">
  #map { height: 250px; }
</style>

<script>
import DetailSwiper from '@/components/DetailSwiper.vue';
import ActivitySwiper from '@/components/ActivitySwiper.vue';

import getRandomActivityByCity from '@/methods/activityRequestByCity';
import getRepeatApi from '@/methods/getRepeatApi';
import repackDetailImg from '@/methods/repackDetailImg';
import setMapView from '@/methods/setMapView';

export default {
  components: {
    DetailSwiper,
    ActivitySwiper,
  },
  data() {
    return {
      id: '',
      activityData: '',
      activityImg: [],
      recommendActivity: [],
      map: {},
      isLoading: false,
    };
  },
  methods: {
    getActivity() {
      const api = `${process.env.VUE_APP_BASEAPI}/Activity?%24filter=contains(ActivityID%2C%20'${this.id}')&%24format=JSON`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          this.isLoading = false;
          [this.activityData] = res.data;
          this.activityImg = repackDetailImg(this.activityData);
          const lon = this.activityData.Position.PositionLon;
          const lat = this.activityData.Position.PositionLat;
          setMapView(this.map, lon, lat);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.id = this.$route.params.activityId;
    console.log('re');
  },
  mounted() {
    this.getActivity();
    this.isLoading = true;
    getRepeatApi(getRandomActivityByCity, 4).then((res) => {
      this.isLoading = false;
      this.recommendActivity = res;
    });
  },
};
</script>
