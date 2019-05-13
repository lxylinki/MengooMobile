import React, {Component} from 'react';
import {
	StyleSheet, 
	View, 
	Text,
	Image
} from 'react-native';

export default class Header extends Component {
	render(){
		return (
			<View style={[this.props.style, styles.headerbar]}>
				<Image resizeMode={'stretch'} style={styles.image} source={require('../../../assets/img/headlogo.png')} />
			</View>
		);
	}
}

let styles = StyleSheet.create({
	headerbar: {
		backgroundColor: '#c9151e',
		flexDirection: 'row',
		alignItems: 'center'
	},

	headertext: {
		color: 'white',
		fontSize: 18
	},

	image: {
		width: 178,
		height: 36,
		marginLeft: 10
	}
});