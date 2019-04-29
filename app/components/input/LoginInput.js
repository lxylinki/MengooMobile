import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

export default class LoginInput extends Component {
	constructor(props) {
		super(props);
		this.state = {text: ''}
	}

	render(){
		return(
			<View style={[styles.inputView, this.props.style]}>
				<TextInput 
					style={styles.input}
					placeholder={this.props.placeholder}
					secureTextEntry={this.props.password}
					onChangeText={
						(text)=>{
							this.setState({text});
							this.props.onChangeText(text);
						}
					}
				/>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	inputView: {
	    marginTop: 20,
	    marginBottom: 10,
	    height:50,
	    width: 360
	},

	input: {
	    height:45,
	    width: 360,
	    margin:0,
	    borderBottomWidth: 0.3,
	}
});