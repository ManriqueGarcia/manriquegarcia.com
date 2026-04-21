<script>
	import '../app.css';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';
	import SearchSpotlight from '$lib/components/SearchSpotlight.svelte';

	const KONAMI_SEQUENCE = [
		'ArrowUp',
		'ArrowUp',
		'ArrowDown',
		'ArrowDown',
		'ArrowLeft',
		'ArrowRight',
		'ArrowLeft',
		'ArrowRight',
		'b',
		'a'
	];

	/** @param {KeyboardEvent} e */
	function normalizeKonamiKey(e) {
		const k = e.key;
		if (k === 'ArrowUp' || k === 'ArrowDown' || k === 'ArrowLeft' || k === 'ArrowRight') {
			return k;
		}
		if (k.length === 1 && /[a-zA-Z]/.test(k)) {
			return k.toLowerCase();
		}
		return null;
	}

	/** @param {EventTarget | null} t */
	function isEditableTarget(t) {
		if (!t || !(t instanceof HTMLElement)) return false;
		if (t.isContentEditable) return true;
		const tag = t.tagName;
		return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
	}

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
		'/favoritos',
		'/blog',
		'/blog/cachopo',
		'/blog/sidra',
		'/blog/descenso-del-sella',
		'/blog/gijon-vs-oviedo',
		'/faq',
		'/quiz',
		'/en',
		'/plan',
		'/culines',
		'/presupuesto',
		'/hoy',
		'/rutas'
	]);

	let showLayoutFallbackDescription = $derived(
		!ROUTES_WITH_PAGE_DESCRIPTION.has($page.url.pathname)
	);

	let theme = $state(/** @type {'light' | 'dark'} */ ('light'));
	let themeHydrated = $state(false);
	let mobileMenuOpen = $state(false);
	let searchOpen = $state(false);
	let showKonamiOverlay = $state(false);
	let showSidraToast = $state(false);

	/** @type {ReturnType<typeof setTimeout> | null} */
	let konamiHideTimer = null;
	/** @type {ReturnType<typeof setTimeout> | null} */
	let sidraEffectTimer = null;

	onMount(() => {
		const stored = localStorage.getItem('theme');
		if (stored === 'dark' || stored === 'light') {
			theme = stored;
		}
		themeHydrated = true;
	});

	onMount(() => {
		if (!browser) return;

		let konamiIndex = 0;
		let sidraBuffer = '';

		/** @param {KeyboardEvent} e */
		function onDocKeyDown(e) {
			const nk = normalizeKonamiKey(e);
			if (nk !== null) {
				if (nk === KONAMI_SEQUENCE[konamiIndex]) {
					konamiIndex++;
					if (konamiIndex >= KONAMI_SEQUENCE.length) {
						konamiIndex = 0;
						if (konamiHideTimer) clearTimeout(konamiHideTimer);
						showKonamiOverlay = true;
						konamiHideTimer = setTimeout(() => {
							showKonamiOverlay = false;
							konamiHideTimer = null;
						}, 3000);
					}
				} else {
					konamiIndex = nk === KONAMI_SEQUENCE[0] ? 1 : 0;
				}
			} else {
				konamiIndex = 0;
			}

			if (!isEditableTarget(e.target) && !e.ctrlKey && !e.metaKey && !e.altKey) {
				const ch = e.key;
				if (ch.length === 1 && /[a-zA-Z]/.test(ch)) {
					sidraBuffer = (sidraBuffer + ch.toLowerCase()).slice(-12);
					if (sidraBuffer.endsWith('sidra')) {
						sidraBuffer = '';
						if (sidraEffectTimer) clearTimeout(sidraEffectTimer);
						document.body.classList.add('easter-egg-sidra-tint');
						showSidraToast = true;
						sidraEffectTimer = setTimeout(() => {
							document.body.classList.remove('easter-egg-sidra-tint');
							showSidraToast = false;
							sidraEffectTimer = null;
						}, 2000);
					}
				}
			}
		}

		window.addEventListener('keydown', onDocKeyDown, true);
		return () => {
			window.removeEventListener('keydown', onDocKeyDown, true);
			if (konamiHideTimer) clearTimeout(konamiHideTimer);
			if (sidraEffectTimer) clearTimeout(sidraEffectTimer);
			document.body.classList.remove('easter-egg-sidra-tint');
		};
	});

	$effect(() => {
		if (!themeHydrated) return;
		document.documentElement.dataset.theme = theme;
		localStorage.setItem('theme', theme);
	});

	$effect(() => {
		void $page.url.pathname;
		mobileMenuOpen = false;
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
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
		<nav class="main-nav" aria-label="Navegación principal">
			<div class="nav-desktop">
				<a href="/" class:active={$page.url.pathname === '/'}>Inicio</a>
				<a href="/restaurantes" class:active={$page.url.pathname.startsWith('/restaurantes')}>Restaurantes</a>
				<a href="/bares" class:active={$page.url.pathname.startsWith('/bares')}>Bares y Cafés</a>
				<a href="/visitar" class:active={$page.url.pathname.startsWith('/visitar')}>Qué visitar</a>
				<a href="/hoteles" class:active={$page.url.pathname.startsWith('/hoteles')}>Hoteles</a>
				<a href="/mapa" class:active={$page.url.pathname.startsWith('/mapa')}>Mapa</a>
				<a href="/diccionario" class:active={$page.url.pathname.startsWith('/diccionario')}>Diccionario</a>
				<a href="/practico" class:active={$page.url.pathname.startsWith('/practico')}>Práctico</a>
				<a href="/fiestas" class:active={$page.url.pathname.startsWith('/fiestas')}>Fiestas</a>
				<a href="/hoy" class:active={$page.url.pathname.startsWith('/hoy')}>📍 Hoy</a>
				<a href="/rutas" class:active={$page.url.pathname.startsWith('/rutas')}>🥾 Rutas</a>
				<a href="/plan" class:active={$page.url.pathname.startsWith('/plan')}>🎲 Plan</a>
				<a href="/quiz" class:active={$page.url.pathname.startsWith('/quiz')}>🧠 Quiz</a>
				<a href="/culines" class:active={$page.url.pathname.startsWith('/culines')}>🍺 Culines</a>
				<a href="/presupuesto" class:active={$page.url.pathname.startsWith('/presupuesto')}>💰 Presupuesto</a>
				<a href="/faq" class:active={$page.url.pathname.startsWith('/faq')}>FAQ</a>
				<a href="/blog" class:active={$page.url.pathname.startsWith('/blog')}>Blog</a>
				<a href="/favoritos" class:active={$page.url.pathname.startsWith('/favoritos')}>♥ Favoritos</a>
				<a href="/guia" class="nav-pdf" class:active={$page.url.pathname.startsWith('/guia')} title="Descargar guía en PDF">📄 PDF</a>
				<button
					type="button"
					class="search-hint"
					onclick={() => (searchOpen = true)}
					title="Buscar (Cmd+K)"
					aria-label="Abrir búsqueda rápida"
				>
					🔍 <kbd>⌘K</kbd>
				</button>
				<button
					type="button"
					class="theme-toggle"
					onclick={toggleTheme}
					aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
					aria-pressed={theme === 'dark'}
				>
					{theme === 'dark' ? '☀️' : '🌙'}
				</button>
			</div>

			<div class="nav-mobile">
				<button
					type="button"
					class="hamburger"
					onclick={toggleMobileMenu}
					aria-expanded={mobileMenuOpen}
					aria-controls="primary-nav-mobile-panel"
					aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
				>
					{mobileMenuOpen ? '✕' : '☰'}
				</button>
				<div
					id="primary-nav-mobile-panel"
					class="nav-links"
					class:open={mobileMenuOpen}
					aria-hidden={!mobileMenuOpen}
				>
					<a href="/" class:active={$page.url.pathname === '/'}>Inicio</a>

					<div class="nav-group">
						<div class="nav-group-label">Guía</div>
						<a href="/restaurantes" class:active={$page.url.pathname.startsWith('/restaurantes')}>Restaurantes</a>
						<a href="/bares" class:active={$page.url.pathname.startsWith('/bares')}>Bares y Cafés</a>
						<a href="/visitar" class:active={$page.url.pathname.startsWith('/visitar')}>Qué visitar</a>
						<a href="/hoteles" class:active={$page.url.pathname.startsWith('/hoteles')}>Hoteles</a>
						<a href="/mapa" class:active={$page.url.pathname.startsWith('/mapa')}>Mapa</a>
						<a href="/fiestas" class:active={$page.url.pathname.startsWith('/fiestas')}>Fiestas</a>
						<a href="/diccionario" class:active={$page.url.pathname.startsWith('/diccionario')}>Diccionario</a>
						<a href="/practico" class:active={$page.url.pathname.startsWith('/practico')}>Práctico</a>
					</div>

					<div class="nav-group">
						<div class="nav-group-label">Interactivo</div>
						<a href="/hoy" class:active={$page.url.pathname.startsWith('/hoy')}>📍 Hoy</a>
						<a href="/rutas" class:active={$page.url.pathname.startsWith('/rutas')}>🥾 Rutas</a>
						<a href="/plan" class:active={$page.url.pathname.startsWith('/plan')}>🎲 Plan</a>
						<a href="/quiz" class:active={$page.url.pathname.startsWith('/quiz')}>🧠 Quiz</a>
						<a href="/culines" class:active={$page.url.pathname.startsWith('/culines')}>🍺 Culines</a>
						<a href="/presupuesto" class:active={$page.url.pathname.startsWith('/presupuesto')}>💰 Presupuesto</a>
					</div>

					<div class="nav-group">
						<div class="nav-group-label">Más</div>
						<a href="/faq" class:active={$page.url.pathname.startsWith('/faq')}>FAQ</a>
						<a href="/blog" class:active={$page.url.pathname.startsWith('/blog')}>Blog</a>
						<a href="/favoritos" class:active={$page.url.pathname.startsWith('/favoritos')}>♥ Favoritos</a>
						<a href="/guia" class="nav-pdf" class:active={$page.url.pathname.startsWith('/guia')} title="Descargar guía en PDF">📄 PDF</a>
						<a href="/en" class:active={$page.url.pathname === '/en' || $page.url.pathname.startsWith('/en/')}>🇬🇧 English</a>
					</div>

					<button
						type="button"
						class="theme-toggle theme-toggle-mobile-panel"
						onclick={toggleTheme}
						aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
						aria-pressed={theme === 'dark'}
					>
						{theme === 'dark' ? '☀️' : '🌙'}
					</button>
				</div>
			</div>
		</nav>
	</div>
</header>

<SearchSpotlight bind:open={searchOpen} />

{#key $page.url.pathname}
	<div in:fly={{ y: 10, duration: 300, delay: 150 }} out:fly={{ y: -10, duration: 150 }}>
		{@render children()}
	</div>
{/key}

<footer>
	<div class="container">
		<nav class="footer-nav" aria-label="Mapa del sitio">
			<a href="/">Inicio</a>
			<a href="/restaurantes">Restaurantes</a>
			<a href="/bares">Bares</a>
			<a href="/visitar">Qué visitar</a>
			<a href="/hoteles">Hoteles</a>
			<a href="/mapa">Mapa</a>
			<a href="/diccionario">Diccionario</a>
			<a href="/practico">Práctico</a>
			<a href="/fiestas">Fiestas</a>
			<a href="/hoy">Hoy</a>
			<a href="/rutas">Rutas</a>
			<a href="/plan">Plan random</a>
			<a href="/quiz">Quiz</a>
			<a href="/culines">Culines</a>
			<a href="/presupuesto">Presupuesto</a>
			<a href="/faq">FAQ</a>
			<a href="/blog">Blog</a>
			<a href="/guia">Guía PDF</a>
			<a href="/en">🇬🇧 English</a>
		</nav>
		<p class="footer-copy">{@html `&copy; ${year} manriquegarcia.com &mdash; Fechu con cariñu y sidra`}</p>
	</div>
</footer>

{#if showKonamiOverlay}
	<div
		class="easter-konami-overlay"
		role="dialog"
		aria-modal="true"
		aria-labelledby="easter-konami-title"
	>
		<div class="easter-konami-apples" aria-hidden="true">
			{#each Array.from({ length: 28 }, (_, i) => i) as i (i)}
				<span
					class="easter-konami-apple"
					style="--x: {(i * 47) % 92}%; --fall-delay: {i * 0.09}s; --drift: {(i % 5 - 2) * 8}px;"
				>🍎</span>
			{/each}
		</div>
		<div class="easter-konami-content">
			<h2 id="easter-konami-title">🍎 ¡MODO SIDRA ACTIVADO! 🍎</h2>
			<p class="easter-konami-sub">Yes un auténticu asturianu</p>
		</div>
	</div>
{/if}

{#if showSidraToast}
	<div class="easter-sidra-toast" role="status">🍏 ¡Invocast la sidra!</div>
{/if}

<style>
	.main-nav {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
	}

	.nav-desktop {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
	}

	.nav-mobile {
		display: none;
		width: 100%;
		flex-direction: column;
		align-items: stretch;
		gap: 0;
	}

	.hamburger {
		display: none;
		appearance: none;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		margin: 0 auto;
		padding: 0;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.06);
		color: inherit;
		font-size: 0.95rem;
		line-height: 1;
		cursor: pointer;
		transition:
			background 0.2s,
			border-color 0.2s;
	}

	.hamburger:hover {
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.35);
	}

	.nav-links {
		display: none;
	}

	.nav-group {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		margin-bottom: 0.75rem;
	}

	.nav-group:last-of-type {
		margin-bottom: 0.5rem;
	}

	.nav-group-label {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgba(245, 240, 232, 0.55);
		margin: 0.5rem 0 0.35rem;
	}

	.nav-group-label:first-child {
		margin-top: 0;
	}

	.theme-toggle-mobile-panel {
		margin-top: 0.75rem;
		align-self: center;
	}

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

	.search-hint {
		display: none;
		align-items: center;
		gap: 0.35rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		font-size: 0.8rem !important;
		font-family: inherit;
		font-weight: 500;
		padding: 0.35rem 0.65rem;
		border-radius: 6px;
		background: transparent;
		color: rgba(245, 240, 232, 0.75);
		cursor: pointer;
		line-height: 1;
		transition: all 0.2s;
		vertical-align: middle;
	}

	.search-hint:hover {
		color: var(--color-hero-text);
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.35);
	}

	.search-hint kbd {
		display: inline-block;
		padding: 0.15rem 0.4rem;
		font-size: 0.65rem;
		font-family: inherit;
		line-height: 1.2;
		color: rgba(245, 240, 232, 0.65);
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 5px;
	}

	@media (min-width: 900px) {
		.search-hint {
			display: inline-flex;
		}
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

	@media (max-width: 767px) {
		.nav-desktop {
			display: none;
		}

		.nav-mobile {
			display: flex;
		}

		.hamburger {
			display: flex;
		}

		.nav-links {
			display: block;
			width: calc(100% + 3rem);
			margin-left: -1.5rem;
			margin-right: -1.5rem;
			padding: 0 1.5rem 0.85rem;
			box-sizing: border-box;
			max-height: 0;
			overflow: hidden;
			transition: max-height 0.4s ease;
			background: var(--color-hero-bg);
			border-top: 1px solid rgba(255, 255, 255, 0.08);
		}

		.nav-links.open {
			max-height: min(88vh, 1400px);
		}

		.nav-links :global(a) {
			display: block;
			padding: 0.45rem 0.75rem;
			border-radius: 6px;
		}
	}

	/* --- Easter eggs: Konami + sidra spell --- */
	:global(body.easter-egg-sidra-tint)::before {
		content: '';
		position: fixed;
		inset: 0;
		z-index: 99997;
		pointer-events: none;
		background: rgba(34, 197, 94, 0.14);
		mix-blend-mode: multiply;
		animation: easter-sidra-tint-in 0.35s ease-out;
	}

	@keyframes easter-sidra-tint-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.easter-konami-overlay {
		position: fixed;
		inset: 0;
		z-index: 100000;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(12, 20, 28, 0.88);
		backdrop-filter: blur(4px);
		animation: easter-konami-fade-in 0.35s ease-out;
	}

	@keyframes easter-konami-fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.easter-konami-apples {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.easter-konami-apple {
		position: absolute;
		top: -2.5rem;
		left: var(--x);
		font-size: 1.75rem;
		line-height: 1;
		animation: easter-konami-rain 2.8s linear var(--fall-delay) infinite;
		transform: translateX(var(--drift));
		opacity: 0.95;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35));
	}

	@keyframes easter-konami-rain {
		0% {
			transform: translate(-50%, -10vh) translateX(var(--drift)) rotate(0deg);
		}
		100% {
			transform: translate(-50%, 110vh) translateX(var(--drift)) rotate(360deg);
		}
	}

	.easter-konami-content {
		position: relative;
		z-index: 2;
		text-align: center;
		padding: 1.5rem;
		max-width: 90vw;
	}

	.easter-konami-content h2 {
		margin: 0 0 0.5rem;
		font-size: clamp(1.35rem, 4vw, 2rem);
		font-weight: 800;
		color: #f5f0e8;
		text-shadow:
			0 0 20px rgba(34, 197, 94, 0.45),
			0 2px 12px rgba(0, 0, 0, 0.5);
		line-height: 1.2;
	}

	.easter-konami-sub {
		margin: 0;
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		color: rgba(245, 240, 232, 0.9);
		font-style: italic;
	}

	.easter-sidra-toast {
		position: fixed;
		bottom: 1.25rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 99999;
		padding: 0.65rem 1.25rem;
		border-radius: 999px;
		background: var(--color-card, #fff);
		color: var(--color-text, #162022);
		border: 2px solid rgba(34, 197, 94, 0.55);
		box-shadow:
			0 8px 28px rgba(0, 0, 0, 0.18),
			0 0 0 1px rgba(255, 255, 255, 0.06) inset;
		font-weight: 600;
		font-size: 0.95rem;
		animation: easter-sidra-toast-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes easter-sidra-toast-pop {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(12px) scale(0.92);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0) scale(1);
		}
	}
</style>
