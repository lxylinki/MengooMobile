import React, {Component} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';

export default class MinePage extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Text>Mine Home Screen</Text>
				<Button
					title='Go to Mine Details'
					onPress={()=>{this.props.navigation.navigate('MineDetails')}} 
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