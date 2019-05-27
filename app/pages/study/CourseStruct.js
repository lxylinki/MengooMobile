import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Animated
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import LineBtn from '../../components/button/LineBtn';
import Utils from '../../common/Utils';
import StructView from '../../components/list/struct/StructView';
import NoticeView from '../../components/list/notice/NoticeView';


var {height, width} = Dimensions.get('window');

export default class CourseStruct extends Component {
	constructor(props){
		super(props);
		this.courseId = this.props.navigation.getParam('id', null);
		this.courseName = this.props.navigation.getParam('name', '');
		this.teachers = this.props.navigation.getParam('teachers', []);
		this.imgSrc = this.props.navigation.getParam('img_src', '');
        this.page = 1;
        this.pageSize = 5;
        this.totalPage = 0;
        this.utils = new Utils();
        this.state = {
            structData: [],
            examData: {},
            showHeadBanner: false,
            scrollY: new Animated.Value(0),
        }
	}

    componentDidMount(){
        this.getStructData();
    }

	listTeachers(){
		let teachers = [];
		for(let i in this.teachers) {
			let teacher = this.teachers[i];
			teachers.push(<Text key={i} style={styles.teacherName}>{teacher.realname}</Text>);
		}
		return teachers;
	}

    scrollEnd = (param)=> {
        let index = Math.round(param.nativeEvent.contentOffset.x/width);
        switch(index) {
            case 0:
                this.refs.docBtn.setState({active: true});
                this.refs.announceBtn.setState({active: false});
                this.refs.examBtn.setState({active: false});
                this.refs.discussBtn.setState({active: false});
                break;

            case 1:
                this.refs.docBtn.setState({active: false});
                this.refs.announceBtn.setState({active: true});
                this.refs.examBtn.setState({active: false});
                this.refs.discussBtn.setState({active: false});
                break;

            case 2:
                this.refs.docBtn.setState({active: false});
                this.refs.announceBtn.setState({active: false});
                this.refs.examBtn.setState({active: true});
                this.refs.discussBtn.setState({active: false});
                break;

            case 3:
                this.refs.docBtn.setState({active: false});
                this.refs.announceBtn.setState({active: false});
                this.refs.examBtn.setState({active: false});
                this.refs.discussBtn.setState({active: true});
                break;
        }
    };

    getStructData(){
        this.utils.getCourseStructList(this.courseId, this.page, this.pageSize, (resp)=>{
            //console.log('getStructData', resp);
            if(this.totalPage === 0 && resp.total_page > 0) {
                this.totalPage = resp.total_page;
            }

            if(this.page === 1) {
                this.setState({
                    structData: resp._list,
                });
            } else {
                this.setState({
                    structData: this.state.structData.concat(resp._list),
                });       
            }
            Object.assign(this.state.examData, resp.exams);  

            if(this.stopRefresh) {
                this.stopRefresh();
            }
        });
    }



    scrollPage = (event)=> {
        console.log('scrollPage');
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


	render(){
		return(
			<View style={styles.rootView}>
                <Animated.View 
                    style={this.state.showHeadBanner? [styles.headBanner]: {display: 'none'}}>
                    <Text style={styles.courseTitleDark}>{this.courseName}</Text>
                </Animated.View>            

                <Animated.View style={[styles.indexBtnView, {
                    top: this.state.scrollY.interpolate({
                        inputRange: [-1, 0, 10, 140, 150],
                        outputRange: [200, 200, 190, 60, 60]                        
                    })
                }]}>
                    <LineBtn 
                        style={styles.indexBtn} 
                        textStyle={styles.indexBtnText}
                        text={'课件'}
                        ref={'docBtn'}
                        if_active={true}
                        action={()=>{
                            this.refs.docBtn.setState({active: true});
                            this.refs.announceBtn.setState({active: false});
                            this.refs.examBtn.setState({active: false});
                            this.refs.discussBtn.setState({active: false});
                            this.refs.pageScroll.scrollTo({x:0*width, animated:true});
                        }}/> 

                    <LineBtn 
                        style={styles.indexBtn} 
                        textStyle={styles.indexBtnText}
                        text={'公告'}
                        ref={'announceBtn'}
                        if_active={false}
                        action={()=>{
                            this.refs.docBtn.setState({active: false});
                            this.refs.announceBtn.setState({active: true});
                            this.refs.examBtn.setState({active: false});
                            this.refs.discussBtn.setState({active: false});
                            this.refs.pageScroll.scrollTo({x:1*width, animated:true});
                        }}/>

                    <LineBtn 
                        style={styles.indexBtn} 
                        textStyle={styles.indexBtnText}
                        text={'考核'}
                        ref={'examBtn'}
                        if_active={false}
                        action={()=>{
                            this.refs.docBtn.setState({active: false});
                            this.refs.announceBtn.setState({active: false});
                            this.refs.examBtn.setState({active: true});
                            this.refs.discussBtn.setState({active: false});
                            this.refs.pageScroll.scrollTo({x:2*width, animated:true});
                        }}/>

                    <LineBtn 
                        style={styles.indexBtn} 
                        textStyle={styles.indexBtnText}
                        text={'讨论'}
                        ref={'discussBtn'}
                        if_active={false}
                        action={()=>{
                            this.refs.docBtn.setState({active: false});
                            this.refs.announceBtn.setState({active: false});
                            this.refs.examBtn.setState({active: false});
                            this.refs.discussBtn.setState({active: true});
                            this.refs.pageScroll.scrollTo({x:3*width, animated:true});
                        }}/>                   
                </Animated.View>  

                <TouchableOpacity 
                    style={styles.backBtn}
                    onPress={()=>{this.props.navigation.navigate('CourseDetail')}}>
                    <AntDesign 
                        name={'leftcircle'}
                        size={30}
                        color={'#999'}/>
                </TouchableOpacity>          

                <ScrollView
                    onScroll={this.scrollPage}>

                    <Image style={styles.image} resizeMode={'cover'} source={{uri: this.imgSrc}}/>

    				<View style={styles.infoBar}>
                    </View>

                    <View style={styles.infoContent}>
                        <Text style={styles.courseTitle}>{this.courseName}</Text>
                        <View style={styles.teacherList}>
                            {this.listTeachers()}
                        </View>
                    </View>


                    <ScrollView
                        style={styles.bottomScroll}
                        ref={'pageScroll'}
                        pagingEnabled={true}
                        horizontal={true}
                        onMomentumScrollEnd={this.scrollEnd}>

                        <StructView 
                            navigation={this.props.navigation}
                            courseId={this.courseId} 
                            exams={this.state.examData} 
                            data={this.state.structData}

                            onEndReached={()=>{
                                if(this.state.structData.length>=this.pageSize) {
                                    if(this.page < this.totalPage) {
                                        this.page += 1;                                     
                                        this.getStructData();
                                    }
                                }
                            }} 
                            onRefresh={(callback)=>{
                                this.page = 1;
                                this.stopRefresh = callback;
                                this.getStructData();
                            }}
                            />
                        
                        
                        <NoticeView 
                            navigation={this.props.navigation}
                            courseId={this.courseId} 
                        />

                        <View style={{width: width, height: 1600, alignItems:'center'}}>
                            <Image resizeMode={'contain'} source={require('../../../assets/img/pending.png')} style={styles.pendingImage} />
                            <Text style={styles.pendingText}>{'此栏目正在开发中'}</Text>
                        </View>
                        <View style={{width: width, height: 1600, alignItems: 'center'}}>
                            <Image resizeMode={'contain'} source={require('../../../assets/img/pending.png')} style={styles.pendingImage} />
                            <Text style={styles.pendingText}>{'此栏目正在开发中'}</Text>                        
                        </View>
                    </ScrollView>
                </ScrollView>
			</View>
		);
	}
}

let styles = StyleSheet.create({
    image: {
        width: width,
        height: 200
    },
    backBtn: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 20
    },
    infoBar: {
        width: width,
        height: 70,
        backgroundColor: 'black',
        position: 'absolute',
        top: 130,
        opacity: 0.5
    },
    infoContent: {
        position: 'absolute',
        top: 130,
        padding: 10
    },

    teacherList: {
        flexDirection: 'row',
    },
    teacherName: {
        fontSize: 14,
        color: 'white',
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    courseTitle: {
        color: 'white',
        fontSize: 18
    },
    courseTitleDark: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    indexBtnView: {
        height: 54,
        width: width,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 10
    },
    indexBtn: {
        width: 80,
        height: 45,
        margin: 5
    },

    indexBtnText: {
        fontSize: 16
    },

    bottomScroll: {
        marginTop: 54
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
    pendingImage: {
        width: 200,
    },

    pendingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ddd'
    }
});
