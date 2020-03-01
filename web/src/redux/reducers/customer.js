import {CUSTOMER} from '../constants/CUSTOMER';

const initialState = {
	errors: {},
	success: false,
	isProcessing: false,
	customers: [],
  customer: {
		id: '',
		name: '',
		number: '',
		network: '',
		description: '',
	},
};

const CUSTOMER = (state = initialState, action) => {

	let newState = JSON.parse(JSON.stringify(state));
	let type = action.type;
	let payload = action.payload;

  switch(type) {

		case CUSTOMER.CUSTOMER_CLEAR_FORM : {
			newState.isProcessing = false;
			newState.success = false;
			newState.errors = {};
			newState.CUSTOMER = {
				id: '',
				name: '',
				number: '',
				network: '',
				description: '',
			};
			return newState;
		}

		case CUSTOMER.CUSTOMER_LOAD : {
			newState.CUSTOMER = payload;
			return newState;
		}

		case CUSTOMER.CUSTOMER_LOAD_ALL : {
			newState.CUSTOMERs = payload;
			return newState;
		}

		case CUSTOMER.CUSTOMER_TYPING : {
      newState.errors = {};
			let key = Object.keys(payload)[0];
      newState.CUSTOMER[key] = payload[key];
			return newState;
    }

		case CUSTOMER.CUSTOMER_SAVE_REQUEST : {
			newState.isProcessing = true;
			newState.success = false;
			newState.errors = {};
			return newState;
		}

		case CUSTOMER.CUSTOMER_SAVE_SUCCESS : {
			newState.success = true;
			newState.errors = {};
			newState.isProcessing = false;
			newState.CUSTOMER = payload;
			return newState;
		}

		case CUSTOMER.CUSTOMER_SAVE_ERROR : {
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

export default CUSTOMER;
