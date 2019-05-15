import React, {PureComponent} from 'react';
import { 
	FlatList, 
	StyleSheet, 
	View, 
	Text, 
	Dimensions 
} from 'react-native';

import StructItem from './StructItem';
import ExamItem from './ExamItem';

var {height, width} = Dimensions.get('window');

export default class StructView extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			maxHeight: 2000
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
				style={[styles.list, {height: this.state.maxHeight}, this.props.style]}
				data = {this.props.data}
				renderItem = {({item})=>{
					if(Object.keys(this.props.exams).includes(item.id)) {
					 	return(
					 		<ExamItem
					 			exam={this.props.exams[item.id]}
					 			data={item} />
					 	);
					} else {
					 	return(
					 		<StructItem
					 			courseId={this.props.courseId}
					 			data={item} />
					 	);
					}
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
		height: 0.5,
		backgroundColor: 'gray',
	}
});