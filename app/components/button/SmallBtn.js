import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default class SmallBtn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: true
		}
	}

	componentDidMount(){
		if(Object.keys(this.props).includes('if_active')) {
			this.setState({active: this.props.if_active});
		}
	}

	render(){
		return(
			<TouchableOpacity 
				disabled={this.props.disabled || false}
				style={this.state.active? [styles.button, this.props.style] : [styles.inactive, this.props.inactStyle]} 
				onPress={this.props.action}>
				<Text style={[this.state.active? styles.buttonText : styles.inactiveText, this.props.textStyle]}>{this.props.text}</Text>
			</TouchableOpacity>			
		);
	}
}

let styles = StyleSheet.create({
	button: {
		height: 30,
		width: 60,
		backgroundColor: '#c9151e',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		margin: 10,
	},

	buttonText: {
		color: 'white',
		fontSize: 14,
	},

	inactive: {
		height: 30,
		width: 60,
		backgroundColor: '#ececec',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		margin: 10
	},

	inactiveText: {
		fontSize: 14,
		color: '#999999',
		alignSelf: 'center'
	}
});