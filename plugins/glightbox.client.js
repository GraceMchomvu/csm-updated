import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

/**
 * Expose GLightbox on window for GalleryCard / AboutFour.
 * Must export a Nuxt plugin function — exporting GLightbox itself causes
 * Nuxt to call it as the plugin entry and can break client hydration.
 */
export default () => {
  if (process.client) {
    window.GLightbox = GLightbox;
  }
};
