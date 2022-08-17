<template>
	<div class="dashboard-wrapper text-center p-2">
		<div class="grid-wrapper">
			<div class="row">
				<savings-goal class="cell" />
			</div>
		</div>
	</div>
</template>

<script>
import SavingsGoal from "../components/dashboard/SavingsGoal.vue";
import PaycheckTimeline from "../components/dashboard/PaycheckTimeline.vue";
import CreditScore from "../components/dashboard/CreditScore.vue";
import WeeklyFocus from "../components/dashboard/WeeklyFocus.vue";
import Accounts from "../components/dashboard/Accounts.vue";
import Bills from "../components/dashboard/Bills.vue";

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
	width: 70vw;
	overflow: hidden;
	border: solid 4px green;
	.grid-wrapper {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		.row {
			width: 100%;
			.cell {
			}
		}
	}
}
</style>
