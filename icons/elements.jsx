import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export function checkIcon(color) {
	return <Svg viewBox="0 0 14 11" fill="none">
		<Path d="M13 1L4.75 10L1 5.90909" stroke={ color } strokeWidth={ 2 } strokeLinecap="round" strokeLinejoin="round"/>
	</Svg>
};
export function arrowLeftIcon(color, opacity) {
	return <Svg viewBox="0 0 11 18" fill="none">
	<Path d="M9.5 1L1.5 9L9.5 17" stroke={ color } strokeOpacity={ opacity } strokeWidth={ 2 } strokeLinecap="round" strokeLinejoin="round"/>
	</Svg>
};
export function arrowRightIcon(color, opacity) {
	return <Svg viewBox="0 0 9 14" fill="none">
	<Path d="M1.5 1L7.5 7L1.5 13" stroke={ color } strokeOpacity={ opacity } strokeWidth={ 2 } strokeLinecap="round" strokeLinejoin="round"/>
	</Svg>
};
export function femaleIcon(color) {
	return <Svg viewBox="0 0 31 49" fill="none">
		<Circle cx="15.5" cy="15.5" r="13.5" stroke={ color } strokeWidth={ 3 } strokeLinecap="round" strokeLinejoin="round"/>
		<Path d="M15.5 29.5V46.5" stroke={ color } strokeWidth={ 4 } strokeLinecap="round" strokeLinejoin="round"/>
		<Path d="M8.5 40.5H22.5" stroke={ color } strokeWidth={ 4 } strokeLinecap="round" strokeLinejoin="round"/>
	</Svg>
};
export function maleIcon(color) {
	return <Svg viewBox="0 0 43 42" fill="none">
		<Circle cx="15.5" cy="26.5" r="13.5" stroke={ color } strokeWidth={ 3 } strokeLinecap="round" strokeLinejoin="round"/>
		<Path d="M25.2227 17.1511L41.4998 1.5L31.4998 1.5L41.4998 1.5V11.5" stroke={ color } strokeWidth={ 3 } strokeLinecap="round" strokeLinejoin="round"/>
	</Svg>
};
export function photoIcon(color) {
	return <Svg viewBox="0 0 35 28" fill="none">
		<Path fillRule="evenodd" clipRule="evenodd" d="M30.044 28H4.942C3.346 28 2.12333 27.5663 1.274 26.699C0.424667 25.8316 0 24.5919 0 22.9798V8.07475C0 6.46263 0.424667 5.2229 1.274 4.35556C2.12333 3.48822 3.346 3.05455 4.942 3.05455H8.19C8.74067 3.05455 9.15833 3.00034 9.443 2.89192C9.72767 2.7835 10.052 2.54545 10.416 2.17778L11.508 1.08889C11.9 0.711784 12.3153 0.436027 12.754 0.261616C13.1927 0.0872054 13.7573 0 14.448 0H20.496C21.196 0 21.7653 0.0872054 22.204 0.261616C22.6427 0.436027 23.0533 0.711784 23.436 1.08889L24.528 2.17778C24.78 2.4229 25.004 2.60909 25.2 2.73636C25.396 2.86364 25.613 2.94848 25.851 2.99091C26.089 3.03333 26.39 3.05455 26.754 3.05455H30.044C31.64 3.05455 32.865 3.48822 33.719 4.35556C34.573 5.2229 35 6.46263 35 8.07475V22.9798C35 24.5919 34.573 25.8316 33.719 26.699C32.865 27.5663 31.64 28 30.044 28ZM14.609 22.499C15.5097 22.8855 16.4733 23.0788 17.5 23.0788C18.5267 23.0788 19.488 22.8855 20.384 22.499C21.28 22.1125 22.0687 21.5774 22.75 20.8939C23.4313 20.2104 23.9633 19.4162 24.346 18.5111C24.7287 17.6061 24.92 16.6303 24.92 15.5838C24.92 14.198 24.5887 12.9394 23.926 11.8081C23.2633 10.6768 22.3697 9.77643 21.245 9.10707C20.1203 8.43771 18.872 8.10303 17.5 8.10303C16.4733 8.10303 15.5097 8.2963 14.609 8.68283C13.7083 9.06936 12.9197 9.60438 12.243 10.2879C11.5663 10.9714 11.0367 11.7657 10.654 12.6707C10.2713 13.5758 10.08 14.5468 10.08 15.5838C10.08 16.6303 10.2713 17.6061 10.654 18.5111C11.0367 19.4162 11.5663 20.2104 12.243 20.8939C12.9197 21.5774 13.7083 22.1125 14.609 22.499ZM17.5 19.7838C18.284 19.7838 18.998 19.5953 19.642 19.2182C20.286 18.8411 20.7993 18.3367 21.182 17.7051C21.5647 17.0734 21.756 16.3663 21.756 15.5838C21.756 14.8108 21.5647 14.1084 21.182 13.4768C20.7993 12.8451 20.286 12.3407 19.642 11.9636C18.998 11.5865 18.284 11.398 17.5 11.398C16.716 11.398 16.002 11.5865 15.358 11.9636C14.714 12.3407 14.1983 12.8451 13.811 13.4768C13.4237 14.1084 13.23 14.8108 13.23 15.5838C13.23 16.3663 13.4237 17.0734 13.811 17.7051C14.1983 18.3367 14.714 18.8411 15.358 19.2182C16.002 19.5953 16.716 19.7838 17.5 19.7838ZM26.348 9.00808C25.956 9.40404 25.76 9.87071 25.76 10.4081C25.76 10.9643 25.9537 11.438 26.341 11.8293C26.7283 12.2205 27.1973 12.4114 27.748 12.402C28.2707 12.3926 28.7257 12.197 29.113 11.8152C29.5003 11.4333 29.694 10.9643 29.694 10.4081C29.694 9.87071 29.5003 9.40404 29.113 9.00808C28.7257 8.61212 28.2707 8.41414 27.748 8.41414C27.2067 8.41414 26.74 8.61212 26.348 9.00808Z" fill={ color }/>
	</Svg>
}
export function moreIcon(color) {
	return <Svg viewBox="0 0 32 32" fill="none">
		<Path d="M16 13.333c1.435 0 2.683 1.248 2.683 2.683s-1.247 2.683-2.683 2.683c-1.435 0-2.683-1.247-2.683-2.683s1.248-2.683 2.683-2.683v0zM23.984 13.333c1.435 0 2.683 1.248 2.683 2.683s-1.247 2.683-2.683 2.683c-1.435 0-2.683-1.247-2.683-2.683s1.247-2.683 2.683-2.683zM8.016 13.333c1.435 0 2.683 1.248 2.683 2.683s-1.248 2.683-2.683 2.683c-1.435 0-2.683-1.247-2.683-2.683s1.248-2.683 2.683-2.683z" fill={ color }/>
	</Svg>
}
export function filterIcon(color) {
	return <Svg viewBox="0 0 36 36" fill="none">
		<Path d="M22,33V19.5L33.47,8A1.81,1.81,0,0,0,34,6.7V5a1,1,0,0,0-1-1H3A1,1,0,0,0,2,5V6.67a1.79,1.79,0,0,0,.53,1.27L14,19.58v10.2Z" fill={ color }/>
		<Path d="M33.48,4h-31A.52.52,0,0,0,2,4.52V6.24a1.33,1.33,0,0,0,.39.95l12,12v10l7.25,3.61V19.17l12-12A1.35,1.35,0,0,0,34,6.26V4.52A.52.52,0,0,0,33.48,4Z" fill={ color }/>
	</Svg>
}
export function accountIcon(color) {
	return <Svg viewBox="0 0 36 36" fill="none">
		<Path d="M22,33V19.5L33.47,8A1.81,1.81,0,0,0,34,6.7V5a1,1,0,0,0-1-1H3A1,1,0,0,0,2,5V6.67a1.79,1.79,0,0,0,.53,1.27L14,19.58v10.2Z" fill={ color }/>
		<Path d="M33.48,4h-31A.52.52,0,0,0,2,4.52V6.24a1.33,1.33,0,0,0,.39.95l12,12v10l7.25,3.61V19.17l12-12A1.35,1.35,0,0,0,34,6.26V4.52A.52.52,0,0,0,33.48,4Z" fill={ color }/>
	</Svg>
}
export function noteIcon(color) {
	return <Svg viewBox="0 0 36 36" fill="none">
		<Path d="M22,33V19.5L33.47,8A1.81,1.81,0,0,0,34,6.7V5a1,1,0,0,0-1-1H3A1,1,0,0,0,2,5V6.67a1.79,1.79,0,0,0,.53,1.27L14,19.58v10.2Z" fill={ color }/>
		<Path d="M33.48,4h-31A.52.52,0,0,0,2,4.52V6.24a1.33,1.33,0,0,0,.39.95l12,12v10l7.25,3.61V19.17l12-12A1.35,1.35,0,0,0,34,6.26V4.52A.52.52,0,0,0,33.48,4Z" fill={ color }/>
	</Svg>
}