import React, {Component} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';

export default class FollowDetail extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Text>Follow Detail</Text>
				<Button
					title='Go to Follow Home'
					onPress={()=>{this.props.navigation.navigate('FollowHome')}} 
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