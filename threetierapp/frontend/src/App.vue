<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "./layouts/Navbar.vue";
import Default from "./layouts/default.vue";
import { useUserStore } from "./stores/user";


const route = useRoute();
const store = useUserStore();

const layout = computed(() => {
  switch (route.meta.layout) {
    case 'navbar': // 👈 page with navbar layout
      return NavBar;
    case 'default': // 👈 page with no layout
      return Default;
    default: // 👈 fallback layout
      return Default;
  }
})
if (store.$state.user && store.$state.user?.token) {
  if (window.location.pathname == "/login") {
    window.location.replace(`${window.location.origin}/dashboard`);
  }
}
else{
  if (window.location.pathname != "/login") {
    window.location.replace(`${window.location.origin}/login`);
  }
}
</script>
<style scoped>
/* optional global styling */
</style>
