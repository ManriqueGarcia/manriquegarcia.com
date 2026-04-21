<script>
	import { onMount } from 'svelte';
	import WeatherWidget from '$lib/components/WeatherWidget.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import DailyChallenge from '$lib/components/DailyChallenge.svelte';

	const SCENE_CARDS = [
		{ emoji: '🏖️', caption: 'Playa de San Lorenzo', g1: '#3b82f6', g2: '#06b6d4' },
		{ emoji: '🍎', caption: 'Sidra asturiana', g1: '#22c55e', g2: '#84cc16' },
		{ emoji: '⛰️', caption: 'Picos de Europa', g1: '#6366f1', g2: '#8b5cf6' },
		{ emoji: '🏘️', caption: 'Pueblos con encanto', g1: '#f59e0b', g2: '#ef4444' },
		{ emoji: '🎪', caption: 'Fiestas y folixa', g1: '#ec4899', g2: '#f43f5e' }
	];

	/** @param {HTMLElement} node */
	function reveal(node) {
		const obs = new IntersectionObserver(
			([e]) => {
				if (e?.isIntersecting) {
					node.classList.add('revealed');
					obs.unobserve(node);
				}
			},
			{ threshold: 0.15 }
		);
		obs.observe(node);
		return {
			destroy() {
				obs.disconnect();
			}
		};
	}

	let sidrerias = $state(0);
	let fiestas = $state(0);
	let quesos = $state(0);
	let rutas = $state(0);
	let counterSectionEl = $state(/** @type {HTMLElement | null} */ (null));

	onMount(() => {
		const el = counterSectionEl;
		if (!el) return;

		let started = false;
		const obs = new IntersectionObserver(
			([e]) => {
				if (!e?.isIntersecting || started) return;
				started = true;
				obs.disconnect();

				const duration = 1500;
				const start = performance.now();
				/** @param {number} t */
				const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

				function frame(now) {
					const t = Math.min(1, (now - start) / duration);
					const e = easeOutCubic(t);
					sidrerias = Math.round(11 * e);
					fiestas = Math.round(65 * e);
					quesos = Math.round(40 * e);
					rutas = Math.round(3 * e);
					if (t < 1) {
						requestAnimationFrame(frame);
					} else {
						sidrerias = 11;
						fiestas = 65;
						quesos = 40;
						rutas = 3;
					}
				}
				requestAnimationFrame(frame);
			},
			{ threshold: 0.15 }
		);
		obs.observe(el);
		return () => obs.disconnect();
	});

	const PHRASES = [
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
		'Asturies nun se visita, Asturies se vive',
		'Si la vida te da manzanes, fai sidra'
	];
	const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];

	const pageTitle = 'Inicio | ¡Puxa Asturies!';
	const pageDesc =
		'Guía informal de Asturias: restaurantes, sidrerías, playas, pueblos y diccionario asturiano. Todo lo que necesitas pa disfrutar del Paraísu Natural.';
	const canonical = 'https://manriquegarcia.com/';
	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: '¡Puxa Asturies!',
		url: 'https://manriquegarcia.com',
		description:
			'Guía informal de Asturias: restaurantes, sidrerías, playas, pueblos y diccionario asturiano.',
		inLanguage: 'es',
		author: {
			'@type': 'Person',
			name: 'Manrique García',
			url: 'https://manriquegarcia.com'
		}
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDesc} />
	<link rel="canonical" href={canonical} />
	<link rel="alternate" hreflang="es" href={canonical} />
	<link rel="alternate" hreflang="en" href="https://manriquegarcia.com/en" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDesc} />
	<meta property="og:site_name" content="¡Puxa Asturies!" />
	<meta property="og:locale" content="es_ES" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDesc} />
	<meta property="og:image" content="https://manriquegarcia.com/images/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>

<div class="hero">
	<p class="hero-phrase">{phrase}</p>
	<div class="hero-flags" aria-hidden="true">
		<!-- Bandera de Asturias -->
		<svg class="hf" viewBox="0 0 60 40">
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
		<!-- Escudo de Gijón/Xixón -->
		<svg class="hf hf-shield" viewBox="0 0 40 48">
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
		<!-- Escudo del Real Sporting de Gijón -->
		<img class="hf hf-shield" src="/images/sporting-gijon.svg" alt="Real Sporting de Gijón" width="24" height="30" decoding="async" />
	</div>
	<h1>¡Puxa Asturies!</h1>
	<p class="subtitle">
		La guía que necesites pa nun perdete, comer como un xixonencu y nun pedir un café equivocáu
	</p>

	<div class="hero-carousel" aria-label="Escenes d'Asturies">
		<div class="hero-carousel-inner">
			<div class="hero-carousel-track">
				{#each [...SCENE_CARDS, ...SCENE_CARDS] as scene, i (i)}
					<div
						class="scene-card"
						style="--scene-g1: {scene.g1}; --scene-g2: {scene.g2}"
						aria-hidden="true"
					>
						<span class="scene-emoji">{scene.emoji}</span>
						<span class="scene-caption">{scene.caption}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<main class="container">
	<p>
		Esta web nació como la guía que hicimos para los invitados de nuestra boda. Queríamos que la
		xente que venía de fuera supiera dónde comer, qué visitar y cómo sobrevivir en Asturias sin
		parecer un bañista. Gustó tanto que decidimos mantenerla viva y abierta pa todo el mundo. Así
		que aquí la tienes: la guía que te contaría un asturiano después de tres culines de sidra.
	</p>
	<p>
		Dónde comer de verdad (nada de googlear "restaurante bonito"), dónde salir sin acabar en un
		sitio pa guiris, qué visitar pa que digas <em>"madre mía, qué guapo ye esto"</em>, dónde
		dormir sin dejarte el sueldo y, lo más importante, cómo pedir un café sin que el camarero te
		mire con cara de <em>"¿tú d'ónde vienes, bañista?"</em>.
	</p>
	<p>
		Ah, y un diccionario. Porque aquí la xente habla bable, y si no pillas lo del
		<em>culín</em>, lo del <em>escanciáu</em> y lo del <em>yes bobu</em>, vas a estar más perdíu
		que un pulpu en un garaje.
	</p>

	<DailyChallenge />

	<div class="home-weather">
		<WeatherWidget />
	</div>

	<section class="home-stats" aria-label="Datos curiosos" bind:this={counterSectionEl} use:reveal>
		<h2 class="home-stats-heading">Asturies en cifres (aprox.)</h2>
		<div class="stats-grid">
			<div class="stat">
				<span class="stat-value">{sidrerias}</span>
				<span class="stat-label">Sidrerías</span>
			</div>
			<div class="stat">
				<span class="stat-value">{fiestas}{fiestas >= 65 ? '+' : ''}</span>
				<span class="stat-label">Fiestas</span>
			</div>
			<div class="stat">
				<span class="stat-value">{quesos}{quesos >= 40 ? '+' : ''}</span>
				<span class="stat-label">Quesos</span>
			</div>
			<div class="stat">
				<span class="stat-value">{rutas}</span>
				<span class="stat-label">Rutas a pie</span>
			</div>
		</div>
	</section>

	<nav class="nav-cards" use:reveal>
		{#each [
			{
				href: '/restaurantes',
				icon: '🍽️',
				title: 'Restaurantes y Sidrerías',
				desc: 'Pa comer hasta reventar y echar unos culines'
			},
			{
				href: '/bares',
				icon: '🍺',
				title: 'Bares y Cafés',
				desc: 'De copas y del drama asturiano del café'
			},
			{
				href: '/visitar',
				icon: '🏔️',
				title: 'Qué visitar',
				desc: 'Xixón, Uviéu y pueblinos que quiten el hipo'
			},
			{
				href: '/hoteles',
				icon: '🏨',
				title: 'Hoteles',
				desc: 'Pa echase a dormir después de tanta sidra'
			},
			{
				href: '/practico',
				icon: '🧳',
				title: 'Práctico',
				desc: 'Cómo llegar, moverte y númberos que salven el día'
			},
			{
				href: '/fiestas',
				icon: '🎉',
				title: 'Fiestas',
				desc: 'Calendariu de folixa y tradición (con humor)'
			},
			{ href: '/mapa', icon: '🗺️', title: 'Mapa', desc: 'Too colocáu en el mapa, que nun te pierdas' },
			{
				href: '/diccionario',
				icon: '📖',
				title: 'Diccionario',
				desc: 'Pa que nun te miren como un bañista'
			}
		] as item}
			<a href={item.href} class="nav-card">
				<div class="icon">{item.icon}</div>
				<h2>{item.title}</h2>
				<p>{item.desc}</p>
			</a>
		{/each}
	</nav>

	<div class="section-note">
		<p>
			<strong>Avisu importante:</strong> Si alguien te dice "<em>pon un culín, oh</em>", no te
			asustes. Solo te está ofreciendo una sidra. Acéptala. Siempre se acepta.
			<strong>Siempre.</strong>
		</p>
	</div>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/restaurantes" class="related-link"
				>🍴 Restaurantes<span>Les mejores sidrerías de Xixón</span></a
			>
			<a href="/visitar" class="related-link">🏛️ Qué visitar<span>Xixón, Uviéu y pueblinos</span></a>
			<a href="/fiestas" class="related-link">🎪 Fiestas<span>Calendariu completísimo</span></a>
		</div>
	</div>

	<ShareButtons title="¡Puxa Asturies! Guía de Asturias" description="Too lo que necesites pa disfrutar Asturies" />
</main>

<style>
	.hero-phrase {
		font-size: 0.85rem;
		font-style: italic;
		color: rgba(245, 240, 232, 0.5);
		margin: 0 0 0.75rem;
	}

	.hero-flags {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		gap: 10px;
		margin-bottom: 1rem;
	}

	.hf {
		width: 40px;
		height: 27px;
		display: block;
		filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4));
	}

	.hf-shield {
		width: 24px;
		height: 30px;
	}

	.home-weather {
		margin: 2rem 0 0.5rem;
	}

	.related-pages {
		margin: 2.5rem 0 1rem;
	}
	.related-pages h2 {
		font-size: 1.15rem;
		margin-bottom: 0.75rem;
	}
	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 0.75rem;
	}
	.related-link {
		display: block;
		padding: 1rem;
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
		text-decoration: none;
		color: var(--color-text);
		font-weight: 600;
		font-size: 0.95rem;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}
	.related-link:hover {
		border-color: var(--color-accent);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
		text-decoration: none;
		color: var(--color-text);
	}
	.related-link span {
		display: block;
		font-weight: 400;
		font-size: 0.82rem;
		color: var(--color-text-muted);
		margin-top: 0.2rem;
	}

	/* --- Hero scene carousel (CSS-only) --- */
	.hero-carousel {
		margin-top: 1.75rem;
		width: 100%;
		max-width: 100vw;
		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);
		overflow: hidden;
		mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
	}

	.hero-carousel-inner {
		overflow: hidden;
		padding: 0.25rem 0 0.5rem;
	}

	.hero-carousel-track {
		display: flex;
		gap: 1rem;
		width: max-content;
		animation: hero-carousel-scroll 20s linear infinite;
		will-change: transform;
	}

	.hero-carousel:hover .hero-carousel-track {
		animation-play-state: paused;
	}

	@keyframes hero-carousel-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	.scene-card {
		flex: 0 0 auto;
		width: 280px;
		height: 160px;
		border-radius: var(--radius, 12px);
		background: linear-gradient(135deg, var(--scene-g1), var(--scene-g2));
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.scene-card::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent 55%);
		pointer-events: none;
	}

	.scene-emoji {
		font-size: 3.25rem;
		line-height: 1;
		position: relative;
		z-index: 1;
		filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35));
	}

	.scene-caption {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0.65rem 0.75rem;
		font-size: 0.82rem;
		font-weight: 600;
		color: #fff;
		text-align: center;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
		z-index: 1;
		line-height: 1.25;
	}

	@media (max-width: 640px) {
		.scene-card {
			width: 220px;
			height: 132px;
		}

		.scene-emoji {
			font-size: 2.5rem;
		}

		.scene-caption {
			font-size: 0.75rem;
			padding: 0.5rem 0.6rem;
		}

		.hero-carousel-track {
			gap: 0.65rem;
		}
	}

	/* --- Animated counters --- */
	.home-stats {
		margin: 2rem 0 0.5rem;
	}

	.home-stats-heading {
		font-size: 1.15rem;
		margin: 0 0 1rem;
		text-align: center;
		color: var(--color-accent);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		text-align: center;
	}

	.stat {
		padding: 0.75rem 0.25rem;
	}

	.stat-value {
		display: block;
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1.1;
		color: var(--color-accent);
		font-variant-numeric: tabular-nums;
	}

	.stat-label {
		display: block;
		margin-top: 0.35rem;
		font-size: 0.88rem;
		color: var(--color-text-muted);
	}

	@media (max-width: 720px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* --- Scroll reveal (use:reveal adds global class `revealed`) --- */
	.nav-cards:not(:global(.revealed)) > .nav-card {
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.5s ease,
			transform 0.5s ease;
	}

	.nav-cards:global(.revealed) > .nav-card {
		opacity: 1;
		transform: none;
	}

	.home-stats:not(:global(.revealed)) .home-stats-heading,
	.home-stats:not(:global(.revealed)) .stats-grid .stat {
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.5s ease,
			transform 0.5s ease;
	}

	.home-stats:global(.revealed) .home-stats-heading,
	.home-stats:global(.revealed) .stats-grid .stat {
		opacity: 1;
		transform: none;
	}

	.nav-cards:global(.revealed) > .nav-card:nth-child(1) {
		transition-delay: 0.05s;
	}
	.nav-cards:global(.revealed) > .nav-card:nth-child(2) {
		transition-delay: 0.1s;
	}
	.nav-cards:global(.revealed) > .nav-card:nth-child(3) {
		transition-delay: 0.15s;
	}
	.nav-cards:global(.revealed) > .nav-card:nth-child(4) {
		transition-delay: 0.2s;
	}
	.nav-cards:global(.revealed) > .nav-card:nth-child(5) {
		transition-delay: 0.25s;
	}
	.nav-cards:global(.revealed) > .nav-card:nth-child(6) {
		transition-delay: 0.3s;
	}
	.nav-cards:global(.revealed) > .nav-card:nth-child(7) {
		transition-delay: 0.35s;
	}
	.nav-cards:global(.revealed) > .nav-card:nth-child(8) {
		transition-delay: 0.4s;
	}

	.home-stats:global(.revealed) .home-stats-heading {
		transition-delay: 0.05s;
	}
	.home-stats:global(.revealed) .stats-grid .stat:nth-child(1) {
		transition-delay: 0.1s;
	}
	.home-stats:global(.revealed) .stats-grid .stat:nth-child(2) {
		transition-delay: 0.15s;
	}
	.home-stats:global(.revealed) .stats-grid .stat:nth-child(3) {
		transition-delay: 0.2s;
	}
	.home-stats:global(.revealed) .stats-grid .stat:nth-child(4) {
		transition-delay: 0.25s;
	}
</style>
