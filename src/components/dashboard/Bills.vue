<template lang="">
	<div>
		<h1>Bills</h1>
		<div>
			<weekly-bills class="bg-green-200 text-lg text-center rounded-lg" />
			<monthly-bills class="bg-green-200 text-lg text-center rounded-lg" />
		</div>
	</div>
</template>
<script>
import WeeklyBills from "./Bills-Weekly.vue";
import MonthlyBills from "./Bills-Monthly.vue";
export default {
	components: {
		WeeklyBills,
		MonthlyBills,
	},
};
</script>
<style lang="scss">
.checkbox-list {
	// height: 200px;
	// width: 200px;
	// border: solid 2px red;
	display: flex;
	flex-direction: column;
	align-items: center;
	.list-item {
		display: flex;
		margin: 1em 0;
		width: 75%;
		justify-content: space-evenly;
		.checkbox {
			height: 24px;
			width: 24px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: solid 2px black;
			color: green;
		}
	}
}
</style>
