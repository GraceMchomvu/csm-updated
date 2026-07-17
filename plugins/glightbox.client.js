import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

if (process.client) {
  window.GLightbox = GLightbox;
}

export default GLightbox;
