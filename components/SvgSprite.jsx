import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function arrowSvg(color, opacity) {
	return <Svg width={ 12 } height={ 18 } viewBox="0 0 9 14" fill="none">
		<Path d="M1.5 1L7.5 7L1.5 13" stroke={ color } strokeOpacity={ opacity } strokeWidth={ 2 } strokeLinecap="round" strokeLinejoin="round"/>
	</Svg>
};
export function checkSvg(color) {
	return <Svg width={ 14 } height={ 11 } viewBox="0 0 14 11" fill="none">
		<Path d="M13 1L4.75 10L1 5.90909" stroke={ color } strokeWidth={ 2 } strokeLinecap="round" strokeLinejoin="round"/>
	</Svg>
};
