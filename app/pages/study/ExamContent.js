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
import A1Temp from '../../components/question/A1Temp';
import A2Temp from '../../components/question/A2Temp';


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
		this.isShowAnswer = true;
		this.isShowReview = true;


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
			totalPage: 0,
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
    	return new Promise((resolve, reject)=>{
	    	let mode;
	    	if(this.isShowAnswer) {
	    		mode = 3;
	    	} else {
	    		mode = 2;
	    	}

	    	this.utils.getQuesList(this.exam.exam_id, mode, this.page, this.pageSize, (resp)=>{
	    		console.log('getExam:', resp);
	    		if(this.state.total === 0 || this.state.totalPage === 0) {
		    		this.setState({
		    			total: resp.total,
		    			totalPage: resp.total_page
		    		});    			
	    		}
	    		this.storages.dataMain = resp._list;
	    		resolve(resp._list);
	    	});
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
    	this.utils.getPastExam(this.recordId, this.isShowReview, (resp)=> {
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


	toNext = ()=> {
		if(this.state.curr === this.pageSize-1 && this.page < this.state.totalPage) {
			this.page += 1;
			this.getExam();
		}	

		this.setState({
			curr: (this.state.curr + 1)%this.pageSize,
			choosePrev: false,
			chooseNext: true
		});	
	};


	toPrev = ()=> {
		if(this.state.curr === 0 && this.page > 1) {
			this.page -= 1;
			this.getExam().then(()=>{
				this.setState({
					curr: this.pageSize - 1,
					choosePrev: true,
					chooseNext: false
				});					
			});
		}
		
		if(this.state.curr > 0) {
			this.setState({
				curr: (this.state.curr - 1)%this.pageSize,
				choosePrev: true,
				chooseNext: false
			});
		}
	};


	showQues(i){
		if(JSON.stringify(this.storages.dataMain) !== '{}') {
			// if(!this.storages.dataMain.main[i]) {
			// 	console.log('i:', i);
			// 	console.log('dataMain:', this.storages.dataMain);
			// 	return;
			// }
			switch(this.storages.dataMain.main[i].type){
				case '1':
					return(
						<A1Temp 
							score={this.storages.dataMain.main[i].score}
							question={this.storages.dataMain.questions[this.storages.dataMain.main[i].type][this.storages.dataMain.main[i].question_id].question}
							options={this.storages.dataMain.options[this.storages.dataMain.main[i].option_id]}
							type_order={this.storages.dataMain.main[i].type_order}
							order={this.storages.dataMain.main[i].order}
							answer={this.storages.examResults.length>0? this.storages.examResults[this.storages.dataMain.main[i].type_order][this.storages.dataMain.main[i].order].answer : null}
						/>		
					);
					break;
				case '2':
					return(
						<A2Temp 
							score={this.storages.dataMain.main[i].score}
							question={this.storages.dataMain.questions[this.storages.dataMain.main[i].type][this.storages.dataMain.main[i].question_id].question}
							options={this.storages.dataMain.options[this.storages.dataMain.main[i].option_id]}
							type_order={this.storages.dataMain.main[i].type_order}
							order={this.storages.dataMain.main[i].order}							
							answer={this.storages.examResults.length>0? this.storages.examResults[this.storages.dataMain.main[i].type_order][this.storages.dataMain.main[i].order].answer : null}
						/>			
					);
					break;				
				case '3':
					return(
			            <View>
			            	<Text>{'判断题'}</Text>
			            </View>			
					);
					break;
				case '4':
					return(
			            <View>
			            	<Text>{'多选题'}</Text>
			            </View>			
					);
					break;
				case '5':
					return(
			            <View>
			            	<Text>{'A3题型'}</Text>
			            </View>			
					);
					break;
				case '6':
					return(
			            <View>
			            	<Text>{'A4题型'}</Text>
			            </View>			
					);
					break;
				case '7':
					return(
			            <View>
			            	<Text>{'B1题型'}</Text>
			            </View>			
					);
					break;
				case '8':
					return(
			            <View>
			            	<Text>{'填空题'}</Text>
			            </View>			
					);
					break;
				case '9':
					return(
			            <View>
			            	<Text>{'简答题'}</Text>
			            </View>			
					);
					break;
				case '10':
					return(
			            <View>
			            	<Text>{'实验题'}</Text>
			            </View>			
					);
					break;
			}
		}
	} 


	setCtrlBtn(curr){
		if((this.pageSize*(this.page-1) + this.state.curr + 1) === 1) {
			return(
				<View style={styles.ctrlBtnView}>
					<RegularBtn 
						style={styles.ctrlBtn} 
						textStyle={styles.ctrlBtnText}
						text={'下一题'}
						if_active={true}
						action={this.toNext}
					/>
				</View>
			);
		} else if((this.pageSize*(this.page-1) + this.state.curr + 1) === this.state.total) {
			return(
				<View style={styles.ctrlBtnView}>
					<ShallowRegularBtn 
					    style={styles.prevBtn}
					    inactStyle={styles.prevBtnFade}
						textStyle={styles.ctrlBtnText}
						text={'上一题'}
						if_active={this.state.choosePrev?true:false}
						action={this.toPrev}/>
					<ShallowRegularBtn 
						style={styles.nextBtn}
						inactStyle={styles.nextBtnFade}
						textStyle={styles.ctrlBtnText}
						text={'提交'}
						if_active={this.state.chooseSub?true:false}
						action={()=>{

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
						action={this.toPrev}/>
					<ShallowRegularBtn 
						style={styles.nextBtn}
						inactStyle={styles.nextBtnFade}
						textStyle={styles.ctrlBtnText}
						text={'下一题'}
						if_active={this.state.chooseNext?true:false}
						action={this.toNext}/>					
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
                	<Text style={styles.indexingText}>{'题目 ' + (this.pageSize*(this.page-1) + this.state.curr + 1) + '/' + this.state.total}</Text>
                </View>
                {this.showQues(this.state.curr)}
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