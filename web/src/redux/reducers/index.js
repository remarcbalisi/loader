import {combineReducers} from 'redux';
import Account from './account';
import Customer from './customer';
import CustomerNumber from './customer_number';
import Purchase from './purchase';
import Sale from './sale';

const rootReducer = combineReducers({
	Account,
	Customer,
	CustomerNumber,
	Purchase,
	Sale,
});

export default (state, action) => (
	action.type === 'LOGOUT'
			? rootReducer(undefined, action)
			: rootReducer(state, action)
)
