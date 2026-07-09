<template>
  <div
    :class="`section-title text-${
      undefined === alignment ? 'center' : alignment
    }`"
  >
    <span class="section-title__tagline">{{ subTitle }}</span>
    <h2 class="section-title__title" v-html="title"></h2>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    alignment: {
      type: String,
    },
  },
};
</script>
