import React, {PureComponent} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import Utils from '../../../common/Utils';


export default class ExamDetailItem extends PureComponent {
	constructor(props) {
		super(props);
		this.utils = new Utils();
	}

	render(){
		return(
			<View style={styles.rootView}>
				<Text>{this.props.data.exam_name}</Text>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		flex: 1
	}
});