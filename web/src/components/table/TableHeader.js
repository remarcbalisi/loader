import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

/*
	*** headCells keys
	id -
	label -
	sortkey - default sorted by id
	align - default: left
	type - default: text
	sortable - default: true
	searchable - default: true
	type - default: text > (text|date|number)
*/

const TableHeader = (props) => {

  const {headCells, order, orderBy, onRequestSort} = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
	};

  return (
    <TableHead>
      <TableRow>
        {headCells.map((cell) => {
					return (
						<TableCell
							key={cell.id}
							align={cell.hasOwnProperty('align') ? cell.align : 'left'}
							sortDirection={orderBy === cell.id ? order : false}
							width={cell.width}
						>
							{
								(cell.hasOwnProperty('sortable') && !cell.sortable)
								? cell.label
								: <TableSortLabel
										active={orderBy === cell.id}
										direction={order}
										onClick={createSortHandler(cell.sortkey ? cell.sortkey : cell.id)}
									>
										{cell.label}
									</TableSortLabel>
							}
						</TableCell>
					)
				})}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
