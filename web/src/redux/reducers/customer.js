import {CUSTOMER} from '../constants/customer';

const initialState = {
	errors: {},
	isProcessing: false,
	customers: [],
  customer: {
		id: '',
		name: '',
		email: '',
		address: '',
		role: '',
		number: '',
		network: '',
	},
};

const Customer = (state = initialState, action) => {

	let newState = JSON.parse(JSON.stringify(state));
	let type = action.type;
	let payload = action.payload;

  switch(type) {

		case CUSTOMER.CUSTOMER_CLEAR_FORM : {
			newState.isProcessing = false;
			newState.errors = {};
			newState.customer = {
				id: '',
				name: '',
				email: '',
				address: '',
				role: '',
				number: '',
				network: '',
			};
			return newState;
		}

		case CUSTOMER.CUSTOMER_LOAD : {
			newState.customer = payload;
			return newState;
		}

		case CUSTOMER.CUSTOMER_LOAD_ALL : {
			newState.customers = payload;
			return newState;
		}

		case CUSTOMER.CUSTOMER_TYPING : {
      newState.errors = {};
			let key = Object.keys(payload)[0];
      newState.customer[key] = payload[key];
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
			newState.customer = payload;
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

export default Customer;
