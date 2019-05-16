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


export default class ExamItem extends PureComponent {
	constructor(props){
		super(props);
		let _this = this;
		this.state = {
			showToggle: 1,
		}
		this.spinValue = new Animated.Value(this.state.showToggle);
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
        	outputRange: [0, 60]
        })
	}

	// layout=(e)=>{
	// 	console.log('ExamItem height:', e.layout.height, this.props.exam.exam_name);
	// 	this.props.addHeight(e.layout.height);
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

				<Animated.View style={{height: this.secHeight}}>
					<View style={styles.examName}>
						<Text>{this.props.exam.exam_name}</Text>
					</View>
				</Animated.View>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	barView: {
		height: 60,
		padding: 10,
		backgroundColor: '#ddd',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},

	text: {
		fontSize: 16
	},

	examName: {
		justifyContent: 'center',
		padding: 10
	}
});