import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	ScrollView
} from 'react-native';

import TitleHeader from '../../components/head/TitleHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LineBtn from '../../components/button/LineBtn';



var {height, width} = Dimensions.get('window');

export default class MyCourse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageTitle: '我的课程'
		}
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
                    <View style={{width: width, height: 1600, backgroundColor: 'pink'}}></View>
                    <View style={{width: width, height: 1600, backgroundColor: 'yellowgreen'}}></View>
                    <View style={{width: width, height: 1600, backgroundColor: 'skyblue'}}></View>
                    <View style={{width: width, height: 1600, backgroundColor: 'powderblue'}}></View>
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
        margin: 5
    },

    indexBtnText: {
        fontSize: 16
    },

});