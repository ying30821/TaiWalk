<template>
  <a class="hvr-card d-block mb-0.625" href="#"
    @click.prevent="pushToPage(cardData.ScenicSpotID)">
    <div class="shadow-style ratio ratio-21x9 ratio-lg-4x3 rounded-20px mb-0.75">
    <img :src="imgUrl" class="object-cover"
      :alt="cardData.Picture.PictureDescription1"
      @error="replaceErrorImg"/>
    </div>
    <h4 class="ellipsis fs-6 fs-lg-5 text-dark-2 ls-1 mb-0.25">
      {{ cardData.ScenicSpotName }}
    </h4>
    <p class="text-light-3 d-flex">
    <i class="material-icons-outlined fs-4"> place </i>{{ city }}
    </p>
  </a>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
    },
  },
  computed: {
    imgUrl() {
      return (
        this.cardData.Picture.PictureUrl1 || require('@/assets/images/NoImage-255x200.png')
      );
    },
    city() {
      const sliceAddress = (this.cardData.Address) ? this.cardData.Address.slice(0, 3) : '無資料';
      return (
        this.cardData.City || sliceAddress
      );
    },
  },
  methods: {
    replaceErrorImg(e) {
      e.target.src = require('@/assets/images/NoImage-255x200.png');
    },
    pushToPage(id) {
      this.$router.push(`/scenicSpot/${id}`);
    },
  },
};
</script>
