import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

//import ReactSWF from 'react-swf';
import Video from 'react-native-video';
import Utils from '../../common/Utils';
import HTML from 'react-native-render-html';
import global_ from '../../common/Global';



export default class CourseArticle extends Component {
	constructor(props) {
		super(props);
		this.item = this.props.navigation.getParam('item', null);
		//this.type = this.props.navigation.getParam('type', null);
		this.utils = new Utils();
		this.state = {
			content: ''
		}
	}

	componentDidMount(){
		//console.log(this.item, this.type);
		this.getStructSet();
	}

	getStructSet(){
		this.utils.setStruct(this.item.id, ()=>{
			//console.log('setStruct resp:', resp);
			this.utils.getArticle(this.item.id, (resp)=>{
				//console.log('getArticle resp:', resp);
				this.setState({
					content: resp.length>0? resp[0].content: '<p>错误：内容为空</p>'
				});
			});
		});
	}

	render(){
		return(
			<View style={styles.rootView}>
				<HTML html={this.state.content?this.state.content.replace( /(<img.+?src=")(.*?)/, '$1'+ global_.main_url +'$2'):'<p></p>'} />
			</View>
		);
	};
}

let styles = StyleSheet.create({
	rootView: {
		flex: 1,
	}
});