import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	Image,
    Animated
} from 'react-native';

import { connect } from 'react-redux';
import global_ from '../../common/Global';
import Entypo from 'react-native-vector-icons/Entypo';
import TitleHeader from '../../components/head/TitleHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';


var {height, width} = Dimensions.get('window');

class MyInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCover: false,
            bottomHeight: new Animated.Value(0)
        }
    }

    showBottomSelect = ()=> {
        Animated.timing(
            this.state.bottomHeight,
            {
                toValue: 200,
                duration: 500
            }
        ).start();        
    };

    hideBottomSelect= ()=> {
        Animated.timing(
            this.state.bottomHeight,
            {
                toValue: 0,
                duration: 500
            }
        ).start();          
    }

	getAvatarUrl(avatarUrl, size=100){
		return avatarUrl ? global_.url_prefix + avatarUrl.replace(/\.jpg/, size + ".jpg").replace(/\.png/, size + ".png"): null;
	}

	render(){
		let avatar = this.getAvatarUrl(this.props.avatar);
		return(
			<View style={styles.rootView}>
                {/*shade*/}
                <View style={this.state.showCover? styles.shade: {display: 'none'}}>
                </View>
                
                <Animated.View style={[styles.bottomSelect, {height: this.state.bottomHeight}]}>
                    <TouchableOpacity style={styles.albumBtn}>
                        <Text style={styles.btnText}>{'相册'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoBtn}>
                        <Text style={styles.btnText}>{'拍照'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.cancelBtn}
                        onPress={()=>{
                            this.setState({
                                showCover: false,
                                //bottomHeight: 200
                            });
                            this.hideBottomSelect();
                        }}>
                        <Text style={styles.btnText}>{'取消'}</Text>
                    </TouchableOpacity>
                </Animated.View>

				<TitleHeader 
					style={styles.headerView}
					textStyle={styles.headerText} 
					title={'我的信息'}/>
                <TouchableOpacity 
                    style={styles.backBtn}
                    onPress={()=>{this.props.navigation.goBack()}}>
                    <Entypo 
                        name={'chevron-thin-left'}
                        size={25}
                        color={'#c9151e'}/>
                </TouchableOpacity>

                <View style={styles.infoPanel}>
                	<View style={styles.avatarView}>
                		<Text style={styles.text}>{'头像'}</Text>
                		<TouchableOpacity 
                            style={styles.avatarBtn}
                            onPress={()=>{
                                this.setState({
                                    showCover: true,
                                    //bottomHeight: 200
                                });
                                this.showBottomSelect();
                            }}>
							<Image 
								style={styles.image} 
								resizeMode='cover' 
								source={ avatar? {uri: avatar} : require('../../../assets/img/user-avatar.png')}/>
							<AntDesign 
								size={15}
								name={'right'}/>
                		</TouchableOpacity>
                	</View>
                	<View style={styles.nameView}>
                		<Text style={styles.text}>{'姓名'}</Text>
                		<Text style={styles.text}>{this.props.realname}</Text>
                	</View>
                	<View style={styles.schoolView}>
                		<Text style={styles.text}>{'学校'}</Text>
                		<Text style={styles.text}>{this.props.school_name}</Text>
                	</View>
                </View>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	//user_id: state.user_id,
	avatar: state.avatar,
	realname: state.realname,
	school_name: state.school_name
});

export default connect(mapStateToProps)(MyInfo);

let styles = StyleSheet.create({
	rootView: {
		flex: 1,
		backgroundColor: '#f5f6fa'
	},

	headerView: {
		height: 70,
		backgroundColor: 'white'
	},

	headerText: {
		color: '#333'
	},

    backBtn: {
        position: 'absolute',
        top: 20,
        left: 15,
        zIndex: 10
    },

    infoPanel: {
    	marginTop: 20,
    	backgroundColor: 'white',
    	width: width,
    	height: height/2
    },

    avatarView: {
    	flexDirection: 'row',
    	justifyContent: 'space-between',
    	height: 70,
    	borderBottomWidth: 0.3,
    	borderBottomColor: '#ddd',
    	alignItems: 'center',
    	padding: 10
    },

    text: {
    	fontSize: 16,
    	marginRight: 20
    },

    nameView: {
    	flexDirection: 'row',
    	justifyContent: 'space-between',
    	height: 70,
    	borderBottomWidth: 0.3,
    	borderBottomColor: '#ddd',
    	alignItems: 'center',
    	padding: 10
    },

    schoolView: {
    	flexDirection: 'row',
    	justifyContent: 'space-between',
    	height: 70,
    	borderBottomWidth: 0.3,
    	borderBottomColor: '#ddd',
    	alignItems: 'center',
    	padding: 10    	
    },

	image:{
		width: 60,
		height: 60,
		borderRadius: 30,
		margin: 10,
		borderWidth:1,
		borderColor: 'white'
	},

	avatarBtn: {
		flexDirection: 'row',
		alignItems: 'center'
	},

    shade: {
        position:'absolute', 
        zIndex: 1000, 
        top:0, 
        left:0, 
        width:width, 
        height:height,
        backgroundColor:'#000000', 
        opacity: 0.3
    },

    bottomSelect: {
        position: 'absolute',
        zIndex: 2000,
        bottom: 0,
        left: 0,
        width: width,
        backgroundColor: 'transparent'
    },

    albumBtn: {
        width: width,
        height: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: '#ddd'
    },

    btnText: {
        fontSize: 16
    },

    photoBtn: {
        width: width,
        height: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    cancelBtn: {
        width: width,
        height: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
});