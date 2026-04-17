<script>
	import CommentSection from '$lib/components/CommentSection.svelte';
	import NearMe from '$lib/components/NearMe.svelte';
	import FavoriteButton from '$lib/components/FavoriteButton.svelte';
	import { slugify } from '$lib/utils/slugify.js';

	const gijon = [
		{
			name: 'Playa de San Lorenzo',
			description:
				'La playa urbana por excelencia. En pleno centro de Xixón, pa chapuzón y sol. Eso sí, que sepas que el Cantábrico está fresquín… Bueno, vale, está helao. Pero eso te despierta y te curte. Como un asturianu de verdad.',
			image: '/images/playa-san-lorenzo.jpg'
		},
		{
			name: 'Barrio de Cimadevilla',
			description:
				'La parte más vieja de la ciudá. Vestigios romanos, las Termas de Campo Valdés y callejuelas con más encanto que un cachopo recién hecho. Perderse por aquí ye obligatorio.',
			image: '/images/cimadevilla.jpg'
		},
		{
			name: 'Cerro de Santa Catalina',
			description:
				'Sube hasta arriba y plántate delante del Elogio del Horizonte de Chillida. Ahí, con el viento dándote en la cara y las vistas de toda la costa, entenderás por qué los asturianos dicen aquello de "Asturies, patria querida". Se te pone la piel de gallina, oh.',
			image: '/images/elogio-horizonte.jpg'
		},
		{
			name: 'Parque Isabel la Católica',
			description:
				'Patos, cisnes, avestruces y pavos reales campando a sus anchas. Es como un zoo pero en plan natural y gratis. Perfecto pa pasear después de comer y bajar el cachopo.',
			image: '/images/parque-isabel.jpg'
		},
		{
			name: 'El Molinón',
			description:
				'El estadio del Real Sporting de Gijón, ¡PUXA SPORTING! Si hay partido, ve. Si no hay partido, al menos pásate a verlo por fuera y haz como que entiendes de fútbol. Aquí el Sporting ye una religión.',
			image: '/images/molinon.jpg'
		},
		{
			name: 'Universidad Laboral',
			description:
				'El edificio más grande de España. 270.000 m² de los años 50. Cuando lo veas vas a decir "¿pero esto qué ye?". La torre tiene unas vistas que quitan el sentíu. Patrimonio brutal.',
			image: '/images/universidad-laboral.jpg'
		},
		{
			name: 'La Campa de Torres',
			description:
				'Aquí vivía la xente antes de que Xixón fuera Xixón. Restos de un castro celta (el oppidum Noega, pa que flipen tus amigos del WhatsApp). Parque arqueológico al aire libre con vistas a la ría del Aboño.',
			image: '/images/campa-torres.jpg'
		},
		{
			name: 'Jardín Botánico Atlántico',
			description:
				'El primer jardín botánico del noroeste de la península. Flora atlántica, senderos guapos y ese verde que solo Asturias sabe hacer. Pa desconectar del mundo y reconectar con la naturaleza (y con el oxígeno, que aquí hay de sobra).',
			image: '/images/jardin-botanico.jpg'
		}
	];

	const oviedo = [
		{
			name: 'La Catedral',
			description:
				'Gótica, prerrománica, románica, renacentista y barroca. Todo metido en un mismo edificio. La Cámara Santa dentro ye Patrimonio de la Humanidad. Mucha chicha pa los frikis de la historia.',
			image: '/images/catedral-oviedo.jpg'
		},
		{
			name: 'Barrio Antiguo',
			description:
				'El casco viejo de Uviéu. Calles con encanto, el Palacio Arzobispal, la Universidad Vieja (siglo XVI, ahí es ná)… Déjate perder y pasa por la estatua de Woody Allen, que filmó aquí "Vicky Cristina Barcelona". Bueno, la parte de Barcelona no, obviamente.',
			image: '/images/casco-historico-oviedo.jpg'
		},
		{
			name: 'Teatro Campoamor',
			description:
				'El teatro de ópera de Uviéu, donde cada año se entregan los Premios Princesa de Asturias. Inaugurado en 1892, ye una joya arquitectónica. Si pillas función, ve. Si no, al menos plántate delante y hazle una foto que ye mu fotoxénicu. Y si alguien te dice que aquí cantó Plácido Domingo, créetelo: ye verdad.',
			image: '/images/teatro-campoamor.jpg'
		},
		{
			name: 'Monte Naranco',
			description:
				'Santa María del Naranco (siglo IX, prerrománico, Patrimonio de la Humanidad, la joya de la corona) y la Cruz de la Victoria de 35 metros. Las vistas desde arriba son pa quedase vivir. Eso sí, la cuesta pa subir te hace sudar el cachopo del mediodía.',
			image: '/images/santa-maria-naranco.jpg'
		}
	];

	const pueblinos = [
		{
			name: 'Candás',
			lat: 43.5906,
			lng: -5.7736,
			dist: '15 km desde Xixón · 40 km desde Uviéu',
			description:
				'Miradores, playas, puerto pesquero y el Festival de la Sardina el 1 de agosto (todo el pueblo oliendo a sardinas a la brasa, una maravilla). Si vas en verano, no te lo pierdas. Si vas en invierno, también mola.',
			image: '/images/candas.jpg'
		},
		{
			name: 'Luanco',
			lat: 43.6167,
			lng: -5.7936,
			dist: '20 km desde Xixón · 45 km desde Uviéu',
			description:
				'La zona de veraneo favorita de los asturianos. Playas guapes, buen pescao, y ese ritmo lento de pueblo marinero que te hace olvidar que existen los emails. Prescripción médica: mínimo un día aquí.',
			image: '/images/luanco.jpg'
		},
		{
			name: 'Colunga',
			lat: 43.4867,
			lng: -5.2722,
			dist: '45 km desde Xixón · 65 km desde Uviéu',
			description:
				'El conceyu de Colunga ye tierra de dinosaurios (literalmente: el MUJA, Museo del Jurásico, está aquí al lau). Pueblo tranquilu con buena gastronomía, sidra y una costa que quita el hipo. Además, Lastres pertenece a Colunga, así que dos por el precio de uno.',
			image: '/images/colunga.jpg'
		},
		{
			name: 'Lastres',
			lat: 43.519,
			lng: -5.269,
			dist: '50 km desde Xixón · 70 km desde Uviéu',
			description:
				'Conocido como "San Martín del Sella" por la serie Doctor Mateo. Si la viste, reconocerás cada rincón. Si no la viste, te da igual: el pueblo ye guapísimo con o sin tele.',
			image: '/images/lastres.jpg'
		},
		{
			name: 'Cudillero',
			lat: 43.569,
			lng: -6.146,
			dist: '60 km desde Xixón · 55 km desde Uviéu',
			description:
				'El pueblo más fotogénico de Asturias. Casines de colores apilaes en la ladera como si fueran fichas de dominó. Es tan bonito que cuesta creer que sea real y no un decorado de película.',
			image: '/images/cudillero.jpg'
		},
		{
			name: 'Ribadesella',
			lat: 43.4625,
			lng: -5.0583,
			dist: '70 km desde Xixón · 85 km desde Uviéu',
			description:
				'Famosa por el Descenso Internacional del Sella en piraguas: miles de personas, mucha folixia y ríu pa dar y regalar. Fuera de temporada es un pueblo tranquilo pa pasear por la ría. Playa de Santa Marina, espectacular.',
			image: '/images/ribadesella.jpg'
		},
		{
			name: 'Llanes',
			lat: 43.42,
			lng: -4.75,
			dist: '110 km desde Xixón · 130 km desde Uviéu',
			description:
				'Playas de esas que salen en las postales y los Cubos de la Memoria de Ibarrola: bloques de hormigón pintados que están más guapos que muchos cuadros de museo. Arte, mar y sidra. ¿Se puede pedir más?',
			image: '/images/llanes.jpg'
		},
		{
			name: 'Luarca',
			lat: 43.5464,
			lng: -6.5319,
			dist: '115 km desde Xixón · 95 km desde Uviéu',
			description:
				'La "Villa Blanca de la Costa Verde". Un pueblo marinero precioso metíu entre acantilados con un puerto que ye una postal. Aquí nació Severo Ochoa, premio Nobel. El cementerio con vistas al mar ye de los más bonitos que vas a ver (morboso pero cierto). El faro, los acantilados y la ermita en lo alto completan un combo imbatible.',
			image: '/images/luarca.jpg'
		},
		{
			name: 'Tapia de Casariego',
			lat: 43.567,
			lng: -6.943,
			dist: '170 km desde Xixón · 150 km desde Uviéu',
			description:
				'Capital del surf en Asturias, campeonatos mundiales incluidos. Pero no hace falta surfear: el pueblo ye una maravilla con su isla del faro, sus playas salvajes y un ambiente tranquilu que engancha. La playa de Peñarronda, compartida con Castropol, ye de las más guapes del Cantábrico. Merece el viaje aunque pille lejos.',
			image: '/images/tapia-casariego.jpg'
		},
		{
			name: 'Taramundi',
			lat: 43.358,
			lng: -7.112,
			dist: '195 km desde Xixón · 175 km desde Uviéu',
			description:
				'El pueblo que inventó el turismo rural en España (en serio, fue el primero en los años 80). Famoso por sus cuchillos artesanales — la navaja taramundi ye un clásico — y por el conjunto etnográfico de Os Teixois, con mazos, fraguas y molinos movidos por agua. Está en el interior profundo de Asturias, rodeado de bosques y ríos. Si buscas desconexión total, ye tu sitio.',
			image: '/images/taramundi.jpg'
		}
	];

	/** @param {HTMLElement} node */
	function reveal(node) {
		node.style.opacity = '0';
		node.style.transform = 'translateY(20px)';
		node.style.transition = 'opacity 0.5s, transform 0.5s';
		const obs = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'translateY(0)';
					obs.unobserve(node);
				}
			},
			{ threshold: 0.1 }
		);
		obs.observe(node);
		return {
			destroy() {
				obs.disconnect();
			}
		};
	}
</script>

<svelte:head>
	<title>Qué visitar | ¡Puxa Asturies!</title>
	<meta
		name="description"
		content="Qué visitar en Asturias: Gijón, Oviedo, Cudillero, Llanes, Luarca y más pueblos con fotos y distancias en coche."
	/>
	<link rel="canonical" href="https://manriquegarcia.com/visitar" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://manriquegarcia.com/visitar" />
	<meta property="og:title" content="Qué visitar | ¡Puxa Asturies!" />
	<meta
		property="og:description"
		content="Qué visitar en Asturias: Gijón, Oviedo, Cudillero, Llanes, Luarca y más pueblos con fotos y distancias en coche."
	/>
	<meta property="og:site_name" content="¡Puxa Asturies!" />
	<meta property="og:locale" content="es_ES" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Qué visitar | ¡Puxa Asturies!" />
	<meta
		name="twitter:description"
		content="Qué visitar en Asturias: Gijón, Oviedo, Cudillero, Llanes, Luarca y más pueblos con fotos y distancias en coche."
	/>
</svelte:head>

<main class="container">
	<h1>Qué visitar</h1>

	<p class="page-intro">
		Asturias nun ye solo sidra y cachopo (bueno, casi). Aquí tienes lo imprescindible pa decir que
		<strong>verdaderamente</strong> estuviste: Xixón con olor a mar y ambición deportiva, Uviéu con
		piedra que cuenta siglos, y pueblinos que parecen sacaos de un cuadru. Pérdete, haz fotos, y
		que nun te dé vergüenza parecer turista: toos empezamos así.
	</p>

	<div class="section-note">
		<p>
			<strong>Consexu de bañista a bañista:</strong> lleva capa, calzao cómodu y paciencia pa
			aparcar en agosto. El Cantábrico nun perdona, pero merece la pena hasta cuando te morrees de
			fríu en San Lorenzo.
		</p>
	</div>

	<h2>Gijón / Xixón — la reinona del norte</h2>
	<p>
		Xixón ye esa ciudá que sale pocu en las revistas de moda y por eso ta mejor: playa larga,
		románicos por ahí, Chillida mirando al infinitu y una afición al Sporting que explica metá de la
		psicoloxía local. Si solo tienes un día, haz magia; si tienes más, vas a querer quedarte.
	</p>

	<div class="card-grid">
		{#each gijon as place (place.name)}
			<article class="card has-image" use:reveal>
				<img
					src={place.image}
					alt={`Vista de ${place.name}, Asturias`}
					loading="lazy"
					class="card-image"
				/>
				<div class="card-body">
					<h3>{place.name}</h3>
					<p class="description">{place.description}</p>
				</div>
			</article>
		{/each}
	</div>

	<h2>Oviedo / Uviéu — capital con C mayúscula</h2>
	<p>
		Uviéu ye más sobriu que Xixón pero igual de peligroso pa el bolsín: entras por la catedral y
		acabas en un chigre de la Gascona preguntando por qué nun habías veníu antes. Naranco arriba,
		casco abaxo, y tú nel mediu flipando con lo prerrománicu.
	</p>

	<div class="card-grid">
		{#each oviedo as place (place.name)}
			<article class="card has-image" use:reveal>
				<img
					src={place.image}
					alt={`Vista de ${place.name}, Asturias`}
					loading="lazy"
					class="card-image"
				/>
				<div class="card-body">
					<h3>{place.name}</h3>
					<p class="description">{place.description}</p>
				</div>
			</article>
		{/each}
	</div>

	<h2>Pueblinos — Asturias en modo postal</h2>
	<p>
		Si crees que solo había dos ciudáes y ya, prepárate: Asturias ta llena de pueblinos que hacen
		que Google Fotos te diga <em>“¿quieres liberar espaciu?”</em> porque vas a hacer ochocientas
		fotos de casines de colores, acantiláu y ría. Desde Candás (a 15 minutinos) hasta Taramundi
		(casi en Galicia), toos ganan. Ordenáoslos de más cerca a más lejos pa que planifiques la ruta.
	</p>

	<NearMe places={pueblinos} />

	<div class="card-grid">
		{#each pueblinos as place (place.name)}
			<article class="card has-image" use:reveal>
				<img
					src={place.image}
					alt={`Vista de ${place.name}, Asturias`}
					loading="lazy"
					class="card-image"
				/>
				<div class="card-body">
					<div class="place-title-row">
						<h3>{place.name}</h3>
						<FavoriteButton slug={`pueblo-${slugify(place.name)}`} name={place.name} />
					</div>
					{#if place.dist}
						<span class="dist-badge">🚗 {place.dist}</span>
					{/if}
					<p class="description">{place.description}</p>
				</div>
			</article>
		{/each}
	</div>

	<div class="section-note wikimedia">
		<p>
			<strong>Imágenes:</strong> cuando corresponda, fotografías de
			<a href="https://commons.wikimedia.org/">Wikimedia Commons</a> baxo les sos llicencies
			respeutives (autoría nel ficheru orixinal). Si ves dalgo que debía citase distinto, díinoslo
			nos comentarios.
		</p>
	</div>

	<CommentSection
		title="Comentarios sobre qué visitar"
		placeholder="¿Tu rinconín favoritu n’Asturies? Cuéntanoslo…"
		page="/visitar"
	/>
</main>

<style>
	.place-title-row {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.place-title-row h3 {
		margin: 0;
		flex: 1;
		min-width: 0;
	}
</style>
