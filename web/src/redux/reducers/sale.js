import {SALE} from '../constants/sale';

const initialState = {
	errors: {},
	sales: [],
  sale: {
		id: '',
		account_id: '',
		user_number_id: '',
		amount: '',
		date: new Date(),
	},
};

const Sale = (state = initialState, action) => {

	let newState = JSON.parse(JSON.stringify(state));
	let type = action.type;
	let payload = action.payload;

  switch(type) {

		case SALE.SALE_CLEAR_FORM : {
			newState.errors = {};
			newState.sale = {
				id: '',
				user_number_id: '',
				account_id: '',
				amount: '',
				date: new Date(),
			};
			return newState;
		}

		case SALE.SALE_LOAD_ALL : {
			newState.sales = payload;
			return newState;
		}

		case SALE.SALE_TYPING : {
      newState.errors = {};
			let key = Object.keys(payload)[0];
      newState.sale[key] = payload[key];
			return newState;
    }

		case SALE.SALE_SAVE_ERROR : {
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

export default Sale;
