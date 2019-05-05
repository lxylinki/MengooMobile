import React, {Component} from 'react';
import {
	StyleSheet, 
	View, 
	Text,
	TouchableOpacity,
	Alert
} from 'react-native';

import Header from '../../components/head/Header';
import SearchInput from '../../components/input/SearchInput';
import BadgeBtn from '../../components/button/BadgeBtn';
import RegularBtn from '../../components/button/RegularBtn';

export default class CourseSearch extends Component {
	render(){
		return(
			<View style={styles.rootView}>

				<Header style={styles.headerView} title='MY FIRST APP' />
				
				<View style={styles.upperView}>
					<View style={styles.inp}>
						<SearchInput style={styles.searchInp} autoFocus={true} smaller={true} placeholder='搜索课程' navigation={this.props.navigation}/>
						<RegularBtn 
							style={styles.cancel}
							textStyle={styles.cancelText}
							text={'取消'} 
							if_active={false} 
							action={()=>{
								this.props.navigation.navigate('CourseHome');
							}}/>
					</View>

					<View style={styles.searchBadges}>
						<Text>热搜</Text>
						<BadgeBtn text={'抑郁症'} action={()=>{Alert.alert('pressed')}}/>
						<BadgeBtn text={'休克'}/>
						<BadgeBtn text={'抗肿瘤'}/>
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

	inp: {
		flexDirection: 'row',
		alignItems: 'baseline'
	},

	headerView: {
		height: 70
	},

	upperView: {
		height: 100,
		alignItems: 'center',
		flexDirection: 'column'
	},

	searchBadges: {
		flexDirection: 'row',
		alignItems: 'baseline',
		width: 380,
		height: 60,
	},

	cancel: {
		width: 50,
		height: 30,
		margin: 0
	},

	cancelText: {
		fontSize: 14
	}
});