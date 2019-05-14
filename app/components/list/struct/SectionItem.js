import React, {PureComponent} from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Image, 
	TouchableOpacity,
	Flatlist
} from 'react-native';

export default class SectionItem extends PureComponent {
	render(){
		return(
			<View style={styles.rootView}>
				<Text style={styles.text}>{this.props.data.name}</Text>
			{/*<Flatlist />*/}
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		height: 40,
		justifyContent: 'center',
		padding: 10
	},

	text: {
		fontSize: 14
	}
});