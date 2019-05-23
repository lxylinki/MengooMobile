import React, {Component} from 'react';
import {
	StyleSheet, 
	View, 
	Text,
	Image
} from 'react-native';

export default class TitleHeader extends Component {
	render(){
		return (
			<View style={[this.props.style, styles.headerBar]}>
				<Text style={styles.headerText}>{this.props.title}</Text>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	headerBar: {
		backgroundColor: '#c9151e',
		alignItems: 'center',
		justifyContent: 'center'
	},

	headerText: {
		color: 'white',
		fontSize: 18
	}
});