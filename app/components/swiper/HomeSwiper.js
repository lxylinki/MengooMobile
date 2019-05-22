import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Alert,
	Dimensions
} from 'react-native';

import Swiper from 'react-native-swiper';

var {height, width} = Dimensions.get('window');

export default class HomeSwiper extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<Swiper 
				style={[styles.container, this.props.style]}
				paginationStyle={styles.pagination}
				dot={<View style={styles.regularDot} />}
				autoplay={true}
				autoplayTimeout={2}
				activeDot={<View style={styles.activeDot} />}
				>
				<View style={styles.slide}>
					<TouchableOpacity onPress={()=>{Alert.alert('pressed')}}>
						<Image resizeMode={'stretch'} style={styles.image} source={require('../../../assets/img/banner-1.png')} />
					</TouchableOpacity>
				</View>
				<View style={styles.slide}>
					<TouchableOpacity>
						<Image resizeMode={'stretch'} style={styles.image} source={require('../../../assets/img/banner-2.png')} />
					</TouchableOpacity>
				</View>
				<View style={styles.slide}>
					<TouchableOpacity>
						<Image resizeMode={'stretch'} style={styles.image} source={require('../../../assets/img/banner-3.png')} />
					</TouchableOpacity>
				</View>
			</Swiper>
		);
	}
}

let styles = StyleSheet.create({
	slide: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold',
	},

	pagination: {
		bottom: 5,
	},

	image: {
		width: width,
		flex: 1
	},

	regularDot: {
		backgroundColor: 'rgba(255,255,255,.5)', 
		width: 10, 
		height: 10, 
		borderRadius: 5, 
		marginLeft: 7, 
		marginRight: 7,
		marginBottom: 10
	},

	activeDot: {
		backgroundColor: '#fff', 
		width: 10, 
		height: 10, 
		borderRadius: 5, 
		marginLeft: 7, 
		marginRight: 7,
		marginBottom: 10
	}
});
