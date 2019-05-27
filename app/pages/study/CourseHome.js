import React, {Component} from 'react';
import {
	Alert, 
	Dimensions, 
	Image, 
	StyleSheet, 
	View, 
	Text,
	ScrollView,
	Animated,
	PanResponder
} from 'react-native';

import Header from '../../components/head/Header';
import SearchInput from '../../components/input/SearchInput';
import RegularBtn from '../../components/button/RegularBtn';
import BadgeBtn from '../../components/button/BadgeBtn';
import HomeSwiper from '../../components/swiper/HomeSwiper';
import CourseView from '../../components/list/course/CourseView';
import CatagView from '../../components/list/catag/CatagView';
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

		this.height = height*0.4;
		this.listTop = 0;

		this.state = {
			courseData: [],
			catagData: [],
			bottomHeight: new Animated.Value(this.height),
		}
	}

	scrollDown(){
		Animated.timing(
		this.state.bottomHeight,
			{
				toValue: height*0.4,
				duration: 1500
			}
		).start();
	}

	scrollUp(){
		Animated.timing(
			this.state.bottomHeight,
			{
				toValue: height*0.7,
				duration: 1500
			}
		).start();
	}

	componentWillMount() {
		this.setPanelScrollTop();
		// this.animatedEvent = Animated.event([
		// 	//this.state.bottomHeight = e.nativeEvent.contentOffset.y
		// 	{
		// 		nativeEvent: {
		// 			contentOffset: { 
		// 				y: this.state.bottomHeight, 
		// 			}
		// 		}
		// 	}
		// ]);

		// this.animatedEvent = (event)=> {
		// 	console.log(event.nativeEvent.contentOffset.y);
		// }

		this._panResponder = PanResponder.create({
			// 要求成为响应者：
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			//onPanResponderGrant: (evt, gestureState) => {},
			onPanResponderMove: (evt, gestureState) => {
			// 最近一次的移动距离为gestureState.move{X,Y}

			// 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
				console.log(gestureState.dy);
		        if(gestureState.dy > 5) {
		        	this.scrollDown();

		        } else if(gestureState.dy < -5) {
		        	this.scrollUp();
		        }
			},
			//onPanResponderEnd: (evt, gestureState)=> {}
		});

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
		this.utils.getCatagList(null, (resp)=>{
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

	setPanelScrollTop(){
		// this.listHeight = this.state.bottomHeight.interpolate({
		// 	inputRange: [0, height*0.25, height*0.5, height],
		// 	outputRange: [height*0.45, height*0.6, height*0.7, height*0.7]
		// });

		this.listTop = this.state.bottomHeight.interpolate({
			inputRange: [height*0.4, height*0.7],
			outputRange: [0, -50]
		});		
	}

	render(){
		let { bottomHeight, bottomTop } = this.state;
		return(
			<View style={styles.rootView}>		
				<Header style={styles.headerView} />
				<SearchInput placeholder='搜索课程' navigation={this.props.navigation}/>
						
				<View style={styles.searchBadges}>
					<Text>热搜</Text>
					<BadgeBtn
						style={{width: 70}}
						text={'测试课程1'} 
						action={()=>{
							this.props.navigation.navigate('CourseDetail', {id: '41'});
						}}/>
					<BadgeBtn 
						style={{width: 120}}
						text={'课程虚拟仿真实验'}
						action={()=>{
							this.props.navigation.navigate('CourseDetail', {id: 'B3'});
						}}
					/>
					{/*
					<BadgeBtn 
						text={'3'}
						action={()=>{
							this.props.navigation.navigate('CourseSearch', {keyword: '3'});
						}}
					/>*/}
				</View>
				
				<HomeSwiper style={styles.swiper}/>
				
				<Animated.View 
					style={[styles.bottomView, {top: this.listTop, height: this.state.bottomHeight}]}
					scrollEventThrottle={16}>
					
					<View style={styles.indexBtns}>
						<RegularBtn 
							style={styles.indexBtn} 
							inactStyle={styles.indexBtnFade}
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
							inactStyle={styles.indexBtnFade}
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
						pagingEnabled={true}
						horizontal={true}
						ref={'pageScroll'}
						onMomentumScrollEnd={this.scrollEnd}
						{...this._panResponder.panHandlers}>

						<CourseView 
							//onScroll={this.animatedEvent}
							hasSkeleton={true}
							navigation={this.props.navigation}
							data={this.state.courseData} 
							onEndReached={()=>{
								//console.log('on end reached');
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
							}}
						/>

						<CatagView 
							//onScroll={this.animatedEvent}
							data={this.state.catagData}
							navigation={this.props.navigation}
						/>

					</ScrollView>
				</Animated.View>

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

	swiper: {
		position: 'absolute',
		width: width,
		height: 120,
		top: 0
	},

	bottomView: {
		backgroundColor: '#f5f6fa'
	},

	// bottomViewExpanded: {
	// 	top: -60,
	// 	height: height*0.7,
	// 	backgroundColor: '#f5f6fa'
	// },

	searchBadges: {
		flexDirection: 'row',
		alignItems: 'baseline',
		width: 380,
		height: 40,
		marginLeft: 10
	},

	indexBtns: {
		height: 55,
		flexDirection: 'row',
		alignItems: 'baseline',
		paddingLeft: 10
	},

	indexBtn: {
		width: 100,
		height: 34,
		backgroundColor: '#c9151e'
	},
	indexBtnFade: {
		width: 100,
		height: 34,
		backgroundColor: 'transparent'
	},
	indexBtnText: {
		fontSize: 16
	}

});