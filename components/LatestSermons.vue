<template>
  <section ref="section" class="latest-sermons is-gsap">
    <div class="container">
      <div ref="heading" class="latest-sermons__heading">
        <SectionTitle
          :subTitle="$t('home.sermons.subtitle')"
          :title="$t('home.sermons.title')"
        />
        <p class="latest-sermons__intro">{{ $t("home.sermons.intro") }}</p>
      </div>

      <div v-if="loading" class="latest-sermons__status">
        {{ $t("home.sermons.loading") }}
      </div>
      <div v-else-if="error && !sermons.length" class="latest-sermons__status">
        {{ error }}
        <a
          class="latest-sermons__channel-link"
          :href="channelUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t("common.watchOnYoutube") }}
        </a>
      </div>

      <div v-else class="row latest-sermons__row">
        <div
          class="col-xl-4 col-lg-4 col-md-6 latest-sermons__col"
          v-for="(sermon, index) in sermons"
          :key="sermon.id"
        >
          <article
            class="latest-sermons__card"
            :ref="'card-' + index"
            :data-index="index"
          >
            <a
              class="latest-sermons__media"
              :href="sermon.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Watch ${sermon.title}`"
            >
              <img
                class="latest-sermons__thumb"
                :src="sermon.thumbnail"
                :alt="sermon.title"
                loading="lazy"
              />
              <span class="latest-sermons__shade"></span>
              <span class="latest-sermons__play"><i class="fa fa-play"></i></span>
            </a>
            <div class="latest-sermons__body">
              <span class="latest-sermons__date">{{
                formatDate(sermon.published)
              }}</span>
              <h3 class="latest-sermons__title">
                <a :href="sermon.url" target="_blank" rel="noopener noreferrer">{{
                  sermon.title
                }}</a>
              </h3>
              <a
                class="latest-sermons__watch thm-btn"
                :href="sermon.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fas fa-arrow-circle-right"></i>
                {{ $t("home.sermons.watchSermon") }}
              </a>
            </div>
          </article>
        </div>
      </div>

      <div ref="footer" class="latest-sermons__footer">
        <a class="thm-btn" :href="channelUrl" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-youtube"></i>
          {{ $t("home.sermons.viewAll") }}
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import SectionTitle from "~/components/SectionTitle";

export default {
  components: {
    SectionTitle,
  },
  data() {
    return {
      loading: true,
      error: "",
      sermons: [],
      channelUrl: "https://www.youtube.com/@ogillob",
      animated: false,
    };
  },
  mounted() {
    this.loadSermons();
  },
  beforeDestroy() {
    this.killAnimations();
  },
  methods: {
    async loadSermons() {
      this.loading = true;
      this.error = "";
      try {
        const response = await fetch("/api/sermons");
        const data = await response.json();
        if (!response.ok || !data.ok) {
          throw new Error(data.error || "Unable to load sermons");
        }
        this.sermons = (data.sermons || []).slice(0, 3);
        if (data.channelUrl) this.channelUrl = data.channelUrl;
      } catch (err) {
        this.error = this.$t("home.sermons.unavailable");
        console.error(err);
      } finally {
        this.loading = false;
        this.$nextTick(() => {
          this.initGsap();
        });
      }
    },
    formatDate(value) {
      if (!value) return "";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "";
      const localeMap = { en: "en-GB", sw: "sw-TZ", fr: "fr-FR", ar: "ar" };
      return date.toLocaleDateString(localeMap[this.$i18n.locale] || "en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
    getCards() {
      return this.sermons
        .map((_, index) => {
          const ref = this.$refs["card-" + index];
          return Array.isArray(ref) ? ref[0] : ref;
        })
        .filter(Boolean);
    },
    killAnimations() {
      if (!process.client || !this.$ScrollTrigger) return;
      this.$ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.id === "latest-sermons") {
          trigger.kill();
        }
      });
      if (this.$refs.section) {
        this.$gsap.killTweensOf(this.$refs.section.querySelectorAll("*"));
      }
    },
    initGsap() {
      if (!process.client || !this.$gsap || this.animated) return;
      if (!this.sermons.length) return;

      const gsap = this.$gsap;
      const ScrollTrigger = this.$ScrollTrigger;
      const heading = this.$refs.heading;
      const footer = this.$refs.footer;
      const cards = this.getCards();

      if (!heading || !cards.length) return;

      this.killAnimations();

      gsap.set(heading, { autoAlpha: 0, y: 40 });
      gsap.set(cards, { autoAlpha: 0, y: 70, rotateX: 8, transformOrigin: "50% 100%" });
      if (footer) gsap.set(footer, { autoAlpha: 0, y: 30 });

      cards.forEach((card) => {
        const thumb = card.querySelector(".latest-sermons__thumb");
        const play = card.querySelector(".latest-sermons__play");
        const body = card.querySelector(".latest-sermons__body");
        if (thumb) gsap.set(thumb, { scale: 1.18 });
        if (play) gsap.set(play, { scale: 0, autoAlpha: 0 });
        if (body) gsap.set(body, { autoAlpha: 0, y: 24 });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          id: "latest-sermons",
          trigger: this.$refs.section,
          start: "top 75%",
          once: true,
        },
      });

      tl.to(heading, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
      })
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.18,
          },
          "-=0.35"
        )
        .to(
          cards.map((card) => card.querySelector(".latest-sermons__thumb")).filter(Boolean),
          {
            scale: 1,
            duration: 1.1,
            stagger: 0.18,
            ease: "power2.out",
          },
          "-=0.95"
        )
        .to(
          cards.map((card) => card.querySelector(".latest-sermons__play")).filter(Boolean),
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.75"
        )
        .to(
          cards.map((card) => card.querySelector(".latest-sermons__body")).filter(Boolean),
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.12,
          },
          "-=0.55"
        );

      if (footer) {
        tl.to(
          footer,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.25"
        );
      }

      cards.forEach((card) => {
        const thumb = card.querySelector(".latest-sermons__thumb");
        const play = card.querySelector(".latest-sermons__play");

        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -10, duration: 0.35, ease: "power2.out" });
          if (thumb) gsap.to(thumb, { scale: 1.08, duration: 0.5, ease: "power2.out" });
          if (play) gsap.to(play, { scale: 1.12, duration: 0.35, ease: "back.out(1.6)" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.4, ease: "power2.out" });
          if (thumb) gsap.to(thumb, { scale: 1, duration: 0.5, ease: "power2.out" });
          if (play) gsap.to(play, { scale: 1, duration: 0.35, ease: "power2.out" });
        });
      });

      this.animated = true;
      if (ScrollTrigger) ScrollTrigger.refresh();
    },
  },
};
</script>

<style scoped>
.latest-sermons__heading {
  will-change: transform, opacity;
}

.latest-sermons__card {
  will-change: transform, opacity;
  perspective: 800px;
}

.latest-sermons__thumb,
.latest-sermons__play,
.latest-sermons__body,
.latest-sermons__footer {
  will-change: transform, opacity;
}
</style>
