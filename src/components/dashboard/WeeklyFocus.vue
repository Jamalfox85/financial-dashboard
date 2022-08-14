<template lang="">
	<div class="weeklyFocus-wrapper">
		<h1>Weekly Focus</h1>
		<p class="focus-blurb">{{ blurbs[randInt] }}</p>
	</div>
</template>
<script>
const weeklyFocusBlurbs = [
	"Focus on building your credit.",
	"Focus on paying down credit card debt.",
	"Let's focus on building an additional income stream!",
	"This week let's work on our savings goals!",
];
const randInt = Math.floor(Math.random() * weeklyFocusBlurbs.length);
export default {
	data() {
		return {
			blurbs: weeklyFocusBlurbs,
			randInt: randInt,
		};
	},
};
</script>
<style lang="scss">
.weeklyFocus-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	.focus-blurb {
		font-size: 1.4em;
		margin-top: 1.5em;
		font-weight: bold;
		width: 90%;
	}
}
</style>
