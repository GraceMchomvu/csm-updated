<template>
  <!--Causes Page Single-->
  <div class="causes-one__single">
    <div class="causes-one__img">
      <div class="causes-one__img-box">
        <img :src="require(`~/assets/images${thumbnail}`)" :alt="title" />
        <nuxt-link :to="url">
          <i class="fa fa-plus"></i>
        </nuxt-link>
      </div>
      <div class="causes-one__category">
        <span>{{ category }}</span>
      </div>
    </div>
    <div class="causes-one__content">
      <h3 class="causes-one__title">
        <nuxt-link :to="url" v-html="title"></nuxt-link>
      </h3>
      <p class="causes-one__text" v-html="excerpt"></p>
    </div>
    <div class="causes-one__progress">
      <div class="bar">
        <div
          v-observe-visibility="onVisibilityChange"
          class="bar-inner count-bar counted"
          :data-percent="`${getAmountPercent(amount.goal, amount.raised)}%`"
          :style="`${
            startBar
              ? `width: ${getAmountPercent(amount.goal, amount.raised)}%`
              : ``
          }`"
        >
          <div
            class="count-text"
            v-observe-visibility="onVisibilityCountChange"
          >
            <countTo
              :startVal="0"
              :endVal="
                startCounter ? getAmountPercent(amount.goal, amount.raised) : 0
              "
              :duration="3000"
            ></countTo
            >%
          </div>
        </div>
      </div>
      <div class="causes-one__goals">
        <p>
          <span>${{ amount.raised }}</span> Raised
        </p>
        <p>
          <span>${{ amount.goal }}</span> Goal
        </p>
      </div>
    </div>
  </div>
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
      startBar: false,
      startCounter: false,
    };
  },
  props: {
    title: {
      type: String,
    },
    amount: {
      type: Object,
    },
    category: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    excerpt: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  methods: {
    getAmountPercent: function (goal, raised) {
      return parseInt((parseInt(raised, 10) / parseInt(goal, 10)) * 100, 10);
    },
    onVisibilityChange(isVisible) {
      if (isVisible) {
        this.startBar = true;
      }
    },
    onVisibilityCountChange(isVisible) {
      if (isVisible) {
        this.startCounter = true;
      }
    },
  },
};
</script>
