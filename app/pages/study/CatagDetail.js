import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import Utils from '../../common/Utils';
import ShallowLineBtn from '../../components/button/ShallowLineBtn';
import TitleHeader from '../../components/head/TitleHeader';
import CourseView from '../../components/list/course/CourseView';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';


var {height, width} = Dimensions.get('window');

export default class CatagDetail extends Component {
	constructor(props){
		super(props);
		this.utils = new Utils();
		this.item = this.props.navigation.getParam('item', null);

		this.page = [];
		this.pageSize = 5;
		this.totalPage = [];

		this.state = {
			subCatags: [],
			catagBtns: [],
			courseData: [],
			views: [],
			activeIndex: 0,
			refreshing: false
		};
	}

	componentDidMount(){
		this.getSubCatagList(this.state.activeIndex);
	}

	getSubCatagList(index){
		this.utils.getCatagList(this.item.id, (resp)=>{
			this.setState({
				subCatags: resp
			}, ()=>{
				this.fillCourseData();
				this.setPageArr();
				this.setState({catagBtns: this.genCatagBtns(index)});
			});
		});
	}

	selectCatag(index) {
		this.setState({
			activeIndex: index,
			catagBtns: this.genCatagBtns(index)
		}, ()=>{
			this.refs.pageScroll.scrollTo({x:index*width, animated:true});
		});
	}

	scrollToPage(index) {
		this.setState({
			activeIndex: index,
			catagBtns: this.genCatagBtns(index)
		}, ()=>{
			if(index === 0) {
				this.refs.btnScroll.scrollTo({x:0, animated:true});
			} else if(index > 2) {
				this.refs.btnScroll.scrollTo({x:width, animated:true});
			}
		});		
	}

	setPageArr(){
		this.page.push(1);
		this.totalPage.push(0);
		for(let i in this.state.subCatags) {
			this.page.push(1);
			this.totalPage.push(0);
		}
	}

	//index is selected
	genCatagBtns(index){
		let btns = [];
		btns.push(
			<ShallowLineBtn 
				key={0}
				style={styles.catagBtn} 
				textStyle={styles.catagBtnText}
				text={'全部'}
				if_active={index === 0}
				action={()=>{
					this.selectCatag(0);
				}}
			/>
		);
		for(let i in this.state.subCatags) {
			let subCatag = this.state.subCatags[i];
			btns.push(
				<ShallowLineBtn 
					key={Number(i)+1}
					style={styles.catagBtn} 
					textStyle={styles.catagBtnText}
					text={subCatag.name}
					if_active={index === Number(i)+1}
					action={()=>{
						this.selectCatag(Number(i)+1);
					}}
				/>
			);
		}
		//console.log(btns);
		return btns;
		// this.setState({
		// 	catagBtns: btns
		// }, ()=>{console.log(this.state.catagBtns)});
	}


	getCourseData(index, callback) {
		let cid;
		if(Number(index) === 0) {
			cid = this.item.id;
		} else {
			cid = this.state.subCatags[Number(index)-1].id;
		}
		
		//console.log('cid:', cid);

		this.utils.getCatagCourseList(cid, this.page, this.pageSize, (resp)=>{
			if(this.totalPage[index] === 0) {
				this.totalPage[index] = resp.total_page;
			}
			if(this.stopRefresh) {
				this.stopRefresh();
			}
			callback(resp);
		});
	}

	fillCourseData(){
		let arrs = [];
		if(this.state.subCatags.length > 0) {
			for(let i=0; i<=this.state.subCatags.length; i++) {
				this.getCourseData(i, (resp)=>{
					arrs[i] = resp._list;
					this.setState({
						courseData: arrs
					});
				});
			}
		}
	}

	genListViews(){
		let views = [];
		if(this.state.courseData.length == this.state.subCatags.length + 1) {
			for(let i in this.state.courseData) {
				views.push(
					<CourseView 
						key={i}
						navigation={this.props.navigation}
						data={this.state.courseData[i]}
						onEndReached={()=>{
							console.log('on end reached' + i);
							if(this.state.courseData[i].length>=this.pageSize) {
								if(this.page[i] < this.totalPage[i]) {
									this.page[i] += 1;										
									this.getCourseData(i, (resp)=>{
										let arrs = this.state.courseData;
										arrs[i] = arrs[i].concat(resp._list);
										this.setState({
											courseData: arrs
										})
									});
								}
							}
						}} 
						onRefresh={(callback)=>{
							this.page[i] = 1;
							this.stopRefresh = callback;
							this.getCourseData(i, (resp)=>{
								let arrs = this.state.courseData;
								arrs[i] = resp._list;
								this.setState({
									courseData: arrs
								});
							});
						}}
					/>
				);
			}
		}
		return views;
	}

	scrollEnd = (param)=> {
		let index = Math.round(param.nativeEvent.contentOffset.x/width);
		this.scrollToPage(index);
	};

	render(){
		return(
			<View style={styles.rootView}>
				<TitleHeader style={styles.headerView} title={this.item.name}/>
                
                <TouchableOpacity 
                    style={styles.backBtn}
                    onPress={()=>{this.props.navigation.goBack()}}>
                    <Entypo 
                        name={'chevron-thin-left'}
                        size={25}
                        color={'white'}/>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.searchBtn}
                    onPress={()=>{this.props.navigation.navigate('CourseSearch')}}>
                    <AntDesign 
                        name={'search1'}
                        size={25}
                        color={'white'}/>
                </TouchableOpacity>

				<ScrollView 
					style={styles.btnScroll}
					ref={'btnScroll'}
					horizontal={true}>
					{this.state.catagBtns}
				</ScrollView>

				<ScrollView 
					ref={'pageScroll'}
					horizontal={true}
					pagingEnabled={true}
					onMomentumScrollEnd={this.scrollEnd}>
					{this.genListViews()}
				</ScrollView>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		flex: 1,
		backgroundColor: '#f5f6fa',		
	},
    
    backBtn: {
        position: 'absolute',
        top: 20,
        left: 15,
        zIndex: 10
    },
    
    searchBtn: {
        position: 'absolute',
        top: 20,
        right: 15,
        zIndex: 10
    },

	headerView: {
		height: 70
	},

	catagBtn: {
        width: 120,
        height: 45,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20
	},

	catagBtnText: {
		fontSize: 16
	}
});