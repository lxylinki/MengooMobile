import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LoginInput from '../../components/input/LoginInput';

export default class LoginPage extends Component {
	render(){
		return(
			<View style={styles.loginView}>
				<LoginInput password={false} placeholder='Enter your ID' onChangeText={()=>{}}/>
				<LoginInput password={true} placeholder='Enter your password' onChangeText={()=>{}}/>
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