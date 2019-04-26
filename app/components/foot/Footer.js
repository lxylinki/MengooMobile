import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Footer extends Component {
	render(){
		return (
			<View style={[this.props.style, styles.footerbar]}>
				<Text style={styles.footertext}>{this.props.title}</Text>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	footerbar: {
		backgroundColor: '#22313F',
		justifyContent: 'center',
		alignItems: 'center'
	},

	footertext: {
		color: 'white',
		fontSize: 18
	}
});