<template>
  <div>
    <header class="main-header-three clearfix">
      <div class="main-header-three__menu-box clearfix">
        <nav class="main-menu main-menu-three clearfix">
          <div class="main-menu-three__container clearfix">
            <div class="main-menu-three__logo">
              <nuxt-link to="/">
                <img :src="require(`~/assets/images${logo.dark}`)" alt="" />
              </nuxt-link>
            </div>
            <div class="main-menu-three__inner-upper clearfix">
              <div class="main-menu-three__btn">
                <nuxt-link
                  to="/causes-details"
                  class="main-menu-three__donate-btn"
                  ><i class="fa fa-heart"></i>Donate
                </nuxt-link>
              </div>
              <div class="main-menu-three__inner clearfix">
                <a
                  href="#"
                  class="mobile-nav__toggler"
                  @click="mobileDrawerStatusChange"
                >
                  <i class="fa fa-bars"></i>
                </a>
                <ul class="main-menu__list">
                  <li
                    v-for="item in navMenus"
                    :key="item.name"
                    :class="`${
                      undefined !== item.subItems ? 'dropdown ' : ' '
                    }`"
                  >
                    <nuxt-link :to="item.url">{{ item.name }}</nuxt-link>
                    <ul class="sub-menu" v-if="undefined !== item.subItems">
                      <li v-for="subitem in item.subItems" :key="subitem.name">
                        <nuxt-link :to="subitem.url">{{
                          subitem.name
                        }}</nuxt-link>
                        <ul
                          class="sub-menu"
                          v-if="undefined !== subitem.subItems"
                        >
                          <li
                            v-for="subitem in subitem.subItems"
                            :key="subitem.name"
                          >
                            <nuxt-link :to="subitem.url">{{
                              subitem.name
                            }}</nuxt-link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div class="main-menu__right main-menu__right-three">
              <div class="main-menu__right-social">
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-facebook-square"></i></a>
                <a href="#"><i class="fab fa-dribbble"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
              </div>
              <a
                href="#"
                class="main-menu__search search-toggler icon-magnifying-glass"
                @click="searchPopupStatusChange"
              ></a>
              <a href="#" class="main-menu__cart icon-shopping-cart"></a>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <div
      :class="`stricky-header stricked-menu main-menu main-menu-three ${
        sticky ? 'stricky-fixed' : ''
      }`"
    >
      <div class="sticky-header__content">
        <div class="main-menu-three__container clearfix">
          <div class="main-menu-three__logo">
            <nuxt-link to="/">
              <img :src="require(`~/assets/images${logo.dark}`)" alt="" />
            </nuxt-link>
          </div>
          <div class="main-menu-three__inner-upper clearfix">
            <div class="main-menu-three__btn">
              <nuxt-link
                to="/causes-details"
                class="main-menu-three__donate-btn"
                ><i class="fa fa-heart"></i>Donate
              </nuxt-link>
            </div>
            <div class="main-menu-three__inner clearfix">
              <a
                href="#"
                class="mobile-nav__toggler"
                @click="mobileDrawerStatusChange"
              >
                <i class="fa fa-bars"></i>
              </a>
              <ul class="main-menu__list">
                <li
                  v-for="item in navMenus"
                  :key="item.name"
                  :class="`${undefined !== item.subItems ? 'dropdown ' : ' '}`"
                >
                  <nuxt-link :to="item.url">{{ item.name }}</nuxt-link>
                  <ul class="sub-menu" v-if="undefined !== item.subItems">
                    <li v-for="subitem in item.subItems" :key="subitem.name">
                      <nuxt-link :to="subitem.url">{{
                        subitem.name
                      }}</nuxt-link>
                      <ul
                        class="sub-menu"
                        v-if="undefined !== subitem.subItems"
                      >
                        <li
                          v-for="subitem in subitem.subItems"
                          :key="subitem.name"
                        >
                          <nuxt-link :to="subitem.url">{{
                            subitem.name
                          }}</nuxt-link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="main-menu__right main-menu__right-three">
            <div class="main-menu__right-social">
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-facebook-square"></i></a>
              <a href="#"><i class="fab fa-dribbble"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
            <a
              href="#"
              class="main-menu__search search-toggler icon-magnifying-glass"
              @click="searchPopupStatusChange"
            ></a>
            <a href="#" class="main-menu__cart icon-shopping-cart"></a>
          </div>
        </div>
      </div>
      <!-- /.sticky-header__content -->
    </div>
    <!-- /.stricky-header -->
  </div>
</template>
<script>
import data from "~/data/data.json";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      currentPageURL: this.$route.path,
      logo: data.logo,
      navMenus: data.navMenus,
      sticky: false,
    };
  },
  computed: {
    mobileDrawer() {
      return this.$store.state.mobileDrawerStatus;
    },
    searchPopup() {
      return this.$store.state.searchPopupStatus;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 70) {
        this.sticky = true;
      } else if (window.scrollY < 70) {
        this.sticky = false;
      }
    },
    ...mapMutations({
      mobileDrawerStatusChange: "changeMobileDrawerStatus",
      searchPopupStatusChange: "changeSearchPopupStatus",
    }),
  },
};
</script>
