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
          class="col-xl-3 col-lg-6 col-md-6"
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
      const giving = data.site.giving;
      return [
        {
          title: this.$t("home.give.bankPersonalTitle"),
          label: this.$t("home.give.bankPersonalLabel"),
          icon: "icon-donation-1",
          details: [
            this.$t("home.give.bankAccount", {
              account: giving.bankPersonal.account,
            }),
            this.$t("home.give.accountName", {
              name: giving.bankPersonal.name,
            }),
          ],
        },
        {
          title: this.$t("home.give.bankMinistryTitle"),
          label: this.$t("home.give.bankMinistryLabel"),
          icon: "icon-donation-1",
          details: [
            this.$t("home.give.bankAccount", {
              account: giving.bankMinistry.account,
            }),
            this.$t("home.give.accountName", {
              name: giving.bankMinistry.name,
            }),
          ],
        },
        {
          title: this.$t("home.give.lipaTitle"),
          label: this.$t("home.give.lipaLabel"),
          icon: "icon-chat",
          details: [
            this.$t("home.give.lipaNumber", {
              number: giving.lipaNamba.number,
            }),
            this.$t("home.give.accountName", {
              name: giving.lipaNamba.name,
            }),
          ],
        },
        {
          title: this.$t("home.give.mpesaTitle"),
          label: this.$t("home.give.mpesaLabel"),
          icon: "icon-chat",
          details: [
            this.$t("home.give.mpesaSend", {
              phone: giving.mpesa.number,
            }),
            this.$t("home.give.accountName", {
              name: giving.mpesa.name,
            }),
          ],
        },
      ];
    },
  },
};
</script>
