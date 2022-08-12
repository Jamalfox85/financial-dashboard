<template>
	<div class="savingsGoal_wrapper">
		<h1>Savings Goal</h1>
		<div class="savings-bars">
			<div
				v-for="(goal, index) in goals"
				class="bar-wrapper"
				:class="{ active: currentBar === index }"
			>
				<div
					class="progress-bar"
					:style="{ height: (goal.current / goal.max) * 100 + '%' }"
				></div>
			</div>
		</div>
		<div class="savings-buttons">
			<div class="carousel-controls">
				<button @click="updateBar(-1)">Prev</button>
				<button @click="updateBar(1)">Next</button>
			</div>
			<div class="savings-controls">
				<button @click="addMoney()">Deduct</button>
				<button @click="addMoney(20)">Add</button>
			</div>
		</div>
	</div>
</template>

<script>
const savingsGoals = [
	{
		current: 100,
		max: 1000,
	},
	{
		current: 50,
		max: 100,
	},
	{
		current: 750,
		max: 1000,
	},
	{
		current: 750,
		max: 1000,
	},
];
export default {
	data() {
		return {
			goals: [
				{
					current: 100,
					max: 1000,
				},
				{
					current: 50,
					max: 100,
				},
				{
					current: 750,
					max: 1000,
				},
				{
					current: 750,
					max: 1000,
				},
			],
			currentBar: 1,
			test: 0,
		};
	},
	methods: {
		updateBar(d) {
			this.currentBar = this.currentBar + d;
			if (this.currentBar >= this.goals.length) {
				this.currentBar = 0;
			} else if (this.currentBar <= -1) {
				this.currentBar = this.goals.length - 1;
			}
		},
		addMoney(s) {
			let target = this.goals[this.currentBar].current;
			target = target + s;
			this.test = this.test + s;
			console.log(target, this.test);
		},
	},
};
</script>

<style scoped lang="scss">
.savingsGoal_wrapper {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	.savings-bars {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		border: solid 2px red;
		height: 80%;
		width: 100%;
		.bar-wrapper {
			height: 80%;
			width: 40px;
			border: solid 2px red;
			background-color: gray;
			display: flex;
			border-radius: 20px;
			overflow: hidden;
			position: relative;
			top: -25px;
			opacity: 40%;
			&.active {
				top: 0;
				opacity: 100%;
				margin: 0 2em;
			}
			.progress-bar {
				width: 100%;
				margin-top: auto;
				background-color: blue;
			}
		}
	}
	.savings-buttons {
		button {
			border: solid 1px #999;
			padding: 0.25em 0.5em;
			border-radius: 12px;
			margin: 1em;
		}
	}
}
</style>
