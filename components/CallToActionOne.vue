<template>
  <section class="become-volunteer">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="become-volunteer__inner">
            <div class="become-volunteer__left">
              <h2 v-html="$t('home.cta.title')"></h2>
              <div class="become-volunteer__big-text">
                <h2>{{ $t("home.visit.eyebrow") }}</h2>
              </div>
            </div>
            <div class="become-volunteer__btn-box">
              <nuxt-link to="/contact" class="become-volunteer__btn thm-btn">
                <i class="fas fa-arrow-circle-right"></i>
                {{ $t("common.planYourVisit") }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>
