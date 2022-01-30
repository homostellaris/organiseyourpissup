<script context="module">
	import Datepicker from "praecox-datepicker"
</script>

<script>
	export let selected
</script>

<div class="datepicker">
	<Datepicker
		disabled={['1970-01-01', new Date()]}
		finishBtn={false}
		pickerRule={'free'}
		bind:selected={selected}
	/>
</div>

<style>
	.datepicker {
		--praecox-calendar-custom-number-font-family: 'Amatic SC', cursive;
		--praecox-calendar-custom-font-main-color: #181818;

		margin: 1rem;
	}
</style>
