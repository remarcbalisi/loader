import React from 'react';
import {connect} from 'react-redux';
import {typing} from '../redux/actions/customer';
import {withStyles} from '@material-ui/core/styles';
import {Button, Dialog, DialogTitle as MuiDialogTitle, DialogContent as MuiDialogContent, DialogActions as MuiDialogActions, IconButton, Typography, Grid, TextField, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';
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

const roles = [
	{id: 'direct', label: 'Direct'},
	{id: 'agent', label: 'Agent'},
];

const networks = [
	{id: 'globe', label: 'Globe'},
	{id: 'smart', label: 'Smart'},
	{id: 'sun', label: 'Sun'},
	{id: 'tm', label: 'Touch Mobile'},
	{id: 'talk_n_text', label: 'Talk N Text'},
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

const CustomerEditor = (props) => {

	const { typing, customer, errors, handleClose, handleSave } = props;

	const handleFieldChange = (event) => {
		typing({[event.target.name]:event.target.value});
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
          {customer.id ? 'Update Customer Details' : 'Create New Customer'}
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
							<TextField
								fullWidth
								variant="outlined"
								label="Name"
								name="name"
								value={customer.name}
								onChange={handleFieldChange}
								error={errors.hasOwnProperty('name')}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth error={errors.hasOwnProperty('role')}>
								<InputLabel>Type</InputLabel>
								<Select
									name="role"
									value={customer.role}
									onChange={handleFieldChange}
									labelWidth={30}
								>
									{roles.map((item) => {
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
								label="Email"
								name="email"
								value={customer.email}
								onChange={handleFieldChange}
								error={errors.hasOwnProperty('email')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								multiline
								variant="outlined"
								label="Address"
								name="address"
								value={customer.address}
								onChange={handleFieldChange}
								error={errors.hasOwnProperty('address')}
							/>
						</Grid>
						{!customer.id && (
							<Grid item xs={12}>
								<hr style={{width: '100%'}} />
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<Typography variant="h6" component="h6">
											Phone Number
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Grid container spacing={2}>
											<Grid item xs={6}>
												<FormControl
													variant="outlined"
													fullWidth
												>
													<InputLabel>Network</InputLabel>
													<Select
														name="network"
														value={customer.network}
														onChange={handleFieldChange}
														labelWidth={57}
														error={errors.hasOwnProperty('network')}
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
											<Grid item xs={6}>
												<TextField
													fullWidth
													variant="outlined"
													type="number"
													label="Phone Number"
													name="number"
													value={customer.number}
													onChange={handleFieldChange}
													error={errors.hasOwnProperty('number')}
												/>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						)}
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

const mapStateToProps = state => ({
	errors: state.Customer.errors,
	customer: state.Customer.customer,
	customers: state.Customer.customers,
});

const mapDispatchToProps = {
	typing: (payload) => typing(payload),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerEditor);
