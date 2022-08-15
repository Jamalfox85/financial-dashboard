<template lang="">
	<div class="accounts-wrapper">
		<h1>Accounts</h1>
		<div class="account-categories">
			<div class="account-group" v-for="accountType in accounts">
				<h1>{{ accountType.type }}</h1>
				<div class="accounts">
					<div class="account" v-for="account in accountType.accounts">
						{{ account.name }} --- {{ account.amount }}
						<div class="account-bar">
							<div
								class="progress"
								:style="{
									width:
										(account.amount / accountType.highestAccount) * 100 + '%',
								}"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
const accounts = [
	{
		type: "Checking",
		accounts: [
			{
				name: "Navy Federal",
				amount: 1000,
			},
			{
				name: "Chase",
				amount: 1500,
			},
			{
				name: "Robinhood",
				amount: 4000,
			},
		],
		highestAccount: 4000,
	},
	{
		type: "Savings",
		accounts: [
			{
				name: "Navy Federal",
				amount: 10000,
			},
			{
				name: "Chase",
				amount: 4000,
			},
			{
				name: "Robinhood",
				amount: 40000,
			},
		],
		highestAccount: 40000,
	},
	{
		type: "Credit Cards",
		accounts: [
			{
				name: "Navy Federal",
				amount: 3500,
			},
			{
				name: "Chase",
				amount: 5500,
			},
			{
				name: "Amazon",
				amount: 5000,
			},
			{
				name: "Amex",
				amount: 2400,
			},
		],
		highestAccount: 5500,
	},
];

export default {
	data() {
		return {
			accounts: accounts,
		};
	},
};
</script>
<style lang="scss">
.accounts-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	.account-categories {
		width: 90%;
		display: flex;
		justify-content: space-evenly;
		margin-top: 2em;
		.account-group {
			.accounts {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				.account {
					.account-bar {
						height: 10px;
						width: 100%;
						// border: solid 2px red;
						border-radius: 12px;
						overflow: hidden;
						.progress {
							height: 100%;
							background-color: blue;
						}
					}
				}
			}
		}
	}
}
</style>
