import React from 'react';
import {TableRow, TableCell, TextField} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {TableStyles} from './TableStyles';

const TableSearchRow = (props) => {

	const classes = TableStyles();
	const {headCells, searchKeys, handleTextSearch, handleDateSearch} = props;

	return (
		<TableRow className={classes.searchRow}>
			{headCells.map((cell) => {

				if(!cell.hasOwnProperty('searchable') || (cell.hasOwnProperty('searchable') && cell.searchable)) {

					let type = cell.hasOwnProperty('type') ? cell.type : 'text';
					let field = "";

					switch (type) {
						case 'date':
							field = (
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
										disableToolbar
										autoOk
										fullWidth
										variant="inline"
										format="MM/dd/yyyy"
										name={cell.id}
										value={searchKeys.hasOwnProperty(cell.id) && searchKeys[cell.id] ? new Date(searchKeys[cell.id]) : null}
										onChange={(dateStr, date) => handleDateSearch(dateStr,`${date}|${cell.id}`)}
										animateYearScrolling={true}
										inputVariant="outlined"
										className={classes.searchField}
										style={{width: '150px'}}
										placeholder={cell.label}
									/>
								</MuiPickersUtilsProvider>
							);
						break;

						case 'number':
							field = (
								<TextField
									fullWidth
									variant="outlined"
									type="number"
									className={classes.searchField}
									name={cell.id}
									onChange={(event) => handleTextSearch(event)}
									placeholder={cell.label}
								/>
							);
						break;

						default:
							field = (
								<TextField
									fullWidth
									variant="outlined"
									className={classes.searchField}
									name={cell.id}
									onChange={(event) => handleTextSearch(event)}
									placeholder={cell.label}
								/>
							);
						break;
					}

					return (
						<TableCell key={cell.id} align={cell.align}>
							{field}
						</TableCell>
					)
				} else {
					return <TableCell key={cell.id}></TableCell>
				}
			})}
		</TableRow>
	)
}

export default TableSearchRow;
