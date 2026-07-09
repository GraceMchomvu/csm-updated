<template>
  <div>
    <footer class="site-footer">
      <div
        class="site-footer-bg"
        :style="`background-image: url(${require(`~/assets/images/backgrounds/footer-bg.jpg`)})`"
      ></div>
      <div class="container">
        <div class="site-footer__top">
          <div class="row">
            <div class="col-xl-3 col-lg-6 col-md-6">
              <div class="footer-widget__column footer-widget__about">
                <h3 class="footer-widget__title">{{ $t("footer.aboutTitle") }}</h3>
                <p class="footer-widget__text">{{ $t("footer.aboutText") }}</p>
                <nuxt-link to="/contact" class="footer-widget__about-btn"
                  ><i class="fas fa-map-marker-alt"></i>{{ $t("common.planYourVisit") }}
                </nuxt-link>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6">
              <div class="footer-widget__column footer-widget__explore clearfix">
                <h3 class="footer-widget__title">{{ $t("footer.exploreTitle") }}</h3>
                <ul class="footer-widget__explore-list list-unstyled">
                  <li><nuxt-link to="/about">{{ $t("nav.about") }}</nuxt-link></li>
                  <li><nuxt-link to="/events">{{ $t("nav.services") }}</nuxt-link></li>
                  <li><nuxt-link to="/gallery">{{ $t("nav.gallery") }}</nuxt-link></li>
                  <li><nuxt-link to="/news">{{ $t("nav.sermons") }}</nuxt-link></li>
                  <li><nuxt-link to="/contact">{{ $t("nav.contact") }}</nuxt-link></li>
                </ul>
                <ul
                  class="footer-widget__explore-list footer-widget__explore-list-two list-unstyled"
                >
                  <li><nuxt-link to="/about">{{ $t("footer.ourProphet") }}</nuxt-link></li>
                  <li><nuxt-link to="/volunteers">{{ $t("footer.ministry") }}</nuxt-link></li>
                  <li><nuxt-link to="/contact">{{ $t("common.visitUs") }}</nuxt-link></li>
                  <li>
                    <a :href="site.youtube" target="_blank" rel="noopener">{{
                      $t("common.youtube")
                    }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6">
              <div class="footer-widget__column footer-widget__contact">
                <h3 class="footer-widget__title">{{ $t("footer.contactTitle") }}</h3>
                <ul class="list-unstyled footer-widget__contact-list">
                  <li>
                    <div class="icon"><i class="icon-chat"></i></div>
                    <div class="text">
                      <p>
                        <span>{{ $t("common.callAnytime") }}</span>
                        <a :href="`tel:${site.phoneTel}`">{{ site.phone }}</a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div class="icon"><i class="icon-message"></i></div>
                    <div class="text">
                      <p>
                        <span>{{ $t("common.sendEmail") }}</span>
                        <a :href="`mailto:${site.email}`">{{ site.email }}</a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div class="icon"><i class="icon-address"></i></div>
                    <div class="text">
                      <p>
                        <span>{{ $t("common.visitUs") }}</span>
                        <a :href="site.maps" target="_blank" rel="noopener">{{
                          $t("site.location")
                        }}</a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6">
              <div class="footer-widget__column footer-widget__newsletter">
                <h3 class="footer-widget__title">{{ $t("footer.newsletterTitle") }}</h3>
                <p class="footer-widget__newsletter-text">
                  {{ $t("footer.newsletterText") }}
                </p>
                <form
                  class="footer-widget__newsletter-form"
                  @submit.prevent="subscribeNewsletter"
                >
                  <input
                    v-model.trim="newsletterEmail"
                    type="email"
                    :placeholder="$t('footer.emailPlaceholder')"
                    name="email"
                    required
                  />
                  <button type="submit" class="footer-widget__newsletter-btn">
                    <i class="fas fa-arrow-circle-right"></i>{{ $t("footer.send") }}
                  </button>
                </form>
                <p v-if="newsletterStatus" class="footer-widget__newsletter-status">
                  {{ newsletterStatus }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="site-footer__bottom">
          <div class="row">
            <div class="col-xl-12">
              <div class="site-footer__bottom-inner">
                <div class="site-footer__bottom-logo-social">
                  <div class="site-footer__bottom-logo">
                    <nuxt-link to="/" class="site-footer__logo-text">CSM</nuxt-link>
                  </div>
                  <div class="site-footer__bottom-social">
                    <a :href="site.facebook" target="_blank" rel="noopener"
                      ><i class="fab fa-facebook-square"></i
                    ></a>
                    <a :href="site.tiktok" target="_blank" rel="noopener"
                      ><i class="fab fa-tiktok"></i
                    ></a>
                    <a :href="`mailto:${site.email}`"
                      ><i class="fas fa-envelope"></i
                    ></a>
                    <a :href="site.maps" target="_blank" rel="noopener"
                      ><i class="fas fa-map-marker-alt"></i
                    ></a>
                  </div>
                </div>
                <div class="site-footer__bottom-copy-right">
                  <p>
                    {{ $t("footer.copyright", { year }) }}
                    <a href="https://www.csm.church" target="_blank" rel="noopener"
                      >Christ Synagogue Ministries</a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <div v-if="sticky === true">
      <a
        @click="scrollTop"
        class="scroll-to-target scroll-to-top animated fadeInUp"
        ><i class="fa fa-angle-up"></i
      ></a>
    </div>
  </div>
</template>

<script>
import data from "~/data/data.json";
export default {
  data() {
    return {
      logo: data.logo,
      site: data.site,
      year: new Date().getFullYear(),
      sticky: false,
      newsletterEmail: "",
      newsletterStatus: "",
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.sticky = window.scrollY > 70;
    },
    scrollTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    subscribeNewsletter() {
      if (!this.newsletterEmail) return;
      const subject = encodeURIComponent("CSM Newsletter Subscription");
      const body = encodeURIComponent(
        `Please add this email to the CSM updates list:\n\n${this.newsletterEmail}`
      );
      window.location.href = `mailto:${this.site.email}?subject=${subject}&body=${body}`;
      this.newsletterStatus = this.$t("footer.newsletterSent");
      this.newsletterEmail = "";
    },
  },
};
</script>
