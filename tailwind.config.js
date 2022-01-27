module.exports = {
	content: ['./api/**/*.{html,js,ts}'],
	safelist: [
		{
			pattern: /text-(red|green|blue)-(100|200|300|900)/,
		},
	],
	theme: {
		extend: {},
	},
	plugins: [],
};