import React, {Component} from 'react';
import {
	StyleSheet,
	View, 
	Text,
	TextInput,
	TouchableOpacity
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommentHeader from '../../components/head/CommentHeader';
import RegularBtn from '../../components/button/RegularBtn';



export default class PubComment extends Component {
	constructor(props){
		super(props);
		this.state = {
			text: '',
			score: 0,
			content: ''
		}
	}

	render(){
		return(
			<View style={styles.rootView}>
				<CommentHeader
					navigation={this.props.navigation} 
					style={styles.headerView} 
					title={'撰写评价'}/>
				<View style={styles.ratingView}>
					<View style={styles.rating}>
						<TouchableOpacity onPress={()=>{this.setState({score: 1, text: '很失望'})}}>
							<FontAwesome name={'star'} style={styles.star} size={25} color={ this.state.score>0? '#ff3c00': '#ddd'}/>	
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{this.setState({score: 2, text: '比较失望'})}}>
							<FontAwesome name={'star'} style={styles.star} size={25} color={ this.state.score>1? '#ff3c00': '#ddd'}/>
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{this.setState({score: 3, text: '一般'})}}>
							<FontAwesome name={'star'} style={styles.star} size={25} color={ this.state.score>2? '#ff3c00': '#ddd'}/>
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{this.setState({score: 4, text: '还不错，有待提高'})}}>
							<FontAwesome name={'star'} style={styles.star} size={25} color={ this.state.score>3? '#ff3c00': '#ddd'}/>
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{this.setState({score: 5, text: '很棒'})}}>
							<FontAwesome name={'star'} style={styles.star} size={25} color={ this.state.score>4? '#ff3c00': '#ddd'}/>
						</TouchableOpacity>
					</View>	
					<Text style={styles.text}>{this.state.score === 0? '点击星星进行评分': this.state.text}</Text>
					<View style={styles.contentView}>
						<TextInput style={styles.content} />
					</View>
				</View>
				<View style={styles.btnView}>
					{/*<RegularBtn />*/}
				</View>	
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		flex: 1
	},

	star: {
		margin: 10
	},

	ratingView: {
		flex: 1,
		alignItems: 'center',
	},

	rating: {
		flexDirection: 'row',
		marginTop: 50
	},

	headerView: {
		height: 70,
	},

	text: {
		fontSize: 16,
		marginTop: 20,
		marginBottom: 40
	},

	content: {
		width: 380,
		height: 300,
		backgroundColor: '#f7f7f7'
	}
});