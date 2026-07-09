<template>
  <div class="causes-details">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <CausesPost />
          <PostComments />
        </div>
        <!-- /.col-lg-8 -->
        <div class="col-lg-4">
          <CausesSidebar />
        </div>
        <!-- /.col-lg-4 -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->
  </div>
  <!-- /.causes-details -->
</template>
<script>
import CausesPost from "~/components/CausesPost";
import PostComments from "~/components/PostComments";
import CausesSidebar from "~/components/CausesSidebar";
export default {
  components: {
    CausesPost,
    PostComments,
    CausesSidebar,
  },
};
</script>
