import React, {Component} from 'react';
import { Alert, FlatList, StyleSheet, View, Text } from 'react-native';
import CourseItem from './CourseItem';

export default class CourseView extends Component {
	render(){
		let key = 0;
		this.props.data.forEach(function(item){item.key = String(key++);});

		return (
			<FlatList
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
	separatorLine: {
		height: 0.5,
		backgroundColor: 'gray',
	}
});