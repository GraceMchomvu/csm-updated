<template>
  <section class="news-one">
    <div class="container">
      <div class="row">
        <div class="col-xl-8 col-lg-8">
          <SectionTitle
            :title="secContent.title"
            :subTitle="secContent.subtitle"
            alignment="left"
          />
        </div>
        <div class="col-xl-4 col-lg-4">
          <div class="news-one__button-box">
            <nuxt-link to="/news" class="news-one__btn thm-btn"
              ><i class="fas fa-arrow-circle-right"></i>View More</nuxt-link
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 col-lg-6">
          <div class="news-one__left">
            <div class="news-one__img">
              <img
                :src="require(`~/assets/images${featuredPost.image}`)"
                :alt="featuredPost.title"
              />
              <nuxt-link :to="featuredPost.url">
                <i class="fa fa-plus"></i>
              </nuxt-link>
            </div>
            <div class="news-one__bottom">
              <ul class="list-unstyled news-one__meta">
                <li>{{ featuredPost.date }}</li>
                <li><span>/</span></li>
                <li>
                  <a href="#">{{ featuredPost.commentCount }} Comments</a>
                </li>
              </ul>
              <h3 class="news-one__title">
                <nuxt-link
                  :to="featuredPost.url"
                  v-html="featuredPost.title"
                ></nuxt-link>
              </h3>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6">
          <div class="news-one__right">
            <div
              class="news-one__right-single"
              v-for="(post, index) in posts"
              :key="index"
            >
              <div class="news-one__right-img">
                <img
                  :src="require(`~/assets/images${post.image}`)"
                  :alt="post.title"
                />
                <nuxt-link :to="post.url">
                  <i class="fa fa-plus"></i>
                </nuxt-link>
              </div>
              <div class="news-one__right-content">
                <ul class="list-unstyled news-one__right-meta">
                  <li>{{ post.date }}</li>
                  <li><span>/</span></li>
                  <li>
                    <a href="#">{{ post.commentCount }} Comments</a>
                  </li>
                </ul>
                <h3 class="news-one__right-title">
                  <nuxt-link :to="post.url" v-html="post.title"></nuxt-link>
                </h3>
              </div>
            </div>
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
      secContent: data.blogHome.sectionTitle,
      featuredPost: data.blogHome.posts[0],
      posts: data.blogHome.posts.slice(1, 4),
    };
  },
};
</script>
