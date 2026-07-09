<template>
  <section class="welcome-one">
    <div class="container">
      <div class="row align-items-center welcome-one__top">
        <div class="col-xl-6 col-lg-6">
          <div class="welcome-one__left">
            <div class="welcome-one__media">
              <div class="welcome-one__media-main">
                <img
                  src="~images/resources/welcome-one-img-1.jpg"
                  alt="CSM worship"
                />
              </div>
              <div class="welcome-one__media-side">
                <img
                  src="~images/resources/welcome-one-img-2.jpg"
                  alt="CSM ministry"
                />
                <span class="welcome-one__media-label">{{
                  $t("home.welcome.karibu")
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-6 col-lg-6">
          <div class="welcome-one__right">
            <div class="section-title text-left">
              <span class="section-title__tagline">{{
                $t("home.welcome.tagline")
              }}</span>
              <h2 class="section-title__title">
                {{ $t("home.welcome.title") }}
              </h2>
            </div>

            <p class="welcome-one__right-text">
              {{ $t("home.welcome.text") }}
            </p>

            <div class="welcome-one__points">
              <div class="welcome-one__point">
                <h3>
                  <i class="fas fa-arrow-circle-right"></i>
                  {{ $t("home.welcome.missionTitle") }}
                </h3>
                <p>{{ $t("home.welcome.missionText") }}</p>
              </div>
              <div class="welcome-one__point">
                <h3>
                  <i class="fas fa-arrow-circle-right"></i>
                  {{ $t("home.welcome.visionTitle") }}
                </h3>
                <p>{{ $t("home.welcome.visionText") }}</p>
              </div>
            </div>

            <div class="welcome-one__values">
              <p>
                <strong>{{ $t("home.welcome.values") }}</strong>
                {{ $t("home.welcome.valuesText") }}
              </p>
            </div>

            <nuxt-link to="/about" class="welcome-one__btn thm-btn">
              <i class="fas fa-arrow-circle-right"></i>
              {{ $t("home.welcome.learnMore") }}
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="welcome-one__live">
        <div class="welcome-one__live-head">
          <div class="welcome-one__live-copy">
            <span class="welcome-one__live-tag">
              <i class="fas fa-circle"></i>
              {{ liveBadge }}
            </span>
            <h3>{{ liveTitle }}</h3>
          </div>
          <a
            v-if="live && live.url"
            :href="live.url"
            class="welcome-one__live-link"
            target="_blank"
            rel="noopener"
          >
            {{ $t("common.watchOnYoutube") }}
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>

        <div class="welcome-one__live-player">
          <div v-if="loading" class="welcome-one__live-status">
            {{ $t("home.welcome.loadingLive") }}
          </div>
          <div v-else-if="error && !live" class="welcome-one__live-status">
            {{ error }}
            <a
              href="https://www.youtube.com/@ogillob"
              target="_blank"
              rel="noopener"
            >
              {{ $t("home.welcome.openChannel") }}
            </a>
          </div>
          <iframe
            v-else-if="live"
            :src="live.autoplayEmbedUrl || live.embedUrl"
            title="Latest CSM live service"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
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
      live: null,
    };
  },
  computed: {
    liveBadge() {
      if (this.live && this.live.isLive) return this.$t("home.welcome.liveNow");
      return this.$t("home.welcome.latestLive");
    },
    liveTitle() {
      return (
        (this.live && this.live.title) || this.$t("home.welcome.latestService")
      );
    },
  },
  mounted() {
    this.loadLatestLive();
  },
  methods: {
    async loadLatestLive() {
      this.loading = true;
      this.error = "";
      try {
        const response = await fetch("/api/sermons");
        const data = await response.json();
        if (!response.ok || !data.ok) {
          throw new Error(data.error || "Unable to load live service");
        }
        this.live =
          data.latestLive || (data.sermons && data.sermons[0]) || null;
      } catch (err) {
        this.error = this.$t("home.welcome.liveUnavailable");
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.welcome-one {
  padding: 100px 0 90px;
}

.welcome-one__top {
  margin-bottom: 0;
}

.welcome-one__left {
  position: relative;
  padding-right: 20px;
}

.welcome-one__media {
  display: grid;
  grid-template-columns: 1.35fr 0.9fr;
  gap: 18px;
  align-items: end;
}

.welcome-one__media-main,
.welcome-one__media-side {
  position: relative;
  overflow: hidden;
}

.welcome-one__media-main img,
.welcome-one__media-side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.welcome-one__media-main {
  min-height: 460px;
}

.welcome-one__media-main img {
  min-height: 460px;
}

.welcome-one__media-side {
  min-height: 320px;
  background: #0f8a7b;
}

.welcome-one__media-side img {
  min-height: 260px;
  max-height: 260px;
}

.welcome-one__media-label {
  display: block;
  padding: 18px 16px 20px;
  color: #fff;
  font-family: var(--thm-reey-font), cursive;
  font-size: 28px;
  line-height: 1.2;
  text-align: center;
}

.welcome-one__right {
  padding-left: 10px;
}

.welcome-one__right .section-title {
  margin-bottom: 22px;
}

.welcome-one__right-text {
  margin: 0 0 28px;
  font-size: 16px;
  line-height: 30px;
  color: var(--thm-gray);
}

.welcome-one__points {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  margin-bottom: 24px;
}

.welcome-one__point h3 {
  font-size: 18px;
  font-weight: 900;
  line-height: 28px;
  margin: 0 0 10px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.welcome-one__point h3 i {
  color: var(--thm-primary);
  margin-top: 5px;
  flex-shrink: 0;
}

.welcome-one__point p {
  margin: 0;
  font-size: 15px;
  line-height: 26px;
  color: var(--thm-gray);
}

.welcome-one__values {
  margin: 0 0 28px;
  padding: 18px 20px;
  background: #f5f5f4;
  border-left: 4px solid var(--thm-primary);
}

.welcome-one__values p {
  margin: 0;
  font-size: 15px;
  line-height: 26px;
  color: var(--thm-gray);
}

.welcome-one__btn {
  margin-top: 0;
}

.welcome-one__live {
  margin-top: 70px;
  padding: 28px;
  background: #1c1917;
}

.welcome-one__live-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.welcome-one__live-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 900;
  color: var(--thm-accent);
  margin-bottom: 6px;
}

.welcome-one__live-tag i {
  font-size: 8px;
  animation: welcomeLivePulse 1.4s ease-in-out infinite;
}

.welcome-one__live-head h3 {
  margin: 0;
  color: #fff;
  font-size: 22px;
  line-height: 32px;
  font-weight: 900;
  max-width: 720px;
}

.welcome-one__live-link {
  color: #fff;
  font-weight: 900;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  white-space: nowrap;
}

.welcome-one__live-link:hover {
  color: var(--thm-primary);
}

.welcome-one__live-player {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background: #000;
  overflow: hidden;
}

.welcome-one__live-player iframe,
.welcome-one__live-status {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.welcome-one__live-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 16px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  text-align: center;
}

.welcome-one__live-status a {
  color: var(--thm-primary);
  font-weight: 900;
}

@keyframes welcomeLivePulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

@media (max-width: 1199px) {
  .welcome-one__left {
    padding-right: 0;
  }

  .welcome-one__right {
    padding-left: 0;
  }

  .welcome-one__media-main,
  .welcome-one__media-main img {
    min-height: 400px;
  }
}

@media (max-width: 991px) {
  .welcome-one {
    padding: 80px 0 70px;
  }

  .welcome-one__left {
    margin-bottom: 40px;
  }

  .welcome-one__media {
    grid-template-columns: 1.2fr 0.9fr;
  }

  .welcome-one__media-main,
  .welcome-one__media-main img {
    min-height: 340px;
  }

  .welcome-one__media-side img {
    min-height: 220px;
    max-height: 220px;
  }

  .welcome-one__live {
    margin-top: 50px;
  }
}

@media (max-width: 767px) {
  .welcome-one {
    padding: 70px 0 60px;
  }

  .welcome-one__media {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .welcome-one__media-main,
  .welcome-one__media-main img {
    min-height: 280px;
  }

  .welcome-one__media-side img {
    min-height: 200px;
    max-height: 200px;
  }

  .welcome-one__media-label {
    font-size: 24px;
    padding: 14px 12px 16px;
  }

  .welcome-one__points {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .welcome-one__live {
    margin-top: 36px;
    padding: 18px 14px 20px;
  }

  .welcome-one__live-head h3 {
    font-size: 18px;
    line-height: 28px;
  }

  .welcome-one__live-link {
    white-space: normal;
  }
}

html[dir="rtl"] .welcome-one__left {
  padding-right: 0;
  padding-left: 20px;
}

html[dir="rtl"] .welcome-one__right {
  padding-left: 0;
  padding-right: 10px;
  text-align: right;
}

html[dir="rtl"] .welcome-one__values {
  border-left: 0;
  border-right: 4px solid var(--thm-primary);
}

html[dir="rtl"] .welcome-one__live-link i {
  transform: scaleX(-1);
}
</style>
