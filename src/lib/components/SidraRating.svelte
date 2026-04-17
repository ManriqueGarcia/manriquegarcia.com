<script>
	let { rating } = $props();

	const labels = { 3: 'Buena', 4: 'Muy buena', 5: 'Excelente', sublime: 'Sublime' };
	const isSublime = $derived(rating === 'sublime');
	const numActive = $derived(isSublime ? 5 : rating);
	const total = $derived(isSublime ? 6 : 5);
	const bottles = $derived(
		Array.from({ length: total }, (_, i) => ({
			isGold: isSublime && i === 5,
			isActive: i < numActive || (isSublime && i === 5),
		}))
	);
	const ratingTitle = $derived(
		`${labels[rating]} (${isSublime ? '5+1 dorada' : String(rating) + ' de 5'})`
	);
</script>

<div class="sidra-rating" title={ratingTitle}>
	{#each bottles as b, i}
		<svg
			class="sidra-bottle"
			class:active={b.isActive}
			class:gold={b.isGold}
			viewBox="0 0 24 48"
			width="18"
			height="36"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<rect x="9" y="0" width="6" height="4" rx="1" />
			<rect x="10" y="4" width="4" height="8" rx="1" />
			<path d="M10 12 Q10 16 6 18 L6 18 L18 18 Q14 16 14 12 Z" />
			<rect x="6" y="18" width="12" height="24" rx="2" />
			<rect x="8" y="24" width="8" height="10" rx="1" class="label" />
			<rect x="5" y="42" width="14" height="3" rx="1.5" />
		</svg>
	{/each}
	<span class="sidra-label" class:sublime-label={isSublime}>{labels[rating]}</span>
</div>

<style>
	.sidra-rating {
		display: flex;
		align-items: center;
		gap: 0.2rem;
		margin: 0.5rem 0;
	}
	.sidra-bottle {
		fill: #d4d0c8;
		transition: fill 0.3s;
	}
	.sidra-bottle.active {
		fill: #1a6b3c;
	}
	.sidra-bottle.gold {
		fill: #c8a415;
		filter: drop-shadow(0 0 3px rgba(200, 164, 21, 0.5));
	}
	.sidra-bottle :global(.label) {
		fill: #f5f0e8;
		opacity: 0.5;
	}
	.sidra-bottle.active :global(.label) {
		fill: #f5f0e8;
		opacity: 0.8;
	}
	.sidra-bottle.gold :global(.label) {
		fill: #fff8e0;
		opacity: 0.9;
	}
	.sidra-label {
		font-size: 0.78rem;
		color: #6b6b6b;
		margin-left: 0.4rem;
		font-weight: 500;
	}
	.sublime-label {
		color: #b8960f;
		font-weight: 700;
		font-style: italic;
	}
</style>
