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

	const ASTURIAN_PHRASES = [
		'Asturies ye sidra, mar y montaña',
		'Nun hai pan duru pa bona sidra',
		'En Asturies, el paraguas ye complementu obligatoriu',
		'Más vale culín en mano que botella per abrir',
		'Si nun llueve, nun ye Asturies',
		'Fai un día ñubláu... como siempre',
		'Aquí comemos como si mañana nun existiera',
		'En Xixón, la playa ye el salón de casa',
		'Puxa Sporting, pase lo que pase',
		'La fabada nun entiende de dietas',
		'Esti paraísu natural ta meyor con sidra',
		'Que nun te engañe el sol: lleva chubasqueru',
		'De cañes por Xixón, ¿qué puede salir mal?',
		'Asturies nun se visita, Asturies se vive',
		'Si la vida te da manzanes, fai sidra'
	];

	let asturianPhrase = $state(
		ASTURIAN_PHRASES[Math.floor(Math.random() * ASTURIAN_PHRASES.length)]
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
		<div class="brand">
			<span class="header-flags" aria-hidden="true">
				<!-- Bandera de Asturias -->
				<svg class="hf" viewBox="0 0 60 40" title="Asturies">
					<defs><clipPath id="fa"><rect width="60" height="40" rx="3"/></clipPath></defs>
					<g clip-path="url(#fa)">
						<rect width="60" height="40" fill="#005DAA"/>
						<g transform="translate(30,18)">
							<line y1="-12" y2="14" stroke="#D4A017" stroke-width="2.8" stroke-linecap="round"/>
							<line x1="-8" x2="8" y1="-3" y2="-3" stroke="#D4A017" stroke-width="2.8" stroke-linecap="round"/>
							<circle cx="-8" cy="-3" r="1.8" fill="#D4A017"/>
							<circle cx="8" cy="-3" r="1.8" fill="#D4A017"/>
							<circle cx="0" cy="-12" r="1.8" fill="#D4A017"/>
							<circle cx="0" cy="14" r="1.8" fill="#D4A017"/>
							<text x="-13" y="-5" font-size="7.5" fill="#D4A017" font-family="serif" text-anchor="middle">α</text>
							<text x="13" y="-5" font-size="7.5" fill="#D4A017" font-family="serif" text-anchor="middle">ω</text>
						</g>
					</g>
				</svg>
				<!-- Escudo de Gijón/Xixón: azul + rey Pelayo con cruz dorada -->
				<svg class="hf hf-shield" viewBox="0 0 40 48" title="Xixón">
					<defs><clipPath id="fg"><path d="M2 0h36a2 2 0 012 2v28c0 6-10 16-20 18C10 46 0 36 0 30V2a2 2 0 012-2z"/></clipPath></defs>
					<g clip-path="url(#fg)">
						<rect width="40" height="48" fill="#0C4B78"/>
						<rect x="0" y="0" width="40" height="6" fill="#D4A017"/>
						<g transform="translate(20,26)" fill="#D4A017">
							<ellipse cx="0" cy="-10" rx="3" ry="3.5"/>
							<rect x="-4.5" y="-7" width="9" height="14" rx="2"/>
							<rect x="-7" y="-5" width="4" height="10" rx="1.5" transform="rotate(-12,-5,0)"/>
							<rect x="3" y="-5" width="4" height="10" rx="1.5" transform="rotate(12,5,0)"/>
							<rect x="-2" y="6" width="3.5" height="9" rx="1"/>
							<rect x="-1" y="6" width="3.5" height="9" rx="1"/>
						</g>
						<g transform="translate(30,14)" stroke="#D4A017" stroke-width="1.6" stroke-linecap="round" fill="none">
							<line y1="-8" y2="6"/>
							<line x1="-4" x2="4" y1="-4" y2="-4"/>
						</g>
					</g>
					<path d="M2 0h36a2 2 0 012 2v28c0 6-10 16-20 18C10 46 0 36 0 30V2a2 2 0 012-2z" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
				</svg>
				<!-- Escudo oficial del Real Sporting de Gijón -->
				<img
					class="hf hf-shield"
					src="/images/sporting-gijon.svg"
					alt="Real Sporting de Gijón"
					title="Real Sporting de Gijón"
					width="17"
					height="20"
					loading="lazy"
					decoding="async"
				/>
			</span>
			<a href="/" class="site-title">¡Puxa Asturies!</a>
			<p class="header-subtitle">{asturianPhrase}</p>
		</div>
		<div class="header-actions">
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
		</nav>
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
	.brand {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.15rem;
	}

	.header-flags {
		display: flex;
		align-items: flex-end;
		gap: 5px;
		opacity: 0.65;
		transition: opacity 0.3s ease;
	}

	.brand:hover .header-flags {
		opacity: 1;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	.theme-toggle {
		flex-shrink: 0;
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.06);
		color: inherit;
		font-size: 1rem;
		line-height: 1;
		cursor: pointer;
		transition: background 0.2s, border-color 0.2s;
	}

	.theme-toggle:hover {
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.35);
	}

	.header-subtitle {
		font-size: 0.72rem;
		font-style: italic;
		color: rgba(255, 255, 255, 0.5);
		margin: 0;
		line-height: 1.35;
		max-width: min(100%, 42ch);
	}

	@media (max-width: 640px) {
		.header-actions {
			justify-content: center;
			width: 100%;
		}

		.header-subtitle {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 100%;
		}
	}

	.nav-pdf {
		border: 1px solid rgba(255,255,255,0.2);
		font-size: 0.8rem !important;
	}

	.hf {
		width: 28px;
		height: 19px;
		display: block;
		filter: drop-shadow(0 1px 2px rgba(0,0,0,0.35));
	}

	.hf-shield {
		width: 17px;
		height: 20px;
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
