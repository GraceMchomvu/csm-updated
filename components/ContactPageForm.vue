<template>
  <section class="contact-page">
    <div class="container">
      <div class="section-title text-center">
        <span class="section-title__tagline">{{ $t("contact.tagline") }}</span>
        <h2 class="section-title__title" v-html="$t('contact.title')" />
      </div>
      <div class="row">
        <div class="col-xl-6 col-lg-6">
          <div class="contact-page__left">
            <div class="contact-page__img">
              <img
                src="~images/resources/contact-page-img-1.jpg"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <p class="contact-page__text">{{ $t("contact.intro") }}</p>
            <div class="contact-page__contact-info">
              <ul class="contact-page__contact-list list-unstyled">
                <li>
                  <div class="icon">
                    <span class="icon-chat"></span>
                  </div>
                  <div class="text">
                    <p>{{ $t("common.callAnytime") }}</p>
                    <a :href="`tel:${site.phoneTel}`">{{ site.phone }}</a>
                  </div>
                </li>
                <li>
                  <div class="icon">
                    <span class="icon-message"></span>
                  </div>
                  <div class="text">
                    <p>{{ $t("common.sendEmail") }}</p>
                    <a :href="`mailto:${site.email}`">{{ site.email }}</a>
                  </div>
                </li>
                <li>
                  <div class="icon">
                    <span class="icon-address"></span>
                  </div>
                  <div class="text">
                    <p>{{ $t("common.visitUs") }}</p>
                    <h5>
                      <a
                        :href="site.maps"
                        target="_blank"
                        rel="noopener noreferrer"
                        >{{ $t("site.location") }}</a
                      >
                    </h5>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6">
          <div class="contact-page__form">
            <form
              class="contact-page__main-form"
              @submit.prevent="submitContact"
            >
              <div class="row">
                <div class="col-xl-12">
                  <div class="contact-page__input-box">
                    <input
                      v-model.trim="form.name"
                      type="text"
                      :placeholder="$t('contact.name')"
                      name="name"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6">
                  <div class="contact-page__input-box">
                    <input
                      v-model.trim="form.email"
                      type="email"
                      :placeholder="$t('contact.email')"
                      name="email"
                      required
                    />
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="contact-page__input-box">
                    <input
                      v-model.trim="form.subject"
                      type="text"
                      :placeholder="$t('contact.subject')"
                      name="subject"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-12">
                  <div class="contact-page__input-box">
                    <input
                      v-model.trim="form.phone"
                      type="text"
                      :placeholder="$t('contact.phone')"
                      name="phone"
                    />
                  </div>
                </div>
                <div class="col-xl-12">
                  <div class="contact-page__input-box">
                    <textarea
                      v-model.trim="form.message"
                      name="message"
                      :placeholder="$t('contact.message')"
                      required
                    ></textarea>
                  </div>
                  <p v-if="status" class="contact-page__status">{{ status }}</p>
                  <button type="submit" class="thm-btn contact-page__btn">
                    <i class="fas fa-arrow-circle-right"></i
                    >{{ $t("contact.submit") }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import data from "~/data/data.json";
export default {
  data() {
    return {
      site: data.site,
      status: "",
      form: {
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
      },
    };
  },
  methods: {
    submitContact() {
      const subject = encodeURIComponent(
        this.form.subject || "CSM Website Contact"
      );
      const body = encodeURIComponent(
        [
          `Name: ${this.form.name}`,
          `Email: ${this.form.email}`,
          `Phone: ${this.form.phone || "N/A"}`,
          "",
          this.form.message,
        ].join("\n")
      );
      window.location.href = `mailto:${this.site.email}?subject=${subject}&body=${body}`;
      this.status = this.$t("contact.sentHint");
    },
  },
};
</script>
<style scoped>
.contact-page__status {
  margin: 0 0 16px;
  color: var(--thm-primary);
  font-weight: 700;
}
.contact-page__left .text h5 a {
  color: inherit;
}
</style>
