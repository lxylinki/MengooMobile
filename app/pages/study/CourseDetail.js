import React, {Component} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';

export default class CourseDetail extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Text>Course Detail</Text>
				<Button
					title='Go to Course Home'
					onPress={()=>{this.props.navigation.navigate('CourseHome')}} 
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