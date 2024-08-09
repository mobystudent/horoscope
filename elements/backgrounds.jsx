import { Dimensions } from 'react-native';

import starsBackground from '../assets/images/starsBackground.png';
import halfMoonBg from '../assets/images/halfMoonBg.png';

const windowHeight = Dimensions.get('window').height;
const starsHeignt = (windowHeight / 100) * 46;

export const backgroundsList = {
	'main': {
		upperBackground: '#100e24',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(16, 14, 36, .7)', 'rgba(26, 22, 42, .8)', 'rgba(35, 29, 48, .9)', '#2C2436', '#3A2F3E', '#83645C'],
		locations: [0, .09, .17, .28, .36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'premium': {
		upperBackground: '#e19c8b',
		imageBgSource: halfMoonBg,
		imageBgHeight: 375,
		gradientArray: ['#695EAB', 'rgba(225, 156, 139, 0)'],
		locations: [.09, 1],
		start: {x: 0, y: 1},
		end: {x: 0.05, y: -0.9}
	},
	'newMoon': {
		upperBackground: '#1d436f',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(29, 67, 111, .7)', 'rgba(26, 61, 101, .8)', 'rgba(24, 56, 94, .9)', '#163153', '#142c4c', '#07020f'],
		locations: [0, .09, .17, .28, .36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'fullMoon': {
		upperBackground: '#07020f',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(7, 2, 15, .7)', 'rgba(9, 8, 24, .8)', 'rgba(11, 13, 32, .9)', '#0e142a', '#101a32', '#1d436f'],
		locations: [0, .09, .17, .28, .36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'thirdQuarter': {
		upperBackground: '#000235',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(0, 2, 53, .7)', 'rgba(0, 11, 60, .8)', 'rgba(0, 19, 66, .9)', '#001e4b', '#002651', '#006787'],
		locations: [0, .09, .17, .28, .36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'firstQuarter': {
		upperBackground: '#006787',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(0, 103, 135, .7)', 'rgba(0, 94, 128, .8)', 'rgba(0, 86, 122, .9)', '#004b71', '#00436b', '#000235'],
		locations: [0, .09, .17, .28, .36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'waningGibbous': {
		upperBackground: '#000d2f',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(0, 13, 47, .7)', 'rgba(0, 18, 50, .8)', 'rgba(0, 22, 52, .9)', '#001c36', '#002038', '#004448'],
		locations: [0, .09, .17, .28, .36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'waxingGibbous': {
		upperBackground: '#004448',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(0, 68, 72, .7)', 'rgba(0, 63, 70, .8)', 'rgba(0, 59, 68, .9)', '#003541', '#00303f', '#000d2f'],
		locations: [0, .09, .17, .28, .36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'waxingCrescent': {
		upperBackground: '#001e4e',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(0, 30, 78, .7)', 'rgba(9, 27, 78, .8)', 'rgba(17, 24, 78, .9)', '#1c144e', '#24124e', '#61004b'],
		locations: [0, .09, .17, .28, .36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	},
	'waningCrescent': {
		upperBackground: '#61004b',
		imageBgSource: starsBackground,
		imageBgHeight: starsHeignt,
		gradientArray: ['rgba(97, 0, 75, .7)', 'rgba(88, 3, 75, .8)', 'rgba(80, 6, 75, .9)', '#450a4b', '#3d0d4b', '#001e4e'],
		locations: [0, .09, .17, .28, .36, 1],
		start: {x: 1, y: 0},
		end: {x: 1, y: 1}
	}
};
