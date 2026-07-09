<template>
  <div
    :class="`mobile-nav__wrapper  ${mobileDrawer === true ? 'expanded ' : ' '}`"
  >
    <div
      class="mobile-nav__overlay mobile-nav__toggler"
      @click="mobileDrawerStatusChange"
    ></div>
    <div class="mobile-nav__content">
      <span
        class="mobile-nav__close mobile-nav__toggler"
        @click="mobileDrawerStatusChange"
        ><i class="fa fa-times"></i
      ></span>

      <div class="logo-box">
        <nuxt-link to="/" class="mobile-nav__logo-text">CSM</nuxt-link>
      </div>

      <div class="mobile-nav__lang">
        <LanguageSwitcher />
      </div>

      <div class="mobile-nav__container">
        <ul class="main-menu__list">
          <li v-for="item in navMenus" :key="item.key">
            <nuxt-link :to="item.url" @click.native="mobileDrawerStatusChange">
              {{ $t(item.labelKey) }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import LanguageSwitcher from "~/components/LanguageSwitcher";

const NAV = [
  { key: "home", labelKey: "nav.home", url: "/" },
  { key: "about", labelKey: "nav.about", url: "/about" },
  { key: "services", labelKey: "nav.services", url: "/events" },
  { key: "gallery", labelKey: "nav.gallery", url: "/gallery" },
  { key: "sermons", labelKey: "nav.sermons", url: "/news" },
  { key: "contact", labelKey: "nav.contact", url: "/contact" },
];

export default {
  components: { LanguageSwitcher },
  data() {
    return {
      navMenus: NAV,
    };
  },
  computed: {
    mobileDrawer() {
      return this.$store.state.mobileDrawerStatus;
    },
  },
  methods: {
    ...mapMutations({
      mobileDrawerStatusChange: "changeMobileDrawerStatus",
    }),
  },
};
</script>

<style scoped>
.mobile-nav__lang {
  margin: 0 0 20px;
  padding: 0 20px;
}
.mobile-nav__lang >>> .language-switcher {
  margin: 0;
}
.mobile-nav__lang >>> .language-switcher__btn {
  border-color: rgba(15, 138, 123, 0.35);
  color: #222;
  background: #f3f7f6;
}
.mobile-nav__lang >>> .language-switcher__btn:hover,
.mobile-nav__lang >>> .language-switcher.open .language-switcher__btn {
  background: #0f8a7b;
  border-color: #0f8a7b;
  color: #fff;
}
</style>
