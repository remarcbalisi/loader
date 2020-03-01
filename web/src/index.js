import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import axios from 'axios';
import {CONFIG} from './config.js';
import App from './App';
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from './theme';
import './index.css';

global.axios = axios;
axios.defaults.baseURL = CONFIG.API_URL;

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
