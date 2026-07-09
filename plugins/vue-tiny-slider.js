import Vue from "vue";
import vTinySlider from "vue-tiny-slider";
import "tiny-slider/dist/tiny-slider.css";
const VueTinySlider = {
  install(Vue, options) {
    Vue.component("VueTinySlider", vTinySlider);
  },
};
Vue.use(VueTinySlider);
