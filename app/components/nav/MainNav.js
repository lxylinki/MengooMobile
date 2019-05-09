import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {
	createStackNavigator, 
	createSwitchNavigator,
	createBottomTabNavigator, 
	createAppContainer} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import LoginPage from '../../pages/login/LoginPage';

import MsgHome from '../../pages/message/MsgHome';
import MsgDetail from '../../pages/message/MsgDetail';

import FollowHome from '../../pages/follow/FollowHome';
import FollowDetail from '../../pages/follow/FollowDetail';

import CourseHome from '../../pages/study/CourseHome';
import CourseDetail from '../../pages/study/CourseDetail';
import CourseSearch from '../../pages/study/CourseSearch';
import PubComment from '../../pages/study/PubComment';

import MineHome from '../../pages/mine/MineHome';
import MineDetail from '../../pages/mine/MineDetail';



const msgStack = createStackNavigator(
	{
		MsgHome: MsgHome,
		MsgDetail: MsgDetail
	},
	{
		initialRouteName: 'MsgHome',
		headerMode: 'none'
	}
);

const followStack = createStackNavigator(
	{
		FollowHome: FollowHome,
		FollowDetail: FollowDetail
	},
	{
		initialRouteName: 'FollowHome',
		headerMode: 'none'
	}
);

const studyStack = createStackNavigator(
	{
		CourseHome: CourseHome,
		CourseDetail: CourseDetail,
		CourseSearch: {
			screen: CourseSearch,
			// navigationOptions: {
			// 	tabBarVisible: false
			// }
		},
		PubComment: PubComment
	},
	{
		initialRouteName: 'CourseHome',
		headerMode: 'none'
	}
);

studyStack.navigationOptions = ({ navigation }) => {
    return {
        tabBarVisible: navigation.state.index === 0,
    };
};

const mineStack = createStackNavigator(
	{
		MineHome: MineHome,
		MineDetail: MineDetail
	},
	{
		initialRouteName: 'MineHome',
		headerMode: 'none'
	}
);

const getTabBarIcon = (navigation, focused, tintColor) => {
	const { routeName } = navigation.state;
	let iconName;
	if (routeName === 'study') {
		iconName = `ios-information-circle${focused ? '' : '-outline'}`;
		return <Ionicons name={iconName} size={25} color={tintColor} />;

	} else if (routeName === 'mine') {
		iconName = `user-circle${focused ? '' : '-o'}`;
		return <FontAwesome name={iconName} size={25} color={tintColor} />;

	} else if (routeName === 'message') {
		iconName = `message-processing${focused ? '' : ''}`;
		return <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />;

	} else if (routeName === 'follow') {
		iconName = `star${focused ? '' : '-o'}`;
		return <FontAwesome name={iconName} size={25} color={tintColor} />;
	}
};

const tabStack = createBottomTabNavigator(
	{
		message: {
			screen: msgStack,
			navigationOptions: {
				title: '消息'
			}
		},

		follow: {
			screen: followStack,
			navigationOptions: {
				title: '关注'
			}
		},

		study: {
			screen: studyStack,
			navigationOptions: {
				title: '学习'
			},
		},
		
		mine: {
			screen: mineStack,
			navigationOptions: {
				title: '我的',
				//tabBarVisible: false,
			}
		}
	},
	{
		initialRouteName: 'study',
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) =>
				getTabBarIcon(navigation, focused, tintColor),
		}),
		
		tabBarOptions: {
			activeTintColor: '#3296fa',
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
		//initialRouteName: 'Login',
		initialRouteName: 'Tab',
		headerMode: 'none'
	}
);

const AppContainer = createAppContainer(AppNavigator);

export default class MainNav extends Component {
	render(){
		return <AppContainer />
	}
}