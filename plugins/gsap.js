import Vue from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

Vue.prototype.$gsap = gsap;
Vue.prototype.$ScrollTrigger = ScrollTrigger;

export default ({ app }, inject) => {
  inject("gsap", gsap);
  inject("ScrollTrigger", ScrollTrigger);
};
