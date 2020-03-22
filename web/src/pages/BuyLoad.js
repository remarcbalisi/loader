import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {clear, typing, save} from '../redux/actions/sale';
import {load as loadAccount} from '../redux/actions/account';
import {load as loadCustomers} from '../redux/actions/customer';
import {makeStyles} from '@material-ui/core/styles';
import {
	Grid,
	Button,
	TextField
} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import SnackbarSuccess from '../components/SnackbarSuccess';
import FormErrors from '../components/FormErrors';
import {isObjEmpty} from '../helpers/Functions';

const useStyles = makeStyles(theme => ({
	title: {
		color: '#585555',
		fontWeight: '600',
	},
	gridLabel: {
		margin: 'auto 0',
	}
}));

const BuyLoad = () => {

	const classes = useStyles();
	const dispatch = useDispatch();
	const sale = useSelector(state => state.Sale.sale);
	const errors = useSelector(state => state.Sale.errors);
	const accounts = useSelector(state => state.Account.accounts);
	const customers = useSelector(state => state.Customer.customers);
	const [numbers, setNumbers] = useState([]);
	const [account, setAccount] = useState(null);
	const [customer, setCustomer] = useState(null);
	const [number, setNumber] = useState(null);

	useEffect(() => {
		dispatch(loadAccount());
		dispatch(loadCustomers());
	}, []);

	const onAccountChange = (event, account) => {
		setAccount(account);
		dispatch(typing({ account_id: account.id }))
	}

	const onCustomerChange = (event, customer) => {
		setNumber(null);
		setNumbers(customer.numbers)
		setCustomer(customer);
	}

	const onNumberChange = (event, number) => {
		setNumber(number);
		dispatch(typing({ user_number_id: number.id }));
	}

	const handleFieldChange = (event) => {
		dispatch(typing({ [event.target.name]: event.target.value }));
	}

	const handleSubmit = async () => {
		let success = await dispatch(save());
		if(success) {
			dispatch(clear());
			setAccount(null);
			setCustomer(null);
			setNumber(null);
			setMessage('Sale successfully saved.');
			handleOpenSnackbar();
		}
	}

	const [message, setMessage] = useState("");
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const handleOpenSnackbar = () => {
		setOpenSnackbar(true);
	}
	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
      return;
    }
		setOpenSnackbar(false);
	}

	return (
		<Grid container spacing={3}>
			<Grid item sm={6} xs={12}>
				<Grid container spacing={1} className="mt-2">
					{!isObjEmpty(errors) && (
						<Grid item xs={12}>
							<FormErrors errors={errors} />
						</Grid>
					)}
					{openSnackbar && (
						<SnackbarSuccess
							message={message}
							handleClose={() => handleCloseSnackbar()}
						/>
					)}
					<Grid item xs={2} className={classes.gridLabel}>Account:</Grid>
					<Grid item xs={10}>
						<Autocomplete
							disableClearable
							value={account}
							options={accounts}
							getOptionLabel={option => `${option.name} | ${option.number}`}
							onChange={onAccountChange}
							renderInput={params => (
								<TextField
									{...params}
									fullWidth
									variant="outlined"
									margin="dense"
									error={errors.hasOwnProperty('account_id')}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={2} className={classes.gridLabel}>Customer:</Grid>
					<Grid item xs={10}>
						<Autocomplete
							disableClearable
							value={customer}
							options={customers}
							getOptionLabel={option => option.name}
							onChange={onCustomerChange}
							renderInput={params => (
								<TextField
									{...params}
									fullWidth
									variant="outlined"
									margin="dense"
								/>
							)}
						/>
					</Grid>
					<Grid item xs={2} className={classes.gridLabel}>Number:</Grid>
					<Grid item xs={10}>
						<Autocomplete
							disableClearable
							value = {number}
							options={numbers}
							getOptionLabel={option => `${option.number} | ${option.network}`}
							onChange={onNumberChange}
							renderInput={params => (
								<TextField
									{...params}
									fullWidth
									variant="outlined"
									margin="dense"
									error={errors.hasOwnProperty('user_number_id')}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={2} className={classes.gridLabel}>Amount:</Grid>
					<Grid item xs={10}>
						<TextField
							fullWidth
							variant="outlined"
							margin="dense"
							type="number"
							name="amount"
							value={sale.amount}
							onChange={handleFieldChange}
							error={errors.hasOwnProperty('amount')}
						/>
					</Grid>
					{/* <Grid item xs={2} className={classes.gridLabel}>Payment:</Grid>
					<Grid item xs={10}>
						<TextField
							fullWidth
							variant="outlined"
							margin="dense"
							type="number"
							name="amount"
							value={sale.amount}
							onChange={handleFieldChange}
							error={errors.hasOwnProperty('amount')}
						/>
					</Grid> */}
					<Grid item xs={12} className="text-right">
						<Button variant="contained" color="primary" size="large" onClick={() => handleSubmit()}>
							Buy Load
						</Button>
					</Grid>
				</Grid>
			</Grid>
			<Grid item sm={6} xs={12}>
				{/* <Paper>
						History
				</Paper> */}
			</Grid>
		</Grid>
	)
}

export default BuyLoad;
