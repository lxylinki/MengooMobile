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


	getCourseList(page, pageSize, dataProc){
		let api = global_.course_list
				+ '?page=' 
				+ page 
				+ '&pagesize=' 
				+ pageSize;

		let data = {
			status: [0, 1, 2, 4]
		};

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

	getCatagList(dataProc){
		let api = global_.course_catag_list;

		let data = {
			all: 1
		};

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
}