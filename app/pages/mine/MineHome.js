import React, {Component} from 'react';
import {
	StyleSheet, 
	Button, 
	View, 
	Text,
	Dimensions,
	Image,
	TouchableOpacity,
	ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import global_ from '../../common/Global';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Iconfont from 'react-native-vector-icons/Iconfont';

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

					<View style={styles.creditView}>
						<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#fec532', '#fca130']} style={styles.creditBanner}>
							<Iconfont name={'credits'} size={30} color={'white'} />
							<Text style={styles.creditText}>{'学习积分'}</Text>
							<Text style={styles.creditText}>{'105'}</Text>
						</LinearGradient>
					</View>

				</View>

				<ScrollView>
					<View style={styles.studyView}>
						<View style={styles.studyTitle}>
							<View style={styles.decor}></View>
							<Text style={styles.studyTitleText}>{'我的学习'}</Text>	
						</View>
						<View style={styles.studyBtns}>
							<TouchableOpacity 
								style={styles.studyBtn}
								//onPress={()=>{this.props.navigation.navigate('MyCourse');}}
								>
								<Image resizeMode='stretch' style={styles.studyBtnIcon} source={require('../../../assets/img/my-course.png')}/>
								<Text style={styles.studyBtnText}>{'我的课程'}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.studyBtn}>
								<Image resizeMode='stretch' style={styles.studyBtnIcon} source={require('../../../assets/img/my-exam.png')}/>
								<Text style={styles.studyBtnText}>{'我的考试'}</Text>							
							</TouchableOpacity>		
							<TouchableOpacity style={styles.studyBtn}>
								<Image resizeMode='stretch' style={styles.studyBtnIcon} source={require('../../../assets/img/moral-stats.png')}/>
								<Text style={styles.studyBtnText}>{'德育统计'}</Text>							
							</TouchableOpacity>
							<TouchableOpacity style={styles.studyBtn}>
								<Image resizeMode='stretch' style={styles.studyBtnIcon} source={require('../../../assets/img/exp-report.png')}/>
								<Text style={styles.studyBtnText}>{'实验报告'}</Text>							
							</TouchableOpacity>
							<TouchableOpacity style={styles.studyBtn}>
								<Image resizeMode='stretch' style={styles.studyBtnIcon} source={require('../../../assets/img/my-discuss.png')}/>
								<Text style={styles.studyBtnText}>{'我的讨论'}</Text>							
							</TouchableOpacity>				
						</View>
					</View>

					<View style={styles.sysOpView}>
						<View style={styles.studyTitle}>
							<View style={styles.decor}></View>
							<Text style={styles.studyTitleText}>{'系统操作'}</Text>
						</View>		
						<View style={styles.sysOpBtns}>
							<TouchableOpacity style={styles.feedbackBtn}>
								<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#50a7dd', '#4fbbe9']} style={styles.sysOpBtnIcon}>
									<Iconfont name={'feedback'} size={35} color={'white'} />
								</LinearGradient>
								<Text style={styles.studyBtnText}>{'建议反馈'}</Text>		
							</TouchableOpacity>		
							<TouchableOpacity style={styles.usageBtn}>
								<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#3bcb51', '#4ddc60']} style={styles.sysOpBtnIcon}>
									<Iconfont name={'usage'} size={35} color={'white'} />
								</LinearGradient>
								<Text style={styles.studyBtnText}>{'使用手册'}</Text>		
							</TouchableOpacity>			
						</View>
					</View>
				</ScrollView>
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
		backgroundColor: '#f5f6fa',
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
	},

	creditView: {
		flex: 1,
		flexDirection: 'row-reverse',
		alignItems: 'center',
	},

	creditBanner: {
		width: 140,
		height: 40,
		//backgroundColor: 'yellow',
		top: 40,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	},

	creditText: {
		color: 'white',
		fontSize: 16
	},

	studyView: {
		backgroundColor: 'white',
		width: width*0.95,
		margin: 10,
		padding: 10
	},
	studyTitle: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	decor: {
		width: 3,
		height: 20,
		backgroundColor: '#c9151e',
		marginRight: 10
	},
	studyTitleText: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	studyBtns: {
		flexDirection: 'row',
		marginTop: 30,
		flexWrap: 'wrap'
	},

	studyBtn: {
		alignItems: 'center',
		margin: 18,
	},
	studyBtnIcon: {
		width: 25,
		height: 25
	},

	studyBtnText: {
		fontSize: 14,
		marginTop: 10
	},

	sysOpView: {
		backgroundColor: 'white',
		width: width*0.95,
		height: 160,
		margin: 10,
		padding: 10
	},

	sysOpBtns: {
		flexDirection: 'row',
		marginTop: 30
	},

	sysOpBtnIcon: {
		width: 35,
		height: 35,
		borderRadius: 18,
		justifyContent: 'center',
		alignItems: 'center'
	},

	feedbackBtn: {
		alignItems: 'center',
		marginLeft: 10
	},

	usageBtn: {
		alignItems: 'center',
		marginLeft: 20	
	}
});