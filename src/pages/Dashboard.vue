<template>
	<div class="dashboard-wrapper text-center p-2">
		<div class="header h-1/10">
			<h1 class="font-bold text-4xl m-2">Dashboard</h1>
		</div>
		<div class="grid-wrapper h-9/10 grid gap-1 grid-cols-12 grid-rows-12">
			<savings-goal
				class="col-span-3 row-span-full bg-green-200 text-lg text-center rounded-lg"
			/>
			<paycheck-timeline
				class="col-span-6 row-span-3 bg-green-200 text-lg text-center rounded-lg"
			/>
			<weekly-bills
				class="col-span-3 row-span-6 bg-green-200 text-lg text-center rounded-lg"
			/>
			<credit-score
				class="col-span-3 row-span-3 bg-green-200 text-lg text-center rounded-lg"
			/>
			<weekly-focus
				class="col-span-3 row-span-3 bg-green-200 text-lg text-center rounded-lg"
			/>
			<accounts
				class="col-span-6 row-span-6 bg-green-200 text-lg text-center rounded-lg"
			/>
			<monthly-bills
				class="col-span-3 row-span-6 bg-green-200 text-lg text-center rounded-lg"
			/>
		</div>
	</div>
</template>

<script>
import SavingsGoal from "../components/dashboard/SavingsGoal.vue";
import PaycheckTimeline from "../components/dashboard/PaycheckTimeline.vue";
import CreditScore from "../components/dashboard/CreditScore.vue";
import WeeklyFocus from "../components/dashboard/WeeklyFocus.vue";
import Accounts from "../components/dashboard/Accounts.vue";
import WeeklyBills from "../components/dashboard/Bills-Weekly.vue";
import MonthlyBills from "../components/dashboard/Bills-Monthly.vue";

export default {
	components: {
		SavingsGoal,
		PaycheckTimeline,
		CreditScore,
		WeeklyFocus,
		Accounts,
		WeeklyBills,
		MonthlyBills,
	},
};
</script>

<style lang="scss" scoped>
.dashboard-wrapper {
	height: 90vh;
	width: 100%;
	overflow: hidden;
	.grid-wrapper {
		height: 90%;
	}
}
</style>
