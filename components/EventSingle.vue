<template>
  <!--Events Details Start-->
  <section class="event-details">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="events-details__img">
            <img
              src="~/assets/images/resources/event-details-img-1.jpg"
              alt=""
            />
            <div class="event-details__date-box">
              <p>
                20 <br />
                Jan
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-8 col-lg-7">
          <div class="event-details__left">
            <div class="event-details__top-content">
              <h2 class="event-details__title">Play for the world with us</h2>
              <p class="event-details__text-1">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text.
              </p>
              <p class="event-details__text-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum ley of type and scrambled it to make a type specimen
                book.
              </p>
            </div>
            <div class="event-details__bottom-content">
              <h3 class="event-details__bottom-title">Event Requirements</h3>
              <p class="event-details__bottom-text-1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
              <p class="event-details__bottom-text-2">
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum ley of type and scrambled it to make a
                type specimen book.
              </p>
              <nuxt-link
                to="/contact"
                class="event-details__bottom-content-btn thm-btn"
                ><i class="fas fa-arrow-circle-right"></i>Register Now</nuxt-link
              >
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-5">
          <div class="event-details__right">
            <div class="event-details__right-sidebar">
              <div class="event-details__right-sidebar-title">
                <h4>Event Details</h4>
              </div>
              <ul class="event-details__right-sidebar-list list-unstyled">
                <li>
                  <div class="left">
                    <p>Starting Time:</p>
                  </div>
                  <div class="right">
                    <h4>8:00AM to 2:00PM</h4>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <p>Date:</p>
                  </div>
                  <div class="right">
                    <h4>9 Jan, 2021</h4>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <p>Categroy:</p>
                  </div>
                  <div class="right">
                    <h4>Health</h4>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <p>Phone:</p>
                  </div>
                  <div class="right">
                    <h4>0753888885</h4>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <p>Website:</p>
                  </div>
                  <div class="right">
                    <h4>www.csm.church</h4>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <p>Location:</p>
                  </div>
                  <div class="right">
                    <h4>
                      Majengo, Arusha, Tanzania
                    </h4>
                  </div>
                </li>
              </ul>
            </div>
            <div class="event-details__right-map">
              <iframe
                src="https://maps.google.com/maps?q=Majengo%2C%20Arusha%2C%20Tanzania&z=16&ie=UTF8&output=embed"
                class="event-details__map-box"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Christ Synagogue Ministries — Majengo, Arusha"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--Events Details End-->
</template>
