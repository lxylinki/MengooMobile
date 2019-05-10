import {SET_VAL} from './Actions';

export const save = (state={}, action) =>{
	switch(action.type) {
		case SET_VAL:
			return action.value;
		default:
			return state;
	}
}