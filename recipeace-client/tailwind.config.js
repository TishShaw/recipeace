/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				gold: '#BC9004',
			},
			screens: {
				sm: '300px',
				md: '700px',
				lg: '900px',
				xl: '1200px',
			},
		},
	},
	plugins: [],
};
