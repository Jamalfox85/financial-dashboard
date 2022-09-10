<template lang="">
	<div class="block-wrapper">
		<div class="block-header">
			<h1 class="header-text">{{ name }}</h1>
			<img class="plus-icon" src="../../../assets/images/circle-plus.png" />
		</div>
		<div class="block-main">
			<div class="progress-bar">
				<div
					class="progress-bar-progress"
					:style="{
						width: (current / goal) * 100 + '%',
					}"
				></div>
			</div>
			<h5 class="progress-text">${{ current }} / ${{ goal }}</h5>
		</div>
	</div>
</template>
<script>
export default {
	props: ["name", "current", "goal"],
	data() {
		return {};
	},
};
</script>
<style lang="scss" scoped>
.block-wrapper {
	height: 125px;
	width: 250px;
	border: solid 2px #363537;
	padding: 1em;
	border-radius: 12px;
	.block-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.header-text {
			font-size: 16px;
			font-weight: bold;
			margin: 0;
		}
		.plus-icon {
			height: 20px;
		}
	}
	.block-main {
		width: 100%;
		margin-top: 1.5em;
		.progress-bar {
			height: 15px;
			width: 100%;
			background-color: #d9d9d9;
			border-radius: 16px;
			.progress-bar-progress {
				height: 100%;
				background-color: #0cce6b;
				border-radius: 16px;
			}
		}
		.progress-text {
			margin-top: 1em;
			font-size: 14px;
		}
	}
}
</style>
