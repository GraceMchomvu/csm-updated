<template>
  <section class="three-boxes">
    <div class="container-box">
      <div class="row">
        <div class="col-xl-4" v-for="(feature, index) in features" :key="index">
          <div :class="`three-boxes__single three-boxes__single-item-${index}`">
            <div
              class="three-boxes__single-bg"
              :style="`background-image: url(${require(`~/assets/images/resources/three-boxes-img-1.jpg`)})`"
            ></div>
            <div class="three-boxes__content">
              <div class="three-boxes__icon">
                <span :class="feature.icon"></span>
              </div>
              <div class="three-boxes__text-box">
                <h2>{{ feature.title }}</h2>
                <p class="three-boxes__text">{{ feature.text }}</p>
                <nuxt-link :to="feature.url" class="three-boxes__btn"
                  ><i class="fas fa-arrow-circle-right"></i>
                  {{ $t("common.joinUs") }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import data from "~/data/data.json";
export default {
  computed: {
    features() {
      const items = this.$t("home.features");
      if (!Array.isArray(items)) return data.features;
      return data.features.map((item, index) => ({
        ...item,
        title: items[index] ? items[index].title : item.title,
        text: items[index] ? items[index].text : item.text,
      }));
    },
  },
};
</script>
