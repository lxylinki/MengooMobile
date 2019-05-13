import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import RegularBtn from '../button/RegularBtn';

export default class CommentHeader extends Component {
	render(){
		return (
			<View style={[styles.headerbar, this.props.style]}>
				<RegularBtn
					style={styles.backBtn}
					textStyle={styles.backBtnText}
					text={'取消'}
					action={()=>{
						this.props.navigation.navigate('CourseDetail');
					}}
				/>
				<Text style={styles.headertext}>{this.props.title}</Text>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	headerbar: {
		backgroundColor: '#c9151e',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},

	headertext: {
		color: 'white',
		fontSize: 18
	},

	backBtn: {
		position: 'absolute',
		width: 50,
		height: 34,
		left: 5
	},

	backBtnText:{
		fontSize: 16
	}
});