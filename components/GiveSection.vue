<template>
  <section id="give" class="give-one">
    <div class="container">
      <div class="section-title text-center">
        <span class="section-title__tagline">{{ $t("home.give.tagline") }}</span>
        <h2 class="section-title__title">{{ $t("home.give.title") }}</h2>
      </div>
      <p class="give-one__intro">{{ $t("home.give.intro") }}</p>

      <div class="row">
        <div
          class="col-xl-4 col-lg-4 col-md-6"
          v-for="(method, index) in methods"
          :key="index"
        >
          <div class="give-one__card">
            <div class="give-one__icon">
              <span :class="method.icon"></span>
            </div>
            <h3>{{ method.title }}</h3>
            <p class="give-one__label">{{ method.label }}</p>
            <ul class="list-unstyled give-one__details">
              <li v-for="(line, i) in method.details" :key="i">{{ line }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="give-one__verse">
        <p>{{ $t("home.give.verse") }}</p>
        <span>{{ $t("home.give.verseRef") }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import data from "~/data/data.json";

export default {
  computed: {
    methods() {
      return [
        {
          title: this.$t("home.give.mpesaTitle"),
          label: this.$t("home.give.mpesaLabel"),
          icon: "icon-chat",
          details: [
            this.$t("home.give.mpesaSend", {
              phone: data.site.giving.mpesa.number,
            }),
            this.$t("home.give.mpesaName"),
          ],
        },
        {
          title: this.$t("home.give.bankTitle"),
          label: this.$t("home.give.bankLabel"),
          icon: "icon-donation-1",
          details: [
            this.$t("home.give.bankAccount"),
            this.$t("home.give.bankName"),
          ],
        },
        {
          title: this.$t("home.give.personTitle"),
          label: this.$t("home.give.personLabel"),
          icon: "icon-heart",
          details: [
            this.$t("home.give.personDetail1"),
            this.$t("home.give.personDetail2"),
          ],
        },
      ];
    },
  },
};
</script>
