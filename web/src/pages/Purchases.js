import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {clear, load, save} from '../redux/actions/purchase';
import {load as loadAccount} from '../redux/actions/account';
import {Paper, Grid, Button} from '@material-ui/core';
import {LayersRounded} from '@material-ui/icons';
import SnackbarSuccess from '../components/SnackbarSuccess';
import PurchaseEditor from './PurchaseEditor';
import PageHeader from './PageHeader';
import TableComponent from '../components/table/TableComponent';

const headCells = [
	{ id:'account_name', label:'Account Name'},
	{ id:'account_number', label:'Account Number', align: 'center'},
  { id:'amount', label:'Amount', type: 'number', align: 'right'},
  { id:'created_at', label:'Date', type:'date', align: 'center'},
];

const Purchases = () => {

	const dispatch = useDispatch();
	const purchases = useSelector(state => state.Purchase.purchases);

	useEffect(() => {
		async function fetchData() {
			await dispatch(load());
		}
		fetchData();
	}, []);

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

	const [openEditor, setOpenEditor] = useState(false);
	const toggleEditor = () => {
		setOpenEditor(!openEditor);
	}

	useEffect(() => {
		if(!openEditor) {
			dispatch(clear());
		} else {
			dispatch(loadAccount());
		}
	}, [openEditor]);

	const handleSave = async () => {
		let success = await dispatch(save());
		if(success) {
			await dispatch(load());
			toggleEditor();
			handleOpenSnackbar();
		}
	}

  return (
		<Grid container spacing={1}>
			<Grid item sm={6} xs={12}>
				<PageHeader title="Purchases" icon={<LayersRounded />} />
			</Grid>
			<Grid item sm={6} xs={12} className={`text-right`}>
				<Button
					variant="contained"
					color="primary"
					onClick={() => toggleEditor()}
				>
					Purchase
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Paper>
					{openSnackbar && (
						<SnackbarSuccess
							message="Successfully saved."
							handleClose={() => handleCloseSnackbar()}
						/>
					)}
					{openEditor && (
						<PurchaseEditor
							handleClose={() => toggleEditor()}
							handleSave ={() => handleSave()}
						/>
					)}
					<TableComponent
						data={purchases}
						headCells={headCells}
					/>
				</Paper>
			</Grid>
		</Grid>
  );
}
export default Purchases;
