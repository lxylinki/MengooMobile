import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	//WebView,
	Linking
} from 'react-native';


import Utils from '../../common/Utils';
import global_ from '../../common/Global';


export default class CourseExp extends Component {
	constructor(props) {
		super(props);
		this.item = this.props.navigation.getParam('item', null);
		//this.type = this.props.navigation.getParam('type', null);
		this.utils = new Utils();
		this.state = {
			url: ''
		}
	}

	componentDidMount(){
		//console.log(this.item);
		this.getStructSet();
	}

	getStructSet(){
		this.utils.setStruct(this.item.id, ()=>{
			// this.setState({
			// 	//url: global_.course_load + this.item.resource.fid + '/' + this.item.resource.fname
			// 	url: 'https://mengoo.doctor-u.cn/flash/jrzs/'
			// });
			Linking.openURL('https://mengoo.doctor-u.cn/flash/jrzs/').catch(err => console.error('访问链接错误', err));
		});
	}

	render(){
		// if(this.state.url.length > 0) {
		// 	return(
		// 		<WebView style={styles.rootView} source={{uri: this.state.url}}/>
		// 	);
		// } else {
		// 	return(
		// 		<View>
		// 			<Text>{'错误：无实验文件'}</Text>
		// 		</View>
		// 	);
		// }
		return (
			<View></View>
		);
	};
}

let styles = StyleSheet.create({
	rootView: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,		
	}
});