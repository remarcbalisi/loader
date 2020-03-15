import {CUSTOMER_NUMBER} from '../constants/customer_number';

const initialState = {
	errors: {},
	isProcessing: false,
	numbers: [],
  number: {
		id: '',
		number: '',
		network: '',
		status: 1,
	},
};

const CustomerNumber = (state = initialState, action) => {

	let newState = JSON.parse(JSON.stringify(state));
	let type = action.type;
	let payload = action.payload;

  switch(type) {

		case CUSTOMER_NUMBER.CUSTOMER_NUMBER_CLEAR_FORM : {
			newState.isProcessing = false;
			newState.errors = {};
			newState.number = {
				id: '',
				number: '',
				network: '',
				status: 1,
			};
			return newState;
		}

		case CUSTOMER_NUMBER.CUSTOMER_NUMBER_LOAD : {
			newState.number = payload;
			return newState;
		}

		case CUSTOMER_NUMBER.CUSTOMER_NUMBER_LOAD_ALL : {
			newState.numbers = payload;
			return newState;
		}

		case CUSTOMER_NUMBER.CUSTOMER_NUMBER_TYPING : {
      newState.errors = {};
			let key = Object.keys(payload)[0];
      newState.number[key] = payload[key];
			return newState;
    }

		case CUSTOMER_NUMBER.CUSTOMER_NUMBER_SAVE_REQUEST : {
			newState.isProcessing = true;
			newState.errors = {};
			return newState;
		}

		case CUSTOMER_NUMBER.CUSTOMER_NUMBER_SAVE_SUCCESS : {
			newState.errors = {};
			newState.isProcessing = false;
			newState.customer = payload;
			return newState;
		}

		case CUSTOMER_NUMBER.CUSTOMER_NUMBER_SAVE_ERROR : {
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

export default CustomerNumber;
