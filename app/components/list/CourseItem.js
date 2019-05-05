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

export default class CourseItem extends Component {
	render(){
		return (
			<TouchableOpacity onPress={this.props.clickItem}>
				<View style={styles.rootView}>
					<Image source={{uri: global_.url_prefix + this.props.data.img}} style={styles.image}/>
					
					<View>
						<Text style={styles.title}>{this.props.data.name}</Text>
						<View style={styles.ratings}>
							<Ionicons name={'md-star'} style={styles.star} size={15} color={ this.props.data.score>0? '#ff3c00': '#ddd'}/>
							<Ionicons name={'md-star'} style={styles.star} size={15} color={ this.props.data.score>1? '#ff3c00': '#ddd'}/>
							<Ionicons name={'md-star'} style={styles.star} size={15} color={ this.props.data.score>2? '#ff3c00': '#ddd'}/>
							<Ionicons name={'md-star'} style={styles.star} size={15} color={ this.props.data.score>3? '#ff3c00': '#ddd'}/>
							<Ionicons name={'md-star'} style={styles.star} size={15} color={ this.props.data.score>4? '#ff3c00': '#ddd'}/>
						</View>						
					</View>

					<View style={styles.learnCount}>
						<Ionicons name={'md-person'} size={15} color={'#3296fa'}/>
						<Text style={styles.count}>{this.props.data.learn_count}</Text>
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

	learnCount: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 120,
		marginTop: 80
	},

	count: {
		color: '#3296fa',
		fontSize: 14,
		margin: 5
	}
});