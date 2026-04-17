<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';

	let { children } = $props();

	const year = new Date().getFullYear();
</script>

<svelte:head>
	<meta
		name="description"
		content="La guía que necesites pa nun perdete, comer como un xixonencu y nun pedir un café equivocáu"
	/>
</svelte:head>

<header>
	<div class="container">
		<div class="brand">
			<a href="/" class="site-title">¡Puxa Asturies!</a>
			<span class="header-flags" aria-hidden="true" title="Asturies · Xixón · Sporting">
				<!-- Asturias: azul + Cruz de la Victoria -->
				<svg class="hf" viewBox="0 0 30 20">
					<defs><clipPath id="fa"><rect width="30" height="20" rx="2.5"/></clipPath></defs>
					<g clip-path="url(#fa)">
						<rect width="30" height="20" fill="#005DAA"/>
						<line x1="15" y1="3.5" x2="15" y2="17" stroke="#D4A017" stroke-width="1.6" stroke-linecap="round"/>
						<line x1="10.5" y1="8" x2="19.5" y2="8" stroke="#D4A017" stroke-width="1.6" stroke-linecap="round"/>
						<text x="8" y="9.5" font-size="4.5" fill="#D4A017" font-family="serif" text-anchor="middle">α</text>
						<text x="22" y="9.5" font-size="4.5" fill="#D4A017" font-family="serif" text-anchor="middle">ω</text>
					</g>
				</svg>
				<!-- Gijón/Xixón: azul + torre dorada -->
				<svg class="hf" viewBox="0 0 30 20">
					<defs><clipPath id="fg"><rect width="30" height="20" rx="2.5"/></clipPath></defs>
					<g clip-path="url(#fg)">
						<rect width="30" height="20" fill="#0C4B78"/>
						<rect x="10.5" y="7" width="9" height="9" rx="0.8" fill="#C9922F" opacity="0.85"/>
						<rect x="9.5" y="4.5" width="11" height="3.5" rx="0.5" fill="#C9922F" opacity="0.85"/>
						<rect x="11.5" y="4.5" width="1.8" height="2" fill="#0C4B78"/>
						<rect x="14.1" y="4.5" width="1.8" height="2" fill="#0C4B78"/>
						<rect x="16.7" y="4.5" width="1.8" height="2" fill="#0C4B78"/>
						<rect x="13" y="11" width="4" height="5" rx="2" fill="#0C4B78"/>
					</g>
				</svg>
				<!-- Sporting: rojiblanco -->
				<svg class="hf" viewBox="0 0 30 20">
					<defs><clipPath id="fs"><rect width="30" height="20" rx="2.5"/></clipPath></defs>
					<g clip-path="url(#fs)">
						<rect width="30" height="20" fill="#fff"/>
						<rect width="5" height="20" fill="#CC2229"/>
						<rect x="10" width="5" height="20" fill="#CC2229"/>
						<rect x="20" width="5" height="20" fill="#CC2229"/>
					</g>
				</svg>
			</span>
		</div>
		<nav>
			<a href="/" class:active={$page.url.pathname === '/'}>Inicio</a>
			<a href="/restaurantes" class:active={$page.url.pathname.startsWith('/restaurantes')}>Restaurantes</a>
			<a href="/bares" class:active={$page.url.pathname.startsWith('/bares')}>Bares y Cafés</a>
			<a href="/visitar" class:active={$page.url.pathname.startsWith('/visitar')}>Qué visitar</a>
			<a href="/hoteles" class:active={$page.url.pathname.startsWith('/hoteles')}>Hoteles</a>
			<a href="/mapa" class:active={$page.url.pathname.startsWith('/mapa')}>Mapa</a>
			<a href="/diccionario" class:active={$page.url.pathname.startsWith('/diccionario')}>Diccionario</a>
			<a href="/guia" class="nav-pdf" class:active={$page.url.pathname.startsWith('/guia')} title="Descargar guía en PDF">📄 PDF</a>
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
		{@html `&copy; ${year} manriquegarcia.com &mdash; Fechu con cariñu y sidra`}
	</div>
</footer>

<style>
	.brand {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.header-flags {
		display: flex;
		align-items: center;
		gap: 3px;
		opacity: 0.3;
		transition: opacity 0.4s ease;
	}

	.brand:hover .header-flags {
		opacity: 0.85;
	}

	.nav-pdf {
		border: 1px solid rgba(255,255,255,0.2);
		font-size: 0.8rem !important;
	}

	.hf {
		width: 16px;
		height: 11px;
		border-radius: 1.5px;
		display: block;
		filter: drop-shadow(0 1px 1px rgba(0,0,0,0.25));
	}
</style>
