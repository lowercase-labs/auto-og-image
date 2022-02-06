module.exports = {
	content: ['./api/**/*.{html,js,ts}'],
	safelist: [
		{
			pattern: /text-(red|green|blue)-(100|200|300|900)/, 
		},
		{
			pattern: /border-(red|green|blue)-(100|200|300|600|900)/, 
		}
	],
	theme: {
		extend: {},
	},
	plugins: [],
};