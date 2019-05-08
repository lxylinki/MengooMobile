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

import HTML from 'react-native-render-html';
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
			teachers: [],
			commentData: []
		}
		this.utils = new Utils();
		this.page = 1;
		this.pageSize = 10;
	}

	componentDidMount(){
		this.getView();
		this.getDetail();
		this.getGroup();
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

	getGroup(){
		this.utils.getCourseGroup(this.courseId, (resp)=>{
			console.log('teachers:', resp);
			this.setState({teachers: resp});
		});
	}

	listTeachers(){
		let teachers = [];
		for(let i in this.state.teachers) {
			let teacher = this.state.teachers[i];
			teachers.push(<Text key={i} style={styles.teacherName}>{teacher.realname}</Text>);
		}
		return teachers;
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

    getDate(time){
        time = ~~time;
        var D = Math.floor(time/60/24),
            h = Math.floor(time%(60*24)/60),
            m = Math.floor(time%(60*24)%60);

        return {
            D : D,
            h : h,
            m : m
        };
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
		let stime = this.getDate(this.state.courseView.time);
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
						style={this.state.courseView.comment_count?styles.indexBtn:{display: 'none'}} 
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
					<View style={styles.detailPanel}>
						<View style={styles.titlePanel}>
							<Text style={styles.courseTitle}>{this.state.courseView.name}</Text>
							<View style={styles.teacherList}>
								{this.listTeachers()}
							</View>
							<View>
								<Text style={styles.suggestTime}>
									建议学习时长：
									{(stime.D?(stime.D+'天'):'')+(stime.h?(stime.h+'小时'):'')+(stime.m?(stime.m+'分'):'')}
								</Text>
							</View>
						</View>
						<View style={styles.introPanel}>
							<View style={styles.intro}>
								<Text style={styles.introTitle}>课程概述</Text>
								<ScrollView 
									contentContainerStyle={styles.contentContainer}
									pagingEnabled={true}>
									<HTML
										html={this.state.courseDetail.intro?
										this.state.courseDetail.intro.replace( /(<img.+?src=")(.*?)/, '$1'+ global_.main_url +'$2'):'<p></p>'} />
								</ScrollView>
						
							</View>
							<View style={styles.syllabus}>
								<Text style={styles.syllabusTitle}>课程大纲</Text>
								<ScrollView pagingEnabled={true}>
									<HTML 
										html={this.state.courseDetail.syllabus?
										this.state.courseDetail.syllabus:'<p></p>'} />
								</ScrollView>
							</View>
						</View>
					</View>
					<View style={styles.commentPanel}>
						<View style={styles.commentTitle}>
							
						</View>
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
					<Text style={this.state.courseView.learn_count?styles.learnCount:{display: 'none'}}>
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

	contentContainer: {
		paddingVertical: 0
	},

	detailPanel: {
		width: width
	},

	commentPanel: {
		width: width
	},

	commentTitle: {
		height: 100,
		borderTopWidth: 0.3
	},

	titlePanel: {
		flex: 1,
		borderTopWidth: 0.3,
		borderBottomWidth: 0.3,
		//borderBottomColor: '#ddd',
		padding: 10
	},

	courseTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},

	htmlText: {
		color: 'red'
	},

	teacherList: {
		flexDirection: 'row',		
	},

	teacherName: {
		marginRight: 10,
		marginTop: 10,
		marginBottom: 10
	},

	suggestTime: {
	},

	introPanel: {
		flex: 3
	},

	intro: {
		flex: 1,
		padding: 10
	},

	introTitle: {
		fontSize: 16,
		fontWeight: 'bold'
	},

	syllabusTitle: {
		fontSize: 16,
		fontWeight: 'bold'
	},

	syllabus: {
		flex: 1,
		padding: 10
	},

	studyBtnView: {
		height: 70,
		flexDirection: 'row',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'baseline',
		borderTopWidth: 0.3
	},

	studyBtn: {
		width: 280,
		height: 45
	},

	indexBtn: {
		width: 100,
		height: 53,
		marginLeft: 20,
		marginRight: 20
	},

	indexBtnText: {
		fontSize: 16
	}
});