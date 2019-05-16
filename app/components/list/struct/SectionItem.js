import React, {PureComponent} from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Image, 
	TouchableOpacity,
	FlatList
} from 'react-native';

import Iconfont from 'react-native-vector-icons/Iconfont';


export default class SectionItem extends PureComponent {
	constructor(props){
		super(props);
	}

	layout=(e)=>{
		if(this.props.content.length>0 && e.layout.height > 40) {
			this.props.addHeight(e.layout.height);
		}
	};


	fileType(item) {
		if(item.hasOwnProperty('resource')) {
			let format = item.resource.mime.split(/[^a-z0-9]+/g).pop();
			return format;
		} else {
			return 'article';
		}
	}


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
						console.log(item);
						console.log(this.fileType(item));
						return(
							<View style={styles.subText}>
								<View>
									<Iconfont name={'video'} size={30}/>
								</View>
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
		flexDirection: 'row',
		alignItems: 'center'
	}
});