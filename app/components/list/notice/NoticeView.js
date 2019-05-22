import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Dimensions
} from 'react-native';

import NoticeItem from './NoticeItem';


var {height, width} = Dimensions.get('window');

export default class NoticeView extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		width: width, 
		height: 1600, 
		opacity: 0.5, 
		backgroundColor: 'skyblue'
	}
});