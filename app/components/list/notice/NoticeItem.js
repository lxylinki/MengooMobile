import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

export default class NoticeItem extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<View>
					<Text>{this.props.data.title}</Text>
				</View>
				<View>
					{this.props.data.content}
				</View>
			</View>
		);
	}
}

let styles = StyleSheet.create({

});