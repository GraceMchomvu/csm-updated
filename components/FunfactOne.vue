<template>
  <!--Counters One Start-->
  <section class="counters-one about-page-counter">
    <div class="container">
      <ul class="counters-one__box list-unstyled">
        <li class="counter-one__single">
          <h3 v-observe-visibility="onVisibilityCountChange">
            <countTo
              :startVal="0"
              :endVal="startCounter ? 870 : 0"
              :duration="3000"
            ></countTo>
          </h3>
          <span class="counter-one__letter">K</span>
          <p class="counter-one__text">Total Donations</p>
        </li>
        <li class="counter-one__single">
          <h3 v-observe-visibility="onVisibilityCountChange">
            <countTo
              :startVal="0"
              :endVal="startCounter ? 480 : 0"
              :duration="3000"
            ></countTo>
          </h3>
          <p class="counter-one__text">Campaigns Closed</p>
        </li>
        <li class="counter-one__single">
          <h3 v-observe-visibility="onVisibilityCountChange">
            <countTo
              :startVal="0"
              :endVal="startCounter ? 977 : 0"
              :duration="3000"
            ></countTo>
          </h3>
          <span class="counter-one__letter">K</span>
          <p class="counter-one__text">Happy People</p>
        </li>
        <li class="counter-one__single">
          <h3 v-observe-visibility="onVisibilityCountChange">
            <countTo
              :startVal="0"
              :endVal="startCounter ? 15 : 0"
              :duration="3000"
            ></countTo>
          </h3>
          <span class="counter-one__letter">+</span>
          <p class="counter-one__text">Years of Ministry</p>
        </li>
      </ul>
    </div>
  </section>
  <!--Counters One Start-->
</template>
<script>
import countTo from "vue-count-to";
import { ObserveVisibility } from "vue-observe-visibility";
export default {
  components: { countTo },
  directives: {
    ObserveVisibility,
  },
  data() {
    return {
      startCounter: false,
    };
  },
  methods: {
    onVisibilityCountChange(isVisible) {
      if (isVisible) {
        this.startCounter = true;
      }
    },
  },
};
</script>
