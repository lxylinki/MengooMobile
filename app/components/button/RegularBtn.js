import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default class RegularBtn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false
		}
	}

	render(){
		return(
			<TouchableOpacity 
				style={this.state.active? [styles.button, this.props.style] : [styles.inactive, this.props.style]} 
				onPress={this.props.action}>
				<Text style={this.state.active? [styles.buttonText, this.props.style] : [styles.inactiveText, this.props.style]}>{this.props.text}</Text>
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
		alignItems: 'center',
		borderRadius: 25,
		margin: 10
	},

	buttonText: {
		color: 'white',
		fontSize: 18,
		alignSelf: 'center'
	},

	inactive: {
		height: 50,
		width: 360,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10
	},

	inactiveText: {
		color: '#333',
		fontSize: 18,
		alignSelf: 'center'
	}
});