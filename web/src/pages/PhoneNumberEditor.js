import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {typing, clear} from '../redux/actions/customer_number';
import {withStyles} from '@material-ui/core/styles';
import {
	Button,
	Dialog,
	DialogTitle as MuiDialogTitle,
	DialogContent as MuiDialogContent,
	DialogActions as MuiDialogActions,
	IconButton,
	Typography,
	Grid,
	TextField,
	InputLabel,
	MenuItem,
	FormControl,
	Select
} from '@material-ui/core';
import {Close} from '@material-ui/icons';
import FormErrors from '../components/FormErrors';
import {isObjEmpty} from '../helpers/Functions';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
	},
	dialogActions: {
		padding: '8px 15px',
	}
});

const networks = [
	{id: 'globe', label: 'Globe'},
	{id: 'smart', label: 'Smart'},
	{id: 'sun', label: 'Sun'},
	{id: 'tm', label: 'Touch Mobile'},
	{id: 'talk_n_text', label: 'Talk N Text'},
];

const status = [
	{id: '1', label: 'Active'},
	{id: '0', label: 'Inactive'},
];

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton className={classes.closeButton} onClick={onClose}>
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: '9px 15px',
  },
}))(MuiDialogActions);

const PhoneNumberEditor = (props) => {

	const {toggleModal, handleSave} = props;
	const dispatch = useDispatch();
	const number = useSelector(state => state.CustomerNumber.number);
	const errors = useSelector(state => state.CustomerNumber.errors);

	useEffect(() => {
		return () => {
			dispatch(clear());
		}
	}, []);

	const handleFieldChange = (event) => {
		dispatch(typing({[event.target.name]:event.target.value}));
	}

	return (
    <div>
      <Dialog
				fullWidth
				disableBackdropClick
				maxWidth="sm"
				onClose={toggleModal}
				open={true}
			>
        <DialogTitle onClose={toggleModal}>
          {number.id ? 'Update Number Details' : 'Add New Number'}
        </DialogTitle>
        <DialogContent dividers>
					<Grid container spacing={1}>
						{
							!isObjEmpty(errors) && (
								<Grid item xs={12}>
									<FormErrors errors={errors} />
								</Grid>
							)
						}
						<Grid item xs={12}>
							<FormControl
								variant="outlined"
								fullWidth
							>
								<InputLabel>Network</InputLabel>
								<Select
									value={number.network}
									onChange={handleFieldChange}
									labelWidth={57}
									inputProps={{
										name: "network",
									}}
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
						<Grid item xs={12}>
							<TextField
								fullWidth
								variant="outlined"
								type="number"
								label="Phone Number"
								name="number"
								value={number.number}
								onChange={handleFieldChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl
								variant="outlined"
								fullWidth
							>
								<InputLabel>Status</InputLabel>
								<Select
									name="status"
									value={number.status}
									onChange={handleFieldChange}
									labelWidth={57}
								>
									{status.map((item) => {
										return(
											<MenuItem key={item.id} value={item.id}>
												{item.label}
											</MenuItem>
										)
									})}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
        </DialogContent>
        <DialogActions>
					<Button onClick={toggleModal} color="primary" size="large">
						Cancel
					</Button>
					<Button variant="contained" color="primary" size="large" onClick={() => handleSave()}>
						Save
					</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PhoneNumberEditor;
