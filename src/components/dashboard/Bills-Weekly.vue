<template lang="">
	<div>
		<h1>Bills Weekly</h1>
		<div class="checkbox-list">
			<div class="list-item" v-for="bill in billList">
				<div class="checkbox">
					<img href="../../assets/icons/checkmark.svg" />
					<span v-if="bill.completed === true">X</span>
				</div>
				<p>{{ bill.name }}</p>
				<p>${{ bill.price }}</p>
			</div>
		</div>
	</div>
</template>
<script>
// const checkMark = require("../../assets/icons/checkmark.svg");
const weeklyBills = [
	{
		name: "Water",
		price: 100,
		completed: true,
	},
	{
		name: "Electric",
		price: 125,
		completed: false,
	},
	{
		name: "Wifi",
		price: 75,
		completed: true,
	},
];
export default {
	data() {
		return {
			billList: weeklyBills,
		};
	},
};
</script>
<style lang=""></style>
