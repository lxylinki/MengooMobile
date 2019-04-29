import React, {Component} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';

export default class MsgHome extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<Text>Message</Text>
				<Button
					title='Go to Message Details'
					onPress={()=>{this.props.navigation.navigate('MsgDetail')}} 
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