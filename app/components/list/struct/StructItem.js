import React, {PureComponent} from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Image, 
	TouchableOpacity,
	Animated,
	Easing
} from 'react-native';

import global_ from '../../../common/Global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Utils from '../../../common/Utils';
import SectionView from './SectionView';


export default class StructItem extends PureComponent {
	constructor(props){
		super(props);
		let _this = this;
		this.state = {
			showToggle: 1,
			secData: [],
			contentData: [],
			maxHeight: 0
		}
		this.spinValue = new Animated.Value(this.state.showToggle);
		this.utils = new Utils();
		this.angle = '0deg';
		this.maxHeight = 0;
		this.secHeight = 0;
	}


	spin = ()=> {
		Animated.timing(
			this.spinValue,
			{
				toValue: this.state.showToggle,
				duration: 500,
				easing: Easing.linear
			}
		).start();
	}


	componentDidMount(){
		this.getSectionData();
        this.angle = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'] 
        });
	}

    getSectionData(){
        this.utils.getCourseSectionList(this.props.courseId, this.props.data.id, this.page, this.pageSize, (resp)=>{
        	//console.log(resp);
            if(this.totalPage === 0 && resp.total_page > 0) {
                this.totalPage = resp.total_page;
            }

            if(this.page === 1) {
                this.setState({
                    secData: resp._list,
                    contentData: resp.contents
                });
            } else {
                this.setState({
                    secData: this.state.secData.concat(resp._list),
                    contentData: this.state.contentData.concat(resp.contents)
                });            
            }            
        });
    }

    // layout=(e)=>{
    // 	if(this.state.secData.length>0 && e.layout.height>60) {
    // 		console.log('StructItem height:', e.layout.height, this.props.data.name);
    // 		this.props.addHeight(e.layout.height);
    // 	}
    // };

	render(){
		return(
			<View 
				style={styles.rootView} 
				//onLayout={({nativeEvent:e})=>this.layout(e)}
				>
				<TouchableOpacity onPress={()=>{
						this.setState({
							showToggle: this.state.showToggle === 0? 1: 0
						}, this.spin);
					}}>

					<View style={styles.barView}>
						<Text style={styles.text}>{this.props.data.name}</Text>
						<Animated.View style={{transform:[{rotate: this.angle}]}}>
							<Ionicons name={'ios-arrow-down'} size={20}/>
						</Animated.View>
					</View>

				</TouchableOpacity>

				<Animated.View style={this.maxHeight>0?{height: this.secHeight}:{}}>
					<SectionView
						setMaxHeight={(maxHeight)=>{
							this.maxHeight = maxHeight;
							this.secHeight = this.spinValue.interpolate({
								inputRange: [0, 1],
								outputRange: [0, this.maxHeight]
							});
						}}
						contentData={this.state.contentData}
						data={this.state.secData}/>
				</Animated.View>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	rootView: {
		flex: 1
	},

	barView: {
		height: 60,
		padding: 10,
		backgroundColor: '#f5f6fa',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},

	text: {
		fontSize: 16
	}
});