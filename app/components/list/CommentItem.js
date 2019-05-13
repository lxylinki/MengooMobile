import React, {PureComponent} from 'react';
import { 
	StyleSheet, 
	View, 
	Text,
	Image,
	TouchableOpacity,
	Alert
} from 'react-native';

import Utils from '../../common/Utils';
import global_ from '../../common/Global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class CommentItem extends PureComponent {
	constructor(props){
		super(props);
		this.utils = new Utils();
	}

	render(){
		//console.log(this.props.data.user_id === this.props.userId);
		return(
			<View style={styles.rootView}>
				<View style={styles.imageView}>
					<Image 
						style={styles.image} 
						resizeMode='cover' 
						source={ this.props.data.avatar? {uri: this.props.data.avatar} : require('../../../assets/img/user-avatar.png')}/>
				</View>

				<View style={styles.contentView}>
					<Text style={styles.username}>{this.props.data.username}</Text>
					<View style={styles.rating}>
						<FontAwesome name={'star'} style={styles.star} size={10} color={ this.props.data.score>0? '#ffd161': '#ddd'}/>
						<FontAwesome name={'star'} style={styles.star} size={10} color={ this.props.data.score>1? '#ffd161': '#ddd'}/>
						<FontAwesome name={'star'} style={styles.star} size={10} color={ this.props.data.score>2? '#ffd161': '#ddd'}/>
						<FontAwesome name={'star'} style={styles.star} size={10} color={ this.props.data.score>3? '#ffd161': '#ddd'}/>
						<FontAwesome name={'star'} style={styles.star} size={10} color={ this.props.data.score>4? '#ffd161': '#ddd'}/>
					</View>	
					<Text style={styles.commentContent}>
						{this.props.data.content}
					</Text>
				</View>
				
				<View style={styles.dateView}>
					<Text style={styles.datetime}>{this.utils.convTimeFull(this.props.data.updated_at)}</Text>
				</View>	

				<View style={this.props.data.user_id === this.props.userId? styles.opView: {display: 'none'}}>
					<TouchableOpacity onPress={()=>{
						this.props.navigation.navigate('EditComment', {data: {course_id:this.props.courseId, score: this.props.data.score, content: this.props.data.content}});
					}}>
						<AntDesign name={'edit'} style={styles.editSign} size={20}/>
					</TouchableOpacity>
					
					<TouchableOpacity onPress={()=>{
						Alert.alert(
							'提示',
							'确定删除评论？',
							[
								{text: '确定', 
									onPress: () => {
										this.utils.deleteComment({course_id: this.props.courseId}, (resp)=>{
											this.props.refresh();
										})
									}},
								{text: '取消', onPress: () => {}},
							],
							{cancelable: false}
						);
					}}>
						<AntDesign name={'delete'} style={styles.deleteSign} size={20}/>
					</TouchableOpacity>	
				</View>				
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		flexDirection: 'row',
		height: 100
	},

	imageView: {
		alignItems: 'center',
		justifyContent: 'center'
	},

	image:{
		width: 50,
		height: 50,
		borderRadius: 25,
		margin: 10
	},

	username: {
		fontSize: 16,
		margin: 5
	},

	star: {
		margin: 1
	},

	title: {
		marginBottom: 40,
		fontSize: 14
	},

	rating: {
		flexDirection: 'row',
		margin: 5
	},

	commentContent: {
		margin: 5,
		fontSize: 14
	},

	contentView: {
		justifyContent: 'space-between'
	},

	dateView: {
		position: 'absolute',
		right: 10,
		top: 10
	},

	datetime: {
		fontSize: 14
	},

	opView: {
		position: 'absolute',
		right: 10,
		bottom: 10,
		flexDirection: 'row'
	},

	editSign: {
		margin: 5
	},

	deleteSign: {
		margin: 5
	}
});