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
			scrollY: new Animated.Value(0),
			scrollable: true,
			scrollHeight: 0,
			showFixedBar: false
		}
	}

	componentWillMount(){
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderMove: (evt, gestureState) => {
				//console.log('dy:', gestureState.dy, this.state.scrollY._value);
				if(gestureState.dy > 0 && this.state.scrollY._value <= 0) {
					this.setState({
						scrollable: false
					});
				} else {
					this.setState({
						scrollable: true
					})
				}
			}
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
				// ???????????????
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
				this.setState({
					scrollHeight: this.state.courseData.length*120
				});
				this.refs.courseBtn.setState({active: true});
				this.refs.catagBtn.setState({active: false});
				break;
			case 1:
				this.setState({
					scrollHeight: this.state.catagData.length*90
				});

				this.refs.courseBtn.setState({active: false});
				this.refs.catagBtn.setState({active: true});
				break;
		}
	};


	scrollPage = (event)=> {
		Animated.event(
			[{ nativeEvent: 
				{ contentOffset: 
					{ y: this.state.scrollY } 
				} 
			}],
		)(event);
	};

	render(){
		return(
			<View 
				style={styles.rootView}>		
				<Header style={styles.headerView} />
				<SearchInput placeholder='????????????' navigation={this.props.navigation}/>
				
				<ScrollView 
					style={styles.bottomView}
					onScroll={this.scrollPage}
					scrollEnabled={this.state.scrollable}
					stickyHeaderIndices={[2]}>

					<View style={styles.searchBadges}>
						<Text>??????</Text>
						<BadgeBtn
							style={{width: 70}}
							text={'????????????1'} 
							action={()=>{
								this.props.navigation.navigate('CourseDetail', {id: '41'});
							}}/>
						<BadgeBtn 
							style={{width: 120}}
							text={'????????????????????????'}
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

					<View style={styles.indexBtns}>
						<RegularBtn 
							style={styles.indexBtnCourse} 
							inactStyle={styles.indexBtnFade}
							textStyle={styles.indexBtnText}
							text={'????????????'}
							ref={'courseBtn'}
							if_active={true}
							action={()=>{
								this.setState({
									scrollHeight: this.state.courseData.length*120
								});
								this.refs.courseBtn.setState({active: true});
								this.refs.catagBtn.setState({active: false});
								this.refs.pageScroll.scrollTo({x:0*width, animated:true});
							}}/>
							
						<RegularBtn 
							style={styles.indexBtnCatag} 
							inactStyle={[styles.indexBtnFade, {left: 120}]}
							textStyle={styles.indexBtnText}
							text={'????????????'}
							ref={'catagBtn'}
							if_active={false}
							action={()=>{
								this.setState({
									scrollHeight: this.state.catagData.length*90
								});
								this.refs.courseBtn.setState({active: false});
								this.refs.catagBtn.setState({active: true});
								this.refs.pageScroll.scrollTo({x:1*width, animated:true});
							}}/>
					</View>				

					<ScrollView
						style={[styles.bottomScroll, this.state.scrollHeight>0? {height: this.state.scrollHeight}: {}]}
						pagingEnabled={true}
						horizontal={true}
						ref={'pageScroll'}
						onMomentumScrollEnd={this.scrollEnd}
						scrollEventThrottle={1}
						{...this._panResponder.panHandlers}
					>

						<CourseView 
							hasSkeleton={true}
							fakeLen={5}
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
							}}
						/>

						<CatagView 
							data={this.state.catagData}
							navigation={this.props.navigation}
						/>

					</ScrollView>
				</ScrollView>

			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: { 
		flex: 1,
		backgroundColor: '#f5f6fa',
		alignItems: 'center'
	},

	headerView: {
		height: 70,
		width: width
	},

	swiper: {
		width: width,
		height: 120
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
		width: 340,
		height: 40,
		marginLeft: 10
	},

	indexBtns: {
		width: width,
		height: 55,
		flexDirection: 'row',
		alignItems: 'baseline',
		paddingLeft: 10,
		zIndex: 10,
		backgroundColor: '#f5f6fa'
	},

	indexBtnCourse: {
		width: 100,
		height: 34,
		backgroundColor: '#c9151e',
		position: 'absolute'
	},

	indexBtnCatag: {
		width: 100,
		height: 34,
		backgroundColor: '#c9151e',
		position: 'absolute',
		left: 120
	},

	indexBtnFade: {
		width: 100,
		height: 34,
		backgroundColor: 'transparent',
		position: 'absolute'
	},

	indexBtnText: {
		fontSize: 16
	},

	bottomScroll: {
		//marginTop: 55
	}
});