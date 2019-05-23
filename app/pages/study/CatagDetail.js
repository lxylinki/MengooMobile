import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Dimensions
} from 'react-native';

import Utils from '../../common/Utils';
import LineBtn from '../../components/button/LineBtn';
import TitleHeader from '../../components/head/TitleHeader';
import CourseView from '../../components/list/course/CourseView';


var {height, width} = Dimensions.get('window');

export default class CatagDetail extends Component {
	constructor(props){
		super(props);
		this.utils = new Utils();
		this.item = this.props.navigation.getParam('item', null);

		this.page = 1;
		this.pageSize = 5;
		this.totalPage = 0;

		this.state = {
			subCatags: [],
			courseData: []
		}
	}

	componentDidMount(){
		this.getSubCatagList();
	}

	getSubCatagList(){
		this.utils.getCatagList(this.item.id, (resp)=>{
			this.setState({
				subCatags: resp
			}, this.fillCourseData);
		});
	}

	genCatagBtns(){
		let btns = [];
		btns.push(
			<LineBtn 
				key={0}
				style={styles.catagBtn} 
				textStyle={styles.catagBtnText}
				text={'全部'}
				if_active={true}
				action={()=>{
				}}
			/>
		);
		for(let i in this.state.subCatags) {
			let subCatag = this.state.subCatags[i];
			btns.push(
				<LineBtn 
					key={i+1}
					style={styles.catagBtn} 
					textStyle={styles.catagBtnText}
					text={subCatag.name}
					if_active={false}
					action={()=>{
					}}
				/>
			);
		}
		return btns;
	}


	getCourseData(index, callback) {
		let cid;
		if(index === 0) {
			cid = this.item.id;
		} else {
			cid = this.state.subCatags[index-1].id;
		}
		this.utils.getCatagCourseList(cid, this.page, this.pageSize, (resp)=>{
			callback(cid, resp);
		});
	}

	fillCourseData(){
		let arrs = [];
		if(this.state.subCatags.length > 0) {
			for(let i=0; i<=this.state.subCatags.length; i++) {
				this.getCourseData(i, (cid, resp)=>{
					arrs[i] = resp._list;
					this.setState({
						courseData: arrs
					});
				});
			}
		}
	}

	genListViews(){
		let views = [];
		if(this.state.courseData.length == this.state.subCatags.length + 1) {
			for(let i in this.state.courseData) {
				views.push(
					<CourseView 
						key={i}
						navigation={this.props.navigation}
						data={this.state.courseData[i]}
					/>
				);
			}
		}
		return views;
	}

	render(){
		return(
			<View style={styles.rootView}>
				<TitleHeader style={styles.headerView} title={this.item.name}/>
				
				<ScrollView horizontal={true}>
					{this.genCatagBtns()}
				</ScrollView>

				<ScrollView 
					horizontal={true}
					pagingEnabled={true}>
					{this.genListViews()}
				</ScrollView>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	headerView: {
		height: 70
	},

	catagBtn: {
        width: 120,
        height: 45,
        margin: 10
	},

	catagBtnText: {
		fontSize: 16
	}
});