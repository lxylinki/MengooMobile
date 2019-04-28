import React, { Component } from 'react';
import RSAKey from '../../assets/js/rsa.min.js';
import Base from '../../assets/js/base64.js';
import global_ from './Global';

export default class Utils {
	encrypt(pswd) {
		console.log(pswd);
		return new Promise((resolve, reject)=>{
			let nonce, pk, ts, encrypt, epassword;
			var encryptapi = global_.mengoo_encrypt;
			fetch(
				encryptapi,
				{
					method: 'POST',
					body:JSON.stringify({})
				}
			).then((resp)=>{
				//console.log(resp.json());
				resolve(resp.json());
			});
		});
	}
}