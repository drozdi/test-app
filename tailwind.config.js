/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
	content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
	darkMode: ['selector'],
	safelist: [
		...'primary secondary accent positive negative info warning background'
			.split(/\s+/)
			.map((color) => `x-bg-${color}`),
		...'primary secondary accent positive negative info warning'
			.split(/\s+/)
			.map((color) => `bg-${color}`),
		...'primary secondary accent positive negative info warning'
			.split(/\s+/)
			.map((color) => `text-${color}`),
		...'primary secondary accent positive negative info warning'
			.split(/\s+/)
			.map((color) => `border-${color}`),
	],
	theme: {
		extend: {
			backgroundColor: {
				primary: 'rgb(var(--x-color-primary))',
				secondary: 'rgb(var(--x-color-secondary))',
				accent: 'rgb(var(--x-color-accent))',
				positive: 'rgb(var(--x-color-positive))',
				negative: 'rgb(var(--x-color-negative))',
				info: 'rgb(var(--x-color-info))',
				warning: 'rgb(var(--x-color-warning))',
				surface: 'rgb(var(--x-color-surface))',

				///*mybe
				bgmb1: 'rgba(190,155,100, 0.5)',
				bgmb2: 'rgba(245,137,116, 0.5)',
				bgmb3: 'rgba(158,25,58, 0.5)',
				bgmb4: 'rgba(207,92,118, 0.5)',
				bgmb5: 'rgba(14,100,95, 0.5)',
			},
			textColor: {
				primary: 'rgb(var(--x-color-primary))',
				secondary: 'rgb(var(--x-color-secondary))',
				accent: 'rgb(var(--x-color-accent))',
				positive: 'rgb(var(--x-color-positive))',
				negative: 'rgb(var(--x-color-negative))',
				info: 'rgb(var(--x-color-info))',
				warning: 'rgb(var(--x-color-warning))',
				surface: 'rgb(var(--x-color-surface))',
				link: 'rgb(var(--link-color))',
			},

			colors: {
				primary: 'rgb(var(--x-color-primary))',
				secondary: 'rgb(var(--x-color-secondary))',
				accent: 'rgb(var(--x-color-accent))',
				positive: 'rgb(var(--x-color-positive))',
				negative: 'rgb(var(--x-color-negative))',
				info: 'rgb(var(--x-color-info))',
				warning: 'rgb(var(--x-color-warning))',
				surface: 'rgb(var(--x-color-surface))', //*/

				border: 'rgb(var(--border-color))',

				/*primary: '#1976d2',
				secondary: '#5cbbf6',
				accent: '#9C27B0',
				positive: '#4caf50',
				negative: '#dc3545',
				info: '#2196f3',
				warning: '#fb8c00',
				surface: '#15171e',//*/
				//link: '#00aeff',

				body: '#002650',
				dark: '#15171e',
				separator: 'rgba(255, 255, 255, .15)',
				divider: 'rgba(255, 255, 255, .15)',
				dimmed: 'rgba(0,0,0,0.2)',
			},
			backgroundSize: {
				'50%': '50%',
				4: '1rem 1rem',
				6: '1.5rem 1.5rem',
				8: '2rem 2rem',
				10: '2.5rem 2.5rem',
				12: '3rem 3rem',
				14: '3.5rem 3.5rem',
				16: '4rem 4rem',
			},
			boxShadow: {
				strong: '0 4px 18px -2px #000000b3',
			},
			borderRadius: {
				inherit: 'inherit',
			},
			gridTemplateRows: {
				layout: 'minmax(min-content, auto) minmax(auto, 1fr) minmax(min-content, auto)',
				window: 'minmax(min-content, auto) minmax(auto, 1fr) minmax(min-content, auto)',
			},
			gridTemplateColumns: {
				layout: 'minmax(min-content, auto) minmax(auto, 1fr) minmax(min-content, auto)',
			},
			transitionProperty: {
				border: 'border',
				width: 'width',
				height: 'height',
				spacing: 'margin, padding',
			},
			borderWidth: {
				3: '3px',
				9: '9px',
				10: '10px',
			},
		},
	},
	plugins: [
		plugin(function ({ addBase, addUtilities, theme }) {
			const utilities = {};

			/*addBase({
				'*': {
					margin: 0,
					padding: 0,
					scrollbarColor: 'rgba(255, 255, 255, 0.2) rgba(0, 0, 0, 0.2)',
					scrollbarWidth: 'thin',
					'&::selection,&::-moz-selection': {
						color: '#eee',
						background: 'rgba(255, 255, 255, 0.3)',
					},
				},
				'html,body': {
					width: '100%',
					height: '100%',
				},
				body: {
					backgroundColor: theme('colors.body'),
					color: 'rgba(255,255,255,0.7)',
				},
				a: {
					color: '#00aeff',
					textDecoration: 'none',
				},
				'a[href]:hover': {
					color: theme('colors.white'),
					textDecoration: 'underlined',
				},
			});*/

			'primary secondary accent positive negative info warning'
				.split(/\s+/)
				.forEach((color) => {
					utilities[`.x-bg-${color}`] = {
						backgroundColor: `rgb(var(--x-color-${color})) !important`,
						color: `rgb(var(--x-color-on-${color})) !important`,
					};
				});

			utilities['x-bg-background'] = {
				backgroundColor: `rgb(var(--x-color-background)) !important`,
				color: `rgb(var(--x-color-on-background)) !important`,
			};

			addUtilities(utilities);
		}),
	],
};
