import React, {PureComponent} from 'react';
import { 
	FlatList, 
	StyleSheet, 
	View, 
	Text, 
	Dimensions 
} from 'react-native';

import CourseItem from './CourseItem';
import FakeList from './FakeList';


var {height, width} = Dimensions.get('window');

export default class CourseView extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false
		}
	}
	
	render(){
		if(this.props.data.length === 0 && this.props.hasSkeleton) {
			return(
				<FakeList style={styles.list}/>
			);
		} else {
			let key = 0;
			this.props.data.forEach(function(item){item.key = String(key++);});
			return (
				<FlatList
					onScroll={this.props.onScroll}
					style={styles.list}
					data = {this.props.data}
					renderItem = {({item})=>{
						return(
							<CourseItem 
								data={item} 
								inspectCourseItem={()=>{
									this.props.navigation.navigate('CourseDetail', {id: item.id});
								}}
							/>
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