import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Alert
} from 'react-native';

import Swiper from 'react-native-swiper';

export default class HomeSwiper extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<Swiper 
				style={styles.container}
				height={100}
				paginationStyle={styles.pagination}
				dot={<View style={styles.regularDot} />}
				autoplay={true}
				autoplayTimeout={2}
				activeDot={<View style={styles.activeDot} />}
				>
				<View style={styles.slide}>
					<TouchableOpacity onPress={()=>{Alert.alert('pressed')}}>
						<Image resizeMode='center' style={styles.image} source={require('../../../assets/img/1.jpg')} />
					</TouchableOpacity>
				</View>
				<View style={styles.slide}>
					<TouchableOpacity>
						<Image resizeMode='center' style={styles.image} source={require('../../../assets/img/2.jpg')} />
					</TouchableOpacity>
				</View>
				<View style={styles.slide}>
					<TouchableOpacity>
						<Image resizeMode='center' style={styles.image} source={require('../../../assets/img/3.jpg')} />
					</TouchableOpacity>
				</View>
				<View style={styles.slide}>
					<TouchableOpacity>
						<Image resizeMode='center' style={styles.image} source={require('../../../assets/img/4.jpg')} />
					</TouchableOpacity>
				</View>
				<View style={styles.slide}>
					<TouchableOpacity>
						<Image resizeMode='center' style={styles.image} source={require('../../../assets/img/5.jpg')} />
					</TouchableOpacity>
				</View>
			</Swiper>
		);
	}
}

let styles = StyleSheet.create({
	container: {
		height: 200
	},
	
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

	regularDot: {
		backgroundColor: 'rgba(255,255,255,.5)', 
		width: 10, 
		height: 10, 
		borderRadius: 5, 
		marginLeft: 7, 
		marginRight: 7
	},

	activeDot: {
		backgroundColor: '#fff', 
		width: 10, 
		height: 10, 
		borderRadius: 5, 
		marginLeft: 7, 
		marginRight: 7
	}
});
