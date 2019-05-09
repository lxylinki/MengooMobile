import React, {Component} from 'react';
import { 
	FlatList, 
	StyleSheet, 
	View, 
	Text, 
	Dimensions 
} from 'react-native';

import CommentItem from './CommentItem';


var {height, width} = Dimensions.get('window');

export default class CommentView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false
		}
	}
	
	render(){
		let key = 0;
		this.props.data.forEach(function(item){item.key = String(key++);});
		return (
			<FlatList
			 style={[styles.list, this.props.style]}
			 data = {this.props.data}
			 renderItem = {({item})=>{
			 	return(
			 		<CommentItem data={item} />
			 	);
			 }}
			 ItemSeparatorComponent = {()=>{
			 	return(<View style={styles.separatorLine}></View>);
			 }}
			 refreshing={this.state.refreshing} 
			 onRefresh={()=>{
			 	if(!this.state.refreshing) {
			 		this.setState({
			 			refreshing: true
			 		});
			 		this.props.onRefresh(()=>{
			 			this.setState({
			 				refreshing: false
			 			});
			 		});
			 	}
			 }}
			 onEndReached={this.props.onEndReached}
			 onEndReachedThreshold={0.5}
			/>
		);
	}	
}

let styles = StyleSheet.create({
	list: {
		width: width
	},

	separatorLine: {
		height: 0.5,
		backgroundColor: 'gray',
	}
});