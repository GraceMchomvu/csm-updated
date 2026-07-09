<template>
  <!--News Two Start-->
  <section class="news-two">
    <client-only>
      <div
        class="news-two-bg jarallax"
        data-jarallax
        data-speed="0.2"
        data-imgPosition="50% 0%"
      >
        <img
          src="~/assets/images/backgrounds/news-two-bg.jpg"
          class="jarallax-img"
        />
      </div>
    </client-only>

    <div class="news-two-bg-overlay"></div>
    <div class="container">
      <SectionTitle
        title="Latest news & articles directly <br /> coming from the blog"
        subTitle="Get Daily Updates"
      />
      <div class="row">
        <div v-for="card in news" :key="card.index" class="col-xl-4 col-lg-4">
          <u-animate-container>
            <u-animate
              name="fadeInUp"
              :delay="`${card.index + 0}00ms`"
              duration="1500ms"
              :iteration="1"
              :offset="0"
              animateClass="animated"
              :begin="false"
            >
              <NewsCard
                :title="card.title"
                :author="card.author"
                :commentCount="card.commentCount"
                :date="card.date"
                :thumbnail="card.thumbnail"
                :excerpt="card.excerpt"
                :url="card.url"
              />
            </u-animate>
          </u-animate-container>
        </div>
      </div>
    </div>
  </section>
  <!--News Two End-->
</template>
<script>
import { UAnimateContainer, UAnimate } from "vue-wow";
import NewsCard from "~/components/NewsCard";
import data from "~/data/data.json";
export default {
  components: {
    NewsCard,
    UAnimateContainer,
    UAnimate,
  },
  data() {
    return {
      news: data.news.slice(0, 3),
    };
  },
};
</script>
