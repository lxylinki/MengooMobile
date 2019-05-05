import React, {Component} from 'react';
import { 
	Alert, 
	FlatList, 
	StyleSheet, 
	View, 
	Text, 
	Dimensions 
} from 'react-native';

import CourseItem from './CourseItem';


var {height, width} = Dimensions.get('window');

export default class CourseView extends Component {
	render(){
		let key = 0;
		this.props.data.forEach(function(item){item.key = String(key++);});
		
		return (
			<FlatList
			 style={styles.list}
			 data = {this.props.data}
			 renderItem = {({item})=>{
			 	return(<CourseItem data={item} clickItem={()=>{Alert.alert('Course Item Clicked')}}/>);
			 }}
			 ItemSeparatorComponent = {()=>{
			 	return(<View style={styles.separatorLine}></View>);
			 }}
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