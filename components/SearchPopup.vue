<template>
  <div :class="`search-popup  ${searchPopup === true ? 'active ' : ' '}`">
    <div
      class="search-popup__overlay search-toggler"
      @click="searchPopupStatusChange"
    ></div>
    <!-- /.search-popup__overlay -->
    <div class="search-popup__content">
      <form @submit.prevent="runSearch">
        <label for="search" class="sr-only">{{ $t("common.search") }}</label>
        <input
          id="search"
          v-model.trim="query"
          type="text"
          :placeholder="$t('common.searchPlaceholder')"
        />
        <button type="submit" :aria-label="$t('common.search')" class="thm-btn">
          <i class="icon-magnifying-glass"></i>
        </button>
      </form>
    </div>
    <!-- /.search-popup__content -->
  </div>
  <!-- /.search-popup -->
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      query: "",
    };
  },
  computed: {
    searchPopup() {
      return this.$store.state.searchPopupStatus;
    },
  },
  methods: {
    ...mapMutations({
      searchPopupStatusChange: "changeSearchPopupStatus",
    }),
    runSearch() {
      const q = (this.query || "").toLowerCase();
      this.searchPopupStatusChange();
      this.query = "";

      if (
        q.includes("give") ||
        q.includes("donate") ||
        q.includes("mpesa") ||
        q.includes("offering")
      ) {
        this.$router.push("/#give");
        return;
      }
      if (
        q.includes("contact") ||
        q.includes("visit") ||
        q.includes("location") ||
        q.includes("map")
      ) {
        this.$router.push("/contact");
        return;
      }
      if (
        q.includes("about") ||
        q.includes("prophet") ||
        q.includes("ogillo")
      ) {
        this.$router.push("/about");
        return;
      }
      if (
        q.includes("service") ||
        q.includes("event") ||
        q.includes("worship")
      ) {
        this.$router.push("/events");
        return;
      }
      if (q.includes("gallery") || q.includes("photo")) {
        this.$router.push("/gallery");
        return;
      }
      // Default: sermons / messages
      this.$router.push("/news");
    },
  },
};
</script>
