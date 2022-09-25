<template>
	<div>
		<div class="savingsGoal_wrapper">
			<div class="header">
				<h1>Savings Goals</h1>
				<img
					src="../../../assets/images/circle-plus.png"
					@click="toggleModal('open')"
				/>
			</div>
			<div class="savings-goals">
				<savings-goal-block
					class="savings-block"
					v-for="goal in goals"
					:goalId="goal.id"
					:name="goal.savings_name"
					:current="goal.current_amount"
					:goal="goal.goal_amount"
				/>
			</div>
		</div>
		<add-savings-goal-modal
			:style="{ display: showModal ? 'flex' : 'none' }"
			@close="toggleModal"
		/>
	</div>
</template>

<script>
import MainDataService from "../../../services/MainDataService";
import SavingsDataService from "../../../services/SavingsDataService";

import SavingsGoalBlock from "./SavingsGoalBlock.vue";
import AddSavingsGoalModal from "../../modals/AddSavingsGoalModal.vue";

export default {
	components: { SavingsGoalBlock, AddSavingsGoalModal },
	data() {
		return {
			goals: {},
			showModal: false,
		};
	},
	methods: {
		toggleModal(state) {
			if (state === "open") {
				this.showModal = true;
			} else this.showModal = false;
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
		.savings-block {
			margin: 10px 0;
		}
	}
}
</style>
