import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: {
    fontFamily: [
      '"Fira Sans"',
			'sans-serif',
    ].join(','),
  },
  // palette: {
  //   primary: {
	// 		main: '#0077AF',
  //     contrastText: '#ffffff',
	// 	},
  //   secondary: {
  //     main: '#20A53D',
  //     contrastText: '#ffffff',
	// 	},
	// 	info: {
  //     main: '#078F8B',
  //     contrastText: '#ffffff',
  //   },
	// 	success: {
  //     main: '#20A53D',
  //     contrastText: '#ffffff',
	// 	},
	// 	error: {
  //     main: '#DB2B39',
  //     contrastText: '#ffffff',
	// 	},
	// 	warning: {
  //     main: '#F3A717',
  //     contrastText: '#ffffff',
  //   },
  // },
});


export { theme };
