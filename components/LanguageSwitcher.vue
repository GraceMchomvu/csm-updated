<template>
  <div class="language-switcher" :class="{ open: open }">
    <button
      type="button"
      class="language-switcher__btn"
      :aria-label="$t('common.language')"
      :aria-expanded="open ? 'true' : 'false'"
      @click="open = !open"
    >
      <i class="fas fa-globe"></i>
      <span>{{ currentLabel }}</span>
      <i class="fas fa-chevron-down language-switcher__caret"></i>
    </button>
    <ul v-show="open" class="language-switcher__menu list-unstyled">
      <li v-for="locale in locales" :key="locale.code">
        <button
          type="button"
          class="language-switcher__option"
          :class="{ active: locale.code === $i18n.locale }"
          @click="changeLocale(locale.code)"
        >
          {{ locale.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  computed: {
    locales() {
      return this.$i18n.locales || [];
    },
    currentLabel() {
      const current = this.locales.find((l) => l.code === this.$i18n.locale);
      return current ? current.name : "English";
    },
  },
  mounted() {
    document.addEventListener("click", this.onDocClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onDocClick);
  },
  methods: {
    changeLocale(code) {
      this.open = false;
      if (code === this.$i18n.locale) return;
      this.$i18n.setLocale(code);
      if (process.client) {
        document.documentElement.setAttribute("lang", code);
        document.documentElement.setAttribute(
          "dir",
          code === "ar" ? "rtl" : "ltr"
        );
      }
    },
    onDocClick(event) {
      if (!this.$el.contains(event.target)) {
        this.open = false;
      }
    },
  },
};
</script>

<style scoped>
.language-switcher {
  position: relative;
  margin-right: 18px;
  z-index: 20;
}
.language-switcher__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #f3f7f6;
  border: 1px solid #0f8a7b;
  color: #0f8a7b;
  border-radius: 30px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}
.language-switcher__btn:hover,
.language-switcher.open .language-switcher__btn {
  background: #0f8a7b;
  border-color: #0f8a7b;
  color: #fff;
}
.language-switcher__caret {
  font-size: 10px;
  opacity: 0.85;
}
.language-switcher__menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 160px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  padding: 8px 0;
  z-index: 1000;
  margin: 0;
}
.language-switcher__option {
  display: block;
  width: 100%;
  text-align: left;
  background: transparent;
  border: 0;
  padding: 10px 16px;
  color: #222;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.language-switcher__option:hover,
.language-switcher__option.active {
  background: #f3f7f6;
  color: #0f8a7b;
}
html[dir="rtl"] .language-switcher {
  margin-right: 0;
  margin-left: 18px;
}
html[dir="rtl"] .language-switcher__menu {
  right: auto;
  left: 0;
}
html[dir="rtl"] .language-switcher__option {
  text-align: right;
}

@media (max-width: 991px) {
  .language-switcher__btn span,
  .language-switcher__caret {
    display: none;
  }
  .language-switcher__btn {
    width: 40px;
    height: 40px;
    padding: 0;
    justify-content: center;
    border-radius: 50%;
    font-size: 16px;
  }
}
</style>
