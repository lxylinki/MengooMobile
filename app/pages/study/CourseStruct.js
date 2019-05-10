import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';


export default class CourseStruct extends Component {
	constructor(props){
		super(props);
		this.courseId = this.props.navigation.getParam('id', null);
		this.courseName = this.props.navigation.getParam('name', '');
		this.teachers = this.props.navigation.getParam('teachers', []);
		this.imgSrc = this.props.navigation.getParam('img_src', '');
	}

	listTeachers(){
		let teachers = [];
		for(let i in this.teachers) {
			let teacher = this.teachers[i];
			teachers.push(<Text key={i} style={styles.teacherName}>{teacher.realname}</Text>);
		}
		return teachers;
	}

	render(){
		return(
			<View>
				<Text>{'I am Course Struct Page.'}</Text>
			</View>
		);
	}
}

let styles = StyleSheet.create({

});