<template>
  <section class="page-header" :class="themeClass">
    <div
      class="page-header__bg"
      :style="`background-image: url(${bgUrl})`"
    ></div>
    <div class="page-header__overlay"></div>
    <div class="page-header__glow"></div>
    <div class="container">
      <span v-if="eyebrow" class="page-header__eyebrow">{{ eyebrow }}</span>
      <h2>{{ pageTitle }}</h2>
      <p v-if="subtitle" class="page-header__subtitle">{{ subtitle }}</p>
      <ul class="thm-breadcrumb list-unstyled">
        <li>
          <nuxt-link to="/">{{ $t("common.home") }}</nuxt-link>
        </li>
        <li class="color-thm-gray">/</li>
        <li>
          <span>{{ pageName }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
const IMAGE_MAP = {
  about: require("~/assets/images/csm/prophet-ministry-1.jpg"),
  services: require("~/assets/images/csm/worship-service-1.jpg"),
  gallery: require("~/assets/images/csm/congregation-1.jpg"),
  sermons: require("~/assets/images/csm/praise-worship-1.jpg"),
  contact: require("~/assets/images/csm/prayer-service-1.jpg"),
  ministry: require("~/assets/images/csm/prophet-ministry-2.jpg"),
  default: require("~/assets/images/csm/congregation.jpg"),
};

export default {
  props: {
    pageTitle: {
      type: String,
    },
    pageName: {
      type: String,
    },
    bgKey: {
      type: String,
      default: "default",
    },
    eyebrow: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
  },
  computed: {
    bgUrl() {
      return IMAGE_MAP[this.bgKey] || IMAGE_MAP.default;
    },
    themeClass() {
      return `page-header--${this.bgKey || "default"}`;
    },
  },
};
</script>

<style scoped>
.page-header {
  position: relative;
  overflow: hidden;
  text-align: center;
}

.page-header__bg {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 30%;
  transform: scale(1.04);
}

.page-header__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(15, 23, 20, 0.78) 0%,
    rgba(15, 138, 123, 0.45) 55%,
    rgba(28, 25, 23, 0.72) 100%
  );
}

.page-header__glow {
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  right: -60px;
  bottom: -90px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  pointer-events: none;
}

.page-header .container {
  position: relative;
  z-index: 2;
  padding-top: 150px;
  padding-bottom: 120px;
}

.page-header__eyebrow {
  display: inline-block;
  margin-bottom: 14px;
  padding: 7px 16px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999px;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.page-header .container h2 {
  margin: 0;
  color: #fff;
  font-weight: 900;
  font-size: 64px;
  line-height: 1.15;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.page-header__subtitle {
  max-width: 620px;
  margin: 16px auto 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 17px;
  line-height: 28px;
}

.page-header .thm-breadcrumb {
  position: static !important;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  margin: 24px auto 0;
  padding: 10px 22px !important;
  background: #ffffff !important;
  border-radius: 999px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  bottom: auto !important;
  right: auto !important;
  left: auto !important;
}

.page-header .thm-breadcrumb li,
.page-header .thm-breadcrumb >>> a,
.page-header .thm-breadcrumb >>> span {
  color: #1c1917 !important;
  font-weight: 800;
}

.page-header .thm-breadcrumb >>> a:hover {
  color: #0f8a7b !important;
}

.page-header .thm-breadcrumb li.color-thm-gray {
  color: #c4c0bb !important;
}

.page-header .thm-breadcrumb li:last-child >>> span,
.page-header .thm-breadcrumb li:last-child span {
  color: #0f8a7b !important;
}

.page-header--about .page-header__bg {
  background-position: center 20%;
}

.page-header--services .page-header__bg {
  background-position: center 35%;
}

.page-header--gallery .page-header__bg {
  background-position: center 40%;
}

.page-header--sermons .page-header__bg {
  background-position: center 25%;
}

.page-header--contact .page-header__bg {
  background-position: center 45%;
}

.page-header--ministry .page-header__bg {
  background-position: center 18%;
}

.page-header--about .page-header__overlay {
  background: linear-gradient(
    135deg,
    rgba(12, 40, 36, 0.82) 0%,
    rgba(15, 138, 123, 0.5) 100%
  );
}

.page-header--services .page-header__overlay {
  background: linear-gradient(
    145deg,
    rgba(28, 25, 23, 0.75) 0%,
    rgba(180, 83, 9, 0.35) 45%,
    rgba(15, 138, 123, 0.55) 100%
  );
}

.page-header--gallery .page-header__overlay {
  background: linear-gradient(
    160deg,
    rgba(15, 23, 20, 0.7) 0%,
    rgba(15, 138, 123, 0.35) 50%,
    rgba(28, 25, 23, 0.75) 100%
  );
}

.page-header--sermons .page-header__overlay {
  background: linear-gradient(
    120deg,
    rgba(8, 20, 18, 0.82) 0%,
    rgba(15, 138, 123, 0.55) 100%
  );
}

.page-header--contact .page-header__overlay {
  background: linear-gradient(
    130deg,
    rgba(20, 30, 28, 0.8) 0%,
    rgba(15, 138, 123, 0.42) 100%
  );
}

.page-header--ministry .page-header__overlay {
  background: linear-gradient(
    150deg,
    rgba(15, 23, 20, 0.78) 0%,
    rgba(15, 138, 123, 0.48) 100%
  );
}

@media (max-width: 991px) {
  .page-header .container {
    padding-top: 120px;
    padding-bottom: 90px;
  }

  .page-header .container h2 {
    font-size: 42px;
  }
}

@media (max-width: 767px) {
  .page-header .container {
    padding-top: 100px;
    padding-bottom: 75px;
  }

  .page-header .container h2 {
    font-size: 32px;
  }

  .page-header__subtitle {
    font-size: 15px;
    line-height: 24px;
  }
}
</style>
