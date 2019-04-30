import React, {Component} from 'react';
import {Alert, Dimensions, Image, StyleSheet, Button, View, Text} from 'react-native';
import Header from '../../components/head/Header';
import SearchInput from '../../components/input/SearchInput';
import RegularBtn from '../../components/button/RegularBtn';
import BadgeBtn from '../../components/button/BadgeBtn';
import HomeSwiper from '../../components/swiper/HomeSwiper';
import CourseView from '../../components/list/CourseView';
import Utils from '../../common/Utils';


export default class CourseHome extends Component {
	constructor(props) {
		super(props);
		this.page = 1;
		this.pageSize = 10;
		this.utils = new Utils();
		this.state = {
			data: new Array()
		}
		this.getData();
	}

	getData(){
		this.utils.getCourseList(this.page, this.pageSize, (resp)=>{
			console.log(resp);
			this.setState({
				data: resp._list
			});			
		})
	}

	render(){
		return(
			<View style={styles.rootView}>
				<Header style={styles.headerView} title='MY FIRST APP' />

				<View style={styles.upperView}>
					<SearchInput placeholder='搜索课程'/>
					<View style={styles.searchBadges}>
						<Text>热搜</Text>
						<BadgeBtn text={'抑郁症'} action={()=>{Alert.alert('pressed')}}/>
						<BadgeBtn text={'休克'}/>
						<BadgeBtn text={'抗肿瘤'}/>
					</View>
				</View>

				<HomeSwiper />
				
				<View style={styles.bottomView}>
					<View>
						<CourseView data={this.state.data} /> 
					</View>
				</View>

			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: { 
		flex: 1,
		backgroundColor: '#f5f6fa',
	},

	headerView: {
		height: 70
	},

	upperView: {
		height: 110,
		alignItems: 'center',
		flexDirection: 'column'
	},

	bottomView: {
		flex: 2
	},

	searchBadges: {
		flexDirection: 'row',
		alignItems: 'baseline',
		width: 380,
		height: 60,
	}
});