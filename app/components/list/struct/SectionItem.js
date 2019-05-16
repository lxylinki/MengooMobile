import React, {PureComponent} from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Image, 
	TouchableOpacity,
	FlatList
} from 'react-native';

export default class SectionItem extends PureComponent {
	constructor(props){
		super(props);
	}

	layout=(e)=>{
		if(this.props.content.length>0 && e.layout.height > 40) {
			this.props.addHeight(e.layout.height);
		}
	};

	render(){
		let key = 0;
		this.props.content.forEach(function(item){item.key = String(key++);});
		return(
			<View style={styles.rootView} onLayout={({nativeEvent:e})=>this.layout(e)}>
				<View style={styles.secItemBar}>
					<View style={styles.decor}></View>
					<Text style={styles.itemText}>{this.props.data.name}</Text>	
				</View>
					
				<FlatList 
					data={this.props.content} 
					renderItem={({item})=>{
						console.log(item.hasOwnProperty('resource')? item.resource.mime: 'Not Resource');
						return(
							<View style={styles.subText}>
								<Text>{'Subitem-' + item.name}</Text>
							</View>
						);
					}}/>	
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		justifyContent: 'center',
		padding: 10
	},

	secItemBar: {
		height: 40,
		alignItems: 'center',
		flexDirection: 'row'
	},

	decor: {
		width: 3,
		height: 20,
		backgroundColor: '#c9151e',
		marginRight: 10
	},

	itemText: {
		fontSize: 14
	},

	subText: {
		height: 40,
		justifyContent: 'center'
	}
});