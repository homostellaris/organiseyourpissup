import test from 'ava'

import {toDatabaseId, toPissupId} from './id.js'

test('Test converting from database ID to pissup ID and back again', t => {
	const originalDatabaseId = '320160063924732416'

	const pissupId = toPissupId(originalDatabaseId)
	const newDatabaseId = toDatabaseId(pissupId)

	t.assert(newDatabaseId === originalDatabaseId, `${newDatabaseId} does not equal ${originalDatabaseId}`)
})
