<template>
  <section class="team-one team-page">
    <div class="container">
      <div class="row">
        <div
          class="col-xl-4 col-lg-4"
          v-for="item in volunteers"
          :key="item.index"
        >
          <VolunteerCard
            :thumbnail="item.thumbnail"
            :title="item.title"
            :designation="item.designation"
            :excerpt="item.excerpt"
            :social="item.social"
          />
        </div>
        <!-- /.col-xl-4 col-lg-4 -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->
  </section>
  <!-- /.team-one team-page -->
</template>
<script>
import VolunteerCard from "~/components/VolunteerCard";
import data from "~/data/data.json";
export default {
  components: {
    VolunteerCard,
  },
  computed: {
    volunteers() {
      const items = this.$t("volunteers.items");
      if (!Array.isArray(items)) return data.volunteers;
      return data.volunteers.map((item, index) => ({
        ...item,
        title: items[index] ? items[index].title : item.title,
        designation: items[index] ? items[index].designation : item.designation,
        excerpt: items[index] ? items[index].excerpt : item.excerpt,
      }));
    },
  },
  data() {
    return {};
  },
};
</script>
