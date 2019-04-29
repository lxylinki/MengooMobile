import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

export default class LoginInput extends Component {
	constructor(props) {
		super(props);
		this.state = {text: ''}
	}

	render(){
		return(
			<View style={styles.inputView}>
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
	    marginTop: 10,
	    marginBottom: 10,
	    height:50,
	    width: 300,
	    backgroundColor: '#ffffff',
	    //borderRadius:50,
	    borderWidth:0.3,
	    borderColor:'#000000',
	    flexDirection: 'column',
	    justifyContent: 'center',		
	},

	input: {
	    backgroundColor: '#ffffff',
	    height:45,
	    margin:18,
	}
});