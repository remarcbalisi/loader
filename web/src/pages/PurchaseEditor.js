import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {typing} from '../redux/actions/purchase';
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
	TextField
} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
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

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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

const PurchaseEditor = (props) => {

	const { handleClose, handleSave } = props;
	const dispatch = useDispatch();
	const errors = useSelector(state => state.Purchase.errors);
	const purchase = useSelector(state => state.Purchase.purchase);
	const accounts = useSelector(state => state.Account.accounts);

	const handleFieldChange = (event) => {
		dispatch(typing({[event.target.name]:event.target.value}));
	}

	const handleOnChange = (event, account) => {
		dispatch(typing({ account_id:account.id }));
	}

	return (
    <div>
      <Dialog
				fullWidth
				disableBackdropClick
				maxWidth="sm"
				onClose={handleClose}
				open={true}
			>
        <DialogTitle onClose={handleClose}>
          Purchase
        </DialogTitle>
        <DialogContent dividers>
					<Grid container spacing={1}>
						{!isObjEmpty(errors) && (
							<Grid item xs={12}>
								<FormErrors errors={errors} />
							</Grid>
						)}
						<Grid item xs={12}>
							<Autocomplete
								disableClearable
								options={accounts}
								getOptionLabel={account => `${account.name} (${account.number})`}
								onChange={handleOnChange}
								renderInput={params => (
									<TextField
										{...params}
										fullWidth
										variant="outlined"
										label="Account"
										error={errors.hasOwnProperty('account_id')}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								variant="outlined"
								type="number"
								label="Amount"
								name="amount"
								value={purchase.amount}
								onChange={handleFieldChange}
								error={errors.hasOwnProperty('amount')}
							/>
						</Grid>
					</Grid>
        </DialogContent>
        <DialogActions>
					<Button onClick={handleClose} color="primary" size="large">
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

export default PurchaseEditor;
