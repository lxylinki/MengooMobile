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
import CourseView from '../../components/list/CourseView';
import Utils from '../../common/Utils';


export default class CourseSearch extends Component {
	constructor(props){
		super(props);
		this.page = 1;
		this.pageSize = 10;
		this.utils = new Utils();
		this.state = {
			keyword: this.props.navigation.getParam('keyword', ''),
			courseData: []
		}
	}

	getCourseData(keyword){
		if(!keyword) {
			this.setState({
				courseData: new Array()
			});			
			return;
		}

		this.utils.getCourseList(keyword, this.page, this.pageSize, (resp)=>{
			//console.log(resp);
			if(this.page === 1) {
				this.setState({
					courseData: resp._list
				});	
			} else {
				this.setState({
					courseData: this.state.courseData.concat(resp._list)
				})
			}
		
		})
	}

	componentDidMount(){
		if(this.state.keyword.length > 0) {
			this.refs.searchInp.setState({text: this.state.keyword});
			this.getCourseData(this.state.keyword);
		}
	}

	render(){
		return(
			<View style={styles.rootView}>

				<Header style={styles.headerView} title='MY FIRST APP' />
				
				<View style={styles.upperView}>
					<View style={styles.inp}>
						<SearchInput 
							style={styles.searchInp} 
							autoFocus={true} 
							smaller={true} 
							placeholder='搜索课程' 
							navigation={this.props.navigation}
							ref={'searchInp'}
							onChangeText={(text)=>{
								this.setState({keyword: text});
								this.getCourseData(text);
							}}/>
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
						<BadgeBtn 
							text={'1'} 
							//ref={'hotSearch1'}
							action={()=>{
								// let hotkw = this.refs.hotSearch1.props.text;
								// this.refs.searchInp.setState({text: hotkw});
								// this.getCourseData(hotkw);
								this.refs.searchInp.setState({text: '1'});
								this.getCourseData('1');
							}}/>
						<BadgeBtn 
							text={'2'}
							action={()=>{
								this.refs.searchInp.setState({text: '2'});
								this.getCourseData('2');
							}}/>
						<BadgeBtn 
							text={'3'}
							action={()=>{
								this.refs.searchInp.setState({text: '3'});
								this.getCourseData('3');
							}}/>
					</View>

				</View>

				<CourseView 
					navigation={this.props.navigation}
					hasSkeleton={false}
					data={this.state.courseData} 
					onEndReached={()=>{
						if(this.state.courseData.length>=this.pageSize) {
							this.page += 1;
							this.getCourseData(this.state.keyword);
						}
					}} 
					onRefresh={()=>{
						this.page = 1;
						this.getCourseData(this.state.keyword);
					}}
					/>				
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