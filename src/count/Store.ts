import { createStore} from 'redux';
import reducer from './Reducer';

const initValues = {
    first:0,
    second:10,
    third:20
} 
const store createStore(reducer,initValues);

export default store;