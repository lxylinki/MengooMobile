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

	componentDidMount(){
		this.getExamData();
	}

	getExamData(){
		this.utils.getExam(this.props.courseId, this.page, this.pageSize, (resp)=>{
            //console.log('getNoticeData', resp);
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

            //this.props.setHeight(this.state.exams.length*100);

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
				data={this.props.data}
				renderItem = {({item})=>{
					return(
						<ExamDetailItem 
							navigation={this.props.navigation}
							data={item}/>
					);
				}}
				ItemSeparatorComponent = {()=>{
					return(<View style={styles.separatorLine}></View>);
				}}
				refreshing={this.state.refreshing} 
				onRefresh={(callback)=>{
	                this.page = 1;
	                this.stopRefresh = callback;
	                this.getExamData();}
                }
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