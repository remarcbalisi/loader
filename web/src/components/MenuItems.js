import React from 'react';
import {withRouter} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {DashboardRounded, PeopleRounded, LayersRounded, BarChartRounded, AccountBoxRounded, AssignmentRounded} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	MenuItem: {
		color: '#fff',
		'& svg': {
			color: '#fff'
		},
  },
	MenuItemSelected: {
		backgroundColor: '#00695C',
		color: '#fff',
		'& svg': {
			color: '#fff'
		},
  },
}));

const menuItems = [
  { itemLink: '', itemLabel: 'Dashboard', restrict:'' , itemIcon: <DashboardRounded /> },
  { itemLink: 'accounts', itemLabel: 'Accounts', restrict:'' , itemIcon: <AccountBoxRounded /> },
  { itemLink: 'customers', itemLabel: 'Customers', restrict:'' , itemIcon: <PeopleRounded /> },
  { itemLink: 'purchases', itemLabel: 'Purchases', restrict:'' , itemIcon: <LayersRounded /> },
  { itemLink: 'sales', itemLabel: 'Sales', restrict:'' , itemIcon: <BarChartRounded /> },
  { itemLink: 'reports', itemLabel: 'Reports', restrict:'' , itemIcon: <AssignmentRounded /> },
];

const MenuItems = (props) => {

	const classes = useStyles();

	const handleMenuSelect = (link) => {
    props.history.push('/' + link);
	};

	return (
		<div>
			{
				menuItems.map((item, index) => {
					return (
						<ListItem
							button
							key={index}
							className={(item.itemLink === window.location.pathname.split('/')[1] ? classes.MenuItemSelected : classes.MenuItem)}
              onClick={() => handleMenuSelect(item.itemLink)}
						>
							<ListItemIcon>
									{item.itemIcon}
							</ListItemIcon>
							<ListItemText primary={item.itemLabel} />
						</ListItem>
					)
				})
			}
		</div>
	)
}

export default withRouter(MenuItems);
