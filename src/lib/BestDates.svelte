<script context="module">
	import addAvatars from '$lib/addAvatars'
</script>

<script>
	export let pissheads
	export let pissheadsCount
	export let selected
	
	let bestDates
	let pissheadsByDate
	$: {
		pissheadsCount = Object.values(pissheads).length
		addAvatars(pissheads)
		pissheadsByDate = {}
		for (const [_, pisshead] of Object.entries(pissheads)) {
			for (const date of pisshead.dates || []) {
				const hasDateKey = date in pissheadsByDate
				if (!hasDateKey) pissheadsByDate[date] = new Set()
				pissheadsByDate[date].add(pisshead)
			}
		}
		bestDates = Object.entries(pissheadsByDate)
			.sort(([_, pissheadsOne], [__, pissheadsTwo]) => {
				if (pissheadsOne.size < pissheadsTwo.size) return 1
				if (pissheadsOne.size > pissheadsTwo.size) return -1
				return 0
			})
			.slice(0, 10)
	}
</script>

<table
	id="best-dates"
	on:click={event => {
		const tableRow = event.composedPath().find(node => node.tagName === 'TR')
		const radioInput = tableRow.getElementsByTagName('input')[0]
		radioInput.checked = true
	}}>
	<thead>
		<tr>
			<th></th>
			<th>Rank</th>
			<th>Date</th>
			<th>Available Pissheads</th>
			<th>Pissheads Total</th>
		</tr>
	</thead>
	<tbody>
		{#each bestDates as [date, pissheadsForDate], i}
			<tr>
				<td>
					<input checked={date === selected} name="best-dates" type="radio" value={date}/>
				</td>
				<td>{i + 1}</td>
				<td>
					{new Date(date).toLocaleDateString(undefined, {
						weekday: 'long',
						month: 'long',
						day: 'numeric',
					})}
				</td>
				<td>
					{#each Array.from(pissheadsForDate) as pisshead}
						{pisshead.avatar}
					{/each}
				</td>
				<td>{pissheadsForDate.size}/{pissheadsCount}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	#best-dates {
		font-size: x-large;
		color: white;
		text-align: left;
		font-family: 'Port Lligat Slab', serif;
	}

	#best-dates td {
		font-family: 'Port Lligat Slab', serif;
		font-size: large;
	}

	th, td {
		padding: 0.61rem;
	}

	table thead tr::before {
		/* Hack required otherwise the before pseudo element nudges the whole table over to the right as though its added a new td element. */
    	content: ""; 
	}

	tbody tr {
		position: relative;
		cursor: pointer;
	}

	tbody tr::before {
		content: "👉";
		position: absolute;
		left: -2rem;
		visibility: hidden;

	}

	tbody tr:hover::before {
		content: "👉";
		visibility: visible;
	}
</style>