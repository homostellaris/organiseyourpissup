import { v4 as uuid } from '@lukeed/uuid';

// TODO: Add those type annotation things?
export const post = async (request) => {
	// TODO: Use FormData instead.
	const json = JSON.parse(request.body)
	const uid = uuid()

	return {
		body: {
			name: json.name,
			uid,
		},
	};
}
