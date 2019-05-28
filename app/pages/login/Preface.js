import React, {Component} from 'react';
import {
	StyleSheet,
	View, 
	Text,
	Image,
	Dimensions
} from 'react-native';

import Orientation from 'react-native-orientation';

var {height, width} = Dimensions.get('window');

export default class Preface extends Component {
    //加载计时器
    componentDidMount(){
    	Orientation.lockToPortrait();
        this.timer = setTimeout(()=>{
            this.props.navigation.navigate('LoginPage');
        }, 3000);
    }

    //卸载计时器
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

	render(){
		return(
			<View style={styles.rootView}>
				<Image resizeMode={'contain'} source={require('../../../assets/img/intro.png')} style={styles.image} />
				<Image resizeMode={'contain'} source={require('../../../assets/img/home.png')} style={styles.icon} />
				<Text style={styles.text}>{'上海交通大学医学院实验教学中心'}</Text>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		flex: 1,
		alignItems: 'center'
	},

	image: {
		width: width,
		position: 'absolute',
		top: -280
	},

	icon: {
		position: 'absolute',
		bottom: 100
	},

	text: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#999',
		position: 'absolute',
		bottom: 50
	}
});