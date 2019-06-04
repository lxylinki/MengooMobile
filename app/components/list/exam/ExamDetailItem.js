import React, {PureComponent} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import Utils from '../../../common/Utils';
import RegularBtn from '../../button/RegularBtn';

export default class ExamDetailItem extends PureComponent {
	constructor(props) {
		super(props);
		this.utils = new Utils();
	}


	currStatus(item) {
		return item.exam_status==1 && item.ended_at>new Date().getTime()/1000 ? "进行阶段" : (item.exam_status==3 ? "成绩公示阶段" : "已结束");
	}


	render(){
		//console.log('exam detail item:', this.props.data);
		return(
			<View style={styles.rootView}>

				<View style={styles.nameTag}>
					<View style={styles.name}>
						<View style={styles.decor}></View>
						<Text style={styles.nameText}>{this.props.data.name}</Text>
					</View>

					<View style={styles.status}>
						<Text style={styles.statusText}>{this.currStatus(this.props.data)}</Text>
					</View>
				</View>

				<View style={styles.examNameTag}>
					<Text style={styles.examNameText}>{this.props.data.exam_name}</Text>
				</View>

				<View style={styles.timeTag}>
					<Text style={styles.timeText}>
						{'考试时间: ' + this.utils.convTime(this.props.data.started_at) + ' 至 ' + this.utils.convTime(this.props.data.ended_at)}
					</Text>
				</View>

				<View style={styles.totalTag}>
					<Text style={styles.totalText}>{'总分： ' + this.props.data.full_score + '分'}</Text>
				</View>

				<View style={styles.btnTag}>
					<RegularBtn 
						style={styles.goBtn} 
						textStyle={styles.goBtnText}
						text={'前往考试'}
						if_active={true}
						action={()=>{}}
					/>
				</View>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		flex: 1
	},

	nameTag: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 10,
		height: 40
	}, 

	examNameTag: {
		padding: 10,
		height: 40,
		justifyContent: 'center'
	},

	timeTag: {
		padding: 10,
		height: 40,
		justifyContent: 'center'
	},

	totalTag: {
		padding: 10,
		height: 40,
		justifyContent: 'center'
	},

	btnTag: {
		padding: 10,
		height: 70,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},

	timeText: {
		fontSize: 14,
		marginLeft: 10
	},
	totalText: {
		fontSize: 14,
		marginLeft: 10
	},
	examNameText: {
		fontSize: 14,
		marginLeft: 10
	},

	name: {
		flexDirection: 'row'
	},

	nameText: {
		fontSize: 14,
		fontWeight: 'bold'
	},

	decor: {
		width: 3,
		height: 20,
		backgroundColor: '#c9151e',
		marginRight: 10
	},

	status: {
		width: 60,
		height: 25,
		backgroundColor: '#c9151e',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10
	},

	statusText: {
		fontSize: 12,
		color: 'white'
	},

	goBtn: {
		width: 100,
		height: 34,		
	},

	goBtnText: {
		fontSize: 14
	}
});