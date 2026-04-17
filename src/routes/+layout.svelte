<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let { children } = $props();

	const year = new Date().getFullYear();

	/** Rutas con `<meta name="description">` propia en su `+page.svelte` — el fallback del layout no se duplica. */
	const ROUTES_WITH_PAGE_DESCRIPTION = new Set([
		'/',
		'/restaurantes',
		'/bares',
		'/visitar',
		'/hoteles',
		'/mapa',
		'/diccionario',
		'/practico',
		'/fiestas',
		'/guia',
		'/favoritos'
	]);

	let showLayoutFallbackDescription = $derived(
		!ROUTES_WITH_PAGE_DESCRIPTION.has($page.url.pathname)
	);

	let theme = $state(/** @type {'light' | 'dark'} */ ('light'));
	let themeHydrated = $state(false);

	onMount(() => {
		const stored = localStorage.getItem('theme');
		if (stored === 'dark' || stored === 'light') {
			theme = stored;
		}
		themeHydrated = true;
	});

	$effect(() => {
		if (!themeHydrated) return;
		document.documentElement.dataset.theme = theme;
		localStorage.setItem('theme', theme);
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
	}
</script>

<svelte:head>
	{#if showLayoutFallbackDescription}
		<meta
			name="description"
			content="La guía que necesites pa nun perdete, comer como un xixonencu y nun pedir un café equivocáu"
		/>
	{/if}
</svelte:head>

<header>
	<div class="container">
		<nav aria-label="Navegación principal">
			<a href="/" class:active={$page.url.pathname === '/'}>Inicio</a>
			<a href="/restaurantes" class:active={$page.url.pathname.startsWith('/restaurantes')}>Restaurantes</a>
			<a href="/bares" class:active={$page.url.pathname.startsWith('/bares')}>Bares y Cafés</a>
			<a href="/visitar" class:active={$page.url.pathname.startsWith('/visitar')}>Qué visitar</a>
			<a href="/hoteles" class:active={$page.url.pathname.startsWith('/hoteles')}>Hoteles</a>
			<a href="/mapa" class:active={$page.url.pathname.startsWith('/mapa')}>Mapa</a>
			<a href="/diccionario" class:active={$page.url.pathname.startsWith('/diccionario')}>Diccionario</a>
			<a href="/practico" class:active={$page.url.pathname.startsWith('/practico')}>Práctico</a>
			<a href="/fiestas" class:active={$page.url.pathname.startsWith('/fiestas')}>Fiestas</a>
			<a href="/favoritos" class:active={$page.url.pathname.startsWith('/favoritos')}>♥ Favoritos</a>
			<a href="/guia" class="nav-pdf" class:active={$page.url.pathname.startsWith('/guia')} title="Descargar guía en PDF">📄 PDF</a>
			<button
				type="button"
				class="theme-toggle"
				onclick={toggleTheme}
				aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
				aria-pressed={theme === 'dark'}
			>
				{theme === 'dark' ? '☀️' : '🌙'}
			</button>
		</nav>
	</div>
</header>

{#key $page.url.pathname}
	<div in:fly={{ y: 10, duration: 300, delay: 150 }} out:fly={{ y: -10, duration: 150 }}>
		{@render children()}
	</div>
{/key}

<footer>
	<div class="container">
		<nav class="footer-nav" aria-label="Mapa del sitio">
			<a href="/restaurantes">Restaurantes</a>
			<a href="/bares">Bares</a>
			<a href="/visitar">Qué visitar</a>
			<a href="/hoteles">Hoteles</a>
			<a href="/mapa">Mapa</a>
			<a href="/diccionario">Diccionario</a>
			<a href="/practico">Práctico</a>
			<a href="/fiestas">Fiestas</a>
		</nav>
		<p class="footer-copy">{@html `&copy; ${year} manriquegarcia.com &mdash; Fechu con cariñu y sidra`}</p>
	</div>
</footer>

<style>
	.theme-toggle {
		appearance: none;
		width: 1.75rem;
		height: 1.75rem;
		padding: 0;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.06);
		color: inherit;
		font-size: 0.85rem;
		line-height: 1;
		cursor: pointer;
		vertical-align: middle;
		transition: background 0.2s, border-color 0.2s;
	}

	.theme-toggle:hover {
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.35);
	}

	.nav-pdf {
		border: 1px solid rgba(255,255,255,0.2);
		font-size: 0.8rem !important;
	}

	.footer-nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem 1.25rem;
		margin-bottom: 0.75rem;
	}

	.footer-nav a {
		color: rgba(255, 255, 255, 0.6);
		text-decoration: none;
		font-size: 0.85rem;
		transition: color 0.2s;
	}

	.footer-nav a:hover {
		color: rgba(255, 255, 255, 0.9);
	}

	.footer-copy {
		margin: 0;
		font-size: 0.85rem;
		opacity: 0.5;
		text-align: center;
	}
</style>
