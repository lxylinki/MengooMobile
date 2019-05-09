import React, {Component} from 'react';
import {
	Alert, 
	Dimensions, 
	Image, 
	StyleSheet, 
	View, 
	Text,
	ScrollView
} from 'react-native';

import Header from '../../components/head/Header';
import SearchInput from '../../components/input/SearchInput';
import RegularBtn from '../../components/button/RegularBtn';
import BadgeBtn from '../../components/button/BadgeBtn';
import HomeSwiper from '../../components/swiper/HomeSwiper';
import CourseView from '../../components/list/CourseView';
import CatagView from '../../components/list/CatagView';
import Utils from '../../common/Utils';


var {height, width} = Dimensions.get('window');

export default class CourseHome extends Component {
	constructor(props) {
		super(props);
		this.keyword = '';
		this.page = 1;
		this.pageSize = 5;
		this.totalPage = 0;
		this.utils = new Utils();
		this.state = {
			courseData: [],
			catagData: []
		}
	}

	componentDidMount(){
		this.getCourseData();
		this.getCatagData();
	}

	getCourseData(){
		this.utils.getCourseList(this.keyword, this.page, this.pageSize, (resp)=>{
			//console.log(resp);
			if(this.totalPage === 0 && resp.total_page > 0) {
				this.totalPage = resp.total_page;
			} 
			
			if(this.page === 1) {
				// 测试骨架屏
				// setTimeout(()=>{
				// 	this.setState({
				// 		courseData: resp._list
				// 	});						
				// }, 10000);

				this.setState({
					courseData: resp._list
				});	

			} else {
				this.setState({
					courseData: this.state.courseData.concat(resp._list)
				})
			}

			if(this.stopRefresh) {
				this.stopRefresh();
			}
		
		})
	}

	getCatagData(){
		this.utils.getCatagList((resp)=>{
			//console.log(resp);
			this.setState({
				catagData: resp
			});			
		})
	}

	scrollEnd = (param)=> {
		let index = Math.round(param.nativeEvent.contentOffset.x/width);
		switch(index) {
			case 0:
				this.refs.courseBtn.setState({active: true});
				this.refs.catagBtn.setState({active: false});
				break;
			case 1:
				this.refs.courseBtn.setState({active: false});
				this.refs.catagBtn.setState({active: true});
				break;
		}
	};

	render(){
		return(
			<View style={styles.rootView}>
				<Header style={styles.headerView} title={'MY FIRST APP'} />

				<View style={styles.upperView}>
					<SearchInput placeholder='搜索课程' navigation={this.props.navigation}/>
					<View style={styles.searchBadges}>
						<Text>热搜</Text>
						<BadgeBtn 
							text={'1'} 
							action={()=>{
								this.props.navigation.navigate('CourseSearch', {keyword: '1'});
							}}/>
						<BadgeBtn 
							text={'2'}
							action={()=>{
								this.props.navigation.navigate('CourseSearch', {keyword: '2'});
							}}
						/>
						<BadgeBtn 
							text={'3'}
							action={()=>{
								this.props.navigation.navigate('CourseSearch', {keyword: '3'});
							}}
						/>
					</View>
				</View>

				<HomeSwiper />
				
				<View style={styles.bottomView}>
					<View style={styles.indexBtns}>
						<RegularBtn 
							style={styles.indexBtn} 
							textStyle={styles.indexBtnText}
							text={'推荐课程'}
							ref={'courseBtn'}
							if_active={true}
							action={()=>{
								this.refs.courseBtn.setState({active: true});
								this.refs.catagBtn.setState({active: false});
								this.refs.pageScroll.scrollTo({x:0*width, animated:true});
							}}/>
							
						<RegularBtn 
							style={styles.indexBtn} 
							textStyle={styles.indexBtnText}
							text={'课程分类'}
							ref={'catagBtn'}
							if_active={false}
							action={()=>{
								this.refs.courseBtn.setState({active: false});
								this.refs.catagBtn.setState({active: true});
								this.refs.pageScroll.scrollTo({x:1*width, animated:true});
							}}/>
					</View>

					<ScrollView 
						style={styles.scroll}
						pagingEnabled={true}
						horizontal={true}
						ref={'pageScroll'}
						onMomentumScrollEnd={this.scrollEnd}>
						<CourseView 
							hasSkeleton={true}
							navigation={this.props.navigation}
							data={this.state.courseData} 
							onEndReached={()=>{
								if(this.state.courseData.length>=this.pageSize) {
									if(this.page < this.totalPage) {
										this.page += 1;										
										this.getCourseData();
									}
								}
							}} 
							onRefresh={(callback)=>{
								this.page = 1;
								this.stopRefresh = callback;
								this.getCourseData();
							}}/>
						<CatagView data={this.state.catagData}/>
					</ScrollView>
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
		height: 100,
		alignItems: 'center',
		flexDirection: 'column'
	},

	bottomView: {
		flex: 2.5
	},

	searchBadges: {
		flexDirection: 'row',
		alignItems: 'baseline',
		width: 380,
		height: 60,
	},

	indexBtns: {
		height: 55,
		flexDirection: 'row',
		alignItems: 'baseline',
		paddingLeft: 10
	},

	scroll: {
	},

	indexBtn: {
		width: 100,
		height: 34,
	},

	indexBtnText: {
		fontSize: 16
	}

});