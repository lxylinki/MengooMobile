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
import SmallBtn from '../../components/button/SmallBtn';
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
			condition: null,
			subCatags: [],
			catagBtns: [],
			courseData: [],
			views: [],
			activeIndex: 0,
			refreshing: false,
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
			//temp setting
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

		this.utils.getCatagCourseList(cid, this.page[index], this.pageSize, (resp)=>{
			if(this.totalPage[index] === 0) {
				this.totalPage[index] = resp.total_page;
			}

			if(this.stopRefresh) {
				this.stopRefresh();
			}

			callback(resp);
		}, this.state.condition);
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
		} else {
			this.getCourseData(0, (resp)=>{
				arrs[0] = resp._list;
				this.setState({
					courseData: arrs
				});
			});			
		}
	}

	refresh(index, callback){
		this.page[index] = 1;
		this.stopRefresh = callback;
		this.getCourseData(index, (resp)=>{
			let arrs = this.state.courseData;
			arrs[index] = resp._list;
			this.setState({
				courseData: arrs
			});
		});
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
							//console.log('on end reached' + i);
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
							this.refresh(i, callback);
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
		this.refresh(index, ()=>{this.setState({refreshing: false})});	
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

               <View style={styles.sortBtns}>
					<SmallBtn 
						style={styles.sortBtn} 
						inactStyle={styles.sortBtnFade}
						textStyle={styles.sortBtnText}
						text={'综合'}
						ref={'sortByOverall'}
						if_active={true}
						action={()=>{
							this.refs.sortByOverall.setState({active: true});	
							this.refs.sortByLearnCount.setState({active: false});
							this.refs.sortByUpdatedAt.setState({active: false});
							this.refs.sortByCommentCount.setState({active: false});	
							this.setState({
								condition: null
							}, ()=>{
								this.refresh(this.state.activeIndex, ()=>{this.setState({refreshing: false})});	
							});				
						}}/>   

					<SmallBtn 
						style={styles.sortBtn} 
						inactStyle={styles.sortBtnFade}
						textStyle={styles.sortBtnText}
						text={'最热'}
						ref={'sortByLearnCount'}
						if_active={false}
						action={()=>{
							this.refs.sortByOverall.setState({active: false});	
							this.refs.sortByLearnCount.setState({active: true});
							this.refs.sortByUpdatedAt.setState({active: false});
							this.refs.sortByCommentCount.setState({active: false});	
							this.setState({
								condition: 'learn_count'
							}, ()=>{
								this.refresh(this.state.activeIndex, ()=>{this.setState({refreshing: false})});
							});	
						}}/>  

					<SmallBtn 
						style={styles.sortBtn} 
						inactStyle={styles.sortBtnFade}
						textStyle={styles.sortBtnText}
						text={'最新'}
						ref={'sortByUpdatedAt'}
						if_active={false}
						action={()=>{
							this.refs.sortByOverall.setState({active: false});	
							this.refs.sortByLearnCount.setState({active: false});
							this.refs.sortByUpdatedAt.setState({active: true});
							this.refs.sortByCommentCount.setState({active: false});
							this.setState({
								condition: 'updated_at'
							}, ()=>{
								this.refresh(this.state.activeIndex, ()=>{this.setState({refreshing: false})});
							});
						}}/>  

					<SmallBtn 
						style={styles.sortBtn} 
						inactStyle={styles.sortBtnFade}
						textStyle={styles.sortBtnText}
						text={'热评'}
						ref={'sortByCommentCount'}
						if_active={false}
						action={()=>{
							this.refs.sortByOverall.setState({active: false});	
							this.refs.sortByLearnCount.setState({active: false});
							this.refs.sortByUpdatedAt.setState({active: false});
							this.refs.sortByCommentCount.setState({active: true});
							this.setState({
								condition: 'comment_count'
							}, ()=>{
								this.refresh(this.state.activeIndex, ()=>{this.setState({refreshing: false})});	
							});						
						}}/>               	
                </View>


				<ScrollView 
					style={styles.pageScroll}
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
        marginBottom: 25
	},

	btnScroll: {
		margin: 0
	},

	catagBtnText: {
		fontSize: 16
	},

	sortBtns: {
		flexDirection: 'row',
		paddingLeft: 10,
	},
	pageScroll: {
		height: height
	}
});