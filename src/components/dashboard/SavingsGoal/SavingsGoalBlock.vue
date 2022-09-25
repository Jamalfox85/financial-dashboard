<template lang="">
	<div>
		<div class="block-wrapper">
			<div class="block-header">
				<h1 class="header-text">{{ name }}</h1>
				<div class="icons">
					<img
						class="icon"
						src="../../../assets/images/circle-plus.png"
						@click="showUpdateModal"
					/>
					<!-- <img class="icon" src="../../../assets/icons/circle-info-solid.svg" /> -->
					<img
						class="icon"
						src="../../../assets/icons/delete-circle-xmark-solid.svg"
						@click="deleteGoal"
					/>
				</div>
			</div>
			<div class="block-main">
				<div class="progress-bar">
					<div
						class="progress-bar-progress"
						:style="{
							width: (current / goal) * 100 + '%',
						}"
					></div>
				</div>
				<h5 class="progress-text">${{ current }} / ${{ goal }}</h5>
			</div>
		</div>
		<update-savings-modal
			:id="goalDetails.goalId"
			:goalName="goalDetails.name"
			:goalAmount="goalDetails.goalAmount"
			:currentAmount="goalDetails.currentAmount"
			:style="{ display: updateModalIsOopen ? 'flex' : 'none' }"
			@close="closeUpdateModal"
		/>
	</div>
</template>
<script>
import SavingsDataService from "../../../services/SavingsDataService";

import UpdateSavingsModal from "../../modals/UpdateSavingsModal.vue";

export default {
	props: ["goalId", "name", "current", "goal"],
	components: { UpdateSavingsModal },
	data() {
		return {
			updateModalIsOopen: false,
			goalDetails: {
				goalId: this.goalId,
				name: this.name,
				goalAmount: this.goal,
				currentAmount: this.current,
			},
		};
	},
	methods: {
		showUpdateModal() {
			this.updateModalIsOopen = true;
		},
		closeUpdateModal() {
			this.updateModalIsOopen = false;
		},
		deleteGoal() {
			let goalToDelete = this.goalId;
			SavingsDataService.delete(goalToDelete);
		},
	},
};
</script>
<style lang="scss" scoped>
.block-wrapper {
	height: 125px;
	width: 250px;
	border: solid 2px #363537;
	padding: 1em;
	border-radius: 12px;
	margin-bottom: 10px;
	.block-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.header-text {
			font-size: 16px;
			font-weight: bold;
			margin: 0;
		}
		.icons {
			display: flex;
			.icon {
				height: 20px;
				margin-right: 4px;
			}
		}
	}
	.block-main {
		width: 100%;
		margin-top: 1.5em;
		.progress-bar {
			height: 15px;
			width: 100%;
			background-color: #d9d9d9;
			border-radius: 16px;
			.progress-bar-progress {
				height: 100%;
				background-color: #0cce6b;
				border-radius: 16px;
			}
		}
		.progress-text {
			margin-top: 1em;
			font-size: 14px;
		}
	}
}
</style>
