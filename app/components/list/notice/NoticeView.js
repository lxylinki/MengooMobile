import React, {PureComponent} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Dimensions,
	FlatList
} from 'react-native';

import NoticeItem from './NoticeItem';
import Utils from '../../../common/Utils';

var {height, width} = Dimensions.get('window');

export default class NoticeView extends PureComponent {
	constructor(props){
		super(props);
		this.page = 1;
		this.pageSize = 5;
		this.totalPage = 0;
		this.utils = new Utils();
		this.state = {
			refreshing: false,
			notices: []
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
		this.getNoticeData();
	}

	getNoticeData(){
		this.utils.getNotice(this.props.courseId, this.page, this.pageSize, (resp)=>{
            //console.log('getNoticeData', resp);
            if(this.totalPage === 0 && resp.total_page > 0) {
                this.totalPage = resp.total_page;
            }

            if(this.page === 1) {
				this.setState({
					notices: resp._list
				});
            } else {
                this.setState({
                    notices: this.state.notices.concat(resp._list),
                });               	
            }

            this.props.setHeight(this.state.notices.length*70);

            if(this.stopRefresh) {
                this.stopRefresh();
            }
		});
	}

	onRefresh(callback){
        this.page = 1;
        this.stopRefresh = callback;
        this.getNoticeData();
	}

	render(){
		let key = 0;
		this.state.notices.forEach(function(item){item.key = String(key++);});
		return(
			<FlatList
				style={styles.list}
				data={this.state.notices}
				renderItem = {({item})=>{
					return(
						<NoticeItem 
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
	                if(this.state.notices.length>=this.pageSize) {
	                    if(this.page < this.totalPage) {
	                        this.page += 1;                                     
	                        this.getNoticeData();
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
		width: width,
	},

	separatorLine: {
		height: 0.3,
		backgroundColor: '#ddd',
	}
});