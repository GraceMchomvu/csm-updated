<template>
  <section :class="`join-one ${className}`">
    <client-only>
      <div
        class="join-one-bg jarallax"
        data-jarallax
        data-speed="0.2"
        data-imgPosition="50% 0%"
      >
        <img
          src="~/assets/images/backgrounds/join-one-bg.jpg"
          class="jarallax-img"
          loading="lazy"
          decoding="async"
          alt=""
        />
      </div>
    </client-only>
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="join-one__inner">
            <h2 class="join-one__title" v-html="$t('home.cta.title')" />
            <nuxt-link to="/contact" class="join-one__btn thm-btn">
              <i class="fas fa-arrow-circle-right"></i>
              {{ $t("home.cta.button") }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    className: {
      type: String,
      default: "",
    },
  },
};
</script>
