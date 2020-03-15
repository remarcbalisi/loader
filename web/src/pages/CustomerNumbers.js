import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {load, clear, save, remove} from '../redux/actions/customer';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Dialog, DialogTitle as MuiDialogTitle, DialogContent as MuiDialogContent, DialogActions as MuiDialogActions, IconButton, Typography, Grid, TextField, InputLabel, MenuItem, FormControl, Select, Fab} from '@material-ui/core';
import {PeopleRounded, AddCircle, DeleteOutline} from '@material-ui/icons';
import CustomerEditor from './CustomerEditor';
import PageHeader from './PageHeader';
import SnackbarSuccess from '../components/SnackbarSuccess';
import DialogConfirmDelete from '../components/DialogConfirmDelete';
import TableComponent from '../components/table/TableComponent';
import {isObjEmpty} from '../helpers/Functions';

const useStyles = makeStyles(theme => ({
	button: {
		marginRight:'3px',
		fontSize:'18px'
	}
}));

const networks = [
	{id: 'globe', label: 'Globe'},
	{id: 'smart', label: 'Smart'},
	{id: 'sun', label: 'Sun'},
];

const CustomerNumbers = (props) => {

	const { phoneNumbers } = props;
	const classes = useStyles();

	useEffect(() => {
		let temp = phoneNumbers;
		temp.push({number: '', network: ''});
		setNumbers(temp);
	}, []);

	const [numbers, setNumbers] = useState([]);
	const [numElements, setNumElements] = useState([]);
	useEffect(() => {
		console.log('tabataba', numbers);
		let el = [];
		if(numbers && numbers.length > 0) {
			for(let i = 0; i <= numbers.length-1; i++) {

				el.push(

				);
			}
		}
		setNumElements(el);
	}, [numbers]);

	const handleNetworkChange = (event, i) => {
		let newNumbers = numbers;
		newNumbers[i].network = event.target.value;
		setNumbers(newNumbers);
	}

	const handleNumberChange = (event, i) => {
		let newNumbers = numbers;
		newNumbers[i].number = event.target.value;
		setNumbers(newNumbers);
	}

  return (
		<Grid container spacing={2}>
			{numbers && numbers.map((item, row) => {
				<Grid item xs={12} key={i}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<FormControl
							variant="outlined"
							fullWidth
							// error={errors.hasOwnProperty('network')}
						>
							<InputLabel>Network</InputLabel>
							<Select
								name="network[]"
								value={numbers[i].network}
								onChange={(event) => handleNetworkChange(event, i)}
								labelWidth={57}
							>
								{networks.map((item) => {
									return(
										<MenuItem key={item.id} value={item.id}>
											{item.label}
										</MenuItem>
									)
								})}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={7}>
						<TextField
							fullWidth
							variant="outlined"
							type="number"
							label="Phone Number"
							name="number[]"
							value={numbers[i].number}
							onChange={(event) => handleNumberChange(event, i)}
							// error={errors.hasOwnProperty('number')}
						/>
					</Grid>
					<Grid item xs={1}>
						{/* <Button variant="contained" color="primary" size="large">
							Remove
						</Button> */}
						<Fab color="secondary">
							{/* <Add /> */}
							<DeleteOutline />
						</Fab>
					</Grid>
				</Grid>
			</Grid>
			})}
		</Grid>
  );
}

export default CustomerNumbers;
