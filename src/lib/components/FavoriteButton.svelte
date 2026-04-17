<script>
	import { favorites, toggleFavorite } from '$lib/stores/favorites.svelte.js';

	let { slug, name } = $props();

	let active = $state(false);

	$effect(() => {
		void favorites.items;
		active = favorites.items.some((f) => f.slug === slug);
	});

	function onclick() {
		toggleFavorite(slug, name);
	}
</script>

<button
	type="button"
	class="favorite-btn"
	class:is-active={active}
	onclick={onclick}
	aria-pressed={active}
	aria-label={active ? `Quitar ${name} de favoritos` : `Guardar ${name} en favoritos`}
	title={active ? 'Quitar de favoritos' : 'Añadir a favoritos'}
>
	<span class="heart" aria-hidden="true">{active ? '♥' : '♡'}</span>
</button>

<style>
	.favorite-btn {
		appearance: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		vertical-align: middle;
		width: 2rem;
		height: 2rem;
		padding: 0;
		border: none;
		border-radius: 999px;
		background: transparent;
		color: var(--color-text-muted);
		font-size: 1.15rem;
		line-height: 1;
		cursor: pointer;
		transition:
			color 0.15s ease,
			transform 0.1s ease;
	}

	.favorite-btn:hover {
		transform: scale(1.08);
		color: #c41e3a;
	}

	.favorite-btn.is-active {
		color: #c41e3a;
	}

	.heart {
		display: block;
	}
</style>
