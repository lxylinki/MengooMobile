import React, {Component} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';

export default class CourseHome extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Text>Course (Home Page)</Text>
				<Button
					title='Go to Details'
					onPress={()=>{this.props.navigation.navigate('CourseDetail')}} 
				/>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: { 
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center' 
	}
});