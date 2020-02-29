import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, Grid} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	container: {
		'& svg': {
			color: '#585555',
			fontSize: '30px',
			paddingBottom: '5px',
			marginRight: '5px',
		}
	},
	title: {
		color: '#585555',
	}
}));


const PageHeader = (props) => {

	const {title, icon} = props;
	const classes = useStyles();

	return (
		<Grid container direction="row" justify="flex-start" alignItems="flex-end" className={classes.container}>
			{icon}
			<Typography variant="h6" component="span" className={classes.title}>
				{title}
			</Typography>
		</Grid>
	)
}

export default PageHeader;
