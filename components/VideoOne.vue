<template>
  <section class="help-them">
    <client-only>
      <div
        class="help-them-bg jarallax"
        data-jarallax
        data-speed="0.2"
        data-imgPosition="50% 0%"
      >
        <img
          src="~/assets/images/backgrounds/help-them-bg.jpg"
          class="jarallax-img"
        />
      </div>
    </client-only>
    <div class="container">
      <div class="help-them__top">
        <div class="row">
          <div class="col-xl-8 col-lg-8">
            <div class="help-them__top-content">
              <h2 class="help-them__top-content-title">
                {{ $t("home.video.title") }}
              </h2>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4">
            <div class="help-them__top-video-box">
              <a
                :href="videoUrl"
                class="help-them__top-video-btn"
                target="_blank"
                rel="noopener"
                :aria-label="videoTitle ? `Watch ${videoTitle}` : $t('home.video.watch')"
                ><i class="fa fa-play"></i
              ></a>
              <p class="help-them__top-video-text">{{ $t("home.video.watch") }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="help-them__bottom">
        <div class="row">
          <div
            class="col-xl-4 col-lg-4"
            v-for="(item, index) in videoFeatures"
            :key="index"
          >
            <div class="help-them__single">
              <div class="help-them__icon">
                <span :class="item.icon"></span>
              </div>
              <div class="help-them__text">
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      videoUrl: "https://www.youtube.com/@ogillob",
      videoTitle: "",
      icons: ["icon-heart", "icon-adoption", "icon-charity"],
    };
  },
  computed: {
    videoFeatures() {
      const items = this.$t("home.video.features");
      if (!Array.isArray(items)) return [];
      return items.map((item, index) => ({
        ...item,
        icon: this.icons[index] || "icon-heart",
      }));
    },
  },
  mounted() {
    this.loadLatestService();
  },
  methods: {
    async loadLatestService() {
      try {
        const response = await fetch("/api/sermons");
        const payload = await response.json();
        if (!response.ok || !payload.ok) {
          throw new Error(payload.error || "Unable to load latest service");
        }
        const latest = (payload.sermons || [])[0];
        if (latest && latest.url) {
          this.videoUrl = latest.url;
          this.videoTitle = latest.title || "";
        } else if (payload.channelUrl) {
          this.videoUrl = payload.channelUrl;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
