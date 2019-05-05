import React, {Component} from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Image, 
	TouchableOpacity 
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import global_ from '../../common/Global';

export default class CatagItem extends Component {
	render(){
		return (
			<TouchableOpacity style={styles.rootView} onPress={this.props.clickItem}>
				<Ionicons
					style={styles.icon}
					name={'ios-book'} 
					size={30} />
				<View>
					<Text style={styles.title}>{this.props.data.name}</Text>
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
	
	icon: {
		margin: 20
	},

	title: {
		
	}
});