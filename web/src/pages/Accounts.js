import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  fixedHeight: {
    height: 240,
  },
}));

const Accounts = () => {

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={8} lg={9}>
				<Paper>
				<Typography variant="h4" component="h4">
					Account
				</Typography>
				</Paper>
			</Grid>
		</Grid>
	)
}

export default Accounts;
