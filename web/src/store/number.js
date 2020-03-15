import React from 'react';
import globalHook from 'use-global-hook';

const initialState = {
  number: {
		id: '',
		user_id: '',
		number: '',
		network: '',
	},
};

const actions = {
  save: (store, data) => {
		console.log(data);
    // const newCounterValue = store.state.counter + amount;
    // store.setState({ counter: newCounterValue });
  },
};

const useGlobalNumber = globalHook(React, initialState, actions);

export default useGlobalNumber;
