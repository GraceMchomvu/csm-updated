<template>
  <section class="causes-three">
    <div class="container">
      <div class="causes-three__top">
        <div class="causes-three__top-title">
          <div class="section-title text-left">
            <span class="section-title__tagline">Latest Causes</span>
            <h2 class="section-title__title">
              Find the popular cause <br />
              and donate them
            </h2>
          </div>
        </div>
        <div class="causes-three__top-btn-box">
          <a href="#" class="causes-three__top-btn thm-btn"
            ><i class="fas fa-arrow-circle-right"></i>View More</a
          >
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="causes-three__carousel">
            <client-only>
              <vue-tiny-slider v-bind="tinySliderOptions">
                <div class="item" v-for="item in causes" :key="item.index">
                  <CausesCard
                    :title="item.title"
                    :amount="item.amount"
                    :category="item.category"
                    :thumbnail="item.thumbnail"
                    :excerpt="item.excerpt"
                    :url="item.url"
                  />
                </div>
                <!-- /.item -->
              </vue-tiny-slider>
            </client-only>
          </div>
          <!-- /.causes-one__carousel -->
        </div>
        <!-- /.col-xl-12 -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->
  </section>
  <!-- /.causes-one causes-page -->
</template>
<script>
import CausesCard from "~/components/CausesCard";
import data from "~/data/data.json";
export default {
  components: {
    CausesCard,
  },
  data() {
    return {
      causes: data.causes,
      tinySliderOptions: {
        loop: true,
        items: 1,
        gutter: 30,
        mouseDrag: true,
        autoplay: true,
        nav: true,
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
            items: 1,
          },
          600: {
            items: 1,
          },
          800: {
            items: 2,
          },
          1024: {
            items: 3,
          },
          1200: {
            items: 4,
          },
        },
      },
    };
  },
};
</script>
