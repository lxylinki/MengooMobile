import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class CourseSearch extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Header style={styles.headerView} title='MY FIRST APP' />
			</View>
		);		
	}
}


let styles = StyleSheet.create({
	rootView: { 
		flex: 1,
		backgroundColor: '#f5f6fa',
	},

	headerView: {
		height: 70
	}
});