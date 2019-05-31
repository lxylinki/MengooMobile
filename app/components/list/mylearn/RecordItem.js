import React, {PureComponent} from 'react';
import { 
	StyleSheet, 
	View, 
	Text,
	TouchableOpacity
} from 'react-native';

import Iconfont from 'react-native-vector-icons/Iconfont';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Utils from '../../../common/Utils';

export default class CourseItem extends PureComponent {
	constructor(props) {
		super(props);
		this.utils = new Utils();
	}

	setTypeIcon(type){
		switch(type) {
			case '1':
				return 'exam';
				break;
			case '2':
				return 'competition';
				break;
			case '3':
				return 'quiz';
				break;
			case '4':
				return 'homework';
				break;
			case '5':
				return 'content';
				break;
			case '6':
				return 'virtexp';
				break;
			case '7':
				return 'discuss';
				break;
			case '8':
				return 'expreport';
				break;
		}
	}

	render(){
		return(
			<View style={styles.rootView}>
				<View style={styles.iconView}>
					<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#3698eb', '#6fbbfc']} style={styles.recordIcon}>
						<Iconfont name={this.setTypeIcon(this.props.data.type)} size={35} color={'white'} />
					</LinearGradient>					
				</View>
				<View style={styles.textView}>
					<Text style={styles.name}>{this.props.data.name}</Text>
					<Text style={styles.from}>{'来自: ' + this.props.data.course }</Text>
					<View style={styles.timeBar}>
						<Iconfont name={'clock'} size={18} color={'#999'}/>
						<Text style={styles.timeText}>{this.utils.convTime(this.props.data.updated_at)}</Text>
					</View>
				</View>
				<View style={styles.btnView}>
					<TouchableOpacity 
						style={styles.btn}
						onPress={
							()=>{this.props.navigation.navigate('CourseDetail', {id: this.props.data.course_id});}
						}>
						<Text style={styles.btnText}>{'继续学习'}</Text>
						<AntDesign
							//style={styles.rightIcon} 
							size={10}
							color={'#c9151e'}
							name={'right'}/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}


let styles = StyleSheet.create({
	rootView: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		marginLeft: 10,
		marginRight: 10,
		height: 110		
	},

	iconView: {
		margin: 10
	},

	recordIcon: {
		width: 60,
		height: 60,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center'
	},

	textView: {
		padding: 10
	},

	name: {
		fontSize: 16
	},
	from: {
		fontSize: 12
	},
	timeBar: {
		flexDirection: 'row',
		marginTop: 40
	},

	timeText: {
		fontSize: 12,
		color: '#999'
	},

	btnView: {
		position: 'absolute',
		right: 10,
		bottom: 10
	},
	btn: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	btnText: {
		fontSize: 12,
		color: '#c9151e'
	}
});