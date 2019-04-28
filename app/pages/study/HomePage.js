import React, {Component} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';

export default class HomePage extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Text>Home Screen</Text>
				<Button
					title='Go to Details'
					onPress={()=>{this.props.navigation.navigate('Details')}} 
				/>
				<Button
					title='Go to Mine'
					onPress={()=>{this.props.navigation.navigate('MineHome')}} 
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