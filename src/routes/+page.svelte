<script>
	import { fly } from 'svelte/transition';
	import WeatherWidget from '$lib/components/WeatherWidget.svelte';

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
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDesc} />
	<meta property="og:image" content="https://manriquegarcia.com/images/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>

<div class="hero">
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

	<aside class="home-weather">
		<WeatherWidget />
	</aside>

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
				<h3>{item.title}</h3>
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
	.home-weather {
		float: right;
		margin: 0 0 1rem 1.5rem;
		max-width: 280px;
	}

	@media (max-width: 640px) {
		.home-weather {
			float: none;
			margin: 1.25rem 0;
			max-width: 100%;
		}
	}
</style>
