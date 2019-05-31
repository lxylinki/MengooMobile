import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	ScrollView,
    Image
} from 'react-native';

import TitleHeader from '../../components/head/TitleHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LineBtn from '../../components/button/LineBtn';
import CourseView from '../../components/list/course/CourseView';
import RecordView from '../../components/list/mylearn/RecordView';
import Utils from '../../common/Utils';



var {height, width} = Dimensions.get('window');

export default class MyCourse extends Component {
	constructor(props) {
		super(props);
        this.page = [1, 1, 1, 1];
        this.pageSize = 5;
        this.totalPage = [0, 0, 0, 0];
        this.utils = new Utils();
		this.state = {
			pageTitle: '我的课程',
            myCourseData: [],
            myRecordData: []
		}
	}

    getMyCourseData(){
        this.utils.getMyCourseList(this.page[0], this.pageSize, (resp)=> {
            //console.log(this.page[0], resp);
            if(this.totalPage[0] === 0 && resp.total_page > 0) {
                this.totalPage[0] = resp.total_page;
            } 

            if(this.page[0] === 1) {
                // setTimeout(()=>{
                //     this.setState({
                //         myCourseData: resp._list
                //     });                     
                // }, 10000);
                this.setState({
                    myCourseData: resp._list
                });
            } else {
                this.setState({
                    myCourseData: this.state.myCourseData.concat(resp._list)
                });
            }

            if(this.stopRefresh) {
                this.stopRefresh();
            }
        });
    }


    getMyRecordData(){
        this.utils.getMyLearnList(this.page[1], this.pageSize, (resp)=> {
            console.log(this.page[1], resp);
            if(this.totalPage[1] === 0 && resp.total_page > 0) {
                this.totalPage[1] = resp.total_page;
            }

            for(let item of resp._list) {
                if(Object.keys(resp.courses).includes(item.course_id)) {
                    item.course = resp.courses[item.course_id].name;
                }
            }

            if(this.page[1] === 1) {
                this.setState({
                    myRecordData: resp._list
                });
            } else {
                this.setState({
                    myRecordData: this.state.myRecordData.concat(resp._list)
                });
            }

            if(this.stopRefresh) {
                this.stopRefresh();
            }
        });
    }



    componentDidMount(){
        this.getMyCourseData();
        this.getMyRecordData();
    }

    scrollEnd = (param)=> {
        let index = Math.round(param.nativeEvent.contentOffset.x/width);
        switch(index) {
            case 0:
                this.refs.courseBtn.setState({active: true});
                this.refs.recordBtn.setState({active: false});
                this.refs.expScoreBtn.setState({active: false});
                this.refs.courseScoreBtn.setState({active: false});
                break;

            case 1:
                this.refs.courseBtn.setState({active: false});
                this.refs.recordBtn.setState({active: true});
                this.refs.expScoreBtn.setState({active: false});
                this.refs.courseScoreBtn.setState({active: false});
                break;

            case 2:
                this.refs.courseBtn.setState({active: false});
                this.refs.recordBtn.setState({active: false});
                this.refs.expScoreBtn.setState({active: true});
                this.refs.courseScoreBtn.setState({active: false});
                break;

            case 3:
                this.refs.courseBtn.setState({active: false});
                this.refs.recordBtn.setState({active: false});
                this.refs.expScoreBtn.setState({active: false});
                this.refs.courseScoreBtn.setState({active: true});
                break;
        }
    };

	render(){
		return(
			<View style={styles.rootView}>
				<TitleHeader style={styles.headerView} title={this.state.pageTitle}/>
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

                <View style={styles.indexBtnView}>
                    <LineBtn 
                        style={styles.indexBtn} 
                        textStyle={styles.indexBtnText}
                        text={'我的课程'}
                        ref={'courseBtn'}
                        if_active={true}
                        action={()=>{
                        	this.setState({
                        		pageTitle: '我的课程'
                        	});
                            this.refs.courseBtn.setState({active: true});
                            this.refs.recordBtn.setState({active: false});
                            this.refs.expScoreBtn.setState({active: false});
                            this.refs.courseScoreBtn.setState({active: false});
                            this.refs.pageScroll.scrollTo({x:0*width, animated:true});
                        }}/> 

                    <LineBtn 
                        style={styles.indexBtn} 
                        textStyle={styles.indexBtnText}
                        text={'学习记录'}
                        ref={'recordBtn'}
                        if_active={false}
                        action={()=>{
                        	this.setState({
                        		pageTitle: '学习记录'
                        	});
                            this.refs.courseBtn.setState({active: false});
                            this.refs.recordBtn.setState({active: true});
                            this.refs.expScoreBtn.setState({active: false});
                            this.refs.courseScoreBtn.setState({active: false});
                            this.refs.pageScroll.scrollTo({x:1*width, animated:true});
                        }}/>

                    <LineBtn 
                        style={styles.indexBtn} 
                        textStyle={styles.indexBtnText}
                        text={'实验成绩'}
                        ref={'expScoreBtn'}
                        if_active={false}
                        action={()=>{
                        	this.setState({
                        		pageTitle: '实验成绩'
                        	});                        	
                            this.refs.courseBtn.setState({active: false});
                            this.refs.recordBtn.setState({active: false});
                            this.refs.expScoreBtn.setState({active: true});
                            this.refs.courseScoreBtn.setState({active: false});
                            this.refs.pageScroll.scrollTo({x:2*width, animated:true});
                        }}/>

                    <LineBtn 
                        style={styles.indexBtn} 
                        textStyle={styles.indexBtnText}
                        text={'课程成绩'}
                        ref={'courseScoreBtn'}
                        if_active={false}
                        action={()=>{
                        	this.setState({
                        		pageTitle: '课程成绩'
                        	});
                            this.refs.courseBtn.setState({active: false});
                            this.refs.recordBtn.setState({active: false});
                            this.refs.expScoreBtn.setState({active: false});
                            this.refs.courseScoreBtn.setState({active: true});
                            this.refs.pageScroll.scrollTo({x:3*width, animated:true});
                        }}/>   
                </View>

                <ScrollView
                    //style={styles.bottomScroll}
                    ref={'pageScroll'}
                    pagingEnabled={true}
                    horizontal={true}
                    onMomentumScrollEnd={this.scrollEnd}>

                    <CourseView 
                        hasSkeleton={true}
                        fakeLen={4}
                        navigation={this.props.navigation}
                        data={this.state.myCourseData} 
                        onEndReached={()=>{
                            if(this.state.myCourseData.length>=this.pageSize) {
                                if(this.page[0] < this.totalPage[0]) {
                                    this.page[0] += 1;                                     
                                    this.getMyCourseData();
                                }
                            }
                        }} 
                        onRefresh={(callback)=>{
                            this.page[0] = 1;
                            this.stopRefresh = callback;
                            this.getMyCourseData();
                        }}
                    />

                    <RecordView 
                        hasSkeleton={true}
                        navigation={this.props.navigation}
                        data={this.state.myRecordData} 
                        onEndReached={()=>{
                            if(this.state.myRecordData.length>=this.pageSize) {
                                if(this.page[1] < this.totalPage[1]) {
                                    this.page[1] += 1;                                     
                                    this.getMyRecordData();
                                }
                            }
                        }} 
                        onRefresh={(callback)=>{
                            this.page[1] = 1;
                            this.stopRefresh = callback;
                            this.getMyRecordData();
                        }}
                    />

                    <View style={{width: width, height: 1600, alignItems: 'center'}}>
                        <Image resizeMode={'contain'} source={require('../../../assets/img/pending.png')} style={styles.pendingImage} />
                        <Text style={styles.pendingText}>{'此栏目正在开发中'}</Text>                        
                    </View>
                    <View style={{width: width, height: 1600, alignItems: 'center'}}>
                        <Image resizeMode={'contain'} source={require('../../../assets/img/pending.png')} style={styles.pendingImage} />
                        <Text style={styles.pendingText}>{'此栏目正在开发中'}</Text>                        
                    </View>
                </ScrollView>

			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		flex: 1
	},

	headerView: {
		height: 70
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

    indexBtnView: {
        height: 54,
        width: width,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        backgroundColor: 'white',
    },

    indexBtn: {
        width: 90,
        height: 45,
    },

    indexBtnText: {
        fontSize: 16
    },
    pendingImage: {
        width: 200,
    },

    pendingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ddd'
    }
});