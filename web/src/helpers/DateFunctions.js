export function formatDateTime(datetime, separator='/', format="MDY") {

	let d = new Date(datetime);
	let year = d.getFullYear();
	let month = addLeadingZero(d.getMonth()+1);
	let day = addLeadingZero(d.getDate());

	let date = "";

	switch(format) {
		case 'MDY' : {
			date = `${month}${separator}${day}${separator}${year}`;
			break;
		}
		case 'YMD' : {
			date = `${year}${separator}${month}${separator}${day}`;
			break;
		}
		default: {
			return datetime;
		}
	}

	return date;
}

function addLeadingZero(num) {
	return ( (num.toString().length === 1) ? '0' : '' ) + num.toString();
}
