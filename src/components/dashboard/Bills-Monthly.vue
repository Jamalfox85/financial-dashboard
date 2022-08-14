<template lang="">
	<div>
		<h1>Bills Monthly</h1>
		<div class="checkbox-list">
			<div class="list-item" v-for="bill in billList">
				<div class="checkbox">
					<!-- <inline-svg :src="require('/assets/icons/checkmark.svg')" /> -->
					<span v-if="bill.completed === true">X</span>
				</div>
				<p>{{ bill.name }}</p>
				<p>${{ bill.price }}</p>
			</div>
		</div>
	</div>
</template>
<script>
const monthlyBills = [
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
	{
		name: "Amex",
		price: 300,
		completed: false,
	},
	{
		name: "Loan",
		price: 300,
		completed: false,
	},
	{
		name: "Car Payment",
		price: 250,
		completed: true,
	},
];
export default {
	data() {
		return {
			billList: monthlyBills,
		};
	},
};
</script>
<style lang=""></style>
