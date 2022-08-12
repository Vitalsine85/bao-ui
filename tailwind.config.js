/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			background: {
				100: '#210e0e', //dark mode
				200: '#fff8ee', //dark mode
			},
			primary: {
				100: '#391818',
				200: '#481e1e',
				300: '#562424',
				400: '#622a2a',
				500: '#622a2a',
			},
			secondary: {
				100: '#efeae7',
				200: '#e7dfda',
				300: '#ded4ce',
				400: '#d6c9c2',
				500: '#cebfb6',
			},
			red: '#d00000',
			green: '#008000',
			blue: '#0000f0',
			text: {
				100: '#fff8ee', //primary
				200: '#aa9585', //secondary
				300: '#CC9902', //hover link
				400: '#FFD84B', //active link
			},
			transparent: {
				100: 'rgba(60, 20, 20, 0.5)', //dark
				200: 'rgba(0, 0, 0, 0.1)', //light
			},
		},
		fontFamily: {
			rubik: ['Rubik', 'sans-serif'],
			poppins: ['Poppins', 'sans-serif'],
			kaushan: ['Kaushan Script', 'sans-serif'],
		},
		extend: {},
	},
	plugins: [],
}
