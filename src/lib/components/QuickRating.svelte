<script>
	const VOTES_KEY = 'votes';

	let { itemId, label = '¿Qué tal?' } = $props();

	let rating = $state(/** @type {number | null} */ (null));

	function readVotes() {
		if (typeof window === 'undefined') return {};
		try {
			const raw = localStorage.getItem(VOTES_KEY);
			if (!raw) return {};
			const data = JSON.parse(raw);
			return typeof data === 'object' && data !== null && !Array.isArray(data) ? data : {};
		} catch {
			return {};
		}
	}

	function writeVote(value) {
		if (typeof window === 'undefined') return;
		const all = readVotes();
		const next = { ...all, [itemId]: value };
		localStorage.setItem(VOTES_KEY, JSON.stringify(next));
	}

	$effect(() => {
		void itemId;
		const all = readVotes();
		const v = all[itemId];
		rating = typeof v === 'number' && v >= 1 && v <= 5 ? v : null;
	});

	function setStar(n) {
		rating = n;
		writeVote(n);
	}
</script>

<div class="quick-rating" data-item-id={itemId}>
	<span class="label">{label}</span>
	<div class="stars" role="group" aria-label={label}>
		{#each [1, 2, 3, 4, 5] as n (n)}
			<button
				type="button"
				class="star"
				class:is-on={rating != null && n <= rating}
				onclick={() => setStar(n)}
				aria-label={`${n} estrellas`}
				aria-pressed={rating === n}
			>
				★
			</button>
		{/each}
	</div>
	{#if rating != null}
		<p class="vote-msg">Tu voto: {rating} ★ — pulsa otra estrella si quies cambiar.</p>
	{/if}
</div>

<style>
	.quick-rating {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.35rem 0.5rem;
		margin-top: 0.5rem;
		font-size: 0.88rem;
	}

	.label {
		color: var(--color-text-muted);
		margin-right: 0.15rem;
	}

	.stars {
		display: inline-flex;
		gap: 0.1rem;
	}

	.star {
		appearance: none;
		border: none;
		background: transparent;
		padding: 0 0.08rem;
		font-size: 1.1rem;
		line-height: 1;
		color: var(--color-border);
		cursor: pointer;
		transition: color 0.12s ease, transform 0.1s ease;
	}

	.star:hover {
		transform: scale(1.12);
		color: #d4a017;
	}

	.star.is-on {
		color: #d4a017;
	}

	.vote-msg {
		width: 100%;
		margin: 0.25rem 0 0;
		font-size: 0.82rem;
		color: var(--color-text-muted);
	}

</style>
