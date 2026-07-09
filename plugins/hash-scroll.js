export default ({ app }) => {
  if (!process.client) return;

  const scrollToHash = (hash) => {
    if (!hash || hash === "#") return;
    const id = hash.replace(/^#/, "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  app.router.afterEach((to) => {
    if (to.hash) {
      setTimeout(() => scrollToHash(to.hash), 80);
    }
  });

  window.addEventListener("load", () => {
    if (window.location.hash) {
      setTimeout(() => scrollToHash(window.location.hash), 120);
    }
  });
};
