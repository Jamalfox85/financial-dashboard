<script setup>
import SideBar from "./core/components/SideBar.vue";
import "./index.css";
import { onMounted, ref } from "vue";
import Auth from "./components/Auth.vue";
import { supabase } from "./supabase";

const session = ref();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });
  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
</script>

<template>
  <div class="app">
    <div v-if="session" class="authenticated-layout">
      <SideBar :session="session" class="sidebar" />
      <RouterView class="main" />
    </div>
    <!-- <Account v-if="session" :session="session" /> -->
    <Auth v-else />
  </div>
</template>
<style scoped></style>
