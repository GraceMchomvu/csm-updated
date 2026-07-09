<template>
  <!--Why Choose Start-->
  <section class="why-choose">
    <div
      class="why-choose-bg"
      :style="`background-image: url(${require(`~/assets/images/backgrounds/why-choose-bg.jpg`)})`"
    ></div>
    <div class="container">
      <div class="row">
        <div class="col-xl-8">
          <div class="why-choose__left">
            <div class="section-title text-left">
              <span class="section-title__tagline">Get Daily Updates</span>
              <h2 class="section-title__title">
                Why you should choose our <br />
                charity foundation
              </h2>
            </div>
            <div class="why-choose__left-bottom">
              <div class="why-choose__left-text-box">
                <p class="why-choose__left-text">
                  There are many variations of passages of but the majority have
                  suffered alteration in some form by injected humour or which
                  don't look even slightly believe.
                </p>
                <h2 class="why-choose__left-signature">Mike Hardson</h2>
              </div>
              <div class="why-choose__left-list-box">
                <ul class="why-choose__left-list list-unstyled">
                  <li>
                    <div class="icon">
                      <i class="fas fa-arrow-circle-right"></i>
                    </div>
                    <div class="text">
                      <h5>Making this first true generator</h5>
                    </div>
                  </li>
                  <li>
                    <div class="icon">
                      <i class="fas fa-arrow-circle-right"></i>
                    </div>
                    <div class="text">
                      <h5>Many desktop publish packages</h5>
                    </div>
                  </li>
                  <li>
                    <div class="icon">
                      <i class="fas fa-arrow-circle-right"></i>
                    </div>
                    <div class="text">
                      <h5>Lorem Ipsum is not simply</h5>
                    </div>
                  </li>
                  <li>
                    <div class="icon">
                      <i class="fas fa-arrow-circle-right"></i>
                    </div>
                    <div class="text">
                      <h5>If you are going to passage</h5>
                    </div>
                  </li>
                  <li>
                    <div class="icon">
                      <i class="fas fa-arrow-circle-right"></i>
                    </div>
                    <div class="text">
                      <h5>It has roots in a piece</h5>
                    </div>
                  </li>
                  <li>
                    <div class="icon">
                      <i class="fas fa-arrow-circle-right"></i>
                    </div>
                    <div class="text">
                      <h5>The point of using</h5>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4">
          <div class="why-choose__right">
            <div class="why-choose__urgent">
              <h3 class="why-choose__urgent-title">
                Raise Fund for Save Animals
              </h3>
              <p class="why-choose__urgent-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do
                eiusmod tempor incididunt.
              </p>
              <div class="why-choose__progress">
                <div class="bar">
                  <div
                    v-observe-visibility="onVisibilityChange"
                    class="bar-inner count-bar counted"
                    :data-percent="`${getAmountPercent(30000, 25270)}%`"
                    :style="`${
                      startBar
                        ? `width: ${getAmountPercent(30000, 25270)}%`
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
                          startCounter ? getAmountPercent(30000, 25270) : 0
                        "
                        :duration="3000"
                      ></countTo
                      >%
                    </div>
                  </div>
                </div>
                <div class="why-choose__goals">
                  <p><span>$25,270</span> Raised</p>
                  <p><span>$30,000</span> Goal</p>
                </div>
              </div>
              <a href="#" class="why-choose__right-btn"
                ><i class="fa fa-heart"></i>Donate</a
              >
              <div class="why-choose__right-category">
                <span>Medical</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--Why Choose End-->
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
