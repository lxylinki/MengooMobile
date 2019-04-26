import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LoginInput from '../../components/input/LoginInput';

export default class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.username = '';
		this.password = '';
	}

	render(){
		return(
			<View style={styles.loginView}>
				<LoginInput placeholder='Enter your ID' onChangeText={(text)=>{
					this.username = text;
				}}/>
				<LoginInput placeholder='Enter your password' onChangeText={(text)=>{
					this.password = text;
				}}/>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	loginView: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center'
	}
});