<template>
  <section class="about-beliefs">
    <div class="container">
      <div class="section-title text-center">
        <span class="section-title__tagline">{{ $t("about.beliefs.tagline") }}</span>
        <h2 class="section-title__title">{{ $t("about.beliefs.title") }}</h2>
      </div>
      <p class="about-beliefs__intro">{{ $t("about.beliefs.intro") }}</p>

      <div class="row">
        <div
          class="col-xl-3 col-lg-6 col-md-6"
          v-for="(item, index) in pillars"
          :key="index"
        >
          <article class="about-beliefs__card">
            <div class="about-beliefs__icon">
              <span :class="item.icon"></span>
            </div>
            <span class="about-beliefs__number">0{{ index + 1 }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>

      <blockquote class="about-beliefs__verse">
        <p>{{ $t("about.beliefs.verse") }}</p>
        <cite>{{ $t("about.beliefs.verseRef") }}</cite>
      </blockquote>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    pillars() {
      const items = this.$t("about.beliefs.pillars");
      const icons = [
        "icon-heart",
        "icon-adoption",
        "icon-charity",
        "icon-donation-1",
      ];
      if (!Array.isArray(items)) return [];
      return items.map((item, index) => ({
        ...item,
        icon: icons[index] || "icon-heart",
      }));
    },
  },
};
</script>

<style scoped>
.about-beliefs {
  position: relative;
  padding: 100px 0 90px;
  background: linear-gradient(180deg, #f8f7f5 0%, #ffffff 100%);
}

.about-beliefs__intro {
  max-width: 720px;
  margin: -10px auto 50px;
  text-align: center;
  color: var(--thm-gray);
  font-size: 16px;
  line-height: 30px;
}

.about-beliefs__card {
  position: relative;
  height: 100%;
  margin-bottom: 30px;
  padding: 40px 28px 36px;
  background: #ffffff;
  border: 1px solid #ebe8e4;
  transition: all 0.35s ease;
  overflow: hidden;
}

.about-beliefs__card:hover {
  border-color: var(--thm-primary);
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(15, 138, 123, 0.12);
}

.about-beliefs__icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(15, 138, 123, 0.1);
  color: var(--thm-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 22px;
}

.about-beliefs__number {
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 42px;
  font-weight: 900;
  line-height: 1;
  color: rgba(15, 138, 123, 0.08);
}

.about-beliefs__card h3 {
  font-size: 22px;
  font-weight: 900;
  margin: 0 0 14px;
  line-height: 1.3;
}

.about-beliefs__card p {
  margin: 0;
  color: var(--thm-gray);
  font-size: 15px;
  line-height: 26px;
}

.about-beliefs__verse {
  max-width: 820px;
  margin: 30px auto 0;
  padding: 36px 40px;
  text-align: center;
  background: #1c1917;
  border: 0;
}

.about-beliefs__verse p {
  margin: 0 0 14px;
  color: #ffffff;
  font-size: 22px;
  line-height: 34px;
  font-family: var(--thm-reey-font), cursive;
}

.about-beliefs__verse cite {
  color: var(--thm-primary);
  font-style: normal;
  font-weight: 900;
  font-size: 15px;
}

@media (max-width: 991px) {
  .about-beliefs {
    padding: 80px 0 70px;
  }

  .about-beliefs__verse {
    padding: 28px 24px;
  }

  .about-beliefs__verse p {
    font-size: 18px;
    line-height: 30px;
  }
}

@media (max-width: 767px) {
  .about-beliefs {
    padding: 70px 0 60px;
  }

  .about-beliefs__intro {
    margin-bottom: 35px;
  }
}

html[dir="rtl"] .about-beliefs__number {
  right: auto;
  left: 24px;
}
</style>
