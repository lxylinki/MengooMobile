import React from 'react';
import {AsyncStorage} from 'react-native';

class Storage {
	static get(key) {
		return AsyncStorage.getItem(key).then((value)=>JSON.parse(value));
	}

	static save(key, value) {
		return AsyncStorage.setItem(key, JSON.stringify(value));
	}

	static update(key, value) {
		return this.get(key).then((item)=>{
			value = typeof value === 'string'? value: Object.assign({}, item, value);
			return AsyncStorage.setItem(key, JSON.stringify(value));
		})
	}

	static delete(key) {
		return AsyncStorage.removeItem(key);
	}

}

export default Storage;