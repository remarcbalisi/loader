export function isObjEmpty(obj) {
  for(var key in obj) {
		if(obj.hasOwnProperty(key)){
			return false;
		}
	}
	return true;
}

export function formatNumber(number) {
	//format number to 1,234.00
	return number.toLocaleString(
		undefined,
		{
			maximumFractionDigits: 2,
			minimumFractionDigits: 2
		}
	);
}
