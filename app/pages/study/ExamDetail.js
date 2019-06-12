import React, {Component} from 'react';
import {
	StyleSheet,
	Text, 
	View,
	TouchableOpacity,
	Dimensions
} from 'react-native';

import TitleHeader from '../../components/head/TitleHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import RegularBtn from '../../components/button/RegularBtn';


var {height, width} = Dimensions.get('window');

export default class ExamDetails extends Component {
	constructor(props) {
		super(props);
		this.course_id = this.props.navigation.getParam('course_id', null);
		this.exam = this.props.navigation.getParam('exam', null);
		this.title = this.props.navigation.getParam('title', null);
	}

    getTime(time){
		time = ~~time;
		var h = Math.floor(time/60/60),
			m = Math.floor((time-h*60*60)/60),
			s = Math.floor((time-h*60*60-m*60)%60);

        return {
            h : h,
            m : m,
            s : s
        };
    }

	render(){
		let stime = this.getTime(this.exam.suggested_time),
			ltime = this.getTime(this.exam.limited_time);
		return(
			<View style={styles.rootView}>
				<TitleHeader style={styles.headerView} title={this.title}/>
                
                <TouchableOpacity 
                    style={styles.backBtn}
                    onPress={()=>{this.props.navigation.goBack()}}>
                    <Entypo 
                        name={'chevron-thin-left'}
                        size={25}
                        color={'white'}/>
                </TouchableOpacity>

                <View style={styles.tags}>
					<View style={styles.tag}>
						<Text style={styles.text}>{'考试名称：  '}</Text>
						<Text style={styles.text}>{this.exam.exam_name}</Text>
					</View>
					<View style={styles.tag}>
						<Text style={styles.text}>{'考试总分:  '}</Text>
						<Text style={styles.text}>{this.exam.full_score + '分 '}</Text>						
					</View>
					<View style={styles.tag}>
						<Text style={styles.text}>{'建议时长:  '}</Text>
						<Text style={styles.text}>{(stime.h?(stime.h+'小时'):'')+(stime.m?(stime.m+'分'):'')+(stime.s?(stime.s+'秒'):'')}</Text>						
					</View>
					<View style={styles.tag}>
						<Text style={styles.text}>{'答题限时:  '}</Text>
						<Text style={styles.text}>{(ltime.h?(ltime.h+'小时'):'')+(ltime.m?(ltime.m+'分'):'')+(ltime.s?(ltime.s+'秒'):'')}</Text>						
					</View>
					<View style={styles.compTag}>
						<View style={styles.repeat}>
							<Text style={styles.text}>{'重复考试:  '}</Text>
							<Text style={styles.text}>
								{this.exam.repeat>0? '允许重复'+this.exam.repeat+'次': (this.exam.repeat === 0?'不允许重复考试':'无限制')}
							</Text>
						</View>
						{/*
						<View style={styles.already}>
							<Text style={styles.alreadyText}>
								{'已参加： ' + this.exam.is_count + '次'}
							</Text>
						</View>*/}
					</View>
					<View>
						<Text style={styles.text}>{'考试备注:'}</Text>
						<Text style={styles.text}>{this.exam.note}</Text>
					</View>
                </View>


				<View style={styles.studyBtnView}>
					<RegularBtn 
						style={styles.studyBtn} 
						textStyle={styles.studyBtnText}
						text={'开始学习'}
						ref={'studyBtn'}
						if_active={true}
						action={()=>{
							this.props.navigation.navigate('ExamContent', {course_id: this.course_id, exam: this.exam});
						}}/>
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

    tag: {
    	flexDirection: 'row',
    	height: 40,
    },

    text: {
    	fontSize: 16
    },

    tags: {
    	padding: 10
    },

    compTag: {
    	flexDirection: 'row',
    	justifyContent: 'space-between',
    	height: 40,
    },

    repeat: {
    	flexDirection: 'row'
    },

    already: {

    },

    alreadyText: {
    	color: '#4da4fb'
    },
	studyBtnView: {
		height: 70,
		width: width,
		flexDirection: 'row',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'baseline',
		position: 'absolute',
		bottom: 0
	},

	studyBtn: {
		width: 340,
		height: 45
	},

});