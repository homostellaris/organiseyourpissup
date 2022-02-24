// TODO: Add multiple avatars per letter so that people's have unique ones
const avatars = {
	'A': '👽',
	'B': '👶',
	'C': '🤡',
	'D': '🐶',
	'J': '👹',
	'K': '🤴',
	'M': '👾',
	'R': '🤖',
	'T': '💩',
	'W': '🧙‍♂️',
}

function addAvatars (pissheads) {
	Object.values(pissheads).forEach(pisshead => {
		const firstLetter = pisshead.name.charAt(0).toUpperCase()
		pisshead.avatar = avatars[firstLetter] || '🤮'
	})
}

export default addAvatars
