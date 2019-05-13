import React, {Component} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';

export default class VidHome extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Text>VidHome</Text>
				<Button
					title='Go to Vid Details'
					onPress={()=>{this.props.navigation.navigate('VidDetail')}} 
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