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
					<Text style={styles.itemText}>{this.props.data.name}</Text>	
				</View>
					
				<FlatList 
					data={this.props.content} 
					renderItem={({item})=>{
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
		backgroundColor: 'pink',
		justifyContent: 'center',
		padding: 10
	},

	secItemBar: {
		height: 40,
		backgroundColor: 'powderblue',
		justifyContent: 'center'
	},

	itemText: {
		fontSize: 14
	},

	subText: {
		height: 40,
		justifyContent: 'center'
	}
});