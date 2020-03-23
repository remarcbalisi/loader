import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Paper, Table, TableBody, TablePagination, TableContainer, TableRow, TableCell, IconButton} from '@material-ui/core';
import {VisibilityRounded, EditRounded, Delete} from '@material-ui/icons'
import {TableStyles} from './TableStyles';
import TableHeader from './TableHeader';
import TableSearchRow from './TableSearchRow';
import {stableSort, getSorting, search} from './TableFunctions';
import {formatNumber} from '../../helpers/Functions';
import {formatDateTime} from '../../helpers/DateFunctions';

const TableComponent = (props) => {

	const {data, headCells, handleView, handleEdit, handleDelete} = props;

	useEffect(() => {
		getData();
	}, [data]);

	const classes = TableStyles();
	const [listData, setListData] = useState([]);
	const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
	// const emptyRows = rowsPerPage - Math.min(rowsPerPage, listData.length - page * rowsPerPage);

	const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
	};

	const getData = async () => {
		if(data && headCells) {
			let newData = await search(data, searchKeys, headCells);
			setListData(newData);
		}
	}

	const [searchKeys, setSearchKeys] = useState({});
	useEffect( () => {
		getData();
  }, [searchKeys]);

	const handleTextSearch = (event) => {

		let field = event.target.name;
		let value = event.target.value;

		setSearchKeys({
			...searchKeys,
			[field]: value,
		});

	};

	const handleDateSearch = (dateStr, date) => {
		let arr = date.split('|');
		let field = arr[1];
		let value = arr[0] !== 'null' ? arr[0] : null;

    setSearchKeys({
			...searchKeys,
			[field]: value,
		});
	};

	return (
		<Paper>
			<TableContainer>
				<Table className={classes.table}>
					{headCells && (
						<TableHeader
							headCells={headCells}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
						/>
					)}
					<TableBody>
						{( headCells
								&& (
									!props.hasOwnProperty('filter')
									|| (props.hasOwnProperty('filter') && props.filter)
								)
							)
							&& (<TableSearchRow
								headCells={headCells}
								searchKeys={searchKeys}
								handleDateSearch={handleDateSearch}
								handleTextSearch={handleTextSearch}
							/>
						)}
						{stableSort(listData, getSorting(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((item, i) => {

								let trClass = (i%2) ? classes.rowEven : classes.rowOdd;

								return (
									<TableRow hover key={i} className={trClass}>

										{headCells.map((cell, c) => {
											if(cell.id) {
												let cellText = '';
												switch(cell.type) {
													case 'date':
														cellText = item[cell.id] ? formatDateTime(item[cell.id]) : '';
													break;
													case 'number':
														cellText = item[cell.id] ? formatNumber(item[cell.id]) : '0.00';
													break;
													default: {
														cellText = item[cell.id];
													}
												}

												return (
													<TableCell key={`${i}${c}`} align={cell.align}>
														{cellText}
													</TableCell>
												)
											}
										})}

										{((typeof handleView === 'function')
											|| (typeof handleEdit === 'function')
											|| (typeof handleDelete === 'function')
											) && (
											<TableCell align="right">
												{(typeof handleView === 'function') && (
													<IconButton size="small" onClick={() => handleView(item)}>
														<VisibilityRounded fontSize="small" style={{color:'#46a54f'}}/>
													</IconButton>
												)}
												{(typeof handleEdit === 'function') && (
													<IconButton size="small" onClick={() => handleEdit(item)}>
														<EditRounded fontSize="small" color="primary" />
													</IconButton>
												)}
												{(typeof handleDelete === 'function') && (
													<IconButton size="small" onClick={() => handleDelete(item)}>
														<Delete fontSize="small" color="error" />
													</IconButton>
												)}
											</TableCell>
										)}

									</TableRow>
								);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				rowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
				count={listData.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'previous page',
				}}
				nextIconButtonProps={{
					'aria-label': 'next page',
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}

TableComponent.propTypes = {
	data: PropTypes.array.isRequired,
	headCells: PropTypes.array.isRequired,
	filter: PropTypes.bool,
	handleView: (PropTypes.func || PropTypes.bool),
	handleEdit: (PropTypes.func || PropTypes.bool),
	handleDelete: (PropTypes.func || PropTypes.bool),
};

export default TableComponent;
