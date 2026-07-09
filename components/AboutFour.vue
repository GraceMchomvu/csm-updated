<template>
  <!--Help Them Two Start-->
  <section class="help-them-two">
    <div class="container">
      <div class="row">
        <div class="col-xl-6">
          <div class="help-them-two__left">
            <div
              class="help-them-two-bg"
              :style="`background-image: url(${require(`~/assets/images/resources/help-them-two-bg.jpg`)})`"
            ></div>
            <div class="help-them-two__img">
              <img src="~images/resources/help-them-two-img-1.jpg" alt="" />
              <a
                href="https://www.youtube.com/watch?v=8DP4NgupAhI"
                class="help-them-two__video-btn video-popup"
                ><i class="fa fa-play"></i
              ></a>
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="help-them-two__right">
            <div class="section-title text-left">
              <span class="section-title__tagline">We Help Them</span>
              <h2 class="section-title__title">
                Trusted non profit <br />
                donation center
              </h2>
            </div>
            <div class="help-them-two__list-box">
              <ul class="help-them-two__list list-unstyled">
                <li>
                  <div class="help-them-two__icon-box">
                    <i class="fas fa-arrow-circle-right"></i>
                  </div>
                  <div class="help-them-two__text-box">
                    <h4>Best fundraising platform</h4>
                  </div>
                </li>
                <li>
                  <div class="help-them-two__icon-box">
                    <i class="fas fa-arrow-circle-right"></i>
                  </div>
                  <div class="help-them-two__text-box">
                    <h4>We can help to educate them</h4>
                  </div>
                </li>
              </ul>
              <ul
                class="help-them-two__list help-them-two__list-two list-unstyled"
              >
                <li>
                  <div class="help-them-two__icon-box">
                    <i class="fas fa-arrow-circle-right"></i>
                  </div>
                  <div class="help-them-two__text-box">
                    <h4>Best fundraising platform</h4>
                  </div>
                </li>
                <li>
                  <div class="help-them-two__icon-box">
                    <i class="fas fa-arrow-circle-right"></i>
                  </div>
                  <div class="help-them-two__text-box">
                    <h4>We can help to educate them</h4>
                  </div>
                </li>
              </ul>
            </div>
            <div class="help-them-two__bottom">
              <h3 class="help-them-two__bottom-title">
                Halpes is the largest global crowdfunding.
              </h3>
              <p class="help-them-two__bottom-text">
                Lorem ipsum dolor sit am adipi we help you ensure everyone is in
                the right jobs sicing elit, sed do consulting firms Et leggings
                across the nation simply free text tempor.
              </p>
            </div>
            <div class="help-them-two__donation-text-box">
              <h2>Start&nbsp;&nbsp;Donating</h2>
              <div class="help-them-two__donation-icon">
                <img
                  src="~images/resources/help-them-two__donation-icon.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--Help Them Two End-->
</template>
<script>
export default {
  mounted() {
    new GLightbox({
      selector: ".video-popup",
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
    });
  },
};
</script>
