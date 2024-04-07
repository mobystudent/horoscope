import { Dimensions } from 'react-native';

import starsBackground from '../images/starsBackground.png';
import halfMoonBg from '../images/halfMoonBg.png';

const windowHeight = Dimensions.get('window').height;
const starsHeignt = (windowHeight / 100) * 46;

export const backgroundsList = {
	'main': {
		upperBackground: '#100e24',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(16, 14, 36, .7)', 'rgba(26, 22, 42, .8)', 'rgba(35, 29, 48, .9)', '#2C2436', '#3A2F3E', '#83645C'],
		locations: [0, 0.09, 0.17, 0.28, 0.36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'premium': {
		upperBackground: '#e19c8b',
		imageBgSource: halfMoonBg,
		imageBgHeight: 375,
		gradientArray: ['#695EAB', 'rgba(225, 156, 139, 0)'],
		locations: [0.09, 1],
		start: {x: 0, y: 1},
		end: {x: 0.05, y: -0.9}
	},
	'newMoon': {
		upperBackground: '#07020F',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(7, 2, 15, .7)', 'rgba(9, 8, 23, .8)', 'rgba(11, 13, 31, .9)', '#0d142a', '#0f1932', '#1D436F'],
		locations: [0, 0.09, 0.17, 0.28, 0.36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'fullMoon': {
		upperBackground: '#8D6AC2',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(141, 106, 194, .7)', 'rgba(149, 117, 196, .8)', 'rgba(156, 125, 196, .9)', '#a58bc5', '#ac94c6', '#E3DECD'],
		locations: [0, 0.09, 0.17, 0.28, 0.36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'thirdQuarter': {
		upperBackground: '#142746',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(20, 39, 70, .7)', 'rgba(34, 51, 83, .8)', 'rgba(46, 61, 93, .9)', '#414a6b', '#4f5475', '#B8A4C8'],
		locations: [0, 0.09, 0.17, 0.28, 0.36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'firstQuarter': {
		upperBackground: '#B8A4C8',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(184, 164, 200, .7)', 'rgba(169, 153, 188, .8)', 'rgba(156, 143, 177, .9)', '#8a81a3', '#7d7799', '#142746'],
		locations: [0, 0.09, 0.17, 0.28, 0.36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'waningGibbous': {
		upperBackground: '#1C3E68',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(28, 62, 104, .7)', 'rgba(45, 76, 113, .8)', 'rgba(60, 88, 121, .9)', '#516984', '#60758c', '#DCD4CC'],
		locations: [0, 0.09, 0.17, 0.28, 0.36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'waxingGibbous': {
		upperBackground: '#D9D0CC',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(217, 208, 204, .7)', 'rgba(201, 196, 197, .8)', 'rgba(188, 185, 190, .9)', '#a9aab5', '#9c9fae', '#2E4879'],
		locations: [0, 0.09, 0.17, 0.28, 0.36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'waxingCrescent': {
		upperBackground: '#142846',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(20, 40, 70, .7)', 'rgba(31, 46, 81, .8)', 'rgba(41, 51, 91, .9)', '#373b69', '#414073', '#8E6CC2'],
		locations: [0, 0.09, 0.17, 0.28, 0.36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'waningCrescent': {
		upperBackground: '#8E6BC2',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(142, 107, 194, .7)', 'rgba(131, 101, 183, .8)', 'rgba(121, 95, 173, .9)', '#6b589f', '#615295', '#142745'],
		locations: [0, 0.09, 0.17, 0.28, 0.36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	}
};
