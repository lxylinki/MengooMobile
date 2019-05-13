import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

export default class LoginInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			isFocused: false
		}
	}

	onFocusChange = () => {
	    this.setState({ isFocused: true });
	};

	onBlurChange = () => {
	    this.setState({ isFocused: false });
	};

	render(){
		return(
			<View style={[styles.inputView, this.props.style]}>
				<TextInput 
					style={(this.state.isFocused) ? styles.focusInput : styles.input }
					placeholder={this.props.placeholder}
					secureTextEntry={this.props.password}
					onChangeText={
						(text)=>{
							this.setState({text});
							this.props.onChangeText(text);
						}
					}
					onFocus={this.onFocusChange}
					onBlur={this.onBlurChange}
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
	},

	focusInput: {
	    height:45,
	    width: 360,
	    margin:0,
	    borderBottomWidth: 2,
	    borderBottomColor: '#c9151e'		
	}
});