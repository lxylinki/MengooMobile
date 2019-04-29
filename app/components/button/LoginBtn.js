import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default class LoginBtn extends Component {
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
		height: 50,
		width: 360,
		backgroundColor: '#3296fa',
		justifyContent: 'center',
		borderRadius: 25,
		margin: 10
	},

	buttonText: {
		textAlign: 'center',
		color: 'white',
		fontSize: 18
	}
});