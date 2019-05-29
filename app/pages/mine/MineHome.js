import React, {Component} from 'react';
import {
	StyleSheet, 
	Button, 
	View, 
	Text,
	Dimensions,
	Image,
	TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import global_ from '../../common/Global';
import AntDesign from 'react-native-vector-icons/AntDesign';

var {height, width} = Dimensions.get('window');

class MineHome extends Component {

	getAvatarUrl(avatarUrl, size=100){
		return avatarUrl ? global_.url_prefix + avatarUrl.replace(/\.jpg/, size + ".jpg").replace(/\.png/, size + ".png"): null;
	}
	render(){
		let avatar = this.getAvatarUrl(this.props.avatar);
		return(
			<View style={styles.rootView}>
				<View style={styles.headerView}>
					<Image 
						style={styles.headerImage} 
						resizeMode='contain' 
						source={require('../../../assets/img/mine-header-bg.png')}/>

					<View style={styles.imageView}>
						<Image 
							style={styles.image} 
							resizeMode='cover' 
							source={ avatar? {uri: avatar} : require('../../../assets/img/user-avatar.png')}/>
					</View>	
					<View style={styles.infoView}>
						<Text style={styles.nameText}>{this.props.realname}</Text>
						<TouchableOpacity
							style={styles.infoBtn}>
							<Text style={styles.infoBtnText}>{'个人信息'}</Text>
							<AntDesign
								style={styles.rightIcon} 
								size={10}
								color={'white'}
								name={'right'}/>
						</TouchableOpacity>
					</View>


				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	user_id: state.user_id,
	avatar: state.avatar,
	realname: state.realname
});

export default connect(mapStateToProps)(MineHome);

let styles = StyleSheet.create({
	rootView: { 
		flex: 1, 
		alignItems: 'center', 
		//justifyContent: 'center'
	},

	headerImage: {
		position: 'absolute',
		width: width,
		top: 65
	},

	headerView: {
		width: width,
		height: 160,
		backgroundColor: '#c9151e',
		flexDirection: 'row',
		overflow: 'hidden'
	},

	imageView: {
		justifyContent: 'center'
	},

	image:{
		width: 60,
		height: 60,
		borderRadius: 30,
		margin: 10,
		borderWidth:1,
		borderColor: 'white'
	},

	infoView: {
		justifyContent: 'center',
	},

	infoBtn: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	infoBtnText: {
		color: 'white',
		fontSize: 14
	},
	nameText: {
		fontSize: 18,
		color: 'white',
		bottom: 10
	}
});