<template>
	<div class="dashboard-wrapper text-center p-2">
		<div class="grid-wrapper">
			<div class="placeholder2" />
			<savings-goal class="savings-goal" />
			<div class="placeholder" />
			<div class="placeholder3" />
			<bills class="bills" />
			<!-- <div class="row">
				<div class="cell" />
				<div class="cell" />
				<div class="cell" />
				<bills class="cell" />
			</div> -->
		</div>
	</div>
</template>

<script>
import SavingsGoal from "../components/dashboard/SavingsGoal/SavingsGoal.vue";
import PaycheckTimeline from "../components/dashboard/PaycheckTimeline.vue";
import CreditScore from "../components/dashboard/CreditScore.vue";
import WeeklyFocus from "../components/dashboard/WeeklyFocus.vue";
import Accounts from "../components/dashboard/Accounts.vue";
import Bills from "../components/dashboard/Bills/Bills.vue";

export default {
	components: {
		SavingsGoal,
		PaycheckTimeline,
		CreditScore,
		WeeklyFocus,
		Accounts,
		Bills,
	},
};
</script>

<style lang="scss" scoped>
.dashboard-wrapper {
	height: 90vh;
	width: 90%;
	.grid-wrapper {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: 12;
		grid-template-rows: 12;
		border: solid 8px green;
		.savings-goal {
			grid-column: 1/4;
			grid-row: 7/12;
		}
		.placeholder {
			grid-column: 4/7;
			grid-row: 1/13;
			background-color: #222;
		}
		.placeholder2 {
			grid-column: 1/4;
			grid-row: 1/7;
			background-color: #555;
		}
		.placeholder3 {
			grid-column: 7/10;
			grid-row: 1/13;
			background-color: #999;
		}
		.bills {
			grid-column: 10/13;
			grid-row: 1/13;
		}
	}
}
</style>
