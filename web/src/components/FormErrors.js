import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Alert, AlertTitle} from '@material-ui/lab';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
	},
	title: {
		fontWeight: 700,
	}
}));

const FormErrors = (props) => {

	const { errors } = props;
	const classes = useStyles();

	let errorText = [];
	for(let i in errors) {
		errorText.push(
			<Typography
			variant="body1"
			component="div"
			key={i}
			>
				{errors[i]}
			</Typography>
		);
	}

  return (
    <div className={classes.root}>
      <Alert severity="error">
        <AlertTitle className={classes.title}>Error</AlertTitle>
        	{errorText}
      </Alert>
    </div>
  );
}

export default FormErrors;
