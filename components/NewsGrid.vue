<template>
  <!--News Page Start-->
  <section class="news-page">
    <div class="container">
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
  <!--News Page End-->
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
  computed: {
    news() {
      const items = this.$t("news.items");
      if (!Array.isArray(items)) return data.news;
      return data.news.map((item, index) => ({
        ...item,
        title: items[index] ? items[index].title : item.title,
        excerpt: items[index] ? items[index].excerpt : item.excerpt,
      }));
    },
  },
  data() {
    return {};
  },
};
</script>
