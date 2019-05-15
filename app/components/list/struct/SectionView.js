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
			refreshing: false,
		};
		this.height = 0;
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
		//console.log('SectionView:', this.props.data);
		let key = 0, itemCount = 0;
		this.height = 0;
		this.props.data.forEach(function(item){item.key = String(key++);});
		return (
			<FlatList
				style={[styles.list, {height: this.state.maxHeight}, this.props.style]}
				data = {this.props.data}
				renderItem = {({item})=>{
					return(
						<SectionItem
							addHeight={(itemHeight)=>{
								if(itemCount <= this.props.data.length) {
									this.height += itemHeight;
									itemCount += 1;
									if(itemCount === this.props.data.length) {
										this.props.setMaxHeight(this.height);
									}
									console.log(this.height, itemCount, this.props.data.length);
								}
							}}
							content={this.props.contentData[0][item.id]}
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
		width: width,
	},

	separatorLine: {
		height: 0.5,
		backgroundColor: 'gray',
	}	
});