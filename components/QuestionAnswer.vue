<template>
  <!--We Inspire Start-->
  <section class="we-inspire">
    <div
      class="we-inspire-bg"
      :style="`background-image: url(${require(`~/assets/images/backgrounds/we-inspire-bg.jpg`)})`"
    ></div>
    <div class="we-inspire-bg-overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-xl-6 col-lg-6">
          <div class="we-inspire__left">
            <div class="section-title text-left">
              <span class="section-title__tagline">Question & Answers</span>
              <h2 class="section-title__title">
                We inspire and help them live better
              </h2>
            </div>
            <div class="we-inspire__faq">
              <div class="accrodion-grp accordion-container faq-one-accrodion">
                <div class="accrodion ac">
                  <div class="accrodion-title ac-header">
                    <h4 class="ac-trigger">We help to create better lives</h4>
                  </div>
                  <div class="accrodion-content ac-panel">
                    <div class="inner">
                      <p>
                        There are many variations of passages the majority have
                        suffered alteration in some fo injected humour, or
                        randomised words believable.
                      </p>
                    </div>
                    <!-- /.inner -->
                  </div>
                </div>
                <div class="accrodion ac">
                  <div class="accrodion-title ac-header">
                    <h4 class="ac-trigger">We help to create better lives</h4>
                  </div>
                  <div class="accrodion-content ac-panel">
                    <div class="inner">
                      <p>
                        There are many variations of passages the majority have
                        suffered alteration in some fo injected humour, or
                        randomised words believable.
                      </p>
                    </div>
                    <!-- /.inner -->
                  </div>
                </div>
                <div class="accrodion ac">
                  <div class="accrodion-title ac-header">
                    <h4 class="ac-trigger">We help to create better lives</h4>
                  </div>
                  <div class="accrodion-content ac-panel">
                    <div class="inner">
                      <p>
                        There are many variations of passages the majority have
                        suffered alteration in some fo injected humour, or
                        randomised words believable.
                      </p>
                    </div>
                    <!-- /.inner -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6">
          <div class="we-inspire__right">
            <div class="we-inspire__img">
              <img src="~images/resources/we-inspire-img.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--We Inspire End-->
</template>

<script>
export default {
  mounted() {
    new Accordion(".accordion-container", {
      openOnInit: [1],
    });
  },
};
</script>
