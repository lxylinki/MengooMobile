import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import LoginPage from '../../pages/login/LoginPage';
import HomePage from '../../pages/home/HomePage';
import CourseDetail from '../../pages/course/CourseDetail';

const AppNavigator = createStackNavigator(
	{
		Login: LoginPage,
		Home: HomePage,
		Details: CourseDetail
	},
	{
		initialRouteName: 'Login'
	}
);

const AppContainer = createAppContainer(AppNavigator);

export default class MainNav extends Component {
	render(){
		return <AppContainer />
	}
}