<script>
	import { fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Inicio | ¡Puxa Asturies!</title>
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
		Ah, y un diccionario. Porque aquí la xente habla bable, y si no pilles lo del
		<em>culín</em>, lo del <em>escanciáu</em> y lo del <em>yes bobu</em>, vas a estar más perdíu
		que un pulpu en un garaje.
	</p>

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
