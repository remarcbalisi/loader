import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import Chart from './Chart';
import Deposits from './Deposits';

const useStyles = makeStyles(theme => ({
	paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },

}));

const Dashboard = () => {

	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<Grid container spacing={3}>
			{/* Chart */}
			<Grid item xs={12} md={8} lg={9}>
				<Paper className={fixedHeightPaper}>
					<Chart />
				</Paper>
			</Grid>
			{/* Recent Deposits */}
			<Grid item xs={12} md={4} lg={3}>
				<Paper className={fixedHeightPaper}>
					<Deposits />
				</Paper>
			</Grid>
		</Grid>
	)

}

export default Dashboard;
