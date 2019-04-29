import React, {Component} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';

export default class MineHome extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Text>Mine</Text>
				<Button
					title='Go to Mine Details'
					onPress={()=>{this.props.navigation.navigate('MineDetail')}} 
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