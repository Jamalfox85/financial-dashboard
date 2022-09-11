<template>
	<div class="modal-overlay-wrapper">
		<div class="modal-wrapper">
			<div class="modal-header">
				<h1>Add Savings Goal</h1>
				<img
					src="../../assets/icons/circle-xmark-solid.svg"
					class="close-modal"
					@click="closeModal"
				/>
			</div>
			<div class="modal-main">
				<label for="goal-name">
					Goal Name
					<input id="goal-name" v-model="goalName" />
				</label>
				<label for="current-amount">
					Current Amount
					<input id="current-amount" v-model="currentAmount" />
				</label>
				<label for="goal-amount">
					Goal Amount
					<input id="goal-amount" v-model="goalAmount" />
				</label>
			</div>
			<div class="modal-footer">
				<button class="cancel-bttn" @click="closeModal">Cancel</button>
				<button class="submit-bttn" @click="submitGoal()">Submit</button>
			</div>
		</div>
	</div>
</template>
<script>
import SavingsDataService from "../../services/SavingsDataService";
export default {
	data() {
		return {
			goalName: null,
			currentAmount: 0,
			goalAmount: 0,
		};
	},
	methods: {
		submitGoal() {
			let data = {
				savings_name: this.goalName,
				goal_amount: this.goalAmount,
				current_amount: this.currentAmount,
				Userid: 1,
			};
			SavingsDataService.create(data);
			this.closeModal();
		},
		closeModal() {
			this.$emit("close", "closed");
		},
	},
};
</script>
<style lang="scss" scoped>
.modal-overlay-wrapper {
	height: 100vh;
	width: 100vw;
	background-color: rgba(175, 175, 175, 0.75);
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
	.modal-wrapper {
		height: 375px;
		width: 400px;
		background-color: #363537;
		border-radius: 12px;
		padding: 1em;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.modal-header {
			display: flex;
			align-items: center;
			color: #fff;
			border-bottom: solid 2px #fff;
			padding: 0.5em;
			h1 {
				font-size: 24px;
				margin: 0;
			}
			.close-modal {
				height: 30px;
				fill: white;
			}
		}
		.modal-main {
			height: 100%;
			display: flex;
			flex-wrap: wrap;
			// flex-direction: column;
			justify-content: center;
			// align-items: flex-start;
			label {
				display: flex;
				flex-direction: column;
				color: #fff;
				text-align: left;
				width: 40%;
				margin: 1em;
				&:first-child {
					width: 100%;
					input {
						width: 100%;
					}
				}
				input {
					border-radius: 12px;
					height: 1.75em;
					width: 60px;
					color: #363537;
					padding-left: 2em;
					font-weight: bold;
					&:focus {
						outline: none;
					}
				}
			}
		}
		.modal-footer {
			display: flex;
			justify-content: flex-end;
			font-size: 16px;
			border-top: solid 2px #fff;
			padding: 1em;
			.cancel-bttn {
				color: rgba(255, 255, 255, 0.5);
				margin-right: 0.5em;
			}
			.submit-bttn {
				color: #fff;
				margin: 0 0.5em;
				background-color: #0cc36b;
				border-radius: 12px;
				padding: 0.5em 1em;
			}
		}
	}
}
</style>
