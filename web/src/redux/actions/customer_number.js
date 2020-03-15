import {CUSTOMER_NUMBER} from '../constants/customer_number';

export function clear(){
  return {type: CUSTOMER_NUMBER.CUSTOMER_NUMBER_CLEAR_FORM};
}

export function typing(payload){
  return {type: CUSTOMER_NUMBER.CUSTOMER_NUMBER_TYPING, payload: payload};
}

export function load(payload={}) {
	return async function(dispatch, getState) {

		let url = `/v1/admin/user-number`;
		let id = payload.hasOwnProperty('id') ? payload.id : null;
		if(id) {
			url += `/${id}`
		}
		url += `?user_id=${getState().Customer.customer.id}`;

		try {
			let response = await global.axios({
				method: "get",
				url: url,
			});
			let data = response.data.data;
			console.log(data);
			let type = id ? CUSTOMER_NUMBER.CUSTOMER_NUMBER_LOAD : CUSTOMER_NUMBER.CUSTOMER_NUMBER_LOAD_ALL;
			dispatch({type: type, payload: data});
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

		dispatch({type:CUSTOMER_NUMBER.CUSTOMER_NUMBER_SAVE_REQUEST});
		let postData = getState().CustomerNumber.number;
		delete postData.user;
		delete postData.created_at;
		delete postData.updated_at;
		postData.user_id = getState().Customer.customer.id;

		let url = '/v1/admin/user-number';
		if(postData.id) {
			url += `/${postData.id}`;
			postData['_method'] = 'put';
		}

		try {
			let response = await global.axios({
				method: 'post',
				url: url,
				data: postData,
			});
			dispatch({type:CUSTOMER_NUMBER.CUSTOMER_NUMBER_SAVE_SUCCESS, payload:response.data.data});
			return true;
		}
		catch(error) {
			dispatch({type:CUSTOMER_NUMBER.CUSTOMER_NUMBER_SAVE_ERROR, payload:error.response.data.errors});
			return false;
		}
	}
}

export function remove(id) {
	return async function() {
		try {
			await global.axios({
				method: 'delete',
				url: `/v1/admin/user-number/${id}`,
			});
			return true;
		}
		catch(error) {
			console.log(error);
			return false;
		}
	}
}
