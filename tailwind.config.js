/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			gridTemplateRows: {
				'12': 'repeat(12, minmax(0,1fr))',
			},
			// gridRow: {
			// 	'row-span-12': 'span 1 / 13'
			// }
		},
	},
	plugins: [],
};
