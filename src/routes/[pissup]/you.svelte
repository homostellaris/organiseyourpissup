<script>
	import {page} from '$app/stores'
</script>

<!-- TODO: Should I use stores or session here instead of the query param? -->
<!-- Should use load function to support rendering existing selection here. -->
<!-- Need to add ability to edit name here too because pre-rendered page won't show data if for some reason the user comes back here. -->
<header>TODO: Add status and link sharing here</header>
<h1>Alright {$page.query.get('name')}, when can you do?</h1>
<p>TODO: Add calendar selection</p>
<form action="/lalalal/everyone">
	<button type="submit">ONWARDS</button>
</form>
