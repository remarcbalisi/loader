import Account from './account';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
	Account,
});

export default (state, action) => (
	action.type === 'LOGOUT'
			? rootReducer(undefined, action)
			: rootReducer(state, action)
)
