<template>
  <a class="shadow-style hvr-card card d-block bg-light rounded-12px overflow-hidden h-100" href="#"
    @click.prevent="pushToPage(cardData.ActivityID)">
    <div class="row g-0">
      <div class="col-4">
        <div class="ratio ratio-1x1">
          <img
            :src="cardData.Picture.PictureUrl1"
            :alt="cardData.Picture.PictureDescription1"
            class="object-cover w-100"
            @error="replceErrorImg"
          />
        </div>
      </div>
      <div class="col-8">
        <div class="card-body h-100">
          <p class="text-light-2 mb-0.25">
            {{ $filters.date(cardData.StartTime) }} -
            {{ $filters.date(cardData.EndTime) }}
          </p>
          <h4 class="ellipsis fs-6 fs-lg-5 text-dark-2 mb-1">
            {{ cardData.ActivityName }}
          </h4>
          <div
            class="d-flex justify-content-between align-items-center"
          >
            <p class="text-light-3 d-flex">
              <i class="material-icons-outlined fs-4"> place </i
              >{{ cardData.City }}
            </p>
            <router-link to="/" class="d-flex"
              >詳細介紹<i class="material-icons-outlined">
                chevron_right
              </i></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
    },
  },
  methods: {
    replaceErrorImg(e) {
      e.target.src = require('@/assets/images/NoImage-255x200.png');
    },
    pushToPage(id) {
      this.$router.push(`/activity/${id}`);
    },
  },
};
</script>
