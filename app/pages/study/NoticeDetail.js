import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class NoticeDetail extends Component {
	constructor(props) {
		super(props);
		this.content = this.props.navigation.getParam('content', '');
	}

	render(){
		return(
			<ScrollView style={styles.rootView}>
                <TouchableOpacity 
                    style={styles.backBtn}
                    onPress={()=>{this.props.navigation.navigate('CourseStruct')}}>
                    <AntDesign 
                        name={'leftcircle'}
                        size={30}
                        color={'#999'}/>
                </TouchableOpacity>
				<Text style={styles.contentText}>{this.content}</Text>
			</ScrollView>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		padding: 10,
	},
    
    backBtn: {
    	marginBottom: 10
    },

	contentText: {

	}
});