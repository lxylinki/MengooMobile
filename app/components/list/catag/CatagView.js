import React, {Component} from 'react';
import { 
	Alert, 
	FlatList, 
	StyleSheet, 
	View, 
	Text, 
	Dimensions 
} from 'react-native';

import CatagItem from './CatagItem';

var {height, width} = Dimensions.get('window');

export default class CatagView extends Component {
	render(){
		let key = 0;
		this.props.data.forEach(function(item){item.key = String(key++);});
		
		return (
			<FlatList
				onScroll={this.props.onScroll}
				style={styles.list}
				data = {this.props.data}
				renderItem = {({item})=>{
					return(
						<CatagItem 
							data={item} 
							clickItem={()=>{
								this.props.navigation.navigate('CatagDetail', {item: item});
							}}/>
					);
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
		height: 10,
		backgroundColor: '#f5f6fa',
	}
});