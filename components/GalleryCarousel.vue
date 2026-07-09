<template>
  <!--Gallery One Start-->
  <section :class="`gallery-one ${className}`">
    <div class="gallery-one__container-box clearfix">
      <div class="gallery-one__carousel">
        <client-only>
          <vue-tiny-slider v-bind="tinySliderOptions">
            <div class="item" v-for="(item, index) in gallery" :key="index">
              <GalleryCard
                :title="item.title"
                :thumbnail="item.thumbnail"
                :category="item.category"
              />
            </div>
          </vue-tiny-slider>
        </client-only>
      </div>
    </div>
  </section>
  <!--Gallery One End-->
</template>
<script>
import GalleryCard from "~/components/GalleryCard";
import data from "~/data/data.json";
export default {
  components: {
    GalleryCard,
  },
  props: {
    className: {
      type: String,
    },
  },
  computed: {
    gallery() {
      const items = this.$t("gallery.items");
      if (!Array.isArray(items)) return data.gallery;
      return data.gallery.map((item, index) => ({
        ...item,
        title: items[index] ? items[index].title : item.title,
        category: items[index] ? items[index].category : item.category,
      }));
    },
  },
  data() {
    return {
      tinySliderOptions: {
        loop: true,
        items: 1,
        mouseDrag: true,
        autoplay: true,
        nav: false,
        navPosition: "bottom",
        controls: false,
        controlsPosition: "bottom",
        controlsText: [
          "<i class='icon-right-arrow left'></i>",
          "<i class='icon-right-arrow'></i>",
        ],
        autoplayButtonOutput: false,
        responsive: {
          0: {
            gutter: 20,
            items: 1,
          },
          768: {
            gutter: 20,
            items: 2,
          },
          992: {
            gutter: 20,
            items: 3,
          },
          1200: {
            gutter: 20,
            items: 5,
          },
        },
      },
    };
  },
};
</script>
