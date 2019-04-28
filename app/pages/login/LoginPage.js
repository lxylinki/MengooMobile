import React, {Component} from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
import LoginInput from '../../components/input/LoginInput';
import Utils from '../../common/Utils';

export default class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.username = '';
		this.password = '';
		this.epassword = '';
		this.utils = new Utils();
		this.login = this.login.bind(this);
	}

	login(){
		asyncReq.call(this);
		async function asyncReq(){
			this.epassword = await this.utils.encrypt(this.password);
			console.log(this.epassword);
		}
	}

	render(){
		return(
			<View style={styles.loginView}>
				<LoginInput password={false} placeholder='Enter your ID' onChangeText={(text)=>{
					this.username = text;
				}}/>
				<LoginInput password={true} placeholder='Enter your password' onChangeText={(text)=>{
					this.password = text;
				}}/>
				<Button style={styles.button} title='Log In' onPress={
					this.login
				} />
			</View>
		);
	}
}

let styles = StyleSheet.create({
	loginView: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center'
	},

	button: {
		marginTop: 20
	}
});