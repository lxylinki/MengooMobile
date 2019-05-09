import React, {Component} from 'react';
import { 
	StyleSheet, 
	View, 
	Text,
	Image
} from 'react-native';

import Utils from '../../common/Utils';
import global_ from '../../common/Global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class CommentItem extends Component {
	constructor(props){
		super(props);
		this.utils = new Utils();
	}

	render(){
		//console.log(this.props.data);
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
						<FontAwesome name={'star'} style={styles.star} size={10} color={ this.props.data.score>0? '#ff3c00': '#ddd'}/>
						<FontAwesome name={'star'} style={styles.star} size={10} color={ this.props.data.score>1? '#ff3c00': '#ddd'}/>
						<FontAwesome name={'star'} style={styles.star} size={10} color={ this.props.data.score>2? '#ff3c00': '#ddd'}/>
						<FontAwesome name={'star'} style={styles.star} size={10} color={ this.props.data.score>3? '#ff3c00': '#ddd'}/>
						<FontAwesome name={'star'} style={styles.star} size={10} color={ this.props.data.score>4? '#ff3c00': '#ddd'}/>
					</View>	
					<Text style={styles.commentContent}>
						{this.props.data.content}
					</Text>
				</View>
				
				<View style={styles.dateView}>
					<Text style={styles.datetime}>{this.utils.convTimeFull(this.props.data.updated_at)}</Text>
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
	}
});