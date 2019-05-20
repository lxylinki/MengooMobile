import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Platform
} from 'react-native';

import Video from 'react-native-video';
import Utils from '../../common/Utils';
import global_ from '../../common/Global';
import Orientation from 'react-native-orientation';
import OpenFile from 'react-native-doc-viewer';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';


export default class CourseDoc extends Component {
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
		Orientation.unlockAllOrientations();
		//Orientation.addOrientationListener(this._orientationDidChange);
	}

	// _orientationDidChange = (orientation) => {
	// 	if (orientation === 'LANDSCAPE') {
	// 		console.log('Current layout: landscape');
	// 	} else {
	// 		console.log('Current layout: portrait');
	// 	}
	// }

	componentWillUnmount(){
		Orientation.lockToPortrait();
		// Orientation.getOrientation((err, orientation) => {
		// 	console.log(`Current Device Orientation: ${orientation}`);
		// });
		//Orientation.removeOrientationListener(this._orientationDidChange);
	}


	getLocalPath (url) {
		const filename = url.split('/').pop();
		// feel free to change main path according to your requirements
		return `${RNFS.DocumentDirectoryPath}/${filename}`;
		//return `./${filename}`;
	}

	getStructSet(){
		FileViewer.open("./Presentation1.ppt")
		.then(() => {
		    // success
		})
		.catch(error => {
		    // error
		});
		// let url = global_.course_load + this.item.resource.fid + '/' + this.item.resource.fname
		// let localFile = this.getLocalPath(url);
		// console.log(url, localFile);
		// let options = {
		// 	fromUrl: url,
		// 	toFile: localFile
		// }

		// RNFS.downloadFile(options).promise
		// .then(()=>{})
		// .then(() => {
		//     // success
		//     console.log('success');
		// })
		// .catch(error => {
		//     // error
		//     console.error(error);
		// });

		// this.utils.setStruct(this.item.id, ()=>{
		// 	this.setState({
		// 		url: global_.course_load + this.item.resource.fid + '/' + this.item.resource.fname
		// 	});

		// 	OpenFile.openDoc([{
		// 		url: global_.course_load + this.item.resource.fid + '/' + this.item.resource.fname,
		// 		fileName: this.item.resource.fname,
		// 		cache: false,
		// 		fileType: "ppt"
		// 	}], (error, url)=> {
		// 			if (error) {
		// 				console.error(error);
		// 			} else {
		// 				console.log(url)
		// 			}
		// 		}
		// 	)

		// });
	}

	render(){
		if(this.state.url.length > 0) {
			return(
				<View style={styles.rootView}>
				</View>
			);
		} else {
			return(
				<View>
					<Text>{'错误：无文件'}</Text>
				</View>
			);
		}
	};
}

let styles = StyleSheet.create({
	rootView: {
		flex: 1
	},

	img: {
		flex: 1
	},
});

