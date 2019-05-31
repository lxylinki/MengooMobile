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
import Utils from '../../common/Utils';


const texts = ['很失望', '比较失望', '一般', '还不错，有待提高', '很棒'];

export default class EditComment extends Component {
	constructor(props){
		super(props);
		this.data = this.props.navigation.getParam('data', null);
		this.state = {
			text: texts[this.data.score-1],
			score: this.data.score,
			content: this.data.content
		}
		this.utils = new Utils();
	}

	readyToSubmit(){
		return (this.state.score>0 && this.state.content.length>=5);
	}

	render(){
		//console.log(this.data);
		return(
			<View style={styles.rootView}>
				<CommentHeader
					navigation={this.props.navigation} 
					style={styles.headerView} 
					title={'撰写评价'}/>
				<View style={styles.ratingView}>
					<View style={styles.rating}>
						<TouchableOpacity onPress={()=>{this.setState({score: 1, text: '很失望'})}}>
							<FontAwesome name={'star'} style={styles.star} size={25} color={ this.state.score>0? '#ffd161': '#ddd'}/>	
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{this.setState({score: 2, text: '比较失望'})}}>
							<FontAwesome name={'star'} style={styles.star} size={25} color={ this.state.score>1? '#ffd161': '#ddd'}/>
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{this.setState({score: 3, text: '一般'})}}>
							<FontAwesome name={'star'} style={styles.star} size={25} color={ this.state.score>2? '#ffd161': '#ddd'}/>
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{this.setState({score: 4, text: '还不错，有待提高'})}}>
							<FontAwesome name={'star'} style={styles.star} size={25} color={ this.state.score>3? '#ffd161': '#ddd'}/>
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{this.setState({score: 5, text: '很棒'})}}>
							<FontAwesome name={'star'} style={styles.star} size={25} color={ this.state.score>4? '#ffd161': '#ddd'}/>
						</TouchableOpacity>
					</View>	
					<Text style={styles.text}>{this.state.score === 0? '点击星星进行评分': this.state.text}</Text>
					<View style={styles.contentView}>
						<TextInput 
							style={styles.content}
							multiline={true}
							value={this.state.content}
							onChangeText={(text)=>{
								this.setState({
									content: text
								});
							}} 
							placeholder={'评价内容 (不少于5个字)'}/>
					</View>
				</View>
				<View style={styles.btnView}>
					<RegularBtn 
						disabled={!this.readyToSubmit()}
						style={this.readyToSubmit()? styles.btn: styles.inactiveBtn}
						text={'提交评价'}
						action={()=>{
							let data = {
								content: this.state.content,
								course_id: this.data.course_id,
								score: this.state.score
							}
							//console.log(data);
							this.utils.updateComment(data, (resp)=>{
								//console.log(resp);
								this.props.navigation.goBack();
							});
						}}/>
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
		height: 500,
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
		backgroundColor: '#f7f7f7',
		textAlignVertical: 'top'
	},

	btnView: {
		flex:1,
		alignItems: 'center',
		justifyContent: 'center'
	},

	btn: {
		width: 380
	},

	inactiveBtn: {
		backgroundColor: '#ddd'
	}
});