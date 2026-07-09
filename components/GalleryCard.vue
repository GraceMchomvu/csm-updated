<template>
  <!--Gallery page Single-->
  <div class="gallery-page__single">
    <a
      class="gallery-page__img-box"
      :href="imageSrc"
      :data-gallery="galleryGroup"
      :aria-label="title"
      @click.prevent="openLightbox"
    >
      <img :src="imageSrc" :alt="title" loading="lazy" decoding="async" />
      <div class="gallery-page__hover-content-box">
        <h2 v-html="title"></h2>
        <p>{{ category }}</p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    galleryGroup: {
      type: String,
      default: "csm-gallery",
    },
  },
  computed: {
    imageSrc() {
      return require(`~/assets/images${this.thumbnail}`);
    },
  },
  methods: {
    openLightbox() {
      if (typeof window === "undefined" || !window.GLightbox) {
        window.open(this.imageSrc, "_blank", "noopener");
        return;
      }
      const lightbox = window.GLightbox({
        elements: [
          {
            href: this.imageSrc,
            type: "image",
            title: this.title,
            description: this.category,
          },
        ],
      });
      lightbox.open();
    },
  },
};
</script>
