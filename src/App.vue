<script>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./core/components/Header.vue";

export default {
	components: { NavBar },
};
</script>

<template>
	<NavBar />
	<RouterView class="main" />
</template>

<style scoped></style>
