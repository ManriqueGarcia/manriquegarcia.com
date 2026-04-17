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
		<a href="/" class="site-title">¡Puxa Asturies!</a>
		<nav>
			<a href="/" class:active={$page.url.pathname === '/'}>Inicio</a>
			<a href="/restaurantes" class:active={$page.url.pathname.startsWith('/restaurantes')}>Restaurantes</a>
			<a href="/bares" class:active={$page.url.pathname.startsWith('/bares')}>Bares y Cafés</a>
			<a href="/visitar" class:active={$page.url.pathname.startsWith('/visitar')}>Qué visitar</a>
			<a href="/hoteles" class:active={$page.url.pathname.startsWith('/hoteles')}>Hoteles</a>
			<a href="/mapa" class:active={$page.url.pathname.startsWith('/mapa')}>Mapa</a>
			<a href="/diccionario" class:active={$page.url.pathname.startsWith('/diccionario')}>Diccionario</a>
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
