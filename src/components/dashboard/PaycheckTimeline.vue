<template lang="">
	<div class="paycheck-timeline-wrapper">
		<h1>Paycheck Timelien</h1>
		<div class="timeline-wrapper">
			<div class="date-entry" v-for="day in daysThisMonth">
				<span v-if="checksThisMonth[day - 1].amount !== 0"
					>${{ checksThisMonth[day - 1].amount }}</span
				>
				{{ day }}
			</div>
		</div>
		<h1>{{ month }} income: ${{ incomeThisMonth }}</h1>
	</div>
</template>
<script>
import moment from "moment";

const month = moment().format("MMMM");
const daysThisMonth = moment().daysInMonth();
const checksThisMonth = [];
let incomeThisMonth = 0;

for (let i = 1; i < daysThisMonth + 1; i++) {
	let amount = 0;
	if (i === 16 || i === 30) {
		amount = 2100;
	}
	checksThisMonth.push({
		date: i,
		amount: amount,
	});
	incomeThisMonth = incomeThisMonth + amount;
}

export default {
	data() {
		return {
			month: month,
			daysThisMonth: daysThisMonth,
			checksThisMonth: checksThisMonth,
			incomeThisMonth: incomeThisMonth,
		};
	},
};
</script>

<style lang="scss">
.paycheck-timeline-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	.timeline-wrapper {
		display: flex;
		height: 100px;
		width: 90%;
		overflow-y: hidden;
		font-size: 12px;
		justify-content: space-evenly;
		.date-entry {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
		}
	}
}
</style>
