import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadAll} from '../redux/actions/account';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Tooltip, IconButton, Paper} from '@material-ui/core';
import {FilterList as FilterListIcon, EditRounded as EditRoundedIcon, DeleteRounded as DeleteRoundedIcon, VisibilityRounded as VisibilityRoundedIcon} from '@material-ui/icons';
import TableToolbar from '../components/table/TableToolbar';
import TableHeader from '../components/table/TableHeader';
import {getComparator, stableSort} from '../components/table/Functions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
}));

const headCells = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'number', label: 'Number', align: 'left' },
  { id: 'network', label: 'Network', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: '', label: 'Action', align: 'right' },
];

TableToolbar.propTypes = {
  title: PropTypes.string.isRequired
};

TableHeader.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const Accounts = (props) => {

	const { accounts, loadAll } = props;

	const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, accounts.length - page * rowsPerPage);

	useEffect(() => {
		loadAll();
	}, []);

  const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar title="Accounts">
					<Tooltip title="Filter list">
						<IconButton aria-label="filter list">
							<FilterListIcon />
						</IconButton>
					</Tooltip>
				</TableToolbar>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <TableHeader
							headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={accounts.length}
            />
            <TableBody>
              {stableSort(accounts, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell component="th" scope="row">{row.name}</TableCell>
                      <TableCell>{row.number}</TableCell>
                      <TableCell>{row.network}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell align="right">
												<VisibilityRoundedIcon />
												<EditRoundedIcon />
												<DeleteRoundedIcon />
											</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53 * emptyRows) }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30, 40, 50]}
          component="div"
          count={accounts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

const mapStateToProps = state => ({
	accounts: state.Account.accounts,
});

const mapDispatchToProps = {
	loadAll: () => loadAll(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accounts);
