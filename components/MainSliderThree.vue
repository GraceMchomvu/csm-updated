<template>
  <section class="main-slider main-slider-three">
    <swiper ref="mySwiperThree" :options="swiperOptions">
      <swiper-slide v-for="item in sliderThree" :key="item.index">
        <div
          class="image-layer"
          :style="`
                background-image: url(${require(`~/assets/images${item.image}`)});
              `"
        ></div>
        <div class="image-layer-overlay"></div>
        <!-- /.image-layer -->
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="main-slider__content">
                <p v-html="item.subtitle" />
                <h2 v-html="item.title" />
                <nuxt-link :to="item.buttonUrl" class="thm-btn">
                  <i class="fas fa-arrow-circle-right"></i>
                  {{ item.buttonLabel }}
                </nuxt-link>
                <div class="main-slider-three-shape">
                  <img src="~images/shapes/main-slider-3-shape-1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <!-- If we need navigation buttons -->
    <div class="swiper-pagination" id="main-slider-pagination"></div>
    <div class="main-slider__nav">
      <div class="swiper-button-prev" id="main-slider__swiper-button-next">
        <i class="icon-right-arrow icon-left-arrow"></i>
      </div>
      <div class="swiper-button-next" id="main-slider__swiper-button-prev">
        <i class="icon-right-arrow"></i>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import data from "~/data/data.json";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
  data() {
    return {
      sliderThree: data.sliderThree,
      sliderOneCounter: data.sliderOneCounter,
      swiperOptions: {
        slidesPerView: 1,
        loop: true,
        speed: 1000,
        effect: "fade",
        pagination: {
          el: "#main-slider-pagination",
          type: "bullets",
          clickable: true,
        },
        navigation: {
          nextEl: "#main-slider__swiper-button-next",
          prevEl: "#main-slider__swiper-button-prev",
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      },
    };
  },
};
</script>
