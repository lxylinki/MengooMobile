import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import RegularBtn from '../../button/RegularBtn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class CommentTitle extends Component {
	render(){
		return(
			<View style={styles.rootView}>
				<View style={styles.scoreView}>
					<Text style={styles.scoreTitle}>课程评价</Text>
					<View style={styles.scoreLine}>
						<Text style={styles.ratingTitle}>{Number(this.props.score).toFixed(1)}</Text>
						<Text style={styles.ratingUnit}>{'分'}</Text>
						<View style={styles.ratingStars}>
							<View style={styles.ratingBg}>
								<FontAwesome name={'star'} style={styles.star} size={15} color={'#ddd'}/>
								<FontAwesome name={'star'} style={styles.star} size={15} color={'#ddd'}/>
								<FontAwesome name={'star'} style={styles.star} size={15} color={'#ddd'}/>
								<FontAwesome name={'star'} style={styles.star} size={15} color={'#ddd'}/>
								<FontAwesome name={'star'} style={styles.star} size={15} color={'#ddd'}/>
							</View>	
							<View style={[styles.rating, {width: Number(this.props.score)/5*81}]}>
								<FontAwesome name={'star'} style={styles.star} size={15} color={'#ffd161'}/>
								<FontAwesome name={'star'} style={styles.star} size={15} color={'#ffd161'}/>
								<FontAwesome name={'star'} style={styles.star} size={15} color={'#ffd161'}/>
								<FontAwesome name={'star'} style={styles.star} size={15} color={'#ffd161'}/>
								<FontAwesome name={'star'} style={styles.star} size={15} color={'#ffd161'}/>
							</View>
						</View>
					</View>	
				</View>			
							
				<View style={styles.btnView}>
					<RegularBtn 
						style={styles.submitBtn} 
						textStyle={styles.submitBtnText}
						text={'发表评价'}
						if_active={true}
						action={()=>{
							//console.log(this.props.courseId);
							this.props.navigation.navigate('PubComment', {id: this.props.courseId});
						}}
						/>
				</View>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		flexDirection: 'row',
		padding: 10,
	},

	scoreTitle: {
		fontSize: 18,
		fontWeight: 'bold'
	},

	scoreLine: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 30
	},

	scoreView: {
		flex: 2
	},

	btnView: {
		flex: 1,
		height: 100,
	},

	submitBtn: {
		width: 100,
		height: 34,
		position: 'absolute',
		bottom: 15,
		right: 0
	},

	submitBtnText: {
		fontSize: 16
	},

	star: {
		margin: 1
	},

	rating: {
		flexDirection: 'row',
		overflow: 'hidden',
		position: 'absolute',
		left: 50,
		top: -5
	},

	ratingTitle: {
		color: '#3296fa',
		position: 'absolute',
		fontWeight: 'bold',
		fontSize: 24,
		bottom: -15,
		textAlign: 'right'
	},

	ratingUnit: {
		color: '#3296fa',
		position: 'absolute',
		left: 35,
		fontWeight: 'bold',
		fontSize: 16
	},

	ratingStars: {
		marginLeft: 10
	},

	ratingBg: {
		flexDirection: 'row',
		position: 'absolute',
		left: 50,
		top: -5
	},
});