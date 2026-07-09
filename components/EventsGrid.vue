<template>
  <section class="events-page">
    <div class="container">
      <div class="row">
        <div
          class="col-xl-4 col-lg-6 col-md-6"
          v-for="item in events"
          :key="item.index"
        >
          <u-animate-container>
            <u-animate
              name="fadeInUp"
              :delay="`${item.index + 0}00ms`"
              duration="1500ms"
              :iteration="1"
              :offset="40"
              animateClass="animated"
              :begin="false"
            >
              <EventCard
                :title="item.title"
                :url="item.url"
                :time="item.time"
                :thumbnail="item.thumbnail"
                :date="item.date"
              />
            </u-animate>
          </u-animate-container>
        </div>
        <!-- /.col-xl-4 col-lg-6 col-md-6 -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->
  </section>
  <!-- /.events-page -->
</template>
<script>
import { UAnimateContainer, UAnimate } from "vue-wow";
import EventCard from "~/components/EventCard";
import data from "~/data/data.json";
export default {
  components: {
    UAnimateContainer,
    UAnimate,
    EventCard,
  },
  computed: {
    events() {
      const items = this.$t("events.items");
      if (!Array.isArray(items)) return data.events;
      return data.events.map((item, index) => ({
        ...item,
        title: items[index] ? items[index].title : item.title,
        time: items[index] ? items[index].time : item.time,
      }));
    },
  },
  data() {
    return {};
  },
};
</script>
