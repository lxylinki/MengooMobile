import React, {PureComponent} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Dimensions,
	FlatList
} from 'react-native';

import ExamDetailItem from './ExamDetailItem';
import Utils from '../../../common/Utils';

var {height, width} = Dimensions.get('window');

export default class ExamView extends PureComponent {
	constructor(props){
		super(props);
		this.page = 1;
		this.pageSize = 5;
		this.totalPage = 0;
		this.utils = new Utils();
		this.state = {
			refreshing: false,
			exams: []
		}
	}

	refresh = ()=> {
		if(!this.state.refreshing) {
			this.setState({
				refreshing: true
			});

			this.onRefresh(()=>{
				this.setState({
					refreshing: false
				})
			});
		}
	};

	onRefresh(callback){
        this.page = 1;
        this.stopRefresh = callback;
        this.getExamData();
	}

	componentDidMount(){
		this.getExamData();
	}

	getExamData(){
		this.utils.getExam(this.props.courseId, this.page, this.pageSize, (resp)=>{
            //console.log('getExamData', resp);
            if(this.totalPage === 0 && resp.total_page > 0) {
                this.totalPage = resp.total_page;
            }

            if(this.page === 1) {
				this.setState({
					exams: resp._list
				});
            } else {
                this.setState({
                    exams: this.state.exams.concat(resp._list),
                });               	
            }

            this.props.setHeight(this.state.exams.length*230);

            if(this.stopRefresh) {
                this.stopRefresh();
            }
		});
	}	

	render(){
		let key = 0;
		this.state.exams.forEach(function(item){item.key = String(key++);});
		return(
			<FlatList
				style={styles.list}
				data={this.state.exams}
				renderItem = {({item})=>{
					return(
						<ExamDetailItem
							exam={this.props.exams[item.id]} 
							navigation={this.props.navigation}
							data={item}/>
					);
				}}
				ItemSeparatorComponent = {()=>{
					return(<View style={styles.separatorLine}></View>);
				}}
				refreshing={this.state.refreshing} 
				onRefresh={this.refresh}
				onEndReached={()=>{
	                //console.log('on end reached');
	                if(this.state.exams.length>=this.pageSize) {
	                    if(this.page < this.totalPage) {
	                        this.page += 1;                                     
	                        this.getExamData();
	                    }
	                }
				}}
				onEndReachedThreshold={0.5}
			/>
		);
	}	
}

let styles = StyleSheet.create({
	list: {
		width: width
	},

	separatorLine: {
		height: 0.3,
		backgroundColor: '#ddd',
	}
});