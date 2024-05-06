<!-- ColorPicker.svelte -->
<script>
	let selectedColor = '';

	const selectColor = (color) => {
		selectedColor = color;
	};
</script>

<div>
	<div style="width: 20px; height: 20px; background-color: {selectedColor};"></div>
	<button on:click={() => selectColor('red')}>Red</button>
	<button on:click={() => selectColor('blue')}>Blue</button>
	<button on:click={() => selectColor('green')}>Green</button>
</div>
