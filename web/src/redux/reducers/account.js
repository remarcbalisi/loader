import {ACCOUNT} from '../constants/account';

const initialState = {
	errors: {},
	success: false,
	isProcessing: false,
	accounts: [],
  account: {
		id: '',
		name: '',
		number: '',
		network: '',
		description: '',
	},
};

const Account = (state = initialState, action) => {

	let newState = JSON.parse(JSON.stringify(state));
	let type = action.type;
	let payload = action.payload;

  switch(type) {

		case ACCOUNT.ACCOUNT_CLEAR_FORM : {
			newState.isProcessing = false;
			newState.success = false;
			newState.errors = {};
			newState.account = {
				id: '',
				name: '',
				number: '',
				network: '',
				description: '',
			};
			return newState;
		}

		case ACCOUNT.ACCOUNT_LOAD : {
			newState.account = payload;
			return newState;
		}

		case ACCOUNT.ACCOUNT_LOAD_ALL : {
			newState.accounts = payload;
			return newState;
		}

		case ACCOUNT.ACCOUNT_TYPING : {
      newState.errors = {};
			let key = Object.keys(payload)[0];
      newState.account[key] = payload[key];
			return newState;
    }

		case ACCOUNT.ACCOUNT_SAVE_REQUEST : {
			newState.isProcessing = true;
			newState.success = false;
			newState.errors = {};
			return newState;
		}

		case ACCOUNT.ACCOUNT_SAVE_SUCCESS : {
			newState.success = true;
			newState.errors = {};
			newState.isProcessing = false;
			newState.account = payload;
			return newState;
		}

		case ACCOUNT.ACCOUNT_SAVE_ERROR : {
			newState.success = false;
			newState.isProcessing = false;

			let err = [];
			for (let i in payload) {
				err[i] = payload[i][0];
			}
			newState.errors = err;

			return newState;
		}

    default: return newState;
	}

}

export default Account;
