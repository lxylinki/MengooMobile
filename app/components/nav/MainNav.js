import React, {Component} from 'react';
import {
	View, 
	Text,
	Image,
	StyleSheet
} from 'react-native';
import {
	createStackNavigator, 
	createSwitchNavigator,
	createBottomTabNavigator, 
	createAppContainer} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconfont from 'react-native-vector-icons/Iconfont';


import LoginPage from '../../pages/login/LoginPage';
import Preface from '../../pages/login/Preface';

import Pending from '../../pages/Pending';

import MsgHome from '../../pages/message/MsgHome';
//import MsgDetail from '../../pages/message/MsgDetail';

import FollowHome from '../../pages/follow/FollowHome';
//import FollowDetail from '../../pages/follow/FollowDetail';

import CourseHome from '../../pages/study/CourseHome';
import CourseDetail from '../../pages/study/CourseDetail';
import CourseStruct from '../../pages/study/CourseStruct';
import CourseSearch from '../../pages/study/CourseSearch';
import PubComment from '../../pages/study/PubComment';
import EditComment from '../../pages/study/EditComment';
import CourseVideo from '../../pages/study/CourseVideo';
import CourseArticle from '../../pages/study/CourseArticle';
import CourseExp from '../../pages/study/CourseExp';
import CourseImage from '../../pages/study/CourseImage';
import NoticeDetail from '../../pages/study/NoticeDetail';
import CatagDetail from '../../pages/study/CatagDetail';
import ExamDetail from '../../pages/study/ExamDetail';
import ExamContent from '../../pages/study/ExamContent';



import VidHome from '../../pages/vidstudy/VidHome';
//import VidDetail from '../../pages/vidstudy/VidDetail';

import MineHome from '../../pages/mine/MineHome';
import MyCourse from '../../pages/mine/MyCourse';
import MyInfo from '../../pages/mine/MyInfo';



const msgStack = createStackNavigator(
	{
		MsgHome: Pending,
		//MsgDetail: MsgDetail
	},
	{
		initialRouteName: 'MsgHome',
		headerMode: 'none'
	}
);

const followStack = createStackNavigator(
	{
		FollowHome: Pending,
		//FollowDetail: FollowDetail
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
		CourseSearch: CourseSearch,
		PubComment: PubComment,
		EditComment: EditComment,
		CourseStruct: CourseStruct,
		CourseVideo: CourseVideo,
		CourseArticle: CourseArticle,
		CourseExp: CourseExp,
		CourseImage: CourseImage,
		NoticeDetail: NoticeDetail,
		CatagDetail: CatagDetail,
		ExamDetail: ExamDetail,
		ExamContent: ExamContent,
		Pending: Pending
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

const vidstudyStack = createStackNavigator(
	{
		VidHome: Pending,
		//VidDetail: VidDetail
	},
	{
		initialRouteName: 'VidHome',
		headerMode: 'none'
	}
);


const mineStack = createStackNavigator(
	{
		MineHome: MineHome,
		MyCourse: MyCourse,
		CourseSearch: CourseSearch,
		MyInfo: MyInfo
	},
	{
		initialRouteName: 'MineHome',
		headerMode: 'none'
	}
);

mineStack.navigationOptions = ({ navigation })=> {
	return {
		tabBarVisible: navigation.state.index === 0,
	};
}


const loginStack = createStackNavigator(
	{
		LoginPage: LoginPage,
		Preface: Preface
	},
	{
		initialRouteName: 'Preface',
		headerMode: 'none'
	}
);

const getTabBarIcon = (navigation, focused, tintColor) => {
	const { routeName } = navigation.state;
	let iconName;
	if (routeName === 'study') {
		if(focused) {
			return <Image resizeMode='stretch' style={styles.homeIcon} source={require('../../../assets/img/home-selected.png')} />
		} else {
			return <Image resizeMode='stretch' style={styles.homeIcon} source={require('../../../assets/img/home.png')} />			
		}

	} else if (routeName === 'mine') {
		iconName = `mine${focused ? '' : ''}`;
		return <Iconfont name={iconName} size={30} color={tintColor} />;

	} else if (routeName === 'message') {
		iconName = `message${focused ? '' : ''}`;
		return <Iconfont name={iconName} size={30} color={tintColor} />;

	} else if (routeName === 'follow') {
		iconName = `follow${focused ? '' : ''}`;
		return <Iconfont name={iconName} size={30} color={tintColor} />;
		
	} else if (routeName === 'vidstudy') {
		iconName = `vidstudy${focused ? '' : ''}`;
		return <Iconfont name={iconName} size={30} color={tintColor} />;		
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
				title: ''
			},
		},

		vidstudy: {
			screen: vidstudyStack,
			navigationOptions: {
				title: '视频学习'
			}
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
			activeTintColor: '#c9151e',
			inactiveTintColor: 'gray',
			style: {height: 60}
		},
	}
);

const AppNavigator = createSwitchNavigator(
	{
		Login: loginStack,
		Tab: tabStack
	},
	{
		initialRouteName: 'Login',
		//initialRouteName: 'Tab',
		headerMode: 'none'
	}
);

const AppContainer = createAppContainer(AppNavigator);

export default class MainNav extends Component {
	render(){
		return <AppContainer />
	}
}

let styles = StyleSheet.create({
	homeIcon: {
		width: 40,
		height: 40,
		position: 'absolute',
		top: 8
	}
});