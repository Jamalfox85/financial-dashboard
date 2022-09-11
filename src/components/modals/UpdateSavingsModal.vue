<template>
	<div class="modal-overlay-wrapper">
		<div class="modal-wrapper">
			<div class="modal-header">
				<h1>Update Savings Goal</h1>
				<img
					src="../../assets/icons/circle-xmark-solid.svg"
					class="close-modal"
					@click="closeModal"
				/>
			</div>
			<div class="modal-main">
				<div class="amount-options">
					<button
						class="amount-options-bttn"
						:class="{ active: addToGoal }"
						:style="{ backgroundColor: '#0CCE6B' }"
						@click="updateMode"
					>
						Add
					</button>
					<button
						class="amount-options-bttn"
						:class="{ active: !addToGoal }"
						:style="{ backgroundColor: '#ef2d56' }"
						@click="updateMode"
					>
						Subtract
					</button>
				</div>
				<label for="amount">
					Amount
					<input id="amount" v-model="amountToUpdate" />
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
	props: ["id", "goalName", "goalAmount", "currentAmount"],
	data() {
		return {
			addToGoal: true,
			amountToUpdate: 0,
		};
	},
	methods: {
		updateMode() {
			if (this.addToGoal == true) {
				this.addToGoal = false;
			} else {
				this.addToGoal = true;
			}
		},
		submitGoal() {
			let updateId = this.id;
			let operation = this.addToGoal === true ? "+" : "-";
			let newAmount =
				this.currentAmount + parseInt(operation + this.amountToUpdate);
			let data = {
				savings_name: this.goalName,
				goal_amount: this.goalAmount,
				current_amount: newAmount,
				Userid: 1,
			};
			SavingsDataService.update(updateId, data);
			this.closeModal();
		},
		closeModal() {
			this.$emit("close", false);
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
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-evenly;
			padding: 1em;
			.amount-options {
				.amount-options-bttn {
					padding: 6px 12px;
					border-radius: 12px;
					opacity: 50%;
					color: #fff;
					margin-right: 1em;
					&.active {
						opacity: 100%;
					}
				}
			}
			label {
				display: flex;
				flex-direction: column;
				color: #fff;
				text-align: left;
				width: 40%;
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
