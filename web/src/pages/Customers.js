import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {load, clear, save, remove} from '../redux/actions/customer';
import {makeStyles} from '@material-ui/core/styles';
import {Paper, Grid, Button} from '@material-ui/core';
import {PeopleRounded, AddCircle} from '@material-ui/icons';
import CustomerEditor from './CustomerEditor';
import PageHeader from './PageHeader';
import SnackbarSuccess from '../components/SnackbarSuccess';
import DialogConfirmDelete from '../components/DialogConfirmDelete';
import TableComponent from '../components/table/TableComponent';

const useStyles = makeStyles(theme => ({
	button: {
		marginRight:'3px',
		fontSize:'18px'
	}
}));

const headCells = [
	{ id:'name', label:'Name'},
	{ id:'role', label:'Type'},
  { id:'email', label:'Email'},
	{ id:'address', label:'Adress'},
	{ id:'created_at', label:'Date Created', type: 'date', align: 'center'},
  { id:'', label:'Action', align:'right', sortable:false, searchable:false, width: 150},
];

const Customers = (props) => {

	const {customers, load, save, clear, remove, history} = props;

	const classes = useStyles();
	const [message, setMessage] = useState('');
	const [customer, setCustomer] = useState({});

	useEffect(() => {
		load();
	}, []);

	const [openEditor, setOpenEditor] = useState(false);
	const toggleEditor = () => {
		setOpenEditor(!openEditor);
	}

	useEffect(() => {
		if(!openEditor) {
			clear();
		}
	}, [openEditor]);

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
	const handleOpenConfirmDelete = () => {
		setOpenConfirmDelete(true);
	}
	const handleCloseConfirmDelete = () => {
		setOpenConfirmDelete(false);
	}

	const handleSave = async () => {
		let success = await save();
		if(success) {
			toggleEditor();
			load();
			setMessage('Customer successfully saved.');
			handleOpenSnackbar();
		}
	}

	const handleView = (customer) => {
		history.push(`/customers/view/${customer.id}`);
	}

	const handleEdit = async (customer) => {
		await load({id: customer.id});
		toggleEditor();
	}

	const confirmDelete = (customer) => {
		setCustomer(customer);
		handleOpenConfirmDelete();
	}

	const handleDelete = async () => {
		let success = await remove(customer.id);
		if(success) {
			load();
			setMessage('Customer successfully deleted.');
			handleOpenSnackbar();
			handleCloseConfirmDelete();
		}
	}

  return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<Grid container>
					<Grid item xs={6}>
						<PageHeader title="Customers" icon={<PeopleRounded />} />
					</Grid>
					<Grid item xs={6} className="text-right">
						<Button variant="contained" color="primary" onClick={() => toggleEditor()}>
							<AddCircle className={classes.button} />
							Create New
						</Button>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Paper>
					{openConfirmDelete && (
						<DialogConfirmDelete
							title={<span>Are you sure?</span>}
							content={
								<span>
									Are you sure you want to delete <b>{customer.name}</b>? This process cannot be undone.
								</span>
							}
							handleClose={() => handleCloseConfirmDelete()}
							handleYes={() => handleDelete()}
						/>
					)}
					{openSnackbar && (
						<SnackbarSuccess
							message={message}
							handleClose={() => handleCloseSnackbar()}
						/>
					)}
					{openEditor && (
						<CustomerEditor
							handleClose={() => toggleEditor()}
							handleSave ={() => handleSave()}
						/>
					)}
					<TableComponent
						data={customers}
						headCells={headCells}
						handleEdit={(customer) => handleEdit(customer)}
						handleDelete={(customer) => confirmDelete(customer)}
						handleView={(customer) => handleView(customer)}
					/>
				</Paper>
			</Grid>
		</Grid>
  );
}

const mapStateToProps = state => ({
	customers: state.Customer.customers,
});

const mapDispatchToProps = {
	load: (payload) => load(payload),
	clear: () => clear(),
	save: () => save(),
	remove: (payload) => remove(payload),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Customers));
