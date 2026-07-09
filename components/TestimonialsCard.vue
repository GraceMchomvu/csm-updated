<template>
  <div :class="`testimonial-one__single ${className}`">
    <div class="testimonial-one__mark" aria-hidden="true">”</div>
    <p class="testimonial-one__text" v-html="excerpt"></p>
    <div class="testimonial-one__footer">
      <span class="testimonial-one__line"></span>
      <div class="testimonial-one__client-name">
        <h3 v-html="name"></h3>
        <p v-html="designation"></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    className: {
      type: String,
    },
    designation: {
      type: String,
    },
    name: {
      type: String,
    },
    excerpt: {
      type: String,
    },
  },
};
</script>
