import React, {Component} from 'react';
import {
	StyleSheet, 
	Button, 
	View, 
	Text,
	Image,
	Dimensions,
	ScrollView,
	TouchableOpacity
} from 'react-native';

import Utils from '../../common/Utils';
import global_ from '../../common/Global';
import LineBtn from '../../components/button/LineBtn';
import RegularBtn from '../../components/button/RegularBtn';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommentView from '../../components/list/CommentView';


var {height, width} = Dimensions.get('window');

export default class CourseDetail extends Component {
	constructor(props){
		super(props);
		this.courseId = this.props.navigation.getParam('id', null);
		this.state = {
			courseView: {},
			courseDetail: {},
			commentData: []
		}
		this.utils = new Utils();
		this.page = 1;
		this.pageSize = 10;
		this.getView();
		this.getDetail();
		this.getComments();
	}

	getView(){
		this.utils.getCourseView(this.courseId, (resp)=>{
			console.log('view:', resp);
			this.setState({courseView: resp});
		});
	}

	getDetail(){
		this.utils.getCourseDetail(this.courseId, (resp)=>{
			console.log('detail:', resp[0]);
			this.setState({courseDetail: resp[0]});
		});
	}

	getComments(){
		this.utils.getCommentList(this.courseId, this.page, this.pageSize, (resp)=>{
			console.log('comments:', resp)

			if(this.page === 1) {
				this.setState({
					commentData: resp._list
				});
			} else {
				this.setState({
					commentData: this.state.commentData.concat(resp._list)
				});
			}
			
		});		
	}

	scrollEnd = (param)=> {
		let index = Math.round(param.nativeEvent.contentOffset.x/width);
		switch(index) {
			case 0:
				this.refs.detailBtn.setState({active: true});
				this.refs.commentBtn.setState({active: false});
				break;
			case 1:
				this.refs.detailBtn.setState({active: false});
				this.refs.commentBtn.setState({active: true});
				break;
		}
	};

	render(){
		return(
			<View style={styles.rootView}>
				<TouchableOpacity 
					style={styles.backBtn}
					onPress={()=>{this.props.navigation.navigate('CourseHome')}}>
					<AntDesign 
						name={'leftcircle'}
						size={30}
						color={'#999'}/>
				</TouchableOpacity>
				<Image 
					resizeMode='cover' 
					style={styles.img} 
					source={{uri: global_.url_prefix + this.state.courseView.img}} />

				<View style={styles.indexBtnView}>
					<LineBtn 
						style={styles.indexBtn} 
						textStyle={styles.indexBtnText}
						text={'课程详情'}
						ref={'detailBtn'}
						if_active={true}
						action={()=>{
							this.refs.detailBtn.setState({active: true});
							this.refs.commentBtn.setState({active: false});
							this.refs.pageScroll.scrollTo({x:0*width, animated:true});
						}}/>
						
					<LineBtn 
						style={styles.indexBtn} 
						textStyle={styles.indexBtnText}
						text={'评价 ('+ this.state.courseView.comment_count +')'}
						ref={'commentBtn'}
						if_active={false}
						action={()=>{
							this.refs.detailBtn.setState({active: false});
							this.refs.commentBtn.setState({active: true});
							this.refs.pageScroll.scrollTo({x:1*width, animated:true});							
						}}/>
				</View>

				<ScrollView 
					style={styles.scroll}
					pagingEnabled={true}
					horizontal={true}
					ref={'pageScroll'}
					onMomentumScrollEnd={this.scrollEnd}>
					{/*
					<View style={{width: width, backgroundColor: 'powderblue'}}></View>
					<View style={{width: width, backgroundColor: 'white'}}></View>*/}
					<View style={styles.detailPanel}>
						<View style={styles.titlePanel}></View>
						<View style={styles.introPanel}></View>
					</View>
					<View style={styles.commentPanel}>
						<View style={styles.commentTitle}></View>
						<CommentView data={this.state.commentData}/>
					</View>
				</ScrollView>

				<View style={styles.studyBtnView}>
					<RegularBtn 
						style={styles.studyBtn} 
						textStyle={styles.studyBtnText}
						text={'开始学习'}
						ref={'studyBtn'}
						if_active={true}
						action={()=>{
						}}/>
					<Text style={styles.learnCount}>
						{'已学习：' + this.state.courseView.learn_count + '次'}
					</Text>
				</View>
			</View>			
		);
	}
}

let styles = StyleSheet.create({
	rootView: { 
		flex: 1,
		backgroundColor: 'white'
	},

	backBtn: {
		position: 'absolute',
		top: 15,
		left: 15,
		zIndex: 10
	},

	img: {
		height:150,
		backgroundColor: 'white'
	},

	indexBtnView: {
		height: 55,
		flexDirection: 'row',
		alignItems: 'baseline',
		justifyContent: 'center'
	},

	scroll: {

	},

	detailPanel: {
		width: width
	},

	commentPanel: {
		width: width
	},

	commentTitle: {
		height: 100, 
		backgroundColor: 'yellowgreen'
	},

	titlePanel: {
		flex: 1,
		backgroundColor: 'powderblue'
	},

	introPanel: {
		flex: 3,
		backgroundColor: 'skyblue'
	},

	studyBtnView: {
		height: 70,
		flexDirection: 'row',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'baseline'
	},

	studyBtn: {
		width: 280,
		height: 45
	},

	indexBtn: {
		width: 100,
		height: 40,
		marginLeft: 20,
		marginRight: 20
	},

	indexBtnText: {
		fontSize: 16
	}
});