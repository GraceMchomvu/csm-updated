<template>
  <!--Become Volunteer Page Start-->
  <section class="become-volunteer-page">
    <div class="container">
      <div class="section-title text-center">
        <span class="section-title__tagline">Register Now</span>
        <h2 class="section-title__title">
          Let’s join our community to <br />
          become a volunteer
        </h2>
      </div>
      <div class="row">
        <div class="col-xl-6 col-lg-6">
          <div class="become-volunteer-page__left">
            <div class="become-volunteer-page__img">
              <img src="~images/resources/become-a-volunteer.jpg" alt="" />
            </div>
            <h3 class="become-volunteer-page__title">Requirements</h3>
            <p class="become-volunteer-page__text">
              Aliquam hendrerit a augue insu image pellentes que id erat quis
              sollicitud null mattis Ipsum is simply dummy typesetting industry.
              Alienum phaedrum torquatos nec eu, vis detraxit periculis ex,
              nihil expetendis in meifn pericula euripidis, hinc partem ei est.
              Eos ei nisl graecis, aperiri consequat anlorem tincidun.
            </p>
            <ul class="become-volunteer-page__list list-unstyled">
              <li>
                <div class="icon">
                  <i class="fas fa-arrow-circle-right"></i>
                </div>
                <div class="text">
                  <p>Making this first true generator simply text</p>
                </div>
              </li>
              <li>
                <div class="icon">
                  <i class="fas fa-arrow-circle-right"></i>
                </div>
                <div class="text">
                  <p>Many desktop publish packages nothing</p>
                </div>
              </li>
              <li>
                <div class="icon">
                  <i class="fas fa-arrow-circle-right"></i>
                </div>
                <div class="text">
                  <p>Lorem Ipsum is not simply free text</p>
                </div>
              </li>
              <li>
                <div class="icon">
                  <i class="fas fa-arrow-circle-right"></i>
                </div>
                <div class="text">
                  <p>If you are going to passage</p>
                </div>
              </li>
              <li>
                <div class="icon">
                  <i class="fas fa-arrow-circle-right"></i>
                </div>
                <div class="text">
                  <p>It has roots in a piece</p>
                </div>
              </li>
            </ul>
            <div class="become-volunteer-page__phone">
              <div class="become-volunteer-page__phone-icon">
                <span class="icon-chat"></span>
              </div>
              <div class="become-volunteer-page__phone-text">
                <p>Call Anytime</p>
                <a href="tel:+255753888885">0753888885</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6">
          <div class="become-volunteer-page__right">
            <form
              class="become-volunteer-page__form"
              @submit.prevent="submitVolunteer"
            >
              <div class="row">
                <div class="col-xl-12">
                  <div class="become-volunteer-page__input">
                    <input
                      v-model.trim="form.name"
                      type="text"
                      placeholder="Your name"
                      name="name"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6">
                  <div class="become-volunteer-page__input">
                    <input
                      v-model.trim="form.email"
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      required
                    />
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="become-volunteer-page__input">
                    <input
                      v-model.trim="form.phone"
                      type="text"
                      placeholder="Phone Number"
                      name="phone"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-12">
                  <div class="become-volunteer-page__input">
                    <input
                      v-model.trim="form.address"
                      type="text"
                      placeholder="Address"
                      name="address"
                    />
                  </div>
                </div>
                <div class="col-xl-12">
                  <div class="become-volunteer-page__input">
                    <input
                      v-model.trim="form.dob"
                      type="text"
                      placeholder="Date of Birth"
                      name="Date of Birth"
                    />
                  </div>
                </div>
                <div class="col-xl-12">
                  <div class="become-volunteer-page__input">
                    <input
                      v-model.trim="form.occupation"
                      type="text"
                      placeholder="Occupation"
                      name="Occupation"
                    />
                  </div>
                </div>
                <div class="col-xl-12">
                  <div class="become-volunteer-page__input">
                    <textarea
                      v-model.trim="form.message"
                      name="message"
                      placeholder="Write message"
                      required
                    ></textarea>
                  </div>
                  <p v-if="status" class="become-volunteer-page__status">
                    {{ status }}
                  </p>
                  <button
                    type="submit"
                    class="thm-btn become-volunteer-page__btn"
                  >
                    <i class="fas fa-arrow-circle-right"></i>Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--Become Volunteer Page End-->
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
        phone: "",
        address: "",
        dob: "",
        occupation: "",
        message: "",
      },
    };
  },
  methods: {
    submitVolunteer() {
      const subject = encodeURIComponent("CSM Volunteer / Ministry Interest");
      const body = encodeURIComponent(
        [
          `Name: ${this.form.name}`,
          `Email: ${this.form.email}`,
          `Phone: ${this.form.phone || "N/A"}`,
          `Address: ${this.form.address || "N/A"}`,
          `Date of Birth: ${this.form.dob || "N/A"}`,
          `Occupation: ${this.form.occupation || "N/A"}`,
          "",
          this.form.message,
        ].join("\n")
      );
      window.location.href = `mailto:${this.site.email}?subject=${subject}&body=${body}`;
      this.status = "Your email app will open so you can send this to CSM.";
    },
  },
};
</script>

<style scoped>
.become-volunteer-page__status {
  margin: 0 0 16px;
  color: var(--thm-primary);
  font-weight: 700;
}
</style>

