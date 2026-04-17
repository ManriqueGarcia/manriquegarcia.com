<script>
	import { favorites, removeFavorite } from '$lib/stores/favorites.svelte.js';

	/** @param {string} slug */
	function hrefFor(slug) {
		if (slug.startsWith('rest-')) return '/restaurantes';
		if (slug.startsWith('hotel-')) return '/hoteles';
		if (slug.startsWith('pueblo-')) return '/visitar';
		return '/';
	}

	const pageTitle = 'Favoritos | ¡Puxa Asturies!';
	const pageDesc = 'Tus restaurantes, hoteles y pueblos guardados de la guía ¡Puxa Asturies!.';
	const canonical = 'https://manriquegarcia.com/favoritos';
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="robots" content="noindex" />
	<meta name="description" content={pageDesc} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDesc} />
	<meta property="og:site_name" content="¡Puxa Asturies!" />
	<meta property="og:locale" content="es_ES" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDesc} />
	<meta property="og:image" content="https://manriquegarcia.com/images/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
</svelte:head>

<main class="container">
	<h1>Tu ruta personalizada</h1>

	{#if favorites.items.length === 0}
		<p class="empty">
			Aún no has guardado nada. Dale al ♡ en cualquier restaurante, hotel o lugar pa añadirlo aquí.
		</p>
	{:else}
		<ul class="fav-list">
			{#each favorites.items as item (item.slug)}
				<li class="fav-item">
					<a href={hrefFor(item.slug)} class="fav-link">{item.name}</a>
					<button
						type="button"
						class="remove-btn"
						onclick={() => removeFavorite(item.slug)}
						aria-label={`Quitar ${item.name}`}
					>
						Quitar
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</main>

<style>
	.empty {
		max-width: 36rem;
		font-size: 1.05rem;
		line-height: 1.55;
		color: var(--color-text-muted);
	}

	.fav-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0 0;
		max-width: 32rem;
	}

	.fav-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.65rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	.fav-link {
		font-weight: 600;
		color: var(--color-accent);
		text-decoration: none;
	}

	.fav-link:hover {
		text-decoration: underline;
	}

	.remove-btn {
		appearance: none;
		flex-shrink: 0;
		border: 1px solid var(--color-border);
		background: var(--color-card);
		color: var(--color-text-muted);
		padding: 0.35rem 0.65rem;
		border-radius: 6px;
		font: inherit;
		font-size: 0.85rem;
		cursor: pointer;
	}

	.remove-btn:hover {
		border-color: #c41e3a;
		color: #c41e3a;
	}
</style>
