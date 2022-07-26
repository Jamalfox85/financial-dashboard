import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import SpendingReport from "../pages/SpendingReport.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: Dashboard,
		},
		{
			path: "/spending",
			name: "spendingReport",
			component: SpendingReport,
		},
		// {
		// 	path: "/about",
		// 	name: "about",
		// 	// route level code-splitting
		// 	// this generates a separate chunk (About.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import("../views/AboutView.vue"),
		// },
	],
});

export default router;
