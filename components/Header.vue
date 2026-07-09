<template>
  <div>
    <header class="main-header clearfix">
      <div class="main-header__logo">
        <nuxt-link to="/" class="main-header__logo-text">CSM</nuxt-link>
      </div>
      <div class="main-menu-wrapper">
        <div class="main-menu-wrapper__bottom">
          <nav class="main-menu">
            <div class="main-menu__inner">
              <a
                href="#"
                class="mobile-nav__toggler"
                @click.prevent="mobileDrawerStatusChange"
              >
                <i class="fa fa-bars"></i>
              </a>
              <ul class="main-menu__list">
                <li v-for="item in navMenus" :key="item.key">
                  <nuxt-link :to="item.url">{{ $t(item.labelKey) }}</nuxt-link>
                </li>
              </ul>
              <div class="main-menu__right">
                <LanguageSwitcher class="main-menu__lang" />
                <a
                  href="#"
                  class="main-menu__search search-toggler icon-magnifying-glass"
                  @click.prevent="searchPopupStatusChange"
                ></a>
                <div class="main-menu__phone-contact">
                  <div class="main-menu__phone-icon">
                    <span class="icon-chat"></span>
                  </div>
                  <div class="main-menu__phone-number">
                    <p>{{ $t("common.callAnytime") }}</p>
                    <a :href="`tel:${site.phoneTel}`">{{ site.phone }}</a>
                  </div>
                </div>
                <nuxt-link to="/contact" class="main-menu__donate-btn"
                  ><i class="fas fa-map-marker-alt"></i>{{ $t("common.visit") }}
                </nuxt-link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <div
      :class="`stricky-header stricked-menu main-menu ${
        sticky ? 'stricky-fixed' : ''
      }`"
    >
      <div class="sticky-header__content">
        <div class="main-menu__inner">
          <a
            href="#"
            class="mobile-nav__toggler"
            @click.prevent="mobileDrawerStatusChange"
          >
            <i class="fa fa-bars"></i>
          </a>
          <ul class="main-menu__list">
            <li v-for="item in navMenus" :key="item.key">
              <nuxt-link :to="item.url">{{ $t(item.labelKey) }}</nuxt-link>
            </li>
          </ul>
          <div class="main-menu__right">
            <LanguageSwitcher class="main-menu__lang" />
            <a
              href="#"
              class="main-menu__search search-toggler icon-magnifying-glass"
              @click.prevent="searchPopupStatusChange"
            ></a>
            <div class="main-menu__phone-contact">
              <div class="main-menu__phone-icon">
                <span class="icon-chat"></span>
              </div>
              <div class="main-menu__phone-number">
                <p>{{ $t("common.callAnytime") }}</p>
                <a :href="`tel:${site.phoneTel}`">{{ site.phone }}</a>
              </div>
            </div>
            <nuxt-link to="/contact" class="main-menu__donate-btn"
              ><i class="fas fa-map-marker-alt"></i>{{ $t("common.visit") }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import data from "~/data/data.json";
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
      logo: data.logo,
      site: data.site,
      navMenus: NAV,
      sticky: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.sticky = window.scrollY > 70;
    },
    ...mapMutations({
      mobileDrawerStatusChange: "changeMobileDrawerStatus",
      searchPopupStatusChange: "changeSearchPopupStatus",
    }),
  },
};
</script>
