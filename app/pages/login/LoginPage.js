import React, {Component} from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
import LoginInput from '../../components/input/LoginInput';
import Utils from '../../common/Utils';
import global_ from '../../common/Global';

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
			// this.epassword = await this.utils.encrypt(this.password);
			// console.log(this.epassword);

			this.epassword = '123456';
			let api = global_.mengoo_login;
			let data = {
				school_alias: 'zy',
				username: this.username, 
				password: this.epassword,
				remember: 0					
			};

			fetch(
				api,
				{
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				}
			).then((resp)=> 
				resp.json()

			).then((respJson)=>{
				console.log(api, respJson);
				this.props.navigation.navigate('Home');

			}).catch((err)=>{
				console.error(err);
			});
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
				<Button title='Log In' onPress={this.login} />
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