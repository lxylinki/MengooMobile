import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	Image,
	ScrollView
} from 'react-native';

var {height, width} = Dimensions.get('window');

import global_ from '../../common/Global';


export default class MultiChoice extends Component {
	constructor(props) {
		super(props);
		this.answer = null;
	}

	genOpts(){
		let opts = [], opt_names = ['A', 'B', 'C', 'D', 'E'];
		for(let i=0; i<opt_names.length; i++) {
			let opt_name = opt_names[i];
			opts.push(
	        	<TouchableOpacity 
	        		key={i}
	        		style={this.props.options[opt_name.toLowerCase() + '_txt'].length>0? (this.answer===opt_name?styles.optAnsView:styles.optView): {display: 'none'}}>
	        		<Text style={this.answer===opt_name?styles.optAnsText:styles.optText}>{opt_name + '. ' + this.props.options[opt_name.toLowerCase() + '_txt']}</Text>
	        		<Image 
	        			style={this.props.options[opt_name.toLowerCase() + '_img']? styles.optImg: {display: 'none'}} 
	        			resizeMode='contain' 
	        			source={{uri: global_.url_prefix + this.props.options[opt_name.toLowerCase() + '_img']}}/>
	        	</TouchableOpacity>
			);
		}
		return opts;
	}

	render(){
		this.answer = this.props.answer;
		return(
	        <View style={styles.rootView}>
	        	<ScrollView>
			        <View style={styles.quesView}>
			        	<Text style={styles.quesText}>{'[多选题] ' + this.props.question + ' (' + this.props.score + '分)'}</Text>
			        </View>
			        {this.genOpts()}
		        </ScrollView>       	
	        </View>	
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		flex: 1,
	},

	quesView: {
		margin: 10
	},

	quesText: {
		fontSize: 16,
		color: 'black'
	},

	optAnsView: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: '#e48a8e',
		borderRadius: 5,
		justifyContent: 'center',
		padding: 10
	},

	optView: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: '#f6fbff',
		borderRadius: 5,
		justifyContent: 'center',
		padding: 10
	},

	optAnsText:{
		fontSize: 14,
		color: 'white'
	},
	
	optText: {
		fontSize: 14
	},

	optImg: {
		width: 160,
		height: 100,
		borderRadius: 10
	}
});