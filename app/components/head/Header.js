import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Header extends Component {
	render(){
		return (
			<View style={[this.props.style, styles.headerbar]}>
				<Text style={styles.headertext}>{this.props.title}</Text>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	headerbar: {
		backgroundColor: '#e42417',
		justifyContent: 'center',
		alignItems: 'center'
	},

	headertext: {
		color: 'white',
		fontSize: 18
	}
});