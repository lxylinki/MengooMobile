import React, {Component} from 'react';
import { 
	StyleSheet, 
	View, 
	Text
} from 'react-native';

import global_ from '../../common/Global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class CommentItem extends Component {
	render(){
		return(
			<View>
				<Text>{this.props.data.user_id}</Text>

				<View>
					<Text style={styles.title}>{this.props.data.name}</Text>
					<View style={styles.ratings}>
						<FontAwesome name={'star'} style={styles.star} size={10} color={ this.props.data.score>0? '#ff3c00': '#ddd'}/>
						<FontAwesome name={'star'} style={styles.star} size={10} color={ this.props.data.score>1? '#ff3c00': '#ddd'}/>
						<FontAwesome name={'star'} style={styles.star} size={10} color={ this.props.data.score>2? '#ff3c00': '#ddd'}/>
						<FontAwesome name={'star'} style={styles.star} size={10} color={ this.props.data.score>3? '#ff3c00': '#ddd'}/>
						<FontAwesome name={'star'} style={styles.star} size={10} color={ this.props.data.score>4? '#ff3c00': '#ddd'}/>
					</View>						
				</View>

			</View>
		);
	}
}

let styles = StyleSheet.create({
	star: {
		margin: 1
	},

	title: {
		marginBottom: 40,
		fontSize: 14
	},

	ratings: {
		flexDirection: 'row'
	},

	ratingsBg: {
		flexDirection: 'row',
		position: 'absolute',
		top: 59
	}
});