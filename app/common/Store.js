import {createStore} from 'redux';
import { save } from './Reducers';

export const store = createStore(save, {});