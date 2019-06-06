import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Dimensions
} from 'react-native';

import Utils from '../../common/Utils';
import TitleHeader from '../../components/head/TitleHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import RegularBtn from '../../components/button/RegularBtn';
import ShallowRegularBtn from '../../components/button/ShallowRegularBtn';



var {height, width} = Dimensions.get('window');

export default class ExamContent extends Component {
	constructor(props) {
		super(props);
		this.exam = this.props.navigation.getParam('exam', null);
		this.course_id = this.props.navigation.getParam('course_id', null);
		this.record_id = this.props.navigation.getParam('record_id', null);
		this.utils = new Utils();

		this.page = 1;
		this.pageSize = 5;
		this.totalPage = 0;
		this.isEdit = true;
		this.isShowAnswer = false;


		this.storages = {
			examInfo: {},
			submitData: {},
			examResults: [],
			dataMain: {}
		},

		this.state = {
			remainingTime: 0,
			pastTime: 0,
			curr: 0,
			total: 0,
			choosePrev: false,
			chooseNext: true,
			chooseSub: true
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

	countUp() {
		let s = 0, timer = null;
		let _this = this;
		function count(){
			s += 1;
			_this.setState({
				pastTime: s
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
    
    getExam(){
    	let mode;
    	if(this.isShowAnswer) {
    		mode = 3;
    	} else {
    		mode = 2;
    	}

    	this.utils.getQuesList(this.exam.exam_id, mode, this.page, this.pageSize, (resp)=>{
    		console.log('getExam:', resp);
    		this.setState({
    			total: resp.total
    		});
    		this.storages.dataMain = resp._list;
    	});
    }

    setRecord(){
    	this.utils.joinExam(this.exam.exam_id, (resp)=> {
    		console.log('setRecord:', resp);
    		this.recordId = resp.id;
    		this.storages.submitData = resp.record;
    		this.getExamResults();
    	});
    }

    getExamResults(){
    	this.utils.getPastExam(this.recordId, (resp)=> {
    		console.log('getExamResults:', resp);
    		this.storages.examResults = resp;
    		this.getExam();
    	});
    }

    getLastInfo(){
		this.utils.getLastRecord(this.exam.exam_id, (resp)=>{
			console.log('getLastInfo:', resp);
			if(resp.id) {
				this.recordId = resp.id;
				this.storages.submitData = resp;
				this.getExamResults();

			} else {
	            if(this.storages.examInfo.status !== 1){//如果考试已经停止
	                this.getExam();
	                return false;
	            }
	            if(this.storages.examInfo.started_at>new Date().getTime()/1000){//如果考试还没有开始
	                return false;
	            }
	            if(this.storages.examInfo.ended_at<new Date().getTime()/1000){//如果考试超时了
	                this.getExam();
	                return false;
	            }
	            this.setRecord();
			}
		})
    }	
 
	getExamInfo(){
		this.utils.getExamView(this.exam.exam_id, (resp)=>{
			console.log('getExamInfo:', resp);
			this.storages.examInfo = resp[0];

			if(this.storages.examInfo.status==1 && this.storages.examInfo.ended_at>new Date().getTime()/1000) {
				if(this.storages.examInfo.limited_time > 0) {
					this.countDown(this.storages.examInfo.limited_time);
				} else {
					this.countUp();
				}
			}

			if(this.record_id) {
				//this.getEnterRecord();
			} else {
				this.getLastInfo();
			}
		});
	}


	setCtrlBtn(curr){
		if(curr === 0) {
			return(
				<View style={styles.ctrlBtnView}>
					<RegularBtn 
						style={styles.ctrlBtn} 
						textStyle={styles.ctrlBtnText}
						text={'下一题'}
						if_active={true}
						action={()=>{
							this.setState({
								curr: Number(this.state.curr) + 1,
								choosePrev: false,
								chooseNext: true
							})
						}}/>
				</View>
			);
		} else if(curr === this.state.total-1) {
			return(
				<View style={styles.ctrlBtnView}>
					<ShallowRegularBtn 
					    style={styles.prevBtn}
					    inactStyle={styles.prevBtnFade}
						textStyle={styles.ctrlBtnText}
						text={'上一题'}
						if_active={this.state.choosePrev?true:false}
						action={()=>{
							this.setState({
								curr: Number(this.state.curr) - 1,
								choosePrev: true,
								chooseNext: false
							})
						}}/>
					<ShallowRegularBtn 
						style={styles.nextBtn}
						inactStyle={styles.nextBtnFade}
						textStyle={styles.ctrlBtnText}
						text={'提交'}
						if_active={this.state.chooseSub?true:false}
						action={()=>{
							this.setState({
								choosePrev: false,
								chooseSub: true
							})
						}}/>					
				</View>
			);			
		} else {
			return(
				<View style={styles.ctrlBtnView}>
					<ShallowRegularBtn 
					    style={styles.prevBtn}
					    inactStyle={styles.prevBtnFade}
						textStyle={styles.ctrlBtnText}
						text={'上一题'}
						if_active={this.state.choosePrev?true:false}
						action={()=>{
							this.setState({
								curr: Number(this.state.curr) - 1,
								choosePrev: true,
								chooseNext: false
							})
						}}/>
					<ShallowRegularBtn 
						style={styles.nextBtn}
						inactStyle={styles.nextBtnFade}
						textStyle={styles.ctrlBtnText}
						text={'下一题'}
						if_active={this.state.chooseNext?true:false}
						action={()=>{
							this.setState({
								curr: Number(this.state.curr) + 1,
								choosePrev: false,
								chooseNext: true
							})
						}}/>					
				</View>			
			);	
		}
	}


	render(){
		let time;
		if(this.storages.examInfo.limited_time > 0) {
			time = this.getTime(this.state.remainingTime);
		} else {
			time = this.getTime(this.state.pastTime);
		}
		
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
                	<Text style={styles.indexingText}>{'题目 ' + (this.state.curr + 1) + '/' + this.state.total}</Text>
                </View>

                {this.setCtrlBtn(this.state.curr)}
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
    },

	ctrlBtnView: {
		height: 70,
		width: width,
		flexDirection: 'row',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'baseline',
		position: 'absolute',
		bottom: 0
	},

	ctrlBtn: {
		width: 340,
		height: 45
	},

	prevBtn: {
		width: 160,
		height: 45
	},

	nextBtn: {
		width: 160,
		height: 45
	},

	prevBtnFade: {
		width: 160,
		height: 45
	},
	nextBtnFade: {
		width: 160,
		height: 45
	}
});