import {CUSTOMER} from '../constants/CUSTOMER';

export function clear(payload){
  return {type: CUSTOMER.CUSTOMER_CLEAR_FORM};
}

export function typing(payload){
  return {type: CUSTOMER.CUSTOMER_TYPING, payload: payload};
}

export function load(payload={}) {
	return async function(dispatch) {

		let url = '/CUSTOMER';
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
				dispatch({type:CUSTOMER.CUSTOMER_LOAD, payload:response.data});
			} else {
				dispatch({type:CUSTOMER.CUSTOMER_LOAD_ALL, payload:response.data});
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

		dispatch({type:CUSTOMER.CUSTOMER_SAVE_REQUEST});
		let postData = getState().CUSTOMER.CUSTOMER;

		let url = '/CUSTOMER';
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
			dispatch({type:CUSTOMER.CUSTOMER_SAVE_SUCCESS, payload:response.data});
			return true;
		}
		catch(error) {
			dispatch({type:CUSTOMER.CUSTOMER_SAVE_ERROR, payload:error.response.data.errors});
			return false;
		}
	}
}

export function remove(id) {
	return async function(dispatch) {
		try {
			await global.axios({
				method: 'delete',
				url: '/CUSTOMER',
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
