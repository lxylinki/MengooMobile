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


const iconColors = {
	'experiment': '#4095ff',
	'ppt': '#dc6583',
	'video': '#e7c903',
	'image': '#5bdf7d',
	'audio': '#e00060',
	'article': '#01c7e1',
	//'exam': '#00caba'
}

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
			//console.log(format);
			let iconName;
			switch(format) {
				case 'html':
					iconName = 'experiment';
					break;
				case 'presentation':
					iconName = 'ppt';
					break;
				case 'mp4':
					iconName = 'video';
					break;
				case 'jpg':
				case 'jpeg':
				case 'png':
				case 'gif':
					iconName = 'image';
					break;
				case 'mpeg':
					iconName = 'audio';
					break;
			}
			return iconName;
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
						//console.log(item);
						let type = this.fileType(item);
						//console.log(type);
						return(
							<TouchableOpacity onPress={()=>{
								console.log(type);
								switch(type) {
									case 'article':
										this.props.navigation.navigate('CourseArticle', {item: item});
										break;
									case 'video':
										this.props.navigation.navigate('CourseVideo', {item: item});
										break;
									case 'experiment':
										this.props.navigation.navigate('CourseExp', {item: item});
										break;
								}
							}}>
								<View style={styles.subText}>
									<View style={[styles.iconBg, {backgroundColor: iconColors[type]}]}>
										<Iconfont style={styles.icon} name={type} size={40} color={'white'}/>
									</View>
									<Text>{item.name}</Text>
								</View>
							</TouchableOpacity>
						);
					}}
					ItemSeparatorComponent = {()=>{
						return(<View style={styles.separatorLine}></View>);
					}}
					/>	
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
		height: 60,
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
		height: 60,
		flexDirection: 'row',
		alignItems: 'center'
	},

	iconBg: {
		padding: 0,
		width: 30,
		height: 30,
		borderRadius: 5,
		marginRight: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},

	icon: {
		position: 'absolute',
		left: -5,
	},
	separatorLine: {
		height: 0.3,
		backgroundColor: 'gray',
	}
});