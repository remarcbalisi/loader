import React from 'react';
import {connect} from 'react-redux';
import {typing} from '../redux/actions/account';
import {withStyles} from '@material-ui/core/styles';
import {Button, Dialog, DialogTitle as MuiDialogTitle, DialogContent as MuiDialogContent, DialogActions as MuiDialogActions, IconButton, Typography, Grid, TextField} from '@material-ui/core';
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

const AccountEditor = (props) => {

	const { typing, account, errors, handleClose, handleSave } = props;

	const handleFieldChange = (event) => {
		typing({[event.target.name]:event.target.value});
	}

	return (
    <div>
      <Dialog
				fullWidth
				disableBackdropClick
				maxWidth="md"
				onClose={handleClose}
				open={true}
			>
        <DialogTitle onClose={handleClose}>
          Create New Account
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
								value={account.name}
								onChange={handleFieldChange}
								error={errors.hasOwnProperty('name')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								variant="outlined"
								label="Phone Number"
								name="number"
								value={account.number}
								onChange={handleFieldChange}
								error={errors.hasOwnProperty('number')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								variant="outlined"
								label="Network"
								name="network"
								value={account.network}
								onChange={handleFieldChange}
								error={errors.hasOwnProperty('network')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								multiline
								variant="outlined"
								label="Description"
								name="description"
								value={account.description}
								onChange={handleFieldChange}
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

const mapStateToProps = state => ({
	errors: state.Account.errors,
	account: state.Account.account,
});

const mapDispatchToProps = {
	typing: (payload) => typing(payload)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountEditor);
