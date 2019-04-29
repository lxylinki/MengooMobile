import React, {Component} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import Header from '../../components/head/Header';

export default class CourseHome extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Header style={styles.headerView} title='MY FIRST APP' />
				<View style={styles.upperView}>
					
				</View>
				<View style={styles.bottomView}>
					
				</View>
				{/*
				<Text>Course (Home Page)</Text>
				<Button
					title='Go to Details'
					onPress={()=>{this.props.navigation.navigate('CourseDetail')}} 
				/>*/}
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: { 
		flex: 1
	},

	headerView: {
		flex: 1
	},

	upperView: {
		flex: 3,
		backgroundColor: 'powderblue'
	},

	bottomView: {
		flex: 3,
		backgroundColor: 'yellowgreen'
	}
});