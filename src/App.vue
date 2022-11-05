<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import SideBar from "./core/components/SideBar.vue";
import "./index.css";
import CustomParticles from "./components/Particles.vue";

export default {
  components: { SideBar, CustomParticles },
  computed: {},
};
</script>

<template>
  <div class="app">
    <SideBar class="sidebar" />
    <CustomParticles />
    <RouterView class="main" />
  </div>
</template>
<style scoped></style>
