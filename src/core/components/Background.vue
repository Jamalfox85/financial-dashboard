<template lang="">
	<div class="background-wrapper">
		<img
			class="blob"
			v-for="blob in blobs"
			:src="blob"
			:style="{ height: rHeight(), width: rWidth(), left: rX(), top: rY() }"
		/>
		<div class="glass-overlay"></div>
	</div>
</template>
<script>
import blob1 from "../../assets/images/blobs/blob1.svg";
import blob2 from "../../assets/images/blobs/blob2.svg";
import blob3 from "../../assets/images/blobs/blob3.svg";
import blob4 from "../../assets/images/blobs/blob4.svg";
import blob5 from "../../assets/images/blobs/blob5.svg";
import blob6 from "../../assets/images/blobs/blob6.svg";
import blob7 from "../../assets/images/blobs/blob7.svg";
export default {
	data() {
		return {
			blobs: [blob1, blob2, blob3, blob4, blob5, blob6, blob7],
		};
	},
	methods: {
		/* r = randomize */
		rHeight() {
			let height = Math.floor(Math.random() * 800);
			return height + "px";
		},
		rWidth() {
			let width = Math.floor(Math.random() * 800);
			return width + "px";
		},
		rX() {
			let x = Math.random() * 100;
			return x + "%";
		},
		rY() {
			let y = Math.random() * 100;
			return y + "%";
		},
	},
};
</script>
<style lang="scss">
.background-wrapper {
	height: 100vh;
	width: 100vw;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	overflow: hidden;
	z-index: -999;
	.blob {
		max-height: 700px;
		max-width: 700px;
		min-height: 150px;
		min-width: 150px;
		position: absolute;
		z-index: -1;
		filter: blur(10px);
	}
	.glass-overlay {
		height: 100%;
		width: 100%;
		position: absolute;
		background-color: #fff;
		opacity: 50%;
	}
}
</style>
