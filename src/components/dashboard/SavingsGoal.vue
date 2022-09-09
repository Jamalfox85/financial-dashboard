<template>
	<div class="savingsGoal_wrapper">
		<div class="header">
			<h1>Savings Goal</h1>
			<img :src="expandDots" />
		</div>
		<div>
			<h1 @click="getGoals">Get Goals</h1>
		</div>
		<div class="savings-goals">
			<div
				class="savings-card"
				v-for="goal in goals.slice(0, savingsGoalsToDisplay)"
			>
				<div class="header">
					<h2 class="title">{{ goal.name }}</h2>
					<img :src="circlePlus" @click="toggleView()" />
				</div>
				<div class="add-money-menu" v-if="showAddOption === true">
					<label>How much would you like to add?</label>
					<div class="input-group">
						<input :maxLength="goal.max.toString().length" />
						<button @click="addMoney(goal.id)">Add</button>
					</div>
				</div>
				<div class="progress">
					<div class="progress-bar">
						<div
							class="progress-bar-progress"
							:style="{ width: (goal.current / goal.max) * 100 + '%' }"
						></div>
					</div>
					<h5 class="progress-text">${{ goal.current }} / ${{ goal.max }}</h5>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import expandDots from "../../assets/images/expand-details.png";
import circlePlus from "../../assets/images/circle-plus.png";

import MainDataService from "../../services/MainDataService";

export default {
	data() {
		return {
			goals: [
				{
					id: 1,
					name: "Vacation",
					current: 100,
					max: 1000,
				},
				{
					id: 2,
					name: "Short Term",
					current: 50,
					max: 100,
				},
				{
					id: 3,
					name: "Christmas",
					current: 750,
					max: 1000,
				},
				{
					id: 4,
					name: "Clothes",
					current: 4750,
					max: 10000,
				},
				{
					id: 5,
					name: "Groceries",
					current: 100,
					max: 1000,
				},
				{
					id: 6,
					name: "Decorations",
					current: 50,
					max: 100,
				},
				{
					id: 7,
					name: "Long Term",
					current: 750,
					max: 1000,
				},
				{
					id: 8,
					name: "Wine",
					current: 7500,
					max: 10000,
				},
			],
			savingsGoalsToDisplay: 4,
			expandDots: expandDots,
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
			MainDataService.getAll().then((res) => {
				console.log(res);
				console.log(res.data);
			});
		},
	},
};
</script>

<style scoped lang="scss">
.savingsGoal_wrapper {
	padding: 1em;
	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1em;
		h1 {
			font-size: 24px;
			font-weight: bold;
			width: fit-content;
		}
		img {
			height: fit-content;
		}
	}
	.savings-goals {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 2em;

		.savings-card {
			width: 250px;
			display: flex;
			flex-direction: column;
			padding: 1em;
			margin: 0 2em 1em 2em;
			border-radius: 16px;
			background-color: #363537;
			color: #edf2ef;
			.header {
				/* also importing styles from higher level .header */
			}
			.add-money-menu {
				display: flex;
				flex-direction: column;
				align-items: center;
				label {
					font-size: 14px;
					margin-bottom: 4px;
				}
				.input-group {
					height: 1.75em;
					width: 150px;
					display: flex;
					justify-content: space-between;
					overflow: hidden;
					border-radius: 16px;
					background-color: #edf2ef;
					input {
						width: 60%;
						text-align: center;
						outline: none;
						background-color: #edf2ef;
						color: #363537;
					}
					button {
						width: 50%;
						font-size: 14px;
						border-radius: 16px;
						background-color: #0cce6b;
					}
				}
			}
			.progress {
				height: 40px;
				width: 100%;
				margin: 1em auto;
				.progress-bar {
					height: 20px;
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
					margin-top: 0.5em;
				}
			}
		}
	}
}
</style>
