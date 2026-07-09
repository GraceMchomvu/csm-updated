<template>
  <!--News Details Start-->
  <section class="news-details">
    <div class="container">
      <div class="row">
        <div class="col-xl-8 col-lg-7">
          <Post />
          <PostAuthor />
          <PostComments />
        </div>
        <div class="col-xl-4 col-lg-5">
          <NewsSidebar />
        </div>
      </div>
    </div>
  </section>
  <!--News Details End-->
</template>
<script>
import Post from "~/components/Post";
import PostAuthor from "~/components/PostAuthor";
import PostComments from "~/components/PostComments";
import NewsSidebar from "~/components/NewsSidebar";
export default {
  components: {
    Post,
    PostAuthor,
    PostComments,
    NewsSidebar,
  },
};
</script>
