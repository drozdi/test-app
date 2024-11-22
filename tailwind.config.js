/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
	content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
	darkMode: ['selector'],
	safelist: [
		'.text-primary',
		'.text-secondary',
		'.text-accent',
		'.text-positive',
		'.text-negative',
		'.text-info',
		'.text-warning',
		'.text-surface',
		'.text-body',
		'.text-dark',

		'border-primary',
		'border-secondary',
		'border-accent',
		'border-positive',
		'border-negative',
		'border-info',
		'border-warning',
		'border-surface',
		'border-body',
		'border-dark',

		'x-bg-primary',
		'x-bg-secondary',
		'x-bg-accent',
		'x-bg-positive',
		'x-bg-negative',
		'x-bg-info',
		'x-bg-warning',
		'x-bg-surface',
		'x-bg-body',
		'x-bg-dark',
	],
	theme: {
		extend: {
			backgroundColor: {
				/*primary: 'var(--color-bg-primary)',
				secondary: 'var(--color-bg-secondary)',
				accent: 'var(--color-bg-accent)',
				positive: 'var(--color-bg-positive)',
				negative: 'var(--color-bg-negative)',
				info: 'var(--color-bg-info)',
				warning: 'var(--color-bg-warning)',
				surface: 'var(--color-bg-surface)',*/

				bgmb1: 'rgba(190,155,100, 0.5)',
				bgmb2: 'rgba(245,137,116, 0.5)',
				bgmb3: 'rgba(158,25,58, 0.5)',
				bgmb4: 'rgba(207,92,118, 0.5)',
				bgmb5: 'rgba(14,100,95, 0.5)',
			},
			textColor: {
				/*link: 'var(--link-color)',
				primary: 'var(--color-text-primary)',
				secondary: 'var(--color-text-secondary)',
				accent: 'var(--color-text-accent)',
				positive: 'var(--color-text-positive)',
				negative: 'var(--color-text-negative)',
				info: 'var(--color-text-info)',
				warning: 'var(--color-text-warning)',
				surface: 'var(--color-text-surface)',*/
			},

			colors: {
				primary: '#1976d2',
				secondary: '#5cbbf6',
				accent: '#9C27B0',
				positive: '#4caf50',
				negative: '#dc3545',
				info: '#2196f3',
				warning: '#fb8c00',
				surface: '#15171e',
				link: '#00aeff',

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

			'primary secondary accent positive negative info warning surface body dark'
				.split(/\s+/)
				.forEach((color) => {
					utilities[`.x-bg-${color}`] = {
						backgroundColor: theme(`colors.${color}`) + ' !important',
						color: theme('colors.white') + ' !important',
					};
				});

			addUtilities(utilities);
		}),
	],
};
