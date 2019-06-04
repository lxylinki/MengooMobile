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
		};
		this.itemCount = 0;
		this.maxHeight = 0;
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
		let key = 0, count = 0;
		this.props.data.forEach(function(item){item.key = String(key++);});
		return (
			<FlatList
				//onLayout={({nativeEvent:e})=>this.layout(e)}
				style={[styles.list, this.props.style]}
				data = {this.props.data}
				renderItem = {({item})=>{
					if(Object.keys(this.props.exams).includes(item.id)) {
					 	return(
					 		<ExamItem
					 			addHeight={(height)=>{
					 				count += 1;
					 				this.maxHeight += height;
					 				if(count === this.props.data.length) {
					 					//console.log('StructView:', this.maxHeight);
					 					this.props.setHeight(this.maxHeight);
					 				}
					 			}}
								navigation={this.props.navigation}
					 			exam={this.props.exams[item.id]}
					 			data={item} />
					 	);
					} else {
					 	return(
					 		<StructItem
					 			addHeight={(height)=> {
					 				count += 1;
					 				this.maxHeight += height;
					 				if(count === this.props.data.length) {
					 					//console.log('StructView:', this.maxHeight);
					 					this.props.setHeight(this.maxHeight);
					 				}
					 			}}
								navigation={this.props.navigation}
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
		width: width,
	},

	separatorLine: {
		height: 0.5,
		backgroundColor: 'gray',
	}
});