import {makeStyles} from '@material-ui/core/styles';

const TableStyles = makeStyles(theme => ({
  table: {
		'& thead': {
			backgroundColor: '#f0eefa',
		},
		'& tbody > tr:hover': {
			backgroundColor: '#f0eefa !important',
		},
		'& th:first-child': {
			borderTopLeftRadius: '4px',
		},
		'& th:last-child': {
			borderTopRightRadius: '4px',
		},
		'& th': {
			padding: '15px 10px',
			borderBottom: '1px solid #bdbfbf',
		},
		'& td': {
			padding: '10px',
		}
	},
	rowOdd: {
		backgroundColor: '#ffffff',
	},
	rowEven: {
		backgroundColor: '#f0eefa91',
	},
	searchRow: {
		'& td': {
			padding: '8px',
			borderBottom: '1px solid #bdbfbf',
			backgroundColor: '#f0eefa',
		},
		'&:hover': {
		}
	},
	searchField: {
		'& input': {
			padding: '7px !important',
			paddingRight: '1px !important',
			fontSize: '14px',
		},
		'& button': {
			padding: '6px !important',
		},
		'& svg': {
			fontSize: '18px !important',
		}
	}
}));

export {TableStyles};
