function convertDatesToStrings (pissup) {
	Object.values(pissup.pissheads)
		.forEach(pisshead => {
			pisshead.dates = pisshead.dates ? pisshead.dates.map(date => date.value) : []
		})
	return pissup
}

export default convertDatesToStrings
