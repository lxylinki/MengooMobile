import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {
	createStackNavigator, 
	createSwitchNavigator,
	createBottomTabNavigator, 
	createAppContainer} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginPage from '../../pages/login/LoginPage';

import HomePage from '../../pages/study/HomePage';
import CourseDetail from '../../pages/study/CourseDetail';

import MinePage from '../../pages/mine/MinePage';
import MineDetail from '../../pages/mine/MineDetail';


const studyStack = createStackNavigator(
	{
		Home: HomePage,
		Details: CourseDetail
	},
	{
		initialRouteName: 'Home',
		headerMode: 'none'
	}
);

const mineStack = createStackNavigator(
	{
		MineHome: MinePage,
		MineDetails: MineDetail
	},
	{
		initialRouteName: 'MineHome',
		headerMode: 'none'
	}
);

const getTabBarIcon = (navigation, focused, tintColor) => {
	const { routeName } = navigation.state;
	let IconComponent = Ionicons;
	let iconName;

	if (routeName === 'study') {
		iconName = `ios-information-circle${focused ? '' : '-outline'}`;
		// We want to add badges to home tab icon
		//IconComponent = HomeIconWithBadge;
	} else if (routeName === 'mine') {
		iconName = `ios-options${focused ? '' : ''}`;
	}

	// You can return any component that you like here!
	return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const tabStack = createBottomTabNavigator(
	{
		study: studyStack,
		mine: mineStack
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) =>
				getTabBarIcon(navigation, focused, tintColor),
		}),
		
		tabBarOptions: {
			activeTintColor: 'tomato',
			inactiveTintColor: 'gray',
		},
	}
);

const AppNavigator = createSwitchNavigator(
	{
		Login: LoginPage,
		Tab: tabStack
	},
	{
		initialRouteName: 'Login',
		headerMode: 'none'
	}
);

const AppContainer = createAppContainer(AppNavigator);

export default class MainNav extends Component {
	render(){
		return <AppContainer />
	}
}