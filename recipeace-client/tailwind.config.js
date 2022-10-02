/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				gold: '#BC9004',
			},
			screens: {
				xs: '300px',
				sm: '375px',
				md: '700px',
				lg: '800px',
				xl: '1000px',
				xxl: '1200px'
			},
		},
	},
	plugins: [],
};
