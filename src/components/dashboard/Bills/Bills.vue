<template lang="">
	<div class="bills_wrapper">
		<div class="header">
			<h1>Bill Report</h1>
			<img :src="circlePlusWhite" />
		</div>
		<div class="section-main">
			<div class="section-header">
				<!-- <h3 class="date-interval">Weekly</h3> -->
				<div class="interval-bttns">
					<button :class="{ active: interval === 1 }" @click="setInterval(1)">
						Weekly
					</button>
					<button :class="{ active: interval === 2 }" @click="setInterval(2)">
						Monthly
					</button>
				</div>
				<h6 class="date-range">{{ weeklyRange }}</h6>
			</div>
			<div class="bills" v-for="bill in bills">
				<billBlock
					:billName="bill.name"
					:billDate="bill.date"
					:billAmount="bill.price"
					:billPaid="bill.paid"
					v-if="showBill(bill.longDate) === true"
				/>
			</div>
		</div>
	</div>
</template>
<script>
import circlePlusWhite from "../../../assets/images/circle-plus-white.png";

import moment from "moment";

import billBlock from "./BillBlock.vue";

let bills = [
	{
		id: 0,
		name: "Electricity",
		price: 150,
		date: moment().date(20).format("DD"),
		longDate: moment().date(20).format("YYYY-MM-DD"),
		paid: false,
	},
	{
		id: 1,
		name: "Internet",
		price: 150,
		date: moment().date(21).format("DD"),
		longDate: moment().date(21).format("YYYY-MM-DD"),
		paid: false,
	},
	{
		id: 2,
		name: "Credit Cards",
		price: 500,
		date: moment().date(22).format("DD"),
		longDate: moment().date(22).format("YYYY-MM-DD"),
		paid: false,
	},
	{
		id: 3,
		name: "Subscriptions",
		price: 75,
		date: moment().date(29).format("DD"),
		longDate: moment().date(29).format("YYYY-MM-DD"),
		paid: false,
	},
	{
		id: 4,
		name: "Phone",
		price: 100,
		date: moment().date(29).format("DD"),
		longDate: moment().date(29).format("YYYY-MM-DD"),
		paid: true,
	},
	{
		id: 5,
		name: "Car Payment",
		price: 250,
		date: moment().date(29).format("DD"),
		longDate: moment().date(29).format("YYYY-MM-DD"),
		paid: true,
	},
	{
		id: 5,
		name: "Car Insurance",
		price: 250,
		date: moment().date(31).format("DD"),
		longDate: moment().date(31).format("YYYY-MM-DD"),
		paid: false,
	},
];

export default {
	components: { billBlock },
	data() {
		return {
			circlePlusWhite: circlePlusWhite,
			bills: bills,
			interval: 1,
			weeklyRange: null,
		};
	},
	methods: {
		setInterval(interval) {
			/* 1 = Weekly, 2 = Monthly */
			this.interval = interval;
		},
		showBill(date) {
			if (this.interval === 1) {
				let weekStart = moment().startOf("isoWeek").format("YYYY-MM-DD");
				let weekEnd = moment().endOf("isoWeek").format("YYYY-MM-DD");
				return moment(date).isBetween(weekStart, weekEnd);
			}
			if (this.interval === 2) {
				let currentMonth = moment().format("MM");
				let billMonth = moment(date).format("MM");
				return currentMonth === billMonth;
			}
		},
	},
	mounted() {
		let weekStart = moment().startOf("isoWeek").format("MMMM DD");
		let weekEnd = moment().endOf("isoWeek").format("MMMM DD");
		this.weeklyRange = weekStart + " - " + weekEnd;
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
		color: #edf2ef;
		margin-bottom: 1em;
		h1 {
			font-size: 24px;
			font-weight: bold;
		}
		img {
			height: 100%;
		}
	}
	.section-main {
		display: flex;
		flex-direction: column;
		.section-header {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin-bottom: 2em;
			.date-interval {
				color: #edf2ef;
				font-size: 16px;
				font-weight: normal;
			}
			.interval-bttns {
				margin-bottom: 8px;
				button {
					padding: 2px 16px;
					border: solid 2px #edf2ef;
					color: #edf2ef;
					&.active {
						color: #363537;
						background-color: #edf2ef;
						font-weight: bold;
					}
					&:first-child {
						border-radius: 12px 0 0 12px;
					}
					&:last-child {
						border-radius: 0 12px 12px 0;
					}
				}
			}
			.date-range {
				font-size: 12px;
				color: #a8a8a8;
			}
		}
	}
}
</style>
