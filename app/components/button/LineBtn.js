import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default class LineBtn extends Component {
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
				style={[this.state.active? styles.button : styles.inactive, this.props.style]} 
				onPress={this.props.action}>
				<Text style={[this.state.active? styles.buttonText : styles.inactiveText, this.props.textStyle]}>{this.props.text}</Text>
			</TouchableOpacity>			
		);
	}
}

let styles = StyleSheet.create({
	button: {
		height: 50,
		width: 360,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		borderBottomColor: '#3296fa',
		borderBottomWidth: 3
	},

	buttonText: {
		fontSize: 18,
		fontWeight: 'bold'
	},

	inactive: {
		height: 50,
		width: 360,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25
	},

	inactiveText: {
		fontSize: 18,
		alignSelf: 'center'
	}
});