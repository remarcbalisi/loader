import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {load, save, remove} from '../redux/actions/customer_number';
import {Grid, Paper, Typography, Button} from '@material-ui/core';
import {AddCircle} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import TableComponent from '../components/table/TableComponent';
import {isObjEmpty} from '../helpers/Functions';
import PhoneNumberEditor from './PhoneNumberEditor';
import SnackbarSuccess from '../components/SnackbarSuccess';
import DialogConfirmDelete from '../components/DialogConfirmDelete';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: '12px',
	}
}));

const headCells = [
	{ id:'number', label:'Number'},
	{ id:'network', label:'Network'},
  { id:'status', label:'Status'},
  { id:'', label:'Action', align:'right', sortable:false, searchable:false, width: 150},
];

const PhoneNumbers = (props) => {

	const classes = useStyles();
	const dispatch = useDispatch();
	const numbers = useSelector(state => state.CustomerNumber.numbers);
	const [number, setNumber] = useState(null);

	useEffect(() => {
		async function fetchData() {
			await dispatch(load());
		}
		fetchData();
	}, [props.match.params.id]);

	const handleSave = async () => {
		let success = await dispatch(save());
		if(success) {
			dispatch(load());
			setMessage('Phone number successfully saved.');
			handleOpenSnackbar();
			toggleModal();
		}
	}

	const handleEdit = (number) => {
		dispatch(load({id: number.id}));
		toggleModal();
	}

	const confirmDelete = (number) => {
		setNumber(number);
		setOpenConfirmDelete(true);
	}

	const handleDelete = async () => {
		let success = await dispatch(remove(number.id));
		if(success) {
			dispatch(load());
			handleCloseConfirmDelete();
			setMessage('Phone number successfully deleted.');
			handleOpenSnackbar();
		}
	}

	const [editorOpen, setEditorOpen] = useState(false);
	const toggleModal = () => {
		setEditorOpen(!editorOpen);
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

	const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
	const handleCloseConfirmDelete = () => {
		setOpenConfirmDelete(false);
	}

	return (
		<Paper className={classes.paper}>
			<Grid container spacing={1}>
				<Grid item sm={6} xs={12}>
					<Typography variant="h6" component="h6">
						Phone Numbers
					</Typography>
				</Grid>
				<Grid item sm={6} xs={12} className="text-right">
					<Button variant="contained" color="primary" onClick={() => toggleModal()}>
						<AddCircle style={{fontSize: 16, marginRight: 5}}/>
						Add Number
					</Button>
				</Grid>
				<Grid item xs={12}>
					{openSnackbar && (
						<SnackbarSuccess
							message={message}
							handleClose={() => handleCloseSnackbar()}
						/>
					)}
					{editorOpen && (
						<PhoneNumberEditor
							toggleModal={() => toggleModal()}
							handleSave={() => handleSave()}
						/>
					)}
					{openConfirmDelete && (
						<DialogConfirmDelete
							title={<span>Are you sure?</span>}
							content={
								<span>
									Are you sure you want to delete <b>{number.number}</b>? This process cannot be undone.
								</span>
							}
							handleClose={() => handleCloseConfirmDelete()}
							handleYes={() => handleDelete()}
						/>
					)}
					{!isObjEmpty(numbers) && (
						<TableComponent
							data={numbers}
							headCells={headCells}
							filter={false}
							handleEdit={(number) => handleEdit(number)}
							handleDelete={(number) => confirmDelete(number)}
						/>
					)}
				</Grid>
			</Grid>
		</Paper>
	)
}
export default PhoneNumbers;
