<template>
  <section class="sermons-page">
    <div class="container">
      <div class="sermons-page__intro text-center">
        <span class="section-title__tagline">{{ $t("pages.news.name") }}</span>
        <h2 class="section-title__title">{{ $t("home.sermons.title") }}</h2>
        <p>{{ $t("home.sermons.intro") }}</p>
      </div>

      <div v-if="loading" class="sermons-page__status">
        {{ $t("home.sermons.loading") }}
      </div>

      <div v-else-if="error && !sermons.length" class="sermons-page__status">
        {{ error }}
        <a :href="channelUrl" target="_blank" rel="noopener noreferrer">
          {{ $t("common.watchOnYoutube") }}
        </a>
      </div>

      <div v-else class="row">
        <div
          class="col-xl-4 col-lg-4 col-md-6"
          v-for="sermon in sermons"
          :key="sermon.id"
        >
          <article class="sermons-page__card">
            <a
              class="sermons-page__media"
              :href="sermon.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Watch ${sermon.title}`"
            >
              <img
                :src="sermon.thumbnail"
                :alt="sermon.title"
                loading="lazy"
              />
              <span class="sermons-page__play"><i class="fa fa-play"></i></span>
            </a>
            <div class="sermons-page__body">
              <span class="sermons-page__date">{{
                formatDate(sermon.published)
              }}</span>
              <h3 class="sermons-page__title">
                <a :href="sermon.url" target="_blank" rel="noopener noreferrer">{{
                  sermon.title
                }}</a>
              </h3>
              <a
                class="thm-btn sermons-page__watch"
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

      <div class="sermons-page__footer">
        <a class="thm-btn" :href="channelUrl" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-youtube"></i>
          {{ $t("home.sermons.viewAll") }}
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      error: "",
      sermons: [],
      channelUrl: "https://www.youtube.com/@ogillob",
    };
  },
  mounted() {
    this.loadSermons();
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
        this.sermons = data.sermons || [];
        if (data.channelUrl) this.channelUrl = data.channelUrl;
      } catch (err) {
        this.error = this.$t("home.sermons.unavailable");
        console.error(err);
      } finally {
        this.loading = false;
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
  },
};
</script>

<style scoped>
.sermons-page {
  padding: 100px 0 90px;
}

.sermons-page__intro {
  max-width: 760px;
  margin: 0 auto 50px;
}

.sermons-page__intro p {
  margin: 16px 0 0;
  color: var(--thm-gray);
  font-size: 16px;
  line-height: 30px;
}

.sermons-page__status {
  text-align: center;
  padding: 40px 20px;
  font-size: 16px;
  font-weight: 700;
  color: var(--thm-gray);
}

.sermons-page__status a {
  display: inline-block;
  margin-left: 8px;
  color: var(--thm-primary);
  font-weight: 900;
}

.sermons-page__card {
  background: #fff;
  border: 1px solid #ebe8e4;
  margin-bottom: 30px;
  height: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  overflow: hidden;
}

.sermons-page__card:hover {
  box-shadow: 0 16px 36px rgba(28, 25, 23, 0.1);
  transform: translateY(-4px);
}

.sermons-page__media {
  position: relative;
  display: block;
  overflow: hidden;
  background: #111;
}

.sermons-page__media img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.sermons-page__card:hover .sermons-page__media img {
  transform: scale(1.05);
}

.sermons-page__play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: rgba(15, 138, 123, 0.95);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.sermons-page__body {
  padding: 24px 22px 28px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.sermons-page__date {
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  color: var(--thm-primary);
  margin-bottom: 10px;
}

.sermons-page__title {
  font-size: 20px;
  line-height: 28px;
  font-weight: 900;
  margin: 0 0 20px;
  flex: 1;
}

.sermons-page__title a {
  color: inherit;
  text-decoration: none;
}

.sermons-page__title a:hover {
  color: var(--thm-primary);
}

.sermons-page__watch {
  align-self: flex-start;
}

.sermons-page__footer {
  text-align: center;
  margin-top: 20px;
}

.sermons-page__footer .thm-btn i {
  margin-right: 8px;
}

@media (max-width: 991px) {
  .sermons-page {
    padding: 80px 0 70px;
  }
}

@media (max-width: 767px) {
  .sermons-page {
    padding: 70px 0 60px;
  }

  .sermons-page__media img {
    height: 200px;
  }
}

html[dir="rtl"] .sermons-page__footer .thm-btn i {
  margin-right: 0;
  margin-left: 8px;
}
</style>
