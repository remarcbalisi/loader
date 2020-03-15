import {combineReducers} from 'redux';
import Account from './account';
import Customer from './customer';
import CustomerNumber from './customer_number';

const rootReducer = combineReducers({
	Account,
	Customer,
	CustomerNumber,
});

export default (state, action) => (
	action.type === 'LOGOUT'
			? rootReducer(undefined, action)
			: rootReducer(state, action)
)
