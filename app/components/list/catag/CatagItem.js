import React, {Component} from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Image, 
	TouchableOpacity 
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import global_ from '../../../common/Global';

export default class CatagItem extends Component {
	render(){
		return (
			<TouchableOpacity style={styles.rootView} onPress={this.props.clickItem}>
				<Ionicons
					style={styles.leftIcon}
					name={'ios-book'} 
					size={30} />
				<View>
					<Text style={styles.titleText}>{this.props.data.name}</Text>
					<Text style={styles.countText}>{this.props.data.course_count + '门课'}</Text>
				</View>
				<AntDesign
					style={styles.rightIcon} 
					size={15}
					name={'right'}/>
			</TouchableOpacity>
		);
	}	
}

let styles = StyleSheet.create({
	rootView: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		marginLeft: 10,
		marginRight: 10
	},
	
	leftIcon: {
		margin: 20
	},
	
	rightIcon: {
		position: 'absolute',
		right: 10
	},

	titleText: {
		fontSize: 16,
		margin: 5
	},

	countText: {
		fontSize: 12,
		color: '#b4b4b4',
		margin: 5
	}
});