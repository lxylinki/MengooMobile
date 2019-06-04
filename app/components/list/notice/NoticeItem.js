import React, {PureComponent} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import Utils from '../../../common/Utils';


export default class NoticeItem extends PureComponent {
	constructor(props) {
		super(props);
		this.utils = new Utils();
	}

	render(){
		return(
			<TouchableOpacity 
				style={styles.rootView}
				onPress={()=>{
					this.props.navigation.navigate('NoticeDetail', {content: this.props.data.content});
				}}>
				<View style={styles.titleView}>
					<Text style={styles.titleText}>{this.props.data.title}</Text>
				</View>
				<View style={styles.dateView}>
					<Text style={styles.dateText}>{this.utils.convTime(this.props.data.updated_at)}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		height: 70,
		padding: 10
	},
	titleView: {
		height: 30,
		justifyContent: 'center'
	},
	titleText: {
		fontSize: 16
	},
	dateView: {
		height: 30,
		justifyContent: 'center'
	},
	dateText: {
		fontSize: 12
	}
});