<script>
import { RouterLink, RouterView } from "vue-router";
import SideBar from "./core/components/SideBar.vue";
import "./index.css";

export default {
	components: { SideBar },
};
</script>

<template>
	<div class="app">
		<SideBar />
		<RouterView class="main" />
	</div>
</template>

<style scoped></style>
