<template>
  <!--Brand One Start-->
  <section :class="`brand-one ${className}`">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="brand-one__carousel">
            <client-only>
              <vue-tiny-slider v-bind="tinySliderOptions">
                <!--Brand One Single-->
                <div
                  v-for="item in sponsors"
                  :key="item.index"
                  class="brand-one__single"
                >
                  <div class="brand-one__img">
                    <img
                      :src="require(`~/assets/images${item.thumbnail}`)"
                      alt=""
                    />
                  </div>
                </div>
              </vue-tiny-slider>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--Brand One End-->
</template>
<script>
import data from "~/data/data.json";
export default {
  props: {
    className: {
      type: String,
    },
  },

  data() {
    return {
      sponsors: data.sponsors,
      tinySliderOptions: {
        loop: true,
        items: 1,
        gutter: 0,
        mouseDrag: true,
        autoplay: true,
        nav: false,
        controls: false,
        autoplayButtonOutput: false,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 2,
          },
          800: {
            items: 3,
          },
          1024: {
            items: 4,
          },
          1200: {
            items: 5,
          },
        },
      },
    };
  },
};
</script>
