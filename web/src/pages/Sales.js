import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {load} from '../redux/actions/sale';
import {makeStyles} from '@material-ui/core/styles';
import {
	Paper,
	Grid,
	Typography,
	Tabs,
	Tab,
	Box
} from '@material-ui/core';
import {
	ShoppingBasket,
	PaymentRounded,
	BarChartRounded
} from '@material-ui/icons';
import PageHeader from './PageHeader';
import BuyLoad from './BuyLoad';
import TableComponent from '../components/table/TableComponent';

const useStyles = makeStyles(theme => ({
	tabs: {
		borderBottom: '1px solid #e8e8e8',
	}
}));

const headCells = [
  { id:'account_name', label:'Account Name'},
  { id:'customer_name', label:'Customer Name'},
  { id:'customer_number', label:'Customer Number', align:'center'},
	{ id:'amount', label:'Amount', align:'right', type:'number'},
	{ id:'created_at', label:'Date Created', align:'center', type:'date'},
];

const Sales = (props) => {

	const classes = useStyles();
	const dispatch = useDispatch();
	const sales = useSelector(state => state.Sale.sales);

	useEffect(() => {
		async function fetchData() {
			await dispatch(load());
		}
		fetchData();
	}, []);

	const [tab, setTab] = React.useState(0);
  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<PageHeader title="Sales" icon={<BarChartRounded />} />
			</Grid>
			<Grid item xs={12}>
				<Paper className={classes.root}>
					<Tabs
						value={tab}
						onChange={handleChangeTab}
						className={classes.tabs}
						indicatorColor="primary"
						textColor="primary"
					>
						<Tab label="Buy Load" icon={<ShoppingBasket />}  {...a11yProps(0)} />
						<Tab label="Payment" icon={<PaymentRounded />}  {...a11yProps(1)} />
					</Tabs>
					<TabPanel value={tab} index={0}>
						<BuyLoad />
					</TabPanel>
					<TabPanel value={tab} index={1}>
						Item Two
					</TabPanel>
				</Paper>
			</Grid>
			<Grid item xs={12}>
				Sales List
			</Grid>
			<Grid item xs={12}>
				<TableComponent
					data={sales}
					headCells={headCells}
					// handleEdit={(account) => handleEdit(account)}
					// handleDelete={(account) => confirmDelete(account)}
				/>
			</Grid>
		</Grid>
	)
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

export default Sales;
