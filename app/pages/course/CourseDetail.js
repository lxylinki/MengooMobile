import React, {Component} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';

export default class DetailsScreen extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Text>Course Detail Screen</Text>
				<Button
					title='Go to Home'
					onPress={()=>{this.props.navigation.navigate('Home')}} 
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