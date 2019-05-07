import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Placeholder, { Line, Media } from "rn-placeholder";


export default class FakeList extends Component {
	render(){
		return (
			<View style={this.props.style}>
				<Placeholder
					animation="fade"
					renderLeft={() => <Media style={styles.circle}/>}
					renderRight={() => <Media style={styles.square}/>}
				>
					<Line style={styles.upperLine} width="70%" />
					<Line style={styles.bottomLine} width="30%" />
				</Placeholder>

				<Placeholder
					animation="fade"
					renderLeft={() => <Media style={styles.circle}/>}
					renderRight={() => <Media style={styles.square}/>}
				>
					<Line style={styles.upperLine} width="70%" />
					<Line style={styles.bottomLine} width="30%" />
				</Placeholder>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	circle: {
		width: 80,
		height: 80,
		borderRadius: 40,
		margin: 10,
		//backgroundColor: '#ddd'
	},

	square: {
		//backgroundColor: '#ddd',
		top: 40,
		margin: 10
	},

	upperLine: {
		//backgroundColor: '#ddd',
		marginTop: 20
	},

	bottomLine: {
		//backgroundColor: '#ddd',
		top: 30
	}
});
