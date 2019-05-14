import React, {PureComponent} from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Dimensions
} from 'react-native';

import SectionItem from './SectionItem';

var {height, width} = Dimensions.get('window');

export default class SectionView extends PureComponent {
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
			 		<SectionItem
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
		height: 0.5,
		backgroundColor: 'gray',
	}	
});