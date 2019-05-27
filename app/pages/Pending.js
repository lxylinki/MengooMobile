import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions
} from 'react-native';

import Header from '../../app/components/head/Header';

var {height, width} = Dimensions.get('window');

export default class Pending extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Header style={styles.headerView} />
				<Image resizeMode={'contain'} source={require('../../assets/img/pending.png')} style={styles.image} />
				<Text style={styles.text}>{'此栏目正在开发中'}</Text>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		flex:1,
		alignItems: 'center'
	},
	
	headerView: {
		height: 70,
		width: width
	},

	image: {
		width: 200,
		marginTop: 50
	},

	text: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#ddd'
	}
});