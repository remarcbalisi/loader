import {ACCOUNT} from '../constants/account';

const initialState = {
  error:'',
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

  switch(action.type) {

    case ACCOUNT.ACCOUNT_LOAD_ALL : {
			newState.accounts = action.payload;
			return newState;
    }

    default: return newState;
	}

}

export default Account;
