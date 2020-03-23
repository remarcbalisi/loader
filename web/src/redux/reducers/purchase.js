import {PURCHASE} from '../constants/purchase';

const initialState = {
	errors: {},
	purchases: [],
  purchase: {
		id: '',
		account_id: '',
		amount: '',
		date: new Date(),
	},
};

const Purchase = (state = initialState, action) => {

	let newState = JSON.parse(JSON.stringify(state));
	let type = action.type;
	let payload = action.payload;

  switch(type) {

		case PURCHASE.PURCHASE_CLEAR_FORM : {
			newState.errors = {};
			newState.purchase = {
				id: '',
				account_id: '',
				amount: '',
				date: new Date(),
			};
			return newState;
		}

		case PURCHASE.PURCHASE_LOAD : {
			newState.purchase = payload;
			return newState;
		}

		case PURCHASE.PURCHASE_LOAD_ALL : {
			newState.purchases = payload;
			return newState;
		}

		case PURCHASE.PURCHASE_TYPING : {
      newState.errors = {};
			let key = Object.keys(payload)[0];
      newState.purchase[key] = payload[key];
			return newState;
    }

		case PURCHASE.PURCHASE_SAVE_SUCCESS : {
			newState.errors = {};
			newState.purchase = payload;
			return newState;
		}

		case PURCHASE.PURCHASE_SAVE_ERROR : {
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

export default Purchase;
