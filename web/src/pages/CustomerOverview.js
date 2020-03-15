import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {load, save} from '../redux/actions/customer';
import {Grid, Paper, Typography, Button} from '@material-ui/core';
import {PeopleRounded, Edit} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import PageHeader from './PageHeader';
import PhoneNumbers from './PhoneNumbers';
import CustomerEditor from './CustomerEditor';
import SnackbarSuccess from '../components/SnackbarSuccess';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: '12px',
	}
}));

const CustomerOverview = (props) => {

	const classes = useStyles();
	const dispatch = useDispatch();
	const customer = useSelector(state => state.Customer.customer);

	useEffect(() => {
		async function fetchData() {
			await dispatch(load({id: props.match.params.id}));
		}
		fetchData();
	}, [props.match.params.id]);

	const [openEditor, setOpenEditor] = useState(false);
	const toggleEditor = () => {
		setOpenEditor(!openEditor);
	}

	const handleSave = async () => {
		let success = await save();
		if(success) {
			toggleEditor();
			load({id: customer.id})
			handleOpenSnackbar();
		}
	}

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
		<Grid container spacing={1}>
			<Grid item sm={4} xs={12}>
				<PageHeader title="Customers" icon={<PeopleRounded />} />
			</Grid>
			<Grid item sm={8} xs={12} className="text-right">
				<Button variant="contained" color="primary" onClick={() => toggleEditor()}>
					<Edit style={{fontSize: 16, marginRight: 5}} />
					Edit Details
				</Button>
			</Grid>
			<Grid item sm={8} xs={12}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							{openSnackbar && (
								<SnackbarSuccess
									message="Customer successfully saved."
									handleClose={() => handleCloseSnackbar()}
								/>
							)}
							{openEditor && (
								<CustomerEditor
									handleClose={() => toggleEditor()}
									handleSave ={() => handleSave()}
								/>
							)}
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Typography variant="h6" component="h6">
										Customer Details
									</Typography>
								</Grid>
								<Grid item sm={3} xs={12}>
									<Typography variant="body2" component="span">
										Name:
									</Typography>
								</Grid>
								<Grid item sm={9} xs={12}>
									<Typography variant="body1" component="span">
										{customer.name}
									</Typography>
								</Grid>
								<Grid item sm={3} xs={12}>
									<Typography variant="body2" component="span">
										Type:
									</Typography>
								</Grid>
								<Grid item sm={9} xs={12}>
									<Typography variant="body1" component="span">
										{customer.role}
									</Typography>
								</Grid>
								<Grid item sm={3} xs={12}>
									<Typography variant="body2" component="span">
										Email:
									</Typography>
								</Grid>
								<Grid item sm={9} xs={12}>
									<Typography variant="body1" component="span">
										{customer.email}
									</Typography>
								</Grid>
								<Grid item sm={3} xs={12}>
									<Typography variant="body2" component="span">
										Address:
									</Typography>
								</Grid>
								<Grid item sm={9} xs={12}>
									<Typography variant="body1" component="span">
										{customer.address}
									</Typography>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						{customer.id && (
							<PhoneNumbers {...props} />
						)}
					</Grid>
				</Grid>
			</Grid>
			<Grid item sm={4} xs={12}>
				<Paper className={classes.paper}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Typography variant="h6" component="h6">
								Transaction History
							</Typography>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
  );
}

export default CustomerOverview;
