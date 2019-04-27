import React, {Component} from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
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
				<LoginInput password={false} placeholder='Enter your ID' onChangeText={(text)=>{
					this.username = text;
				}}/>
				<LoginInput password={true} placeholder='Enter your password' onChangeText={(text)=>{
					this.password = text;
				}}/>
				<Button title='Log In' onPress={()=>{this.props.navigation.navigate('Details')}} />
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