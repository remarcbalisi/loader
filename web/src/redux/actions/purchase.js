import {PURCHASE} from '../constants/purchase';

export function clear(payload){
  return {type: PURCHASE.PURCHASE_CLEAR_FORM};
}

export function typing(payload){
  return {type: PURCHASE.PURCHASE_TYPING, payload: payload};
}

export function load(payload={}) {
	return async function(dispatch) {

		let url = '/v1/admin/purchase';
		let id = (payload.hasOwnProperty('id') && payload.id ) ? payload.id : null;

		if(id) {
			url += `/${payload.id}`
		}

		try {
			let { data } = await global.axios({
				method: "get",
				url: url,
			});
			if(id) {
				dispatch({type: PURCHASE.PURCHASE_LOAD, payload: data});
			} else {
				dispatch({type: PURCHASE.PURCHASE_LOAD_ALL, payload: data});
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

		let postData = getState().Purchase.purchase;

		console.log(postData);

		let url = '/v1/admin/purchase';
		let method = 'post';

		if(postData.id) {
			url += `/${postData.id}`;
			postData['_method'] = 'put';
		}

		try {
			let { data } = await global.axios({
				method: method,
				url: url,
				data: postData,
			});
			dispatch({type: PURCHASE.PURCHASE_SAVE_SUCCESS, payload: data});
			return true;
		}
		catch(error) {
			console.log(error);
			dispatch({type:PURCHASE.PURCHASE_SAVE_ERROR, payload:error.response.data.errors});
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
