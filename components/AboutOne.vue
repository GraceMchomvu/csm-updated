<template>
  <section class="about-page">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-xl-6">
          <div class="about-page__left">
            <div class="about-page__img">
              <img
                src="~/assets/images/resources/about-page-img-1.jpg"
                alt="Christ Synagogue Ministries"
              />
              <div class="about-page__trusted">
                <h3 v-html="$t('about.ledBy')" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="about-page__right">
            <div class="section-title text-left">
              <span class="section-title__tagline">{{ $t("about.tagline") }}</span>
              <h2 class="section-title__title">{{ $t("about.title") }}</h2>
            </div>
            <p class="about-page__right-text">{{ $t("about.text") }}</p>
            <h3 class="about-page__right-title">{{ $t("about.highlight") }}</h3>

            <ul class="list-unstyled about-page__focus">
              <li v-for="(item, index) in focusItems" :key="index">
                <i class="fas fa-arrow-circle-right"></i>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  computed: {
    focusItems() {
      const items = this.$t("about.focus");
      return Array.isArray(items) ? items : [];
    },
  },
};
</script>

<style scoped>
.about-page__focus {
  margin: 28px 0 0;
  padding: 0;
}

.about-page__focus li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
  font-size: 16px;
  line-height: 26px;
  font-weight: 700;
  color: var(--thm-black);
}

.about-page__focus li i {
  color: var(--thm-primary);
  margin-top: 4px;
  flex-shrink: 0;
}

html[dir="rtl"] .about-page__right {
  text-align: right;
}
</style>
