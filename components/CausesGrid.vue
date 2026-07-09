<template>
  <section class="causes-one causes-page">
    <div class="container">
      <div class="row">
        <div
          class="col-xl-4 col-lg-6 col-md-6"
          v-for="item in causes"
          :key="item.index"
        >
          <CausesCard
            :title="item.title"
            :amount="item.amount"
            :category="item.category"
            :thumbnail="item.thumbnail"
            :excerpt="item.excerpt"
            :url="item.url"
          />
        </div>
        <!-- /.col-xl-4 col-lg-6 col-md-6 -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->
  </section>
  <!-- /.causes-one causes-page -->
</template>
<script>
import CausesCard from "~/components/CausesCard";
import data from "~/data/data.json";
export default {
  components: {
    CausesCard,
  },
  data() {
    return {
      causes: data.causes,
    };
  },
};
</script>
