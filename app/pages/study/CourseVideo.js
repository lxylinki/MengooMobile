import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

//import ReactSWF from 'react-swf';
import Video from 'react-native-video';
import Utils from '../../common/Utils';
import global_ from '../../common/Global';

export default class CourseVideo extends Component {
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
			this.setState({
				url: global_.course_load + this.item.resource.fid + '/' + this.item.resource.fname
			});
		});
	}

	render(){
		if(this.state.url.length > 0) {
			return(
				<View style={styles.rootView}>
					<Video
						style={styles.videoFrame} 
						controls={true}
						source={{uri: this.state.url}}
					/>
				</View>
			);
		} else {
			return(
				<View>
					<Text>{'错误：无视频文件'}</Text>
				</View>
			);
		}
	};
}

let styles = StyleSheet.create({
	rootView: {
		flex: 1
	},

	videoFrame: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});