<template>
  <Loading :active="isLoading"></Loading>
  <div class="container pt-3.75 pb-7.5">
    <nav aria-label="breadcrumb mb-2.5">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li v-if="!isSearch" class="breadcrumb-item active">品嚐美食</li>
        <template v-else>
          <li class="breadcrumb-item">
            <router-link to="/restaurant" @click="reload">品嚐美食</router-link>
          </li>
          <li class="breadcrumb-item active">
            {{ tempCategory }}
          </li>
        </template>
      </ol>
    </nav>
    <form class="mb-3.75">
      <div class="row">
        <div class="col-lg-3">
          <select class="form-select text-primary mb-0.5" v-model="searchData.city">
            <option value="" selected>全部縣市</option>
            <option :value="item.en" v-for="item in $filters.allCity " :key="item.en">
              {{ item.tw }}
            </option>
          </select>
        </div>
        <div class="col-lg-3">
          <select class="form-select text-primary mb-0.5" v-model="searchData.category">
            <option value="" selected>全部主題</option>
            <option :value="item.name" v-for="item in categories" :key="item.name">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="col-lg-3">
          <input type="text" class="form-control bg-light text-light-2 mb-0.5"
            placeholder="你想去哪裡？請輸入關鍵字" v-model="searchData.keyword"/>
        </div>
        <div class="col-lg-3">
          <button type="button" class="btn btn-primary text-white w-100" @click="getSearch">
            <i class="bi bi-search me-1"></i>搜 尋
          </button>
        </div>
      </div>
    </form>
    <section v-if="!isSearch">
      <h2 class="fs-4 fs-lg-2 text-dark fw-light ls-1 mb-0.5 mb-lg-0.75">熱門主題</h2>
      <div class="row gy-0.75">
        <div class="col-6 col-lg-3" v-for="(item) in categories" :key="item.name">
          <a class="hvr-category position-relative d-block" href="#"
            @click.prevent="getRestaurantData(item.name)">
              <img :src="item.imgUrl" alt="item.name" class="w-100 object-cover"/>
            <h3 class="fs-4 fw-bold text-white white-space-nowrap position-absolute
              top-50 start-50 translate-middle">
              {{ item.name }}
            </h3>
          </a>
        </div>
      </div>
    </section>
    <section v-else>
      <h2 class="fs-4 fs-lg-2 text-dark fw-light ls-1 mb-0.5 mb-lg-0.75">搜尋結果
        <span class="fs-8 fs-lg-6 ms-0.5">共有 <span class="text-secondary">
          {{ tempData.length }}</span> 筆
        </span>
      </h2>
      <template v-if="tempData.length > 0">
        <div class="row gy-1.25 gy-lg-2.25 mb-5 mb-lg-6.25">
          <div class="col-lg-3" v-for="item in pagination.current_page_data"
            :key="item.RestaurantID">
            <RestaurantCard :cardData="item"></RestaurantCard>
          </div>
        </div>
        <Pagination :pages="pagination" @emit-update="updatePage"></Pagination>
      </template>
      <div class="d-flex flex-column align-items-center mt-5" v-else>
          <img src="@/assets/images/nofound80.png" alt="nofoundresult" class="mb-1">
          <h3 class="fs-5 text-primary text-center">目前查無資料<br>請重新搜尋</h3>
      </div>
    </section>
  </div>
</template>

<script>
import RestaurantCard from '@/components/RestaurantCard.vue';
import Pagination from '@/components/Pagination.vue';
import paginationMixin from '@/mixins/paginationMixin';

export default {

  inject: ['reload'],
  mixins: [paginationMixin],
  components: {
    RestaurantCard,
    Pagination,
  },
  data() {
    return {
      isLoading: false,
      isSearch: false,
      searchData: {
        city: '',
        category: '',
        keyword: '',
      },
      tempCategory: '',
      tempData: [],
      categories: [
        {
          name: '地方特產',
          imgUrl: require('@/assets/images/Theme-bg3-1.png'),
        },
        {
          name: '中式美食',
          imgUrl: require('@/assets/images/Theme-bg3-2.png'),
        },
        {
          name: '甜點冰品',
          imgUrl: require('@/assets/images/Theme-bg3-3.png'),
        },
        {
          name: '異國料理',
          imgUrl: require('@/assets/images/Theme-bg3-4.png'),
        },
        {
          name: '伴手禮',
          imgUrl: require('@/assets/images/Theme-bg3-5.png'),
        },
        {
          name: '素食',
          imgUrl: require('@/assets/images/Theme-bg3-6.png'),
        },
      ],
    };
  },
  methods: {
    getRestaurantData(category, keyword = '') {
      this.isLoading = true;
      this.tempCategory = category;
      let api = `${process.env.VUE_APP_BASEAPI}/Restaurant?%24filter=contains(Class%2C%20'${category}')%20and%20contains(RestaurantName%2C%20'${keyword}')&%24format=JSON`;
      if (!category) {
        api = `${process.env.VUE_APP_BASEAPI}/Restaurant?%24filter=(contains(Class%2C%20'地方特產')%20or%20contains(Class%2C%20'中式美食')%20or%20contains(Class%2C%20'甜點冰品')%20or%20contains(Class%2C%20'異國料理')%20or%20contains(Class%2C%20'伴手禮')%20or%20contains(Class%2C%20'素食'))%20and%20contains(RestaurantName%2C%20'${keyword}')&%24format=JSON`;
        this.tempCategory = '自訂搜尋結果';
      }
      this.axios
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.tempData = res.data;
          this.isSearch = true;
          this.getPage();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRestaurantByCity(city, category, keyword = '') {
      this.isLoading = true;
      this.tempCategory = category;
      let api = `${process.env.VUE_APP_BASEAPI}/Restaurant/${city}?%24filter=contains(Class%2C%20'${category}')%20and%20contains(RestaurantName%2C%20'${keyword}')&%24format=JSON`;
      if (!category) {
        api = `${process.env.VUE_APP_BASEAPI}/Restaurant/${city}?%24filter=(contains(Class%2C%20'地方特產')%20or%20contains(Class%2C%20'中式美食')%20or%20contains(Class%2C%20'甜點冰品')%20or%20contains(Class%2C%20'異國料理')%20or%20contains(Class%2C%20'伴手禮')%20or%20contains(Class%2C%20'素食'))%20and%20contains(RestaurantName%2C%20'${keyword}')&%24format=JSON`;
        this.tempCategory = '自訂搜尋結果';
      }
      this.axios
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.tempData = res.data;
          this.isSearch = true;
          this.getPage();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSearch() {
      const search = { ...this.searchData };
      if (!search.city) {
        this.getRestaurantData(search.category, search.keyword);
      } else {
        this.getRestaurantByCity(search.city, search.category, search.keyword);
      }
      this.searchData = {
        city: '',
        category: '',
        keyword: '',
      };
    },
  },

};
</script>
