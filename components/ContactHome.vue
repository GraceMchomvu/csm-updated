<template>
  <section class="helping-one visit-home">
    <div class="container">
      <div class="section-title text-center">
        <span class="section-title__tagline">{{ $t("home.visit.tagline") }}</span>
        <h2 class="section-title__title">{{ $t("home.visit.title") }}</h2>
      </div>
      <div class="row align-items-stretch">
        <div class="col-xl-6 col-lg-6">
          <div class="helping-one__left">
            <h3 class="helping-one__title">{{ $t("home.visit.welcomeTitle") }}</h3>
            <p class="helping-one__text">{{ $t("home.visit.welcomeText") }}</p>
            <ul class="helping-one__left-list list-unstyled">
              <li>
                <div class="helping-one__left-icon">
                  <i class="fas fa-arrow-circle-right"></i>
                </div>
                <div class="helping-one__left-text">
                  <p>{{ $t("home.visit.sat") }}</p>
                </div>
              </li>
              <li>
                <div class="helping-one__left-icon">
                  <i class="fas fa-arrow-circle-right"></i>
                </div>
                <div class="helping-one__left-text">
                  <p>{{ $t("home.visit.sun") }}</p>
                </div>
              </li>
              <li>
                <div class="helping-one__left-icon">
                  <i class="fas fa-arrow-circle-right"></i>
                </div>
                <div class="helping-one__left-text">
                  <p>{{ $t("home.visit.tueThu") }}</p>
                </div>
              </li>
            </ul>
            <div class="helping-one__left-img">
              <img
                src="~images/resources/helping-one-left-img.jpg"
                alt="CSM congregation"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6">
          <aside class="visit-home__panel">
            <div class="visit-home__panel-top">
              <span class="visit-home__eyebrow">{{ $t("home.visit.eyebrow") }}</span>
              <h3 class="visit-home__title">Christ Synagogue Ministries</h3>
              <p class="visit-home__subtitle">{{ $t("site.locationShort") }}</p>
            </div>

            <ul class="list-unstyled visit-home__rows">
              <li>
                <a
                  :href="site.maps"
                  target="_blank"
                  rel="noopener"
                  class="visit-home__row"
                >
                  <span class="visit-home__icon">
                    <i class="icon-address"></i>
                  </span>
                  <span class="visit-home__copy">
                    <small>{{ $t("common.location") }}</small>
                    <strong>{{ $t("site.location") }}</strong>
                  </span>
                  <i class="fas fa-arrow-right visit-home__chevron"></i>
                </a>
              </li>
              <li>
                <a :href="`tel:${site.phoneTel}`" class="visit-home__row">
                  <span class="visit-home__icon">
                    <i class="icon-chat"></i>
                  </span>
                  <span class="visit-home__copy">
                    <small>{{ $t("common.callAnytime") }}</small>
                    <strong>{{ site.phone }}</strong>
                  </span>
                  <i class="fas fa-arrow-right visit-home__chevron"></i>
                </a>
              </li>
              <li>
                <a :href="`mailto:${site.email}`" class="visit-home__row">
                  <span class="visit-home__icon">
                    <i class="icon-message"></i>
                  </span>
                  <span class="visit-home__copy">
                    <small>{{ $t("common.email") }}</small>
                    <strong>{{ site.email }}</strong>
                  </span>
                  <i class="fas fa-arrow-right visit-home__chevron"></i>
                </a>
              </li>
            </ul>

            <div class="visit-home__schedule">
              <div class="visit-home__schedule-head">
                <span class="visit-home__schedule-icon" aria-hidden="true">
                  <i class="far fa-clock"></i>
                </span>
                <span class="visit-home__schedule-label">{{
                  $t("home.visit.serviceTimes")
                }}</span>
              </div>
              <ul class="list-unstyled visit-home__schedule-grid">
                <li>
                  <em>{{ $t("home.visit.satShort") }}</em>
                  <span>2:00 PM</span>
                </li>
                <li>
                  <em>{{ $t("home.visit.sunShort") }}</em>
                  <span>10:00 AM</span>
                </li>
                <li>
                  <em>{{ $t("home.visit.tueThuShort") }}</em>
                  <span>6:00 PM</span>
                </li>
              </ul>
            </div>

            <div class="visit-home__actions">
              <a
                :href="site.maps"
                class="thm-btn"
                target="_blank"
                rel="noopener"
              >
                <i class="fas fa-arrow-circle-right"></i>
                {{ $t("common.getDirections") }}
              </a>
              <nuxt-link to="/contact" class="visit-home__link">
                {{ $t("common.contactUs") }}
                <i class="fas fa-arrow-right"></i>
              </nuxt-link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import data from "~/data/data.json";
export default {
  data() {
    return {
      site: data.site,
    };
  },
};
</script>
