import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions
} from 'react-native';

var {height, width} = Dimensions.get('window');

export default class A1Temp extends Component {
	render(){
		return(
	        <View style={styles.rootView}>
		        <View style={styles.quesView}>
		        	<Text style={styles.quesText}>{'[A1题型] ' + this.props.question + ' (' + this.props.score + '分)'}</Text>
		        </View>
	        	
	        	<View style={this.props.options.a_txt.length>0? styles.optView: {display: 'none'}}>
	        		<Text style={styles.optText}>{'A. ' + this.props.options.a_txt}</Text>
	        	</View>

	        	<View style={this.props.options.b_txt.length>0? styles.optView: {display: 'none'}}>
	        		<Text style={styles.optText}>{'B. ' + this.props.options.b_txt}</Text>
	        	</View>
	        	
	        	<View style={this.props.options.c_txt.length>0? styles.optView: {display: 'none'}}>
	        		<Text style={styles.optText}>{'C. ' + this.props.options.c_txt}</Text>
	        	</View>
	        	
	        	<View style={this.props.options.d_txt.length>0? styles.optView: {display: 'none'}}>
	        		<Text style={styles.optText}>{'D. ' + this.props.options.d_txt}</Text>
	        	</View>
	        	
	        	<View style={this.props.options.e_txt.length>0? styles.optView: {display: 'none'}}>
	        		<Text style={styles.optText}>{'E. ' + this.props.options.e_txt}</Text>
	        	</View>
	        	
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
	
	optView: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10,
		height: 60,
		backgroundColor: '#f6fbff',
		borderRadius: 5,
		justifyContent: 'center',
		padding: 10
	},

	optText: {
		fontSize: 14
	}
});