import {ACCOUNT} from '../constants/account';

export function clear(payload){
  return {type: ACCOUNT.ACCOUNT_CLEAR_FORM};
}

export function typing(payload){
  return {type: ACCOUNT.ACCOUNT_TYPING, payload: payload};
}

export function load(payload={}) {
	return async function(dispatch) {

		let url = '/account';
		let id = payload.hasOwnProperty('id') ? payload.id : null;

		if(id) {
			url += `/${payload.id}`
		}

		try {
			let response = await global.axios({
				method: "get",
				url: url,
			});
			if(id) {
				dispatch({type:ACCOUNT.ACCOUNT_LOAD, payload:response.data});
			} else {
				dispatch({type:ACCOUNT.ACCOUNT_LOAD_ALL, payload:response.data});
			}
			return true;
		}
		catch(error) {
			console.log(error);
			return false;
		}
	}
}

export function save() {
	return async function(dispatch, getState) {

		dispatch({type:ACCOUNT.ACCOUNT_SAVE_REQUEST});
		let postData = getState().Account.account;

		let url = '/account';
		let method = 'post';

		if(postData.id) {
			url += `/${postData.id}`;
			postData['_method'] = 'put';
		}

		try {
			let response = await global.axios({
				method: method,
				url: url,
				data: postData,
			});
			dispatch({type:ACCOUNT.ACCOUNT_SAVE_SUCCESS, payload:response.data});
			return true;
		}
		catch(error) {
			dispatch({type:ACCOUNT.ACCOUNT_SAVE_ERROR, payload:error.response.data.errors});
			return false;
		}
	}
}

export function remove(id) {
	return async function(dispatch) {
		try {
			await global.axios({
				method: 'delete',
				url: '/account',
				data: {id:id},
			});
			return true;
		}
		catch(error) {
			console.log(error);
			return false;
		}
	}
}
