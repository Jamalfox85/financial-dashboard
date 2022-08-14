<template lang="">
	<div class="credit-score-wrapper">
		<h1>Credit Score</h1>
		<div class="progress-bar-wrapper">
			<div
				class="progress"
				:style="{
					width: (creditScore / maxScore) * 100 + '%',
				}"
			></div>
			<h1>{{ creditScore }}</h1>
		</div>
	</div>
</template>
<script>
const creditScore = 600;
export default {
	data() {
		return {
			maxScore: 850,
			creditScore: creditScore,
		};
	},
};
</script>
<style lang="scss">
.credit-score-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	.progress-bar-wrapper {
		margin-top: 2em;
		width: 200px;
		height: 100px;
		border-top-left-radius: 110px;
		border-top-right-radius: 110px;
		border: 10px solid gray;
		border-bottom: 0;
		overflow: hidden;
		position: relative;
		display: flex;
		.progress {
			background-color: red;
			height: 100%;
			position: absolute;
		}
		h1 {
			margin: auto auto;
			position: relative;
			z-index: 2;
			font-size: 1.5em;
		}
	}
}
</style>
