import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import Utils from '../../common/Utils';

export default class ExamContent extends Component {
	constructor(props) {
		super(props);
		this.exam = this.props.navigation.getParam('exam', null);
		this.course_id = this.props.navigation.getParam('course_id', null);
		this.utils = new Utils();
		this.page = 1;
		this.pageSize = 5;
		this.totalPage = 0;

		//this.courseInfo = {};
		this.examInfo = {};
		this.recordId = null;
		this.submitData = {};
		this.timeData = {};
		this.remainingTime = 0;
		this.examResults=[];
		this.isShowAnswer = false;
		this.examQuesData = {};
	}

	componentDidMount(){
		this.getExamInfo();
	}

    setRecord(){
    	this.utils.joinExam(this.exam.exam_id, (resp)=> {
    		this.recordId = resp.id;
    		this.submitData = resp.record;
    		this.getExamResults();
    	});
    }

    getExam(){
    	let mode;
    	if(this.isShowAnswer) {
    		mode = 3;
    	} else {
    		mode = 2;
    	}

    	this.utils.getQuesList(this.exam.exam_id, mode, this.page, this.pageSize, (resp)=>{
    		this.examQuesData = resp;
    		console.log('Exam Ques List:', this.examQuesData);
    	});
    }

    getExamResults(){
    	this.utils.getPastExam(this.recordId, (resp)=> {
    		this.examResults = resp;
    		this.getExam();
    	})
    }

    getLastInfo(){
		this.utils.getLastRecord(this.exam.exam_id, (resp)=>{
			if(resp.id) {
				this.recordId = resp.id;
				this.submitData = resp;
				this.getExamResults();

			} else {
	            if(this.examInfo.status !== 1){//如果考试已经停止
	                this.getExam();
	                return false;
	            }
	            if(this.examInfo.started_at>new Date().getTime()/1000){//如果考试还没有开始
	                return false;
	            }
	            if(this.examInfo.ended_at<new Date().getTime()/1000){//如果考试超时了
	                this.getExam();
	                return false;
	            }
	            this.setRecord();
			}
		})
    }	    

	getExamInfo(){
		this.utils.getExamView(this.exam.exam_id, (resp)=>{
			this.examInfo = resp[0];
            if(this.recordId){
                //this.getEnterRecord();
            }else{
                this.getLastInfo();
            }
		});
	}

	render(){
		return(
			<View style={styles.rootView}>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		flex: 1
	}
});