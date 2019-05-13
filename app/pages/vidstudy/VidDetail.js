import React, {Component} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';

export default class VidDetail extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Text>Vid Detail</Text>
				<Button
					title='Go to Vid Home'
					onPress={()=>{this.props.navigation.navigate('VidHome')}} 
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