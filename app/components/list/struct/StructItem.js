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

import global_ from '../../common/Global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Utils from '../../common/Utils';
import SectionView from './SectionView';


export default class StructItem extends PureComponent {
	constructor(props){
		super(props);
		let _this = this;
		this.state = {
			showToggle: 0,
			secData: []
		}
		this.spinValue = new Animated.Value(0);
		this.utils = new Utils();
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

	componentWillMount(){
        this.angle = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'] 
        });

        this.secHeight = this.spinValue.interpolate({
        	inputRange: [0, 1],
        	outputRange: [0, 200]
        })
	}

	componentDidMount(){
		this.getSectionData();
	}

    getSectionData(){
        this.utils.getCourseSectionList(this.props.courseId, this.props.data.id, this.page, this.pageSize, (resp)=>{
        	console.log(resp);
            if(this.totalPage === 0 && resp.total_page > 0) {
                this.totalPage = resp.total_page;
            }

            if(this.page === 1) {
                this.setState({
                    secData: resp._list
                });
            } else {
                this.setState({
                    secData: this.state.secData.concat(resp._list)
                });            
            }            
        });
    }

	render(){
		return(
			<View style={styles.rootView}>
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

				<Animated.View style={{height: this.secHeight}}>
					<SectionView data={this.state.secData}/>
				</Animated.View>
			</View>
		);
	}
}

let styles = StyleSheet.create({
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