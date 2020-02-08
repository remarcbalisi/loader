import React from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText, } from '@material-ui/core';
import { DashboardRounded as DashboardRoundedIcon, PeopleRounded as PeopleRoundedIcon, LayersRounded as LayersRoundedIcon, BarChartRounded as BarChartRoundedIcon, AccountBoxRounded as AccountBoxRoundedIcon, AssignmentRounded as AssignmentRoundedIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	MenuItemSelected: {
		backgroundColor: '#3f51b5',
		color: '#fff',
		'&:hover': {
			color: '#000'
	 	},
  },

}));

const menuItems = [
  { itemLink: '', itemLabel: 'Dashboard', restrict:'' , itemIcon: <DashboardRoundedIcon /> },
  { itemLink: 'accounts', itemLabel: 'Accounts', restrict:'' , itemIcon: <AccountBoxRoundedIcon /> },
  { itemLink: 'customers', itemLabel: 'Customers', restrict:'' , itemIcon: <PeopleRoundedIcon /> },
  { itemLink: 'purchases', itemLabel: 'Purchases', restrict:'' , itemIcon: <LayersRoundedIcon /> },
  { itemLink: 'sales', itemLabel: 'Sales', restrict:'' , itemIcon: <BarChartRoundedIcon /> },
  { itemLink: 'reports', itemLabel: 'Reports', restrict:'' , itemIcon: <AssignmentRoundedIcon /> },
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
							className={(item.itemLink === window.location.pathname.split('/')[1] ? classes.MenuItemSelected : "")}
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




		// <div>
		// 	<ListItem button>
		// 		<ListItemIcon>
		// 				<DashboardRoundedIcon />
		// 		</ListItemIcon>
		// 		<ListItemText primary="Dashboard" />
		// 	</ListItem>
		// 	<ListItem button>
		// 		<ListItemIcon>
		// 				<AccountBoxRoundedIcon />
		// 		</ListItemIcon>
		// 		<ListItemText primary="Accounts" />
		// 	</ListItem>
		// 	<ListItem button>
		// 		<ListItemIcon>
		// 				<PeopleRoundedIcon />
		// 		</ListItemIcon>
		// 		<ListItemText primary="Customers" />
		// 	</ListItem>
		// 	<ListItem button>
		// 		<ListItemIcon>
		// 				<LayersRoundedIcon />
		// 		</ListItemIcon>
		// 		<ListItemText primary="Purchases" />
		// 	</ListItem>
		// 	<ListItem button>
		// 		<ListItemIcon>
		// 				<BarChartRoundedIcon />
		// 		</ListItemIcon>
		// 		<ListItemText primary="Sales" />
		// 	</ListItem>
		// 	<ListItem button>
		// 		<ListItemIcon>
		// 				<AssignmentRoundedIcon />
		// 		</ListItemIcon>
		// 		<ListItemText primary="Reports" />
		// 	</ListItem>
		// </div>
	)
}

export default withRouter(MenuItems);
