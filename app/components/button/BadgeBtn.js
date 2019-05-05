import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default class BadgeBtn extends Component {
	render(){
		return(
			<TouchableOpacity style={[styles.button, this.props.style]} onPress={this.props.action}>
				<Text style={styles.buttonText}>{this.props.text}</Text>
			</TouchableOpacity>			
		);
	}
}

let styles = StyleSheet.create({
	button: {
		height: 25,
		width: 70,
		backgroundColor: 'white',
		justifyContent: 'center',
		borderRadius: 25,
		margin: 5
	},

	buttonText: {
		textAlign: 'center',
		color: '#999',
		fontSize: 12
	}
});