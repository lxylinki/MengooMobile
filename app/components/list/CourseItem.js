import React, {Component} from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Image, 
	TouchableOpacity 
} from 'react-native';

import global_ from '../../common/Global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class CourseItem extends Component {
	render(){
		return (
			<TouchableOpacity onPress={this.props.clickItem}>
				<View style={styles.rootView}>
					<Image source={{uri: global_.url_prefix + this.props.data.img}} style={styles.image}/>
					
					<View>
						<Text style={styles.title}>{this.props.data.name}</Text>
						<View style={styles.ratingsBg}>
							<FontAwesome name={'star'} style={styles.star} size={15} color={'#ddd'}/>
							<FontAwesome name={'star'} style={styles.star} size={15} color={'#ddd'}/>
							<FontAwesome name={'star'} style={styles.star} size={15} color={'#ddd'}/>
							<FontAwesome name={'star'} style={styles.star} size={15} color={'#ddd'}/>
							<FontAwesome name={'star'} style={styles.star} size={15} color={'#ddd'}/>
						</View>	
						<View style={styles.ratings}>
							<FontAwesome name={'star'} style={styles.star} size={15} color={ this.props.data.score>0? '#ff3c00': '#ddd'}/>
							<FontAwesome 
								name={this.props.data.score>1 && this.props.data.score<=1.5?'star-half':'star'} 
								style={this.props.data.score>1 && this.props.data.score<=1.5?styles.halfStar:styles.star} 
								size={15} 
								color={ this.props.data.score>1? '#ff3c00': '#ddd'}/>
							<FontAwesome 
								name={this.props.data.score>2 && this.props.data.score<=2.5?'star-half':'star'} 
								style={this.props.data.score>2 && this.props.data.score<=2.5?styles.halfStar:styles.star} 
								size={15} 
								color={ this.props.data.score>2? '#ff3c00': '#ddd'}/>
							<FontAwesome 
								name={this.props.data.score>3 && this.props.data.score<=3.5?'star-half':'star'} 
								style={this.props.data.score>3 && this.props.data.score<=3.5?styles.halfStar:styles.star} 
								size={15} 
								color={ this.props.data.score>3? '#ff3c00': '#ddd'}/>
							<FontAwesome 
								name={this.props.data.score>4 && this.props.data.score<=4.5?'star-half':'star'} 
								style={this.props.data.score>4 && this.props.data.score<=4.5?styles.halfStar:styles.star} 
								size={15} 
								color={ this.props.data.score>4? '#ff3c00': '#ddd'}/>
						</View>						
					</View>

					<View style={styles.commentCount}>
						<Ionicons name={'md-person'} size={15} color={'#3296fa'}/>
						<Text style={styles.count}>{this.props.data.comment_count}</Text>
					</View>

				</View>
			</TouchableOpacity>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	image: {
		width: 150,
		height: 90,
		margin: 15,
		borderRadius: 10
	},

	star: {
		margin: 1
	},

	halfStar: {
		marginRight: 9
	},

	title: {
		marginBottom: 40,
		fontSize: 14
	},

	contentView: {
		flex: 1,
		flexDirection: 'column'
	},

	contentText: {
		flex: 1,
		fontSize: 15,
		marginTop: 15,
		marginLeft: 10,
		marginRight: 15
	},

	ratings: {
		flexDirection: 'row'
	},

	ratingsBg: {
		flexDirection: 'row',
		position: 'absolute',
		top: 59
	},

	commentCount: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		right: 10,
		bottom: 10
	},

	count: {
		color: '#3296fa',
		fontSize: 14,
		margin: 5
	}
});