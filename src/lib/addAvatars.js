// TODO: Add multiple avatars per letter so that people's have unique ones
const avatars = [
	'🤴',
	'🧙‍♂️',
	'👽',
	'🤖',
	'🤡',
	'👹',
	'👾',
	'👶',
	'💩',
]

function addAvatars (pissheads) {
	Object.values(pissheads).forEach((pisshead, index) => {
		pisshead.avatar = avatars[index] || '🤮'
	})
}

export default addAvatars
