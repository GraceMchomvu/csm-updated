<template>
  <div class="page-wrapper" id="wrapper">
    <Nuxt />
  </div>
</template>

<script>
const SITE_URL = process.env.SITE_URL || "https://www.csm.church";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export default {
  head() {
    const locale = this.$i18n.locale || "en";
    const title = this.$t("meta.title");
    const description = this.$t("meta.description");
    const path = (this.$route && this.$route.path) || "/";
    const canonicalPath = path === "/" ? "/" : path.replace(/\/$/, "");
    const canonical = `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`;
    const isDemoRoute = path === "/index-2" || path === "/index-3";

    return {
      htmlAttrs: {
        lang: locale,
        dir: locale === "ar" ? "rtl" : "ltr",
      },
      title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        {
          hid: "robots",
          name: "robots",
          content: isDemoRoute ? "noindex, nofollow" : "index, follow",
        },
        {
          hid: "googlebot",
          name: "googlebot",
          content: isDemoRoute ? "noindex, nofollow" : "index, follow",
        },
        { hid: "og:type", property: "og:type", content: "website" },
        { hid: "og:site_name", property: "og:site_name", content: "Christ Synagogue Ministries" },
        { hid: "og:title", property: "og:title", content: title },
        { hid: "og:description", property: "og:description", content: description },
        { hid: "og:url", property: "og:url", content: canonical },
        { hid: "og:image", property: "og:image", content: DEFAULT_OG_IMAGE },
        { hid: "og:locale", property: "og:locale", content: locale === "sw" ? "sw_TZ" : locale === "fr" ? "fr_FR" : locale === "ar" ? "ar" : "en_US" },
        { hid: "twitter:card", name: "twitter:card", content: "summary_large_image" },
        { hid: "twitter:title", name: "twitter:title", content: title },
        { hid: "twitter:description", name: "twitter:description", content: description },
        { hid: "twitter:image", name: "twitter:image", content: DEFAULT_OG_IMAGE },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: canonical,
        },
      ],
      script: isDemoRoute
        ? []
        : [
            {
              hid: "ld-church",
              type: "application/ld+json",
              json: {
                "@context": "https://schema.org",
                "@type": "Church",
                name: "Christ Synagogue Ministries",
                alternateName: "CSM",
                url: SITE_URL,
                logo: DEFAULT_OG_IMAGE,
                image: DEFAULT_OG_IMAGE,
                description,
                email: "info@csm.church",
                telephone: "+255753888885",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Majengo, Arusha",
                  addressCountry: "TZ",
                },
                sameAs: [
                  "https://web.facebook.com/Prophetbaraka.ogillo",
                  "https://www.tiktok.com/@baraka_motoulao",
                  "https://www.youtube.com/@ogillob",
                ],
              },
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
    });
    setTimeout(() => this.$nuxt.$loading.finish(), 500);
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
