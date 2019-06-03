import React, { Component } from 'react';
import RSAKey from '../../assets/js/rsa.min.js';
import Base from '../../assets/js/base64.js';
import global_ from './Global';

export default class Utils {
	getPk(pswd) {
		return new Promise((resolve, reject)=>{
			let nonce, pk, ts, encrypt, epassword;
			let encryptapi = global_.mengoo_encrypt;
			fetch(
				encryptapi,
				{
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({}),
					credentials:'include',
					mode: 'cors'
				}
			).then((resp)=>
				resp.json()
				//resp.text()
				
			).then((respJson)=>{
				resolve(respJson);
				//console.log(respJson);

			}).catch((err)=>{
				console.error(err);
			});
		});
	}

	encrypt(pswd) {
		return new Promise((resolve, reject)=>{
			asyncReq.call(this);
			async function asyncReq(){
				let nonce, pk, ts;
				let pkObj = await this.getPk(pswd);
				//console.log(pkObj);

				nonce = pkObj.nonce;
				pk = pkObj.pk;
				ts = pkObj.ts;

				let newEncrypter = new RSAKey();
				newEncrypter.setPublic(pk,"10001");
				epassword = Base.hex2b64(newEncrypter.encrypt(JSON.stringify([ts, nonce, pswd])));
				resolve(epassword);
			}
		});		
	}



	fetchRoutine(api, data, respProc){
		fetch(
			api,
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data),
				credentials:'include',
				mode: 'cors'
			}
		).then((resp)=>
			resp.json()
			//resp.text()
			
		).then((respJson)=>{
			respProc(respJson);
			//console.log(api, respJson);

		}).catch((err)=>{
			console.error(err);
		});
	}

	formDataFetchRoutine(api, data, respProc){
		fetch(
			api,
			{
				method: 'POST',
				headers: {
					'Accept': 'multipart/form-data',
					'Content-Type': 'multipart/form-data'
				},
				body: data,
				credentials:'include',
				mode: 'cors'
			}
		).then((resp)=>
			resp.json()
			
		).then((respJson)=>{
			respProc(respJson);

		}).catch((err)=>{
			console.error(err);
		});
	}


	getProfile(respProc){
		let api = global_.mengoo_status_check;
		this.fetchRoutine(api, {}, respProc);
	}


	getCourseList(keyword, page, pageSize, respProc){
		let api = global_.course_list
				+ '?page=' 
				+ page 
				+ '&pagesize=' 
				+ pageSize;

		let data = {
			search: {
				name: keyword
			},

			order: {
				learn_count: 'desc'
			}
		};

		this.fetchRoutine(api, data, respProc);
	}

	getCatagCourseList(cid, page, pageSize, respProc, cond=null){
		let api = global_.course_list
				+ '?page=' 
				+ page 
				+ '&pagesize=' 
				+ pageSize;
		let data = {
			cid: cid,
			order: {}
		};

		if(cond) {
			data.order[cond] = 'desc';
		}

		this.fetchRoutine(api, data, respProc);		
	}
	

	getCatagList(pid, respProc){
		let api = global_.course_catag_list;

		let data = {
			all: 1,
			pid: pid
		};
		this.fetchRoutine(api, data, respProc);
	}

	getCourseView(id, respProc){
		let api = global_.course_view;
		let data = {
			id: id
		};
		this.fetchRoutine(api, data, respProc);
	}

	getCourseDetail(id, respProc){
		let api = global_.course_detail;
		let data = {
			id: id
		};
		this.fetchRoutine(api, data, respProc);
	}

	getCourseGroup(id, respProc){
		let api = global_.course_group;
		let data = {
			course_id: id
		};
		this.fetchRoutine(api, data, respProc);
	}

	getCommentList(id, page, pageSize, respProc){
		let api = global_.comment_list
				+ '?page=' 
				+ page 
				+ '&pagesize=' 
				+ pageSize;

		let data = {
			course_id: id
		};
		this.fetchRoutine(api, data, respProc);
	}

	convTime(ntime) {
		function add0(m){
			return m<10?'0'+m:m 
		}
		// ntime * 1000 milliseconds
		var unixTime = new Date(ntime * 1000);
		
		var y = unixTime.getFullYear();
		var m = unixTime.getMonth()+1;
		var d = unixTime.getDate();
		var h = unixTime.getHours();
		var mn = unixTime.getMinutes();

		var commonTime = y + '-'
		               + add0(m) + '-'
		               + add0(d) + ' '
		               + add0(h) + ':' 
		               + add0(mn);
		return commonTime;
	}


	convTimeFull(ntime) {
		function add0(m){
			return m<10?'0'+m:m 
		}
		// ntime * 1000 milliseconds
		var unixTime = new Date(ntime * 1000);
		
		var y = unixTime.getFullYear();
		var m = unixTime.getMonth()+1;
		var d = unixTime.getDate();
		var h = unixTime.getHours();
		var mn = unixTime.getMinutes();

		var commonTime = y + '年'
		               + add0(m) + '月'
		               + add0(d) + '日 '
		               + add0(h) + ':' 
		               + add0(mn);	
		return commonTime;
	}

	createComment(data, respProc){
		let api = global_.comment_create;
		this.fetchRoutine(api, data, respProc);
	}

	updateComment(data, respProc){
		let api = global_.comment_update;
		this.fetchRoutine(api, data, respProc);
	}

	deleteComment(data, respProc){
		let api = global_.comment_delete;
		this.fetchRoutine(api, data, respProc);
	}

	getCourseStructList(id, page, pageSize, respProc){
		let api = global_.course_struct
				+ '?page=' 
				+ page 
				+ '&pagesize=' 
				+ pageSize;

		let data = {
			course_id: id
		};
		this.fetchRoutine(api, data, respProc);
	}

	getCourseSectionList(id, pid, page, pageSize, respProc){
		let api = global_.course_struct
				+ '?page=' 
				+ page 
				+ '&pagesize=' 
				+ pageSize;

		let data = {
			course_id: id,
			pid: pid
		};
		//console.log(data);
		this.fetchRoutine(api, data, respProc);
	}

	setStruct(id, respProc){
		let api = global_.course_struct_set;
		let data = {
			struct_id: id
		};
		this.fetchRoutine(api, data, respProc);
	}

	getArticle(id, respProc){
		let api = global_.course_get_text;
		let data = {
			id: id
		};
		this.fetchRoutine(api, data, respProc);
	}

	getNotice(id, page, pageSize, respProc){
		let api = global_.course_notice
				+ '?page=' 
				+ page 
				+ '&pagesize=' 
				+ pageSize;		
		let data = {
			course_id: id
		};
		this.fetchRoutine(api, data, respProc);
	}

	getMyCourseList(page, pageSize, respProc){
		let api = global_.my_course_list
				+ '?page=' 
				+ page 
				+ '&pagesize=' 
				+ pageSize;	

		this.fetchRoutine(api, {}, respProc);
	}

	getMyLearnList(page, pageSize, respProc) {
		let api = global_.my_learn_list
				+ '?page=' 
				+ page 
				+ '&pagesize=' 
				+ pageSize;	

		this.fetchRoutine(api, {}, respProc);
	}

	setAvatar(file, x, y, w, h, zoom, respProc){
		let api = global_.my_avatar;
		let data = new FormData();
		data.append("avatar", file);
		data.append("x", x);
		data.append("y", y);
		data.append("w", w),
		data.append("h", h);
		data.append("zoom", zoom);
		console.log(data);
		this.formDataFetchRoutine(api, data, respProc);
	}
}