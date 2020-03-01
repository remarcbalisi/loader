import {formatDateTime} from '../../helpers/DateFunctions';

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const getSorting = (order, orderBy) => {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const search = (data, searchKeys, cells) => {
	let newData = data.filter(item => {
		let matched = true;
		for(let key in searchKeys) {
			if(searchKeys[key]) {
				if(!item[key]) {
					matched = false;
				} else {
					let cell = cells.filter((row) => row.id === key)[0];

					switch(cell.type) {
						case 'date':
							let itemDate = formatDateTime(item[key]);
							let searchDate = formatDateTime(searchKeys[key])
							matched = itemDate === searchDate;
						break;

						case 'number':
							let itemNumber = parseFloat(item[key]).toFixed(2);
							let searchNumber = parseFloat(searchKeys[key]).toFixed(2);
							matched = (itemNumber === searchNumber);
						break;

						default:
							if(item[key].toLowerCase().indexOf(searchKeys[key].toLowerCase()) === -1) {
								matched = false;
							}
						break;
					}
				}
			}
		}
		return matched;
	});
	return newData;
}

export {stableSort, getSorting, search};
