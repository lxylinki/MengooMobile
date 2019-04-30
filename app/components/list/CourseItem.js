import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import global_ from '../../common/Global';

export default class CourseItem extends Component {
	render(){
		return (
			<TouchableOpacity onPress={this.props.clickItem}>
				<View>
					<Text style={styles.title}>{this.props.data.name}</Text>

					<View style={styles.contentView}>
						<Image source={{uri: global_.url_prefix + this.props.data.img}} style={styles.image}/>
						<Text style={styles.contentText}>{this.props.data.learn_count}</Text>
					</View>

				</View>
			</TouchableOpacity>
		);
	}
}

let styles = StyleSheet.create({
	image: {
		width: 160,
		height: 80,
		marginLeft: 15,
		marginTop: 10,
		marginBottom: 10
	},

	title: {
		marginTop: 15,
		marginLeft: 15,
		fontSize: 17
	},

	contentView: {
		flex: 1,
		flexDirection: 'row'
	},

	contentText: {
		flex: 1,
		fontSize: 15,
		marginTop: 15,
		marginLeft: 10,
		marginRight: 15
	}	
});