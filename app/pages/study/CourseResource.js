import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	WebView
} from 'react-native';

//import ReactSWF from 'react-swf';
import Video from 'react-native-video';
import Utils from '../../common/Utils';

export default class CourseResource extends Component {
	constructor(props) {
		super(props);
		this.item = this.props.navigation.getParam('item', null);
		this.type = this.props.navigation.getParam('type', null);
		this.utils = new Utils();
	}

	componentDidMount(){
		//console.log(this.item, this.type);
		this.getStructSet();

	}

	getStructSet(){
		this.utils.setStruct(this.item.id, (resp)=>{
			console.log('setStruct resp:', resp);
		});
	}

	render(){
		return(
			<View style={{flex: 1}}>
				<Text>{'This is Course Resource.'}</Text>
				<Video
					style={styles.backgroundVideo} 
					controls={true}
					source={{uri: "https://mengoo.doctor-u.cn/mengoo/resources/resource/load/lyj7rw/movie.mp4"}}/>
			</View>
		);
	};
}

let styles = StyleSheet.create({
	backgroundVideo: {
		position: 'absolute',
		top: 10,
		left: 10,
		bottom: 10,
		right: 10,
	},
});