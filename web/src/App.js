import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {CssBaseline, Drawer, List, Typography, IconButton, Container, Grid, AppBar, Toolbar} from '@material-ui/core';
import {ChevronLeft, ChevronRight} from '@material-ui/icons';
import Routes from './components/Routes'
import MenuItems from './components/MenuItems';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
		display: 'flex',
		backgroundColor: '#F7F9FC',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 5px',
		...theme.mixins.toolbar,
		'& .MuiToolbar-gutters': {
			paddingLeft: '1px',
		},
		'& svg': {
			fontWeight: 800,
			color: '#00796B',
		}
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
	},
	appBar: {
		backgroundColor: '#fff',
		boxShadow: 'none',
		paddingLeft: 0,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
	},
	appBarSpacer: theme.mixins.toolbar,
  drawerPaper: {
		backgroundColor: '#00796B',
		borderRight: 'none',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  content: {
    flexGrow: 1,
    height: '100vh',
		overflow: 'auto',
		// backgroundColor: '#fff',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
	},
	logoContainer: {
		height: '4.54em',
		backgroundColor: '#00695C',
	},
	logo: {
		paddingLeft: '20px',
		color: '#fff',
		fontWeight: 800,
		flexShrink: 1
	}
}));

const App = () => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const toggleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
			<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={toggleDrawerOpen}>
							{ open ? <ChevronLeft /> : <ChevronRight /> }
						</IconButton>
					</div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
				<Grid container direction="row" justify="space-between" alignItems="center" className={classes.logoContainer}>
					<Grid item xs={12}>
						<Typography variant="caption" component="span" className={classes.logo} style={{display:open ? 'block' : 'none'}}>
							LOADER BUSINESS MANAGER
						</Typography>
					</Grid>
				</Grid>
        <List><MenuItems/></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Routes />
        </Container>
      </main>
    </div>
  );
}

export default App;
