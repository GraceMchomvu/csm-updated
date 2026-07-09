<template>
  <div class="page-wrapper" id="wrapper">
    <Nuxt />
  </div>
</template>

<script>
export default {
  head() {
    const locale = this.$i18n.locale || "en";
    return {
      htmlAttrs: {
        lang: locale,
        dir: locale === "ar" ? "rtl" : "ltr",
      },
      title: this.$t("meta.title"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("meta.description"),
        },
      ],
    };
  },
  watch: {
    "$i18n.locale"(code) {
      if (process.client) {
        document.documentElement.setAttribute("lang", code);
        document.documentElement.setAttribute(
          "dir",
          code === "ar" ? "rtl" : "ltr"
        );
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
    if (process.client) {
      const code = this.$i18n.locale;
      document.documentElement.setAttribute("lang", code);
      document.documentElement.setAttribute(
        "dir",
        code === "ar" ? "rtl" : "ltr"
      );
    }
  },
};
</script>
