import React, {Component} from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Image, 
	TouchableOpacity 
} from 'react-native';

import global_ from '../../common/Global';

export default class CatagItem extends Component {
	render(){
		return (
			<TouchableOpacity onPress={this.props.clickItem}>
				<View>
					<Text style={styles.title}>{this.props.data.name}</Text>
				</View>
			</TouchableOpacity>
		);
	}	
}

let styles = StyleSheet.create({
	title: {
		
	}
});