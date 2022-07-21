<template>
	<div class="dashboard-wrapper">
		<h1 class="font-bold underline">Dashboard</h1>
		<savings-goal />
	</div>
</template>

<script>
import SavingsGoal from "../components/SavingsGoal.vue";

export default {
	components: { SavingsGoal },
};
</script>

<style lang="scss" scoped>
.dashboard-wrapper {
	height: 100vh;
	width: 100%;
}
</style>
