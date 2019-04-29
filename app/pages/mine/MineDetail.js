import React, {Component} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';

export default class MineDetail extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Text>Message Detail</Text>
				<Button
					title='Go to Mine Home'
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