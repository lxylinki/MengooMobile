import React, {Component} from 'react';
import {TouchableOpacity, Alert, Button, StyleSheet, View, Text} from 'react-native';
import LoginInput from '../../components/input/LoginInput';
import RegularBtn from '../../components/button/RegularBtn';
import Utils from '../../common/Utils';
import global_ from '../../common/Global';
//import {BoxShadow} from 'react-native-shadow';


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
			let api = global_.mengoo_login;
			let data = {
				school_alias: 'zy',
				username: this.username, 
				password: this.epassword,
				remember: 0					
			};

			let resp = await fetch(
				api,
				{
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data),
					credentials:'include',
					mode: 'cors'					
				}
			);

			if(resp.status===200||resp.status===201||resp.status===204) {
				// let respJson = await resp.json();
				// console.log(respJson);
				this.props.navigation.navigate('Tab');

			} else {
				Alert.alert('登录失败');
				return;
			}
		}
	}

	render(){
       // const shadowOpt = {
       //      width:350,
       //      height:50,
       //      color:"#000",
       //      border:5,
       //      radius:25,
       //      opacity:0.1,
       //      x:15,
       //      y:13
       //  }

		return(
			<View style={styles.loginView}>
				<View style={styles.pageTitleDiv}>
					<Text style={styles.pageTitle}>账号密码登陆</Text>
				</View>

				<View style={styles.usernameDiv}>
					<Text style={styles.usernameLabel}>账号</Text>
					<LoginInput style={styles.usernameInp} password={false} placeholder='请输入您的账号' onChangeText={(text)=>{
						this.username = text;
					}}/>
				</View>

				<View style={styles.passwordDiv}>
					<Text style={styles.passwordLabel}>密码</Text>
					<LoginInput style={styles.passwordInp} password={true} placeholder='请输入您的密码' onChangeText={(text)=>{
						this.password = text;
					}}/>
				</View>

				<View style={styles.buttonDiv}>
					{/*<BoxShadow setting={shadowOpt}>*/}
					<RegularBtn style={styles.button} text='登录' action={this.login}/>
					{/*</BoxShadow>*/}
				</View>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	pageTitleDiv: {
		flex: 1,
		paddingTop: 100,
		paddingLeft: 20,
		justifyContent: 'center',
	},

	pageTitle: {
		fontSize: 28,
		fontWeight: 'bold'
	},

	usernameDiv: {
		flex: 2,
		padding: 20,
		flexDirection: 'column',
		marginBottom: -20
	},

	usernameLabel: {
		fontSize: 16,
		marginBottom: -20
	},

	passwordDiv: {
		flex: 2,
		marginBottom: 30,
		padding: 20,
	},

	passwordLabel: {
		fontSize: 16,
		marginBottom: -20
	},

	loginView: {
		flex: 1,
		backgroundColor: 'white'
	},

	buttonDiv: {
		flex: 3,
		alignItems: 'center'
	},

	button: {
	    shadowOffset: {width: 0, height: 0},
	    shadowColor: 'black',
	    shadowOpacity: 1,
	    shadowRadius: 5
	}
});