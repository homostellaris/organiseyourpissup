const radix = 36

export function toPissupId (databaseId) {
	return Number(databaseId).toString(radix)
}

export function toDatabaseId (pissupId) {
	return parseInt(pissupId, radix).toString()
}
