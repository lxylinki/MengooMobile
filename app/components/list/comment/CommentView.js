import React, {PureComponent} from 'react';
import { 
	FlatList, 
	StyleSheet, 
	View, 
	Text, 
	Dimensions 
} from 'react-native';

import CommentItem from './CommentItem';


var {height, width} = Dimensions.get('window');

export default class CommentView extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false
		}
	}

	refresh = ()=> {
		if(!this.state.refreshing) {
			this.setState({
				refreshing: true
			});

			this.props.onRefresh(()=>{
				this.setState({
					refreshing: false
				})
			});
		}
	};
	
	render(){
		let key = 0;
		this.props.data.forEach(function(item){item.key = String(key++);});
		return (
			<FlatList
			 style={[styles.list, this.props.style]}
			 data = {this.props.data}
			 renderItem = {({item})=>{
			 	return(
			 		<CommentItem
			 			courseId={this.props.courseId}
			 			navigation={this.props.navigation}
			 			userId={this.props.userId}
			 			refresh={this.refresh}
			 			data={item} />
			 	);
			 }}
			 ItemSeparatorComponent = {()=>{
			 	return(<View style={styles.separatorLine}></View>);
			 }}
			 refreshing={this.state.refreshing} 
			 onRefresh={this.refresh}
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
		height: 0.3,
		backgroundColor: '#ddd',
	}
});