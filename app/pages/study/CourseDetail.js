import React, {Component} from 'react';
import {
	StyleSheet, 
	Button, 
	View, 
	Text,
	Image,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	Animated
} from 'react-native';
import { connect } from 'react-redux';

import HTML from 'react-native-render-html';
import Utils from '../../common/Utils';
import global_ from '../../common/Global';
import LineBtn from '../../components/button/LineBtn';
import RegularBtn from '../../components/button/RegularBtn';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommentView from '../../components/list/comment/CommentView';
import CommentTitle from '../../components/list/comment/CommentTitle';
//import Storage from '../../common/Storage';


var {height, width} = Dimensions.get('window');

class CourseDetail extends Component {
	constructor(props){
		super(props);
		this.courseId = this.props.navigation.getParam('id', null);
		this.state = {
			courseView: {},
			courseDetail: {},
			teachers: [],
			commentData: [],
			showHeadBanner: false,
			scrollY: new Animated.Value(0),
			scrollHeight: 0
		}
		this.utils = new Utils();
		this.page = 1;
		this.pageSize = 5;
		this.totalPage = 0;
		this.userId = this.props.user_id;
		this.contentHeight = 0;
	}

	componentDidMount(){
		//Storage.get('user_info').then((info)=>{this.userId = info.id});
		//console.log(this.courseId);
		this.getView();
		this.getDetail();
		this.getGroup();

		const {navigation} = this.props;
		this.focusListener = navigation.addListener('didFocus', ()=>{
			this.getComments();
		})
	}

	componentWillUnmount(){
		this.focusListener.remove();
	}

	getView(){
		this.utils.getCourseView(this.courseId, (resp)=>{
			//console.log('view:', resp);
			this.setState({courseView: resp});
		});
	}

	getDetail(){
		this.utils.getCourseDetail(this.courseId, (resp)=>{
			//console.log('detail:', resp[0]);
			this.setState({courseDetail: resp[0]});
		});
	}

	getGroup(){
		this.utils.getCourseGroup(this.courseId, (resp)=>{
			//console.log('teachers:', resp);
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
			if(this.totalPage === 0 && resp.total_page > 0) {
				this.totalPage = resp.total_page;
			}
			let size = 50;
			for(let item of resp._list) {
				item.username = resp.users[item.user_id].username;
				let avatarUrl = resp.users[item.user_id].avatar;
				item.avatar = avatarUrl ? global_.url_prefix + avatarUrl.replace(/\.jpg/, size + ".jpg").replace(/\.png/, size + ".png"): null;
			}
			//console.log('comments:', resp);

			if(this.page === 1) {
				this.setState({
					commentData: resp._list
				});
			} else {
				this.setState({
					commentData: this.state.commentData.concat(resp._list)
				});
			}
			
			if(this.stopRefresh) {
				this.stopRefresh();
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
				this.setState({
					scrollHeight: this.contentHeight
				});
				this.refs.detailBtn.setState({active: true});
				this.refs.commentBtn.setState({active: false});
				break;
			case 1:
				this.setState({
					scrollHeight: this.state.commentData.length*100 + 200
				});
				this.refs.detailBtn.setState({active: false});
				this.refs.commentBtn.setState({active: true});
				break;
		}
	};

	scrollPage = (event)=> {
		//console.log(event.nativeEvent.contentOffset.y);
		if(event.nativeEvent.contentOffset.y > 90) {
			this.setState({
				showHeadBanner: true
			});
		} else if(event.nativeEvent.contentOffset.y <= 90) {
			this.setState({
				showHeadBanner: false
			});
		}

		Animated.event(
			[{ nativeEvent: 
				{ contentOffset: 
					{ y: this.state.scrollY } 
				} 
			}],
		)(event);
	};

	layout=(e)=>{
		if(e.layout.height >= this.contentHeight) {
			this.contentHeight = e.layout.height;
			//console.log('contentHeight:', this.contentHeight);
		}
	};

	render(){
		//suggested time
		let stime = this.getDate(this.state.courseView.time);
		return(
			<View style={styles.rootView}>
				<TouchableOpacity 
					style={styles.backBtn}
					onPress={()=>{this.props.navigation.goBack()}}>
					<AntDesign 
						name={'leftcircle'}
						size={30}
						color={'#999'}/>
				</TouchableOpacity>
				
				<Animated.View 
					style={this.state.showHeadBanner? [styles.headBanner]: {display: 'none'}}>
					<Text style={styles.courseTitle}>{this.state.courseView.name}</Text>
				</Animated.View>


				<Animated.View style={[styles.indexBtnView, {
					top: this.state.scrollY.interpolate({
							inputRange: [-1, 0, 10, 90, 100, 150],
							outputRange: [150, 150, 140, 60, 60, 60]
						})}
				]}>
					<LineBtn 
						style={styles.indexBtn} 
						textStyle={styles.indexBtnText}
						text={'????????????'}
						ref={'detailBtn'}
						if_active={true}
						action={()=>{
							this.setState({
								scrollHeight: this.contentHeight
							});
							this.refs.detailBtn.setState({active: true});
							this.refs.commentBtn.setState({active: false});
							this.refs.pageScroll.scrollTo({x:0*width, animated:true});
						}}/>
						
					<LineBtn 
						style={this.state.courseView.comment_count?styles.indexBtn:{display: 'none'}} 
						textStyle={styles.indexBtnText}
						text={'?????? ('+ this.state.courseView.comment_count +')'}
						ref={'commentBtn'}
						if_active={false}
						action={()=>{
							this.setState({
								scrollHeight: this.state.commentData.length*100 + 200
							});
							this.refs.detailBtn.setState({active: false});
							this.refs.commentBtn.setState({active: true});
							this.refs.pageScroll.scrollTo({x:1*width, animated:true});							
						}}/>
				</Animated.View>


				<ScrollView
					onScroll={this.scrollPage}>
					<Image 
						resizeMode='cover' 
						style={styles.img} 
						source={{uri: global_.url_prefix + this.state.courseView.img}} />

					<ScrollView 
						style={[styles.scroll, this.state.scrollHeight>0? {height: this.state.scrollHeight}: {}]}
						pagingEnabled={true}
						horizontal={true}
						ref={'pageScroll'}
						onMomentumScrollEnd={this.scrollEnd}>

						<View style={styles.detailPanel} onLayout={({nativeEvent:e})=>this.layout(e)}>
							{/*<ScrollView>*/}
								<View style={styles.titlePanel}>
									<Text style={styles.courseTitle}>{this.state.courseView.name}</Text>
									<View style={styles.teacherList}>
										{this.listTeachers()}
									</View>
									<View style={styles.studyInfo}>
										<Text style={styles.suggestTime}>
											?????????????????????
											{(stime.D?(stime.D+'???'):'')+(stime.h?(stime.h+'??????'):'')+(stime.m?(stime.m+'???'):'')}
										</Text>
										<Text style={this.state.courseView.learn_count?styles.learnCount:{display: 'none'}}>
											{'????????????' + this.state.courseView.learn_count + '???'}
										</Text>
									</View>
								</View>
								<View style={styles.introPanel}>						
									<View style={styles.intro}>
										<Text style={styles.introTitle}>????????????</Text>
										<HTML
											html={this.state.courseDetail.intro?
											this.state.courseDetail.intro.replace( /(<img.+?src=")(.*?)/, '$1'+ global_.main_url +'$2'):'<p></p>'} />
								
									</View>
									<View style={styles.syllabus}>
										<Text style={styles.syllabusTitle}>????????????</Text>			
										<HTML 
											html={this.state.courseDetail.syllabus?
											this.state.courseDetail.syllabus:'<p></p>'} />
									</View>							
								</View>
							{/*</ScrollView>*/}
						</View>

						<View style={styles.commentPanel}>
							<View style={styles.commentTitlePanel}>
								<CommentTitle
								    courseId={this.courseId}
									navigation={this.props.navigation}
									score={this.state.courseView.score?this.state.courseView.score: 0}/>
							</View>
							<CommentView
								courseId={this.courseId}
								userId={this.userId}
								data={this.state.commentData}
								navigation={this.props.navigation}
								onRefresh={(callback)=>{
									this.page = 1;
									this.stopRefresh = callback;
									this.getComments();
								}}
								onEndReached={()=>{
									if(this.state.commentData.length >= this.pageSize){
										if(this.page < this.totalPage) {
											this.page += 1;
											this.getComments();
										}
									}
								}}
								/>
						</View>
					</ScrollView>
				</ScrollView>

				<View style={styles.studyBtnView}>
					<RegularBtn 
						style={styles.studyBtn} 
						textStyle={styles.studyBtnText}
						text={'????????????'}
						ref={'studyBtn'}
						if_active={true}
						action={()=>{
							this.props.navigation.navigate('CourseStruct', 
								{
									//course_id, course name
									id: this.courseId,
									name: this.state.courseView.name,
									teachers: this.state.teachers,
									img_src:  global_.url_prefix + this.state.courseView.img
								});
						}}/>
				</View>
			</View>			
		);
	}
}

const mapStateToProps = (state) => ({
	user_id: state.user_id
});

export default connect(mapStateToProps)(CourseDetail);


let styles = StyleSheet.create({
	rootView: { 
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center'
	},

	backBtn: {
		position: 'absolute',
		top: 15,
		left: 15,
		zIndex: 20
	},

	headBanner: {
		position: 'absolute',
		width: width,
		height: 60,
		zIndex: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	},

	img: {
		height:150,
		backgroundColor: 'white'
	},

	indexBtnView: {
		height: 55,
		width: width,
		flexDirection: 'row',
		alignItems: 'baseline',
		justifyContent: 'center',
		zIndex: 10,
		backgroundColor: '#f5f6fa',
		position: 'absolute'
	},

	scroll: {
		top: 60
	},

	// contentContainer: {
	// 	paddingVertical: 0
	// },

	detailPanel: {
		width: width,
		overflow: 'hidden'
	},

	commentPanel: {
		width: width
	},

	commentTitlePanel: {
		height: 100,
		borderBottomWidth: 0.3,
		borderBottomColor: '#ddd'
	},

	titlePanel: {
		height: 120,
		//borderTopWidth: 0.3,
		borderBottomWidth: 10,
		borderBottomColor: '#f5f6fa',
		padding: 10,

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
		color:'#4da4fb'
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
		width: width,
		flexDirection: 'row',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'baseline'
	},

	studyBtn: {
		width: 340,
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
	},

	studyInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	learnCount: {
		color: '#4da4fb'
	}
});