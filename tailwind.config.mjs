/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1366px',
      '3xl': '1600px',
      '4xl': '1920px',
    },
		container: {
      center: true,
    },
		extend: {
			colors: {
				primary: '#67fff2',
				darkNavy: '#0a0b0f',
				inputBg: '#14171e',
				grey: '#a0a0a1',
				red: '#ED4337'
			},
			fontFamily: {
				heading: ['Poppins', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
