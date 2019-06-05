import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';

import Utils from '../../common/Utils';
import TitleHeader from '../../components/head/TitleHeader';
import Entypo from 'react-native-vector-icons/Entypo';


export default class ExamContent extends Component {
	constructor(props) {
		super(props);
		this.exam = this.props.navigation.getParam('exam', null);
		this.course_id = this.props.navigation.getParam('course_id', null);
		this.utils = new Utils();
		this.page = 1;
		this.pageSize = 5;
		this.totalPage = 0;

		this.state = {
			examInfo: {},
			remainingTime: 0,
			curr: 1,
			total: 10
		}
	}

	componentDidMount(){
		this.getExamInfo();
	}

	countDown(seconds) {
		let s = seconds, timer = null;
		let _this = this;
		function count(){
			s -= 1;
			if(s <= 0) {
				clearInterval(timer);
			}
			_this.setState({
				remainingTime: s
			});
		}
		timer = setInterval(count, 1000);
	};

    getTime(time){
		function add0(m){
			return m<10?'0'+m:m 
		}

		var h = Math.floor(time/60/60),
			m = Math.floor((time-h*60*60)/60),
			s = Math.floor((time-h*60*60-m*60)%60);

        return {
            h : add0(h),
            m : add0(m),
            s : add0(s)
        };
    }
 
	getExamInfo(){
		this.utils.getExamView(this.exam.exam_id, (resp)=>{
			this.setState({
				examInfo: resp[0]
			}, ()=> {console.log(this.state.examInfo);});

			this.remainingTime = this.state.examInfo.limited_time;
			if(this.state.examInfo.status==1 && this.state.examInfo.ended_at>new Date().getTime()/1000) {
				this.countDown(this.state.examInfo.limited_time);
			}
		});
	}

	render(){
		let time = this.getTime(this.state.remainingTime);
		return(
			<View style={styles.rootView}>
				<TitleHeader style={styles.headerView} title={time.h + ':' + time.m + ':' + time.s}/>
                <TouchableOpacity 
                    style={styles.backBtn}
                    onPress={()=>{this.props.navigation.goBack()}}>
                    <Entypo 
                        name={'chevron-thin-left'}
                        size={25}
                        color={'white'}/>
                </TouchableOpacity>
                <View style={styles.indexing}>
                	<Text style={styles.indexingText}>{'题目 ' + this.state.curr + '/' + this.state.total}</Text>
                </View>
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

    indexing: {
    	position: 'absolute',
    	top: 25,
    	right: 15
    },

    indexingText: {
    	fontSize: 16,
    	color: 'white'
    }
});