<template>
  <!--Team One Single-->
  <div class="team-one__single">
    <div class="team-one__img-box">
      <div class="team-one__img">
        <img :src="require(`~/assets/images${thumbnail}`)" :alt="title" />
      </div>
      <div class="team-one__member-name">
        <h2>{{ title }}</h2>
      </div>
    </div>
    <div class="team-one__content">
      <h4 class="team-one__member-title">{{ designation }}</h4>
      <p class="team-one__text-box" v-html="excerpt"></p>
    </div>
    <div class="team-one__social">
      <a :href="item.url" v-for="item in social" :key="item.index">
        <i :class="item.icon"></i>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    designation: {
      type: String,
    },
    social: {
      type: Array,
    },
    thumbnail: {
      type: String,
    },
    excerpt: {
      type: String,
    },
  },
};
</script>
