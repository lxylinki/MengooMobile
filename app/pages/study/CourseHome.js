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
		this.page = 1;
		this.pageSize = 10;
		this.utils = new Utils();
		this.state = {
			courseData: new Array(),
			catagData: new Array()
		}
		this.getCourseData();
		this.getCatagData();
	}

	getCourseData(){
		this.utils.getCourseList(this.page, this.pageSize, (resp)=>{
			//console.log(resp);
			this.setState({
				courseData: resp._list
			});			
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
				<Header style={styles.headerView} title='MY FIRST APP' />

				<View style={styles.upperView}>
					<SearchInput placeholder='搜索课程' navigation={this.props.navigation}/>
					<View style={styles.searchBadges}>
						<Text>热搜</Text>
						<BadgeBtn text={'抑郁症'} action={()=>{Alert.alert('pressed')}}/>
						<BadgeBtn text={'休克'}/>
						<BadgeBtn text={'抗肿瘤'}/>
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
						
						<CourseView data={this.state.courseData} /> 
						<CatagView data={this.state.catagData}/>
						{/*
						<View style={{width: width, backgroundColor: 'powderblue'}}></View>
						<View style={{width: width, backgroundColor: 'steelblue'}}></View>*/}
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