<template>
  <!--Testimonial One Start-->
  <section :class="`testimonial-two ${className}`">
    <div class="container">
      <SectionTitle
        title="What they’re talking <br> about charity"
        subTitle="Our Testimonials"
      />
      <div class="row">
        <div
          v-for="item in testimonials"
          class="col-xl-4 col-lg-4"
          :key="item.index"
        >
          <TestimonialsCard
            className="testimonial-two__single"
            :thumbnail="item.thumbnail"
            :title="item.title"
            :designation="item.designation"
            :excerpt="item.excerpt"
            :social="item.social"
          />
        </div>
      </div>
    </div>
  </section>
  <!--Testimonial One End-->
</template>
<script>
import SectionTitle from "~/components/SectionTitle";
import TestimonialsCard from "~/components/TestimonialsCard";
import data from "~/data/data.json";
export default {
  components: {
    SectionTitle,
    TestimonialsCard,
  },
  props: {
    className: {
      type: String,
    },
  },
  data() {
    return {
      testimonials: data.testimonials,
      tinySliderOptions: {
        loop: true,
        items: 1,
        mouseDrag: true,
        autoplay: true,
        nav: false,
        controlsPosition: "bottom",
        controlsText: [
          "<i class='icon-right-arrow left'></i>",
          "<i class='icon-right-arrow'></i>",
        ],
        autoplayButtonOutput: false,
        responsive: {
          0: {
            gutter: 30,
            items: 1,
          },
          768: {
            gutter: 30,
            items: 2,
          },
          992: {
            gutter: 30,
            items: 2,
          },
        },
      },
    };
  },
};
</script>
