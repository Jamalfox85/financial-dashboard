<template>
	<div class="modal-overlay-wrapper">
		<vue-final-modal
			v-model="showModal"
			classes="modal-container"
			content-class="modal-content"
			preventClick="true"
		>
			<button class="modal__close" @click="closeModal">X</button>
			<span class="modal__title">Add Bill</span>
			<hr />
			<div class="modal__content">
				<p>Enter details of your bill now</p>
				<div class="modal-form">
					<label for="bill-name">
						<span class="label">Bill Name</span>
						<input id="bill-name" v-model="billName" />
					</label>
					<label for="bill-amount">
						<span class="label">Bill amount</span>
						<input id="bill-amount" v-model="billAmount" />
					</label>
					<label for="bill-due-date">
						<span class="label">Due Date</span>
						<input id="bill-due-date" v-model="dueDate" />
					</label>
				</div>
			</div>
			<hr />
			<div class="modal__action">
				<button id="closeModal" @click="closeModal">cancel</button>
				<button id="confirmModal" @click="submitBill">confirm</button>
			</div>
		</vue-final-modal>
	</div>
</template>
<script>
import BillsDataService from "../../services/BillsDataService";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";

export default {
	components: { VueFinalModal, ModalsContainer },
	props: ["showModal"],
	data() {
		return {
			billName: null,
			billAmount: 0,
			dueDate: null,
		};
	},
	methods: {
		submitBill() {
			let data = {
				bill_name: this.billName,
				bill_amount: this.billAmount,
				bill_date: this.dueDate /* Format ex. = '30' */,
				bill_paid: false,
				Userid: 1,
			};
			BillsDataService.create(data);
			this.closeModal();
		},
		closeModal() {
			this.$emit("closeModal", true);
		},
	},
	watch: {
		showModal: {
			handler(newVal, oldVal) {
				this.billName = null;
				this.billAmount = 0;
				this.dueDate = null;
				console.log("AddBillModal is now ", newVal);
			},
		},
	},
};
</script>
<style scoped lang="scss">
::v-deep(.modal-container) {
	display: flex;
	justify-content: center;
	align-items: center;
}
::v-deep(.modal-content) {
	display: flex;
	flex-direction: column;
	padding: 1rem;
	border: 1px solid #e2e8f0;
	border-radius: 0.25rem;
	background: #fff;
	width: 600px;
}
.modal__title {
	font-size: 1.5rem;
	font-weight: 700;
	text-align: left;
}
.modal__content {
	flex-grow: 1;
	.modal-form {
		display: flex;
		flex-direction: column;
		label /* Input Group */ {
			margin: 0.5em 0;
			.label /* Input Label Only */ {
				font-weight: bold;
				margin: 0.5em;
			}
			input {
				border: solid 1px black;
				border-radius: 8px;
				padding: 0 1em;
			}
		}
	}
}
.modal__action {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	flex-shrink: 0;
	padding: 1rem 0 0;
	#closeModal {
		border: solid 1px black;
		border-radius: 12px;
		padding: 4px 8px;
		margin: 0 0.5em;
	}
	#confirmModal {
		border: solid 1px black;
		border-radius: 12px;
		padding: 4px 8px;
		margin: 0 0.5em;
	}
}
.modal__close {
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
}
</style>

<style scoped>
.dark-mode div.modal-content {
	border-color: #2d3748;
	background-color: #1a202c;
}
</style>
