<script>
	import { fly } from 'svelte/transition';
	import WeatherWidget from '$lib/components/WeatherWidget.svelte';

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

	<div class="home-weather">
		<WeatherWidget />
	</div>

	<nav class="nav-cards">
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
		] as item, i}
			<a href={item.href} class="nav-card" in:fly={{ y: 20, duration: 400, delay: i * 80 }}>
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
</style>
