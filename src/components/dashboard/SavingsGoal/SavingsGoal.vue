<template>
	<div class="savingsGoal_wrapper">
		<div class="header">
			<h1>Savings Goals</h1>
			<img src="../../../assets/images/circle-plus.png" />
		</div>
		<div class="savings-goals">
			<savings-goal-block
				v-for="goal in goals"
				:name="goal.savings_name"
				:current="goal.current_amount"
				:goal="goal.goal_amount"
			/>
		</div>
	</div>
</template>

<script>
import circlePlus from "../../../assets/images/circle-plus.png";

import MainDataService from "../../../services/MainDataService";
import SavingsDataService from "../../../services/SavingsDataService";

import SavingsGoalBlock from "./SavingsGoalBlock.vue";

export default {
	components: { SavingsGoalBlock },
	data() {
		return {
			goals: null,
			savingsGoalsToDisplay: 4,
			circlePlus: circlePlus,
			showAddOption: false,
		};
	},
	methods: {
		toggleView() {
			this.showAddOption = !this.showAddOption;
		},
		updateBar(d) {
			this.currentBar = this.currentBar + d;
			if (this.currentBar >= this.goals.length) {
				this.currentBar = 0;
			} else if (this.currentBar <= -1) {
				this.currentBar = this.goals.length - 1;
			}
		},
		addMoney(i) {
			let target = this.goals[i - 1].current;
			console.log(target + 20);
			target = target + 20;
		},
		getGoals() {
			console.log("PING");
			// MainDataService.getAll().then((res) => {
			// 	console.log(res);
			// 	console.log(res.data);
			// });
		},
	},
	mounted() {
		SavingsDataService.getAll().then((res) => {
			this.goals = res.data;
		});
	},
};
</script>

<style scoped lang="scss">
.savingsGoal_wrapper {
	padding: 1em;
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1em;
		width: 250px;
		h1 {
			font-size: 24px;
			font-weight: bold;
			width: fit-content;
		}
		img {
			height: 28px;
		}
	}
	.savings-goals {
		display: flex;
		flex-direction: column;
		margin-top: 2em;
	}
}
</style>
