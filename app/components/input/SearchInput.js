import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class SearchInput extends Component {
	render(){
		return(
			<View style={[styles.inputView, this.props.style]}>
				<AntDesign style={styles.icon} name={'search1'} size={20} color={'#ddd'} />
				<TextInput style={styles.input} placeholder={this.props.placeholder}>
				</TextInput>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	inputView: {
		width: 360,
		height: 40,
		borderRadius: 25,
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10
	},

	input: {
		flex: 1,
		textAlign: 'center'
	},

	icon: {
		left: 140
	}
});