<script>
	import { onMount } from 'svelte';

	/** @typedef {'sublime' | 'sidreria' | 'restaurant' | 'hotel' | 'visit' | 'bar' | 'fiesta'} PlaceType */

	/** @type {Array<{ lat: number; lng: number; name: string; info: string; url?: string; type: PlaceType }>} */
	const places = [
		{
			lat: 43.4705,
			lng: -5.6456,
			name: 'Casa Trabanco',
			info: 'Ctra. de Lavandera 3255 · Tel: 985 136 462<br>LA sidrería. Categoría Sublime.',
			url: 'https://www.casatrabanco.com',
			type: 'sublime'
		},
		{
			lat: 43.5277,
			lng: -5.669,
			name: 'El Sauco',
			info: 'C/ Valencia 20 · Tel: 985 39 83 30<br>Sidras, pinchos, menú y carta. ★★★★★',
			url: 'http://www.elsauco.com',
			type: 'sidreria'
		},
		{
			lat: 43.5395,
			lng: -5.6681,
			name: 'Parrilla Antonio',
			info: 'Roncal 1 · Tel: 985 154 973<br>Pinchos y parrilla. ★★★★',
			type: 'sidreria'
		},
		{
			lat: 43.5301,
			lng: -5.6648,
			name: 'Sidrería Nava',
			info: 'C/ de la Serena 1 · Tel: 985 380 447<br>Sidra de calidad y buen menú. ★★★★',
			type: 'sidreria'
		},
		{
			lat: 43.5456,
			lng: -5.663,
			name: 'La Galana',
			info: 'Plaza Mayor 10 · Tel: 985 17 24 29<br>Céntrico, sidra y buena comida. ★★★★',
			type: 'sidreria'
		},
		{
			lat: 43.5406,
			lng: -5.6958,
			name: 'Sidrería Celorio',
			info: 'C/ Domingo Juliana 6 · Tel: 984 293 447<br>El cachopo asturiano. ★★★★',
			url: 'https://restaurante-celorio.es',
			type: 'restaurant'
		},
		{
			lat: 43.5161,
			lng: -5.6779,
			name: 'Casa Ferino',
			info: 'Ctra. de la Carbonera · Tel: 985 380 471<br>Especialidad en callos. ★★★★',
			url: 'http://www.casaferino.com',
			type: 'sidreria'
		},
		{
			lat: 43.3914,
			lng: -5.7533,
			name: 'Llagar El Quesu',
			info: 'Ctra. AS-17 Km 26, Bobes · Tel: 985 985 304<br>Parrilla argentina, muy acogedor. ★★★★★',
			url: 'https://elquesu.es',
			type: 'restaurant'
		},
		{
			lat: 43.5429,
			lng: -5.6622,
			name: 'Sidrería El Globo',
			info: 'C/ San Bernardo 13 · Tel: 985 17 22 47<br>Comida típica asturiana. ★★★★',
			url: 'http://www.sidreriaelglobo.es',
			type: 'sidreria'
		},
		{
			lat: 43.5372,
			lng: -5.6606,
			name: 'Sidrería La Costa',
			info: 'Av. Costa 32<br>Especialidad en caza. ★★★★',
			type: 'sidreria'
		},
		{
			lat: 43.536,
			lng: -5.6568,
			name: 'Sidrería Cabranes',
			info: 'Av. Pablo Iglesias 23 · Tel: 98 513 1487<br>Rabo de toro. ★★★★',
			type: 'sidreria'
		},
		{
			lat: 43.5282,
			lng: -5.6686,
			name: 'Barrio de la Sidra',
			info: 'Zona del Llano: Parrilla Antonio I, Casa César, La Esquina, La Tropical, El Llabiegu, La Xana, Boal II, La Pumarada.',
			type: 'sidreria'
		},
		{
		lat: 43.3645,
		lng: -5.8450,
		name: 'Calle Gascona (Uviéu)',
			info: 'La "Bulevar de la Sidra" de Oviedo. Concentración de sidrerías y tapeo.',
			type: 'sidreria'
		},
		{
			lat: 43.5459,
			lng: -5.6681,
			name: 'Puerto Deportivo',
			info: 'Escondite, Bulevar, La Habana…',
			type: 'bar'
		},
		{
			lat: 43.5415,
			lng: -5.6695,
			name: 'Zona de Fomento',
			info: 'Bodeguita del Medio, El Diario…',
			type: 'bar'
		},
		{
			lat: 43.3618,
			lng: -5.8405,
			name: 'Zona El Rosal (Oviedo)',
			info: 'Zona clásica de copas.',
			type: 'bar'
		},
		{
			lat: 43.3623,
			lng: -5.842,
			name: 'Zona El Antiguo (Oviedo)',
			info: 'Ambiente nocturno y tapeo.',
			type: 'bar'
		},
		{
			lat: 43.5427,
			lng: -5.659,
			name: 'Playa de San Lorenzo',
			info: 'Playa urbana en pleno centro de Gijón.',
			type: 'visit'
		},
		{
			lat: 43.5475,
			lng: -5.664,
			name: 'Barrio de Cimadevilla',
			info: 'La parte más antigua, vestigios romanos y Termas de Campo Valdés.',
			type: 'visit'
		},
		{
			lat: 43.5497,
			lng: -5.6625,
			name: 'Cerro de Santa Catalina',
			info: 'Elogio del Horizonte de Chillida. Panorámica espectacular.',
			type: 'visit'
		},
		{
			lat: 43.5221,
			lng: -5.6453,
			name: 'Parque Isabel la Católica',
			info: 'Estanque de patos y cisnes, palomar y aviario.',
			type: 'visit'
		},
		{
			lat: 43.5363,
			lng: -5.6375,
			name: 'El Molinón',
			info: 'Estadio del Real Sporting de Gijón.',
			url: 'https://www.realsporting.com',
			type: 'visit'
		},
		{
			lat: 43.5245,
			lng: -5.6150,
			name: 'Universidad Laboral',
			info: '270.000 m², el edificio más grande de España (1946-1956).',
			url: 'https://www.laboralciudaddelacultura.com',
			type: 'visit'
		},
		{
			lat: 43.5623,
			lng: -5.7040,
			name: 'La Campa de Torres',
			info: 'Parque Arqueológico-Natural, restos del castro de Noega.',
			type: 'visit'
		},
		{
			lat: 43.5200,
			lng: -5.6233,
			name: 'Jardín Botánico Atlántico',
			info: 'Flora y vegetación atlántica. Tel: 985 18 51 30.',
			url: 'https://www.botanico.gijon.es',
			type: 'visit'
		},
		{
			lat: 43.3626,
			lng: -5.8432,
			name: 'La Catedral de Oviedo',
			info: 'Catedral gótica con Cámara Santa prerrománica.',
			url: 'https://catedraldeoviedo.com',
			type: 'visit'
		},
		{
			lat: 43.3628,
			lng: -5.8479,
			name: 'Teatro Campoamor',
			info: 'Calle Pelayo, Oviedo<br>Teatro de ópera (1892). Premios Princesa de Asturias.',
			url: 'https://www.teatrocampoamor.es',
			type: 'visit'
		},
		{
			lat: 43.3621,
			lng: -5.844,
			name: 'Barrio Antiguo (Oviedo)',
			info: 'Catedral, Palacio Arzobispal, Universidad Vieja.',
			type: 'visit'
		},
		{
			lat: 43.3791,
			lng: -5.8660,
			name: 'Monte Naranco',
			info: 'Santa María del Naranco (s. IX) y Cruz de la Victoria.',
			type: 'visit'
		},
		{
			lat: 43.5632,
			lng: -6.1511,
			name: 'Cudillero',
			info: 'Pueblo pesquero encantador con verde y mar.',
			url: 'https://www.cudillero.es',
			type: 'visit'
		},
		{
			lat: 43.5148,
			lng: -5.2928,
			name: 'Lastres',
			info: '"San Martín del Sella" de Doctor Mateo.',
			type: 'visit'
		},
		{
			lat: 43.4613,
			lng: -5.0585,
			name: 'Ribadesella',
			info: 'Descenso internacional en piraguas del Sella.',
			url: 'https://www.ribadesella.es',
			type: 'visit'
		},
		{
			lat: 43.6138,
			lng: -5.7911,
			name: 'Luanco',
			info: 'Principal zona de veraneo de Asturias.',
			type: 'visit'
		},
		{
			lat: 43.5888,
			lng: -5.7602,
			name: 'Candás',
			info: 'Miradores, playas, puerto pesquero. Festival de la Sardina.',
			type: 'visit'
		},
		{
			lat: 43.421,
			lng: -4.7557,
			name: 'Llanes',
			info: 'Cubos de la Memoria de Ibarrola. Playas preciosas.',
			url: 'https://www.llanes.es',
			type: 'visit'
		},
		{
			lat: 43.5449,
			lng: -6.5339,
			name: 'Luarca',
			info: 'La Villa Blanca de la Costa Verde. Puerto preciosu, faro y cementerio con vistas.',
			type: 'visit'
		},
		{
			lat: 43.5701,
			lng: -6.9443,
			name: 'Tapia de Casariego',
			info: 'Capital del surf en Asturias. Isla del faro y playas salvajes.',
			type: 'visit'
		},
		{
			lat: 43.3599,
			lng: -7.1055,
			name: 'Taramundi',
			info: 'Turismo rural, navajas artesanales y el conjunto etnográfico de Os Teixois.',
			type: 'visit'
		},
		{
			lat: 43.4875,
			lng: -5.2721,
			name: 'Colunga',
			info: 'Tierra de dinosaurios (MUJA). Lastres pertenece a Colunga.',
			type: 'visit'
		},
		{
			lat: 43.5394,
			lng: -5.6624,
			name: 'Hotel Hernán Cortés',
			info: 'Fernández Vallín 5 · Tel: 985 346 000<br>Centro, 10 min de playa.',
			url: 'https://hotelhernancortes.es',
			type: 'hotel'
		},
		{
			lat: 43.5429,
			lng: -5.639,
			name: 'Hotel Begoña Park',
			info: 'Ctra. Providencia 566 · Tel: 985 133 909<br>Cerca del Rinconín.',
			url: 'https://hotelesbegona.com',
			type: 'hotel'
		},
		{
			lat: 43.5412,
			lng: -5.6432,
			name: 'Hotel ABBA',
			info: 'Doctor Fleming 37<br>Junto a playa y Parque Isabel la Católica.',
			url: 'https://abbagijonhotel.com',
			type: 'hotel'
		},
		{
			lat: 43.5379,
			lng: -5.6445,
			name: 'Parador Molino Viejo',
			info: 'Parque Isabel la Católica · Tel: 985 370 511<br>Antiguo molino, fabada estrella.',
			url: 'https://parador.es',
			type: 'hotel'
		},
		{
			lat: 43.5395,
			lng: -5.6485,
			name: 'Hotel TRYP Rey Pelayo',
			info: 'V. Torcuato F. Miranda 26 · Tel: 985 199 800<br>Cerca de playa y Molinón.',
			type: 'hotel'
		},
		{
			lat: 43.538,
			lng: -5.6823,
			name: 'Hotel AC Gijón',
			info: 'Avda. de Oviedo 15 · Tel: 985 990 500<br>Moderno, zona residencial.',
			url: 'https://ac-hotels.com',
			type: 'hotel'
		},
		{
			lat: 43.5433,
			lng: -5.6657,
			name: 'Hotel Blue Santa Rosa',
			info: 'Santa Rosa 4 · Tel: 985 091 919<br>Centro peatonal, 50m de playa.',
			url: 'https://bluehoteles.es',
			type: 'hotel'
		},
		{
			lat: 43.546,
			lng: -5.6657,
			name: 'Hotel Blue Marqués',
			info: 'Marqués de San Esteban 11 · Tel: 985 090 929<br>Edificio clásico junto al Puerto.',
			url: 'https://bluehoteles.es',
			type: 'hotel'
		},
		{
			lat: 43.5376,
			lng: -5.6584,
			name: 'B&B Hotel Gijón Centro Begoña',
			info: 'Avda. de la Costa 44 · Tel: 985 147 211<br>Centro, zona comercial.',
			url: 'https://www.hotel-bb.com/es/hotel/gijon-centro-begona',
			type: 'hotel'
		},
		{
			lat: 43.5429,
			lng: -5.6638,
			name: 'Hotel Miramar',
			info: 'C/ Santa Lucía 9 · Tel: 985 351 008<br>Edificio de 1926, junto a playa y puerto.',
			type: 'hotel'
		},
		{
			lat: 43.5389,
			lng: -5.6482,
			name: 'Hotel Arena',
			info: 'Dr. Aquilino Hurlé 31 · Tel: 985 339 700<br>100m de playa San Lorenzo.',
			url: 'https://hotelarena.es',
			type: 'hotel'
		},
		{
			lat: 43.5171,
			lng: -5.6751,
			name: 'Hotel Villa de Gijón',
			info: 'C/ San Juan de Vallés 3 · Tel: 985 141 824',
			url: 'https://hotelvilladegijon.com',
			type: 'hotel'
		},
		{
			lat: 43.5438,
			lng: -5.6635,
			name: 'Apartamentos San Esteban',
			info: 'Marqués de San Esteban 11 · Tel: 985 09 09 29<br>Estudios y apartamentos.',
			url: 'https://bluehoteles.es',
			type: 'hotel'
		},
		{
			lat: 43.5126,
			lng: -5.5974,
			name: 'Camping Deva',
			info: 'Camín de la Pasadiella 85 · Tel: 985 13 38 48<br>Bungalows, cabañas y chalets.',
			type: 'hotel'
		},
		{
			lat: 43.5456,
			lng: -5.6645,
			name: 'Carnaval de Xixón',
			info: '📅 Febreru<br>Disfraces, chirigotas y ambientazu por les cais.',
			type: 'fiesta'
		},
		{
			lat: 43.5322,
			lng: -5.6611,
			name: 'Selmana Grande de Xixón',
			info: '📅 Agostu<br>La ciudá en modo fiesta: música, eventos y noches interminables.',
			type: 'fiesta'
		},
		{
			lat: 43.5398,
			lng: -5.6460,
			name: 'Festival de la Sidra Natural',
			info: '📅 Agostu<br>Culines, escanciáu y discusiones sobre qué chigre ye "el verdaderu".',
			type: 'fiesta'
		},
		{
			lat: 43.5432,
			lng: -5.6520,
			name: 'Nueche de San Xuan',
			info: '📅 23 de xunu<br>Hogueras na playa, saltos y magia de nueche corta.',
			type: 'fiesta'
		},
		{
			lat: 43.5888,
			lng: -5.7602,
			name: 'Festival de la Sardina (Candás)',
			info: '📅 1 d\'agostu<br>Sardinas a la brasa, mar de fondu y xente que flipa.',
			type: 'fiesta'
		},
		{
			lat: 43.4613,
			lng: -5.0585,
			name: 'Descensu del Sella',
			info: '📅 Primer sábadu d\'agostu<br>Miles de piraguas, folixa y ríu. Fiesta Nacional de Interés Turístico.',
			type: 'fiesta'
		},
		{
			lat: 43.3621,
			lng: -5.8440,
			name: 'San Matéu (Uviéu)',
			info: '📅 Septiembre<br>Fiestes grandes na capital: conciertos y cascu históricu petáu.',
			type: 'fiesta'
		},
		{
			lat: 43.4813,
			lng: -5.4354,
			name: 'Fiesta de la Mazana (Villaviciosa)',
			info: '📅 Octubre<br>Manzana en toles sos formes: dulce, sidra y paisaxe de valle.',
			type: 'fiesta'
		},
		{
			lat: 43.5300,
			lng: -5.6700,
			name: 'Feria de Muestres d\'Asturies',
			info: '📅 Agostu<br>Feria, conciertos y casetes. Tol mundu pa\'l mesmu sitiu.',
			type: 'fiesta'
		}
	];

	const typeStyle = {
		sublime: { emoji: '🏆', color: '#b8960f' },
		sidreria: { emoji: '🍾', color: '#1a6b3c' },
		restaurant: { emoji: '🍴', color: '#b45309' },
		hotel: { emoji: '🏨', color: '#7c3aed' },
		visit: { emoji: '📍', color: '#0369a1' },
		bar: { emoji: '🍺', color: '#be185d' },
		fiesta: { emoji: '🎪', color: '#d4380d' }
	};

	/** @type {HTMLDivElement | undefined} */
	let mapEl;

	onMount(() => {
		/** @type {import('leaflet').Map | null} */
		let map = null;
		let tries = 0;
		const maxTries = 120;

		const interval = setInterval(() => {
			tries += 1;
			if (tries > maxTries) {
				clearInterval(interval);
				return;
			}
			if (typeof window === 'undefined' || !mapEl) return;
			const L = window['L'];
			if (!L) return;
			clearInterval(interval);

			map = L.map(mapEl).setView([43.53, -5.65], 11);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(map);

			/** @param {PlaceType} t */
			function makeIcon(t) {
				const { emoji, color } = typeStyle[t];
				return L.divIcon({
					className: 'leaflet-custom-pin-wrap',
					html: `<div class="leaflet-custom-pin" style="background:${color}">${emoji}</div>`,
					iconSize: [34, 34],
					iconAnchor: [17, 34],
					popupAnchor: [0, -30]
				});
			}

			for (const p of places) {
				const marker = L.marker([p.lat, p.lng], { icon: makeIcon(p.type) }).addTo(map);
				let html = `<div class="map-popup"><strong>${p.name}</strong><br>${p.info}`;
				if (p.url) {
					html += `<br><a href="${p.url}" target="_blank" rel="noopener noreferrer">Visitar web →</a>`;
				}
				html += '</div>';
				marker.bindPopup(html);
			}
		}, 50);

		return () => {
			clearInterval(interval);
			map?.remove();
		};
	});

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Mapa', item: 'https://manriquegarcia.com/mapa' }
		]
	});
</script>

<svelte:head>
	<title>Mapa | ¡Puxa Asturies!</title>
	<meta
		name="description"
		content="Mapa interactivo de Asturias con restaurantes, sidrerías, hoteles y lugares de interés marcados."
	/>
	<link rel="canonical" href="https://manriquegarcia.com/mapa" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://manriquegarcia.com/mapa" />
	<meta property="og:title" content="Mapa | ¡Puxa Asturies!" />
	<meta
		property="og:description"
		content="Mapa interactivo de Asturias con restaurantes, sidrerías, hoteles y lugares de interés marcados."
	/>
	<meta property="og:site_name" content="¡Puxa Asturies!" />
	<meta property="og:locale" content="es_ES" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Mapa | ¡Puxa Asturies!" />
	<meta
		name="twitter:description"
		content="Mapa interactivo de Asturias con restaurantes, sidrerías, hoteles y lugares de interés marcados."
	/>
	<meta property="og:image" content="https://manriquegarcia.com/images/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
		crossorigin="anonymous"
	/>
	<script
		src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
		crossorigin="anonymous"
	></script>
</svelte:head>

<main class="container map-page">
	<h1>Mapa</h1>

	<p class="page-intro">
		Too colocáu nel mapa: sidrerías, restaurantes, bares, hoteles y lo que merez la pena visitar.
		Así nun tienes escusa pa perderte… bueno, daqué menos.
	</p>

	<div class="map-wrap">
		<div id="map" bind:this={mapEl}></div>
	</div>

	<div class="legend">
		<h2>Leyenda</h2>
		<ul>
			<li><span class="lg sublime">🏆</span> Sublime</li>
			<li><span class="lg sidreria">🍾</span> Sidrería / restaurante informal</li>
			<li><span class="lg restaurant">🍴</span> Restaurante</li>
			<li><span class="lg hotel">🏨</span> Hotel / alojamiento</li>
			<li><span class="lg visit">📍</span> Qué visitar</li>
			<li><span class="lg bar">🍺</span> Bares / copas</li>
			<li><span class="lg fiesta">🎪</span> Fiestas y romería</li>
		</ul>
	</div>

	<div class="section-note">
		<p>
			Los marcadores son orientativos. Si el GPS te lleva al mar, para y piensa: igual toi
			flipando con el zoom.
		</p>
	</div>
</main>

<style>
	.map-page .map-wrap {
		margin: 1.5rem 0;
		border-radius: var(--radius);
		overflow: hidden;
		border: 1px solid var(--color-border);
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
	}

	.map-page #map {
		height: 70vh;
		width: 100%;
		min-height: 280px;
		border-radius: var(--radius);
		background: var(--color-border);
	}

	:global(.leaflet-custom-pin-wrap) {
		background: transparent !important;
		border: none !important;
	}

	:global(.leaflet-custom-pin) {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		line-height: 1;
		border: 2px solid #fff;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.28);
	}

	:global(.map-popup a) {
		font-weight: 600;
	}

	.legend {
		margin: 2rem 0;
		padding: 1.25rem 1.5rem;
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
	}

	.legend h2 {
		margin-top: 0;
		font-size: 1.2rem;
	}

	.legend ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.5rem;
		font-size: 0.92rem;
	}

	.legend li {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.lg {
		display: inline-flex;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		align-items: center;
		justify-content: center;
		font-size: 0.95rem;
		border: 2px solid #fff;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
		flex-shrink: 0;
	}

	.lg.sublime {
		background: #b8960f;
	}
	.lg.sidreria {
		background: #1a6b3c;
	}
	.lg.restaurant {
		background: #b45309;
	}
	.lg.hotel {
		background: #7c3aed;
	}
	.lg.visit {
		background: #0369a1;
	}
	.lg.bar {
		background: #be185d;
	}
	.lg.fiesta {
		background: #d4380d;
	}
</style>
