import React, {Component} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';

export default class FollowHome extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Text>Follow</Text>
				<Button
					title='Go to Follow Details'
					onPress={()=>{this.props.navigation.navigate('FollowDetail')}} 
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