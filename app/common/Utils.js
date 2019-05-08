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

	fetchRoutine(api, data, dataProc){
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
			
		).then((respJson)=>{
			dataProc(respJson);

		}).catch((err)=>{
			console.error(err);
		});
	}

	getCourseList(keyword, page, pageSize, dataProc){
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

		this.fetchRoutine(api, data, dataProc);
	}

	getCatagList(dataProc){
		let api = global_.course_catag_list;

		let data = {
			all: 1
		};
		this.fetchRoutine(api, data, dataProc);
	}

	getCourseView(id, dataProc){
		let api = global_.course_view;
		let data = {
			id: id
		}
		this.fetchRoutine(api, data, dataProc);
	}

	getCourseDetail(id, dataProc){
		let api = global_.course_detail;
		let data = {
			id: id
		}
		this.fetchRoutine(api, data, dataProc);
	}

	getCourseGroup(id, dataProc){
		let api = global_.course_group;
		let data = {
			course_id: id
		}
		this.fetchRoutine(api, data, dataProc);
	}

	getCommentList(id, page, pageSize, dataProc){
		let api = global_.comment_list
				+ '?page=' 
				+ page 
				+ '&pagesize=' 
				+ pageSize;

		let data = {
			course_id: id
		}
		this.fetchRoutine(api, data, dataProc);
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
		               + add0(d) + '日'
		               + add0(h) + ':' 
		               + add0(mn);	
		return commonTime;
	}
}