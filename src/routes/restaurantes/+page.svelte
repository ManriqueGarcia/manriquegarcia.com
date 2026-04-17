<script>
	import { fly } from 'svelte/transition';
	import SidraRating from '$lib/components/SidraRating.svelte';
	import CommentSection from '$lib/components/CommentSection.svelte';

	const restaurants = [
		{
			name: 'Casa Trabanco',
			rating: 'sublime',
			address: 'Ctra. de Lavandera 3255, 33350 Gijón',
			phone: '985 136 462',
			description:
				'Esto no es una sidrería. Esto ye LA sidrería. Casa Trabanco ye el Bernabéu de la sidra, el Vaticano del escanciado, el sitio donde los asturianos llevan a la xente de fuera cuando quieren dejarles la boca abierta. Producen su propia sidra (que ye una maravilla), la comida ye espectacular, y el sitio en sí — un lagar enorme rodeado de manzanos — ye pa quedase vivir. Si solo puedes ir a un sitio en toda Asturias, que sea este. Luego nos das las gracias.',
			url: 'https://www.casatrabanco.com'
		},
		{
			name: 'El Sauco',
			rating: 5,
			address: 'C/ Valencia 20, 33210 Gijón',
			phone: '985 39 83 30',
			description:
				'Sidra por la tarde con pinchos que quitan el sentíu, menú al mediodía, carta por la noche. Todo está riquísimo. Una de las sidrerías que nunca falta en nuestra ruta xixonenca. Si solo puedes ir a un sitio, ve aquí. Luego repite.',
			url: 'http://www.elsauco.com'
		},
		{
			name: 'Parrilla Antonio',
			rating: 4,
			address: 'Roncal 1, 33208 Gijón',
			phone: '985 154 973',
			description:
				'Llegas, te plantas en la barra, y empiezas a picar pinchos y sidra como si no hubiera mañana. La parrilla funciona de cara al público, así que ves cómo se hace tu comida. Los choricitos y el queso cabrales están pa chuparse los deos.',
			url: 'https://parrilla-antonio-gijon.es'
		},
		{
			name: 'Sidrería Nava',
			rating: 4,
			address: 'Pz. de la Serena 1, 33208 Gijón',
			phone: '985 380 447',
			description:
				'La sidra ye de primera, los pinchos nun fallan, y el menú del día merece la pena. Un clásico del Barrio de la Sidra al que siempre se vuelve.'
		},
		{
			name: 'La Galana',
			rating: 4,
			address: 'Plaza Mayor 10, 33201 Gijón',
			phone: '985 17 24 29',
			description:
				'Muy céntrico (en la mismísima Plaza Mayor), sidra buena, comida muy buena. Eso sí, al estar en el meollo los precios suben un pelín. Pero oye, las vistas no te las quita nadie.',
			url: 'https://restauranteasturianolagalana.es'
		},
		{
			name: 'La Chalana',
			rating: 4,
			address: 'C/ San José 31, 33209 Gijón',
			phone: '98 516 48 27',
			description:
				'Especialidad en marisco. Aviso: saldrás con los ojos como platos y la cartera ligera, pero feliz. Muy feliz. Merece cada céntimo, oh.',
			url: 'http://www.lachalana.com'
		},
		{
			name: 'Sidrería Celorio',
			rating: 4,
			address: 'C/ Domingo Juliana 6, 33212 Gijón',
			phone: '984 293 447',
			description:
				'Aquí se viene a por el cachopo: bistec + jamón + queso + pimientos, rebozado y con patatas fritas. Un cuarto de cachopo ya es para dos personas. ¿Uno entero? Solo si llevas tres días sin comer o eres un asturiano de pura cepa.',
			url: 'https://restaurante-celorio.es'
		},
		{
			name: 'Casa Ferino',
			rating: 4,
			address: 'Ctra. de la Carbonera, 33209 Gijón',
			phone: '985 380 471',
			description:
				'Los callos de Casa Ferino son legendarios. Si vas a comer los encontrarás seguro, pero por la noche… nun te lo garantizo, güaje. Vuelan.',
			url: 'http://www.casaferino.com'
		},
		{
			name: 'Llagar El Quesu',
			rating: 5,
			address: 'Ctra. AS-17 Km 26, 33429 Bobes, Siero',
			phone: '985 985 304',
			description:
				'Está en Siero (un poco fuera de Xixón, pero merece la escapada). Parrilla tipo argentina que ta pa morirse, decoración guapísima, ambiente acogedor. Ye de esos sitios de los que sales diciendo "hay que volver".',
			url: 'https://elquesu.es'
		},
		{
			name: 'Sidrería El Globo',
			rating: 3,
			address: 'C/ San Bernardo 13, 33201 Gijón',
			phone: '985 17 22 47',
			description:
				'Comida típica asturiana, sin florituras. Vas, comes bien, y vuelves a casa contentu. A veces no hace falta más, ¿no?',
			url: 'http://www.sidreriaelglobo.es'
		},
		{
			name: 'Sidrería La Costa',
			rating: 4,
			address: 'Av. de la Costa 32, 33205 Gijón',
			phone: '985 161 499',
			description:
				'Especialidad en carnes argentinas. Si te gusta un buen chuletón o una entraña a la parrilla, este ye tu sitio. La mezcla de sidra asturiana con corte argentino suena rara pero funciona de maravilla.',
			url: 'http://sidrerialacosta.com'
		},
		{
			name: 'Tino El Roxu',
			rating: 4,
			address: 'Av. de la Costa 30, 33205 Gijón',
			phone: '985 141 792',
			description:
				'Cocina tradicional asturiana de la de verdad: carnes, pescados, mariscos. De esos restaurantes que llevan los abuelos toda la vida recomendando.',
			url: 'https://www.tinoelroxu.com'
		},
		{
			name: 'Sidrería Cabranes',
			rating: 4,
			address: 'Av. Pablo Iglesias 23, 33205 Gijón',
			phone: '985 131 487',
			description:
				'El rabo de toro de Cabranes ye pa llorar de la emoción. Si está en carta, pídelo. Si no está, llora igualmente y pide otra cosa, que too ta ricu.',
			url: 'https://sidreriacabranes.es'
		}
	];

	/** @type {'all' | 'sublime' | '5' | '4' | '3'} */
	let activeFilter = $state('all');

	let filtered = $derived(
		activeFilter === 'all'
			? restaurants
			: restaurants.filter((r) => {
					if (activeFilter === 'sublime') return r.rating === 'sublime';
					if (activeFilter === '5') return r.rating === 5;
					if (activeFilter === '4') return r.rating === 4;
					if (activeFilter === '3') return r.rating === 3;
					return false;
				})
	);
</script>

<svelte:head>
	<title>Restaurantes y Sidrerías | ¡Puxa Asturies!</title>
</svelte:head>

<main class="container">
	<h1>Restaurantes y Sidrerías</h1>

	<p class="page-intro">
		Bienveníu al capítulo más serio de esta guía: dónde comer en Asturias sin que te vendan
		<em>paella con chorizo</em> y sin que te miren como si llevaras chanclas con calcetines. Aquí
		va sidra, va pinchu, va ritual, va respetu al productu.
	</p>

	<h2>El ritual del escanciado (léete esto antes de ir)</h2>

	<p>
		En una sidrería asturiana, la sidra natural <strong>no se sirve como un vino</strong>: no hay
		copas individuales pa cada uno con su botellín en la mesa como si fueras a un brunch de
		Instagram. Lo normal es que pidas botella (o medía) y que el ritual del
		<strong>escanciado</strong> marque el ritmo de la sobremesa.
	</p>

	<p>
		<strong>¿Qué es escanciar?</strong> Ye verter la sidra desde arriba — con brazo extendíu y
		muñeca firme — pa que chispe contra el borde del vaso, oxigenar la sidra y sacar el gas y el
		aroma que lleva dentro. Si lo haces bien, suena como una promesa. Si lo haces regular, igual
		te sale bien: lo importante ye la intención y no te quedes con la sidra “muerta” en el vaso.
	</p>

	<p>
		<strong>El culín</strong> ye la medida asturiana de prudencia y de gloria al mismo tiempo: un
		poco de sidra en el vaso, lo justo pa beberlo de un tirón. No es “un sorbito decoroso”: es
		terminar el culín, dejar el vaso casi vacío, y pasar el vaso. Sí: <strong>se comparte vaso</strong>.
		No te asustes: es tradición, es higiene de barra (el alcohol ayuda) y, sobre todo, es
		<em>ritual social</em>. Tú escancias, sirves un culín a tu vecino de barra, bebes el tuyo, y
		el círculo continúa. Si te ofrecen escanciar, acepta con educación; si no sabes, pide ayuda con
		honestidad: en la sidrería se enseña mirando.
	</p>

	<p>
		<strong>Pinchos y barra:</strong> en muchos sitios vas a empezar (o acabar) pegáu a la barra,
		con tapas frías en exposición y cosas calientes que salen a tumba abierta. El sistema puede
		cambiar (pides, te apuntan, pagas al final…), pero la regla de oro ye la misma:
		<strong>ordeña con respetu</strong>, no acapares, y deja sitio pa la xente del barrio. Y si te
		invitan a un culín, recuerda lo del inicio: <em>siempre se acepta</em>.
	</p>

	<p>
		<strong>Consexu final:</strong> si vas con prisa, dilo; si vas con hambre, pide con calma; y si
		vas con curiosidad, sube el tonu de la noche. La sidrería premia a quien se deja llevar… pero
		sin perder los modales, que esto no ye un parque temático: ye una institución.
	</p>

	<div class="section-note">
		<p>
			<strong>Sobre las valoraciones:</strong> usamos una escala que va de “buena” a “sublime”.
			<strong>Sublime</strong> es reservado pa sitios que son casi una experiencia religiosa (sí,
			con culín incluido). <strong>5</strong> ye excelente: te lo recomendaríamos a un amigo sin
			pensarlo. <strong>4</strong> ye muy buena: confiable, con personalidad, y con ganas de
			volver. <strong>3</strong> ye buena: cumple, alimenta, y a veces eso es lo más asturiano que
			hay: honestidá sin postureo.
		</p>
		<p>
			<strong>Barrio de la Sidra (Xixón):</strong> hay varias sidrerías concentradas por la zona
			de La Arena / Natahoyo. Es fácil hacer ruta, pero ojo con el horario y con el ritmo: la sidra
			engaña porque va tan llisa.
		</p>
		<p>
			<strong>Reservas:</strong> fines de semana, puentes y temporada alta pueden llenar todo. Si
			vienes con ilusión (y con hambre), reserva con antelación. Si no hay hueco, no es personal:
			es que aquí se cena temprano y se alarga la noche.
		</p>
	</div>

	<h2>Nuestras recomendaciones</h2>

	<div class="filter-bar" role="group" aria-label="Filtrar por valoración">
		<button
			type="button"
			class="filter-btn"
			class:is-active={activeFilter === 'all'}
			onclick={() => (activeFilter = 'all')}
		>
			Todas
		</button>
		<button
			type="button"
			class="filter-btn"
			class:is-active={activeFilter === 'sublime'}
			onclick={() => (activeFilter = 'sublime')}
		>
			Sublime 🏆
		</button>
		<button
			type="button"
			class="filter-btn"
			class:is-active={activeFilter === '5'}
			onclick={() => (activeFilter = '5')}
		>
			Excelente (5)
		</button>
		<button
			type="button"
			class="filter-btn"
			class:is-active={activeFilter === '4'}
			onclick={() => (activeFilter = '4')}
		>
			Muy buena (4)
		</button>
		<button
			type="button"
			class="filter-btn"
			class:is-active={activeFilter === '3'}
			onclick={() => (activeFilter = '3')}
		>
			Buena (3)
		</button>
	</div>

	{#key activeFilter}
		<div class="card-grid">
			{#each filtered as r, i (r.name)}
				<article class="rest-card" in:fly={{ y: 20, duration: 300, delay: i * 50 }}>
					<div class="rest-header">
						<h3>{r.name}</h3>
						<SidraRating rating={r.rating} />
					</div>
					<div class="rest-body">
						<p class="meta">{r.address}</p>
						{#if r.phone}
							<p class="meta"><a href={`tel:${r.phone.replace(/\s+/g, '')}`}>{r.phone}</a></p>
						{/if}
						<p class="description">{r.description}</p>
						{#if r.url}
							<p class="card-actions">
								<a href={r.url} target="_blank" rel="noopener noreferrer">Web oficial →</a>
							</p>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	{/key}

	<h2>Uviéu y la calle Gascona</h2>

	<p>
		Si te vas a la capital, la sidrería también se vive con intensidad. La famosa
		<strong>Calle Gascona</strong> es la “Senda’l culín” por antonomasia: una sucesión de locales
		donde el ritual del escanciado se convierte en paseo. Es perfecta pa una ruta corta y
		compartida: pocos culines en cada sitio, pinchu, y a otra sidrería. No se trata de “ganarle” a
		la calle: se trata de <em>gozarla</em> sin prisas, con respeto al oficiu y a la xente que trabaja
		en barra.
	</p>

	<p>
		En Uviéu hay mucho más allá de Gascona (barrios, plazas, cocina tradicional, marisquerías…),
		pero si vienes de fuera y quieres un “primer contacto” con la sidrería en modo ciudad, Gascona
		es un buen aperitivo cultural. Luego ya te buscas sidrerías de barrio, menús de cercanía y
		sitios donde el cachopo pesa lo suyo en la mesa… y en la conciencia.
	</p>

	<CommentSection
		title="💬 ¿Conoces algún sitio más? ¿Qué tal comiste? ¡Cuéntanos!"
		page="/restaurantes"
	/>
</main>

<style>
	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 1.25rem 0 1.5rem;
	}

	.filter-btn {
		appearance: none;
		border: 1px solid var(--color-border);
		background: var(--color-card);
		color: var(--color-text);
		padding: 0.5rem 0.9rem;
		border-radius: 999px;
		font: inherit;
		cursor: pointer;
		transition:
			background 0.15s ease,
			border-color 0.15s ease,
			transform 0.1s ease;
	}

	.filter-btn:hover {
		transform: translateY(-1px);
		border-color: var(--color-accent);
	}

	.filter-btn.is-active {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: var(--color-hero-text);
	}

	.rest-card {
		background: var(--color-card);
		border-radius: var(--radius);
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
		transition: box-shadow 0.3s, transform 0.3s;
	}

	.rest-card:hover {
		box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
		transform: translateY(-2px);
	}

	.rest-header {
		background: var(--color-hero-bg);
		padding: 1.1rem 1.4rem;
	}

	.rest-header h3 {
		margin: 0;
		font-size: 1.45rem;
		font-weight: 700;
		line-height: 1.25;
		color: #fff;
		font-family: var(--font-heading);
		word-break: break-word;
	}

	.rest-body {
		padding: 1.1rem 1.4rem 1.4rem;
	}

	.meta {
		margin: 0.15rem 0;
		font-size: 0.92rem;
		color: var(--color-text-muted);
	}

	.meta a {
		color: var(--color-text-muted);
	}

	.meta a:hover {
		color: var(--color-accent);
	}

	.description {
		margin: 0.75rem 0 0;
		font-size: 0.92rem;
	}

	.card-actions {
		margin: 0.75rem 0 0;
	}

	.card-actions a {
		font-weight: 600;
		color: var(--color-accent);
	}
</style>
