<template lang="">
	<div class="bills_wrapper">
		<div class="header">
			<h1>Bill Report</h1>
			<img :src="circlePlusWhite" />
		</div>
		<div class="section-main">
			<div class="section">
				<h3 class="section-header">Weekly</h3>
				<h6 class="date-range">August 12 - 19</h6>
				<div class="bills">
					<div
						class="bill"
						:class="{
							late: bill.date <= today && bill.paid === false,
							upcoming:
								bill.date < today + 7 &&
								bill.date > today &&
								bill.paid === false,
							paid: bill.paid === true,
						}"
						:style="{ display: bill.date <= today + 7 ? 'flex' : 'none' }"
						v-for="bill in bills"
					>
						<small class="bill-date">{{ bill.date }}</small>
						<div class="bill-block">
							<p class="bill-name">{{ bill.name }}</p>
							<p class="bill-price">${{ bill.price }}</p>
						</div>
						<div class="bill-icon">
							<img
								:src="triangleRed"
								v-if="bill.date <= today && bill.paid === false"
							/>
							<img :src="circleCheck" v-else-if="bill.paid === true" />
							<div v-else></div>
						</div>
					</div>
				</div>
			</div>
			<div
				class="more"
				@click="expandBills"
				:style="{ display: expanded === true ? 'none' : 'block' }"
			>
				<h1>More</h1>
			</div>
			<div
				class="section"
				:style="{ display: expanded === true ? 'flex' : 'none' }"
			>
				<h3 class="section-header">Monthly</h3>
				<h6 class="date-range">August</h6>
				<div class="bills">
					<div
						class="bill"
						:class="{
							late: bill.date <= today && bill.paid === false,
							upcoming:
								bill.date < today + 7 &&
								bill.date > today &&
								bill.paid === false,
							future: bill.date > today + 7 && bill.paid === false,
							paid: bill.paid === true,
						}"
						v-for="bill in bills"
					>
						<small class="bill-date">{{ bill.date }}</small>
						<div class="bill-block">
							<p class="bill-name">{{ bill.name }}</p>
							<p class="bill-price">${{ bill.price }}</p>
						</div>
						<div class="bill-icon">
							<img
								:src="triangleRed"
								v-if="bill.date <= today && bill.paid === false"
							/>
							<img :src="circleCheck" v-else-if="bill.paid === true" />
							<div v-else></div>
						</div>
					</div>
				</div>
			</div>
			<div
				class="less"
				@click="expandBills"
				:style="{ display: expanded === false ? 'none' : 'block' }"
			>
				<h1>Less</h1>
			</div>
		</div>
	</div>
</template>
<script>
import circlePlusWhite from "../../assets/images/circle-plus-white.png";
import triangleRed from "../../assets/images/triangle-red.png";
import circleCheck from "../../assets/images/circle-check.png";

import moment from "moment";

let bills = [
	{
		id: 0,
		name: "Electricity",
		price: 150,
		date: moment().date(12).format("DD"),
		paid: false,
	},
	{
		id: 1,
		name: "Internet",
		price: 150,
		date: moment().date(17).format("DD"),
		paid: false,
	},
	{
		id: 2,
		name: "Credit Cards",
		price: 500,
		date: moment().date(19).format("DD"),
		paid: false,
	},
	{
		id: 3,
		name: "Internet",
		price: 75,
		date: moment().date(21).format("DD"),
		paid: false,
	},
	{
		id: 4,
		name: "Phone",
		price: 100,
		date: moment().date(25).format("DD"),
		paid: true,
	},
	{
		id: 5,
		name: "Car Payment",
		price: 250,
		date: moment().date(29).format("DD"),
		paid: true,
	},
	{
		id: 5,
		name: "Car Insurance",
		price: 250,
		date: moment().date(31).format("DD"),
		paid: false,
	},
];

let today = moment().date();

export default {
	data() {
		return {
			circlePlusWhite: circlePlusWhite,
			triangleRed: triangleRed,
			circleCheck: circleCheck,
			bills: bills,
			today: today,
			expanded: false,
		};
	},
	methods: {
		expandBills() {
			this.expanded = !this.expanded;
			if (this.expanded === true) {
				console.log("EXPANDED");
			} else {
				console.log("CLOSED");
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.bills_wrapper {
	height: 100%;
	width: 400px;
	background-color: #363537;
	border-radius: 16px;
	padding: 1em;
	.header {
		display: flex;
		justify-content: space-between;
		font-size: 20px;
		font-weight: bold;
		color: #edf2ef;
		margin-bottom: 1em;
		img {
			height: 100%;
		}
	}
	.section-main {
		display: flex;
		flex-direction: column;
		.section {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin-bottom: 2em;
			.section-header {
				color: #edf2ef;
				font-size: 16px;
				font-weight: normal;
			}
			.date-range {
				font-size: 12px;
				color: #a8a8a8;
			}
			.bills {
				width: 100%;
				display: flex;
				flex-direction: column;
				color: #edf2ef;
				.bill {
					width: 100%;
					display: flex;
					align-items: center;
					margin: 0.5em 0;
					// border: solid 2px white;
					.bill-date {
						color: #edf2ef;
						margin-right: 1em;
					}
					.bill-block {
						width: 100%;
						display: flex;
						justify-content: space-between;
						border-radius: 16px;
						background-color: #d9d9d9;
						color: #363537;
						.bill-name,
						.bill-price {
							background-color: #0cce6b;
							border-radius: 16px;
							padding: 4px 10px;
						}
						.bill-name {
							width: 45%;
						}
						.bill-price {
							width: 20%;
						}
					}
					.bill-icon {
						margin-left: 12px;
						width: 25px;
						img {
							width: 25px;
						}
					}

					/* Bill States */
					&.late {
						.bill-block {
							color: #edf2ef;
						}
						.bill-name,
						.bill-price {
							background-color: #ef2d56;
						}
					}
					&.upcoming {
						.bill-name,
						.bill-price {
							background-color: #dced31;
						}
					}
					&.future {
						.bill-name,
						.bill-price {
							background-color: #767676;
						}
					}
					&.paid {
						.bill-block,
						.bill-name,
						.bill-price {
							background-color: #0cce6b;
						}
					}
				}
			}
		}
		.more,
		.less {
			color: #a8a8a8;
			margin-top: 1em;
			display: block;
		}
	}
}
</style>
