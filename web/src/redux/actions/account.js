import {ACCOUNT} from '../constants/account';

export function typing(payload){
  return {type: ACCOUNT.ACCOUNT_TYPING, payload: payload}
}

export function loadAll() {
	return function(dispatch) {
		return global.axios({
      method: "get",
      url: '/account',
    })
		.then( ({ data }) => {
			dispatch({type:ACCOUNT.ACCOUNT_LOAD_ALL, payload:data});
		})
		.catch( function(error) {
			console.log(error);
		});
	}
}
