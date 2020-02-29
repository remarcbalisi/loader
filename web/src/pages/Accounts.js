import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {load, clear, save, remove} from '../redux/actions/account';
import {makeStyles} from '@material-ui/core/styles';
import {Paper, Grid, Button} from '@material-ui/core';
import {PeopleRounded, AddCircle} from '@material-ui/icons';
import AccountEditor from './AccountEditor';
import PageHeader from './PageHeader';
import SnackbarSuccess from '../components/SnackbarSuccess';
import DialogConfirmDelete from '../components/DialogConfirmDelete';
import TableComponent from '../components/table/TableComponent';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
	},
	odd: {
		backgroundColor: '#fff',
	},
	even: {
		backgroundColor: '#f1f1f1',
	},
	button: {
		marginRight:'3px',
		fontSize:'18px'
	}
}));

const headCells = [
  { id:'name', label:'Name'},
  { id:'number', label:'Number'},
  { id:'network', label:'Network'},
  { id:'description', label:'Description'},
  { id:'', label:'Action', align:'right', sortable:false, searchable:false, width: 150},
];

const Accounts = (props) => {

	const { accounts, load, save, clear } = props;

	const classes = useStyles();
	const [message, setMessage] = useState('');
	const [account, setAccount] = useState({});

	useEffect(() => {
		load();
	}, []);

	const [openEditor, setOpenEditor] = React.useState(false);
  const handleOpenEditor = () => {
    setOpenEditor(true);
  };
  const handleCloseEditor = () => {
		setOpenEditor(false);
		clear();
	};

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
			handleCloseEditor();
			load();
			setMessage('Account successfully saved.');
			handleOpenSnackbar();
		}
	}

	const handleEdit = async (account) => {
		await load({id: account.id});
		handleOpenEditor();
	}

	const confirmDelete = (account) => {
		setAccount(account);
		handleOpenConfirmDelete();
	}

	const handleDelete = async () => {
		let success = await remove(account);
		if(success) {
			load();
			setMessage('Account successfully deleted.');
			handleOpenSnackbar();
			load();
			handleCloseConfirmDelete();
		}
	}

  return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<Grid container>
					<Grid item xs={6}>
						<PageHeader title="Accounts" icon={<PeopleRounded />} />
					</Grid>
					<Grid item xs={6} className="text-right">
						<Button variant="contained" color="primary" onClick={() => handleOpenEditor()}>
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
									Are you sure you want to delete <b>{account.name}</b> (<b>{account.number}</b>)? This process cannot be undone.
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
						<AccountEditor
							handleClose={() => handleCloseEditor()}
							handleSave ={() => handleSave()}
						/>
					)}
					<TableComponent
						data={accounts}
						headCells={headCells}
						handleEdit={(account) => handleEdit(account)}
						handleDelete={(account) => confirmDelete(account)}
					/>
					{/* <TableContainer>
						<Table
							className={classes.table}
							aria-labelledby="tableTitle"
							size="medium"
							aria-label="enhanced table"
						>
							<TableHeader
								headCells={headCells}
								order={order}
								orderBy={orderBy}
								onRequestSort={handleRequestSort}
								rowCount={accounts.length}
							/>
							<TableBody>
								{
									stableSort(accounts, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {

										return (
											<TableRow
												hover
												tabIndex={-1}
												key={row.id}
												className={index%2 ? classes.even : classes.odd}
											>
												<TableCell component="th" scope="row">{row.name}</TableCell>
												<TableCell>{row.number}</TableCell>
												<TableCell>{row.network}</TableCell>
												<TableCell>{row.description}</TableCell>
												<TableCell align="right">
													<Tooltip title="View Account Details">
														<IconButton aria-label="view" size="small">
															<VisibilityRounded fontSize="small" style={{color:'#388E3C'}} />
														</IconButton>
													</Tooltip>
													<Tooltip title="Update Account Details">
														<IconButton aria-label="view" size="small" onClick={() => handleEdit(row.id)}>
															<EditRounded fontSize="small" color="primary" />
														</IconButton>
													</Tooltip>
													<Tooltip title="Remove Account">
														<IconButton aria-label="view" size="small" onClick={() => confirmDelete(row)}>
															<DeleteRounded fontSize="small" color="error"/>
														</IconButton>
													</Tooltip>
												</TableCell>
											</TableRow>
										);
									})
								}
								{emptyRows > 0 && (
									<TableRow style={{ height: (53 * emptyRows) }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 20, 30, 40, 50]}
						component="div"
						count={accounts.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/> */}
				</Paper>
			</Grid>
		</Grid>
  );
}

const mapStateToProps = state => ({
	accounts: state.Account.accounts,
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
)(Accounts);
