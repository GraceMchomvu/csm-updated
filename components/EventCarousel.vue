<template>
  <!--Events One Start-->
  <section class="events-one">
    <div class="container">
      <div class="row">
        <div class="col-xl-4">
          <div class="events-one__left">
            <div class="section-title text-left">
              <span class="section-title__tagline">Upcoming Events</span>
              <h2 class="section-title__title">Check latest upcoming events</h2>
            </div>
            <p class="events-one__text">
              There are many variations of passages of lorem ipsum available but
              the majority have suffered.
            </p>
            <nuxt-link to="/events" class="events-one__btn thm-btn"
              ><i class="fas fa-arrow-circle-right"></i>Learn More</nuxt-link
            >
          </div>
        </div>
        <div class="col-xl-8">
          <div class="events-one__right">
            <div class="events-one__carousel">
              <client-only>
                <vue-tiny-slider v-bind="tinySliderOptions">
                  <div class="item">
                    <!--Events One Single-->
                    <div class="events-one__single">
                      <div class="events-one__img">
                        <img
                          src="~images/resources/events-one-img-1.jpg"
                          alt=""
                        />
                        <div class="events-one__date-box">
                          <p>
                            20 <br />
                            Jan
                          </p>
                        </div>
                        <div class="events-one__bottom">
                          <p><i class="far fa-clock"></i>8:00 pm</p>
                          <h3 class="events-one__bottom-title">
                            <a href="/events-details"
                              >Play for the <br />
                              world with us</a
                            >
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /.item -->
                  <div class="item">
                    <!--Events One Single-->
                    <div class="events-one__single">
                      <div class="events-one__img">
                        <img
                          src="~images/resources/events-one-img-2.jpg"
                          alt=""
                        />
                        <div class="events-one__date-box">
                          <p>
                            20 <br />
                            Jan
                          </p>
                        </div>
                        <div class="events-one__bottom">
                          <p><i class="far fa-clock"></i>8:00 pm</p>
                          <h3 class="events-one__bottom-title">
                            <a href="/events-details"
                              >Mission for Fresh
                              <br />
                              & Clean Water</a
                            >
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /.item -->
                  <div class="item">
                    <!--Events One Single-->
                    <div class="events-one__single">
                      <div class="events-one__img">
                        <img
                          src="~images/resources/events-one-img-3.jpg"
                          alt=""
                        />
                        <div class="events-one__date-box">
                          <p>
                            20 <br />
                            Jan
                          </p>
                        </div>
                        <div class="events-one__bottom">
                          <p><i class="far fa-clock"></i>8:00 pm</p>
                          <h3 class="events-one__bottom-title">
                            <a href="/events-details"
                              >Education for <br />
                              poor children</a
                            >
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /.item -->
                  <div class="item">
                    <!--Events One Single-->
                    <div class="events-one__single">
                      <div class="events-one__img">
                        <img
                          src="~images/resources/events-one-img-1.jpg"
                          alt=""
                        />
                        <div class="events-one__date-box">
                          <p>
                            20 <br />
                            Jan
                          </p>
                        </div>
                        <div class="events-one__bottom">
                          <p><i class="far fa-clock"></i>8:00 pm</p>
                          <h3 class="events-one__bottom-title">
                            <a href="/events-details"
                              >Play for the <br />
                              world with us</a
                            >
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /.item -->
                  <div class="item">
                    <!--Events One Single-->
                    <div class="events-one__single">
                      <div class="events-one__img">
                        <img
                          src="~images/resources/events-one-img-2.jpg"
                          alt=""
                        />
                        <div class="events-one__date-box">
                          <p>
                            20 <br />
                            Jan
                          </p>
                        </div>
                        <div class="events-one__bottom">
                          <p><i class="far fa-clock"></i>8:00 pm</p>
                          <h3 class="events-one__bottom-title">
                            <a href="/events-details"
                              >Mission for Fresh
                              <br />
                              & Clean Water</a
                            >
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /.item -->
                  <div class="item">
                    <!--Events One Single-->
                    <div class="events-one__single">
                      <div class="events-one__img">
                        <img
                          src="~images/resources/events-one-img-3.jpg"
                          alt=""
                        />
                        <div class="events-one__date-box">
                          <p>
                            20 <br />
                            Jan
                          </p>
                        </div>
                        <div class="events-one__bottom">
                          <p><i class="far fa-clock"></i>8:00 pm</p>
                          <h3 class="events-one__bottom-title">
                            <a href="/events-details"
                              >Education for <br />
                              poor children</a
                            >
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /.item -->
                </vue-tiny-slider>
              </client-only>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--Events One End-->
</template>
<script>
export default {
  data() {
    return {
      tinySliderOptions: {
        loop: true,
        items: 1,
        gutter: 30,
        mouseDrag: true,
        autoplay: true,
        nav: false,
        controlsPosition: "bottom",
        controlsText: [
          "<i class='icon-right-arrow left'></i>",
          "<i class='icon-right-arrow'></i>",
        ],
        autoplayButtonOutput: false,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          800: {
            items: 2,
          },
          1024: {
            items: 3,
          },
          1200: {
            items: 3,
          },
        },
      },
    };
  },
};
</script>
