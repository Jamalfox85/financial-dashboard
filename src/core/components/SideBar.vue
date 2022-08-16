<template>
	<div class="sidebar-wrapper">
		<div class="header">
			<img :src="piggyBank" />
			<h1>FinDash</h1>
		</div>
		<div class="navigation-links">
			<div
				class="link"
				:class="{ active: link.id === currentLink }"
				v-for="link in navigationLinks"
				@click="setCurrentLink(link)"
			>
				<h2>{{ link.name }}</h2>
				<div class="active-icon"></div>
			</div>
		</div>
		<div class="sidebar-footer">
			<div class="portrait">
				<img :src="portrait" />
			</div>
			<div class="text">
				<h2 class="primary">Diana Rockwood</h2>
				<h3 class="secondary">Financial Advisor</h3>
			</div>
		</div>
		<background />
	</div>
</template>

<script>
import { useRoute } from "vue-router";

import Background from "./Background.vue";

import piggyBank from "../../assets/images/piggy-bank-solid.png";
import portrait from "../../assets/images/portrait.jpeg";

/* Side menu routes */
const navigationLinks = [
	{ id: 1, name: "Dashboard", href: "/" },
	{ id: 2, name: "Spending Report", href: "/spending" },
	{ id: 3, name: "Resources", href: "#" },
	{ id: 4, name: "Profile", href: "#" },
];

/* Get the current route and set data.currentLink accordingly */
let currentLink = 0;
navigationLinks.map((item) => {
	let path = window.location.pathname;
	if (item.href === path) {
		currentLink = item.id;
	}
	return item.id;
});

export default {
	components: { Background },
	data() {
		return {
			piggyBank: piggyBank,
			portrait: portrait,
			navigationLinks: navigationLinks,
			currentLink: currentLink,
		};
	},
	methods: {
		setCurrentLink(route) {
			this.currentLink = route.id;
			this.$router.push(route.href);
		},
	},
};
</script>

<style lang="scss">
.sidebar-wrapper {
	height: 90vh;
	width: 20vw;
	background-color: #363537;
	color: #fff;
	display: flex;
	flex-direction: column;
	margin: auto 0;
	padding: 2em 4em;
	border-radius: 16px;
	.header {
		display: flex;
		img {
			height: 45px;
			margin-right: 1em;
		}
		h1 {
			font-size: 39px;
		}
	}
	.navigation-links {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		height: 40%;
		.link {
			display: flex;
			align-items: center;
			font-size: 20px;
			cursor: pointer;
			transition: 0.2s ease-in-out;
			&:hover {
				color: #0cce6ab2;
			}
			.active-icon {
				height: 15px;
				width: 15px;
				border-radius: 50%;
				background-color: #0cce6b;
				margin-left: 1em;
				display: none;
			}
			&.active {
				color: #0cce6b;
				.active-icon {
					display: block;
				}
			}
		}
	}
	.sidebar-footer {
		display: flex;
		margin-top: auto;
		.portrait {
			height: 80px;
			width: 80px;
			border-radius: 50%;
			border: solid 2px #0cce6b;
			overflow: hidden;
		}
		.text {
			margin: 1em 0 0 1em;
			.primary {
				font-size: 20px;
			}
			.secondary {
				font-size: 16px;
				color: #a8a8a8;
			}
		}
	}
}
</style>
