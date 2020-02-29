import React from 'react';
import PropTypes from 'prop-types';
import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarSuccess = (props) => {
	const {message, handleClose} = props;

	return(
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={true}
			autoHideDuration={4000}
			onClose={handleClose}
		>
			<Alert onClose={handleClose} severity="success">
				{message}
			</Alert>
		</Snackbar>
	)
}

SnackbarSuccess.propTypes = {
	message: PropTypes.string.isRequired,
	handleClose: PropTypes.func.isRequired,
};

export default SnackbarSuccess;
