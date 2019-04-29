import React, {Component} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import Header from '../../components/head/Header';
import SearchInput from '../../components/input/SearchInput';
import BadgeBtn from '../../components/button/BadgeBtn';

export default class CourseHome extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Header style={styles.headerView} title='MY FIRST APP' />
				
				<View style={styles.upperView}>
					<SearchInput placeholder='搜索课程'/>
					<View style={styles.searchBadges}>
						<Text>热搜</Text>
						<BadgeBtn text={'抑郁症'}/>
						<BadgeBtn text={'休克'}/>
						<BadgeBtn text={'抗肿瘤'}/>
					</View>
				</View>

				<View style={styles.bottomView}>
					
				</View>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: { 
		flex: 1
	},

	headerView: {
		flex: 1
	},

	upperView: {
		flex: 3,
		backgroundColor: '#f5f6fa',
		alignItems: 'center',
		flexDirection: 'column'
	},

	bottomView: {
		flex: 3,
		backgroundColor: 'powderblue'
	},

	searchBadges: {
		flexDirection: 'row',
		alignItems: 'baseline',
		width: 380,
		height: 40
	},

});