const filter = async (defaultItem, searchField) => {

	const strObj = {
		"F": "암컷",
		"M": "수컷",
		"Q": "성별 미상",
		"Y": "중성화O",
		"N": "중성화X",
		"U": "중성화 미상",
		"한국 고양이": "코리안숏헤어"
	}

	let defaultValue = Object.values(defaultItem)

	if (typeof defaultValue[0] === 'string') defaultValue = [defaultItem]

	let filteredItems = defaultValue.filter(item => {
		let re = new RegExp(Object.keys(strObj).join("|"), "gi");
		let regExp = /[()]/gi;
		let searchKeyword = searchField.toUpperCase().trim()
		if (typeof item === "object") {
			return (
				Object.keys(item).some(
					key =>
						typeof item[key] === "string" &&
						item[key].replace(re, (matched => {
							return strObj[matched]
						})).replace(regExp, "").toUpperCase().includes(searchKeyword)
				)
			);
		} else {
			return null;
		}

	})

	return filteredItems;

}

exports.filter = filter;