import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class SearchInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			smaller: false
		}
	}

	onFocusChange = () => {
	    this.props.navigation.navigate('CourseSearch');
	};	

	render(){
		return(
			<View style={[this.props.smaller?styles.smallInputView:styles.inputView, this.props.style]}>
				<AntDesign 
					style={[this.props.smaller?styles.smallIcon:styles.icon, this.state.text.length>0?{opacity: 0}:{}]} 
					name={'search1'} 
					size={20} 
					color={'#ddd'} />
				<TextInput 
					style={this.props.smaller?styles.smallInput:styles.input} 
					placeholder={this.props.placeholder}
					onChangeText={
						(text)=>{
							this.setState({text});
							//this.props.onChangeText(text);
						}
					}
					autoFocus={this.props.autoFocus}
					onFocus={this.onFocusChange}
					>
				</TextInput>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	inputView: {
		width: 380,
		height: 40,
		borderRadius: 25,
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10,
	},

	input: {
		flex: 1,
		textAlign: 'center'
	},

	icon: {
		left: 140
	},

	smallInputView: {
		width: 340,
		height: 40,
		borderRadius: 25,
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10,
	},

	smallInput: {
		flex: 1,
		textAlign: 'center'
	},

	smallIcon: {
		left: 120
	}
});