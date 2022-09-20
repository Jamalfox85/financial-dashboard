<template lang="">
	<div class="bill_wrapper">
		<div
			class="bill"
			:class="{
				late: billDate <= today && billPaid === 0,
				upcoming: billDate < today + 7 && billDate > today && billPaid === 0,
				paid: billPaid === 1,
				future: billDate > today + 7 && billPaid === 0,
			}"
		>
			<small class="bill-date">{{ billDate }}</small>
			<div class="bill-block">
				<p class="bill-name">{{ billName }}</p>
				<p class="bill-price">${{ billAmount }}</p>
			</div>
			<div class="bill-icon">
				<img :src="triangleRed" v-if="billDate <= today && billPaid === 0" />
				<img :src="circleCheck" v-else-if="billPaid === 1" />
				<div v-else></div>
			</div>
		</div>
	</div>
</template>
<script>
import triangleRed from "../../../assets/images/triangle-red.png";
import circleCheck from "../../../assets/images/circle-check.png";

import moment from "moment";

let today = moment().date();

export default {
	props: ["billName", "billDate", "billAmount", "billPaid"],
	data() {
		return {
			triangleRed: triangleRed,
			circleCheck: circleCheck,
			today: today,
		};
	},
};
</script>
<style lang="scss" scoped>
.bill_wrapper {
	margin: 0.5em 0;
	.bill {
		display: flex;
		align-content: center;
		width: 100%;
		.bill-date {
			color: #363537;
			margin-right: 1em;
			display: flex;
			align-items: center;
		}
		.bill-block {
			height: fit-content;
			width: 100%;
			display: flex;
			justify-content: space-between;
			border-radius: 16px;
			background-color: #d9d9d9;
			color: #363537;
			border: solid 1px #363537;
			.bill-name,
			.bill-price {
				background-color: #0cce6b;
				border-radius: 16px;
				padding: 4px 10px;
				margin-bottom: 0;
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
			display: flex;
			align-items: center;
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
				background-color: #cccfce;
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
</style>
