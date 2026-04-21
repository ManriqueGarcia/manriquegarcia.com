<script>
	import CommentSection from '$lib/components/CommentSection.svelte';
	import FavoriteButton from '$lib/components/FavoriteButton.svelte';
	import ShareWhatsApp from '$lib/components/ShareWhatsApp.svelte';
	import { slugify } from '$lib/utils/slugify.js';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';

	const hotels = [
		{
			name: 'Hotel Hernán Cortés',
			address: 'Fernández Vallín 5, Gijón',
			phone: 'Tel: 985 346 000',
			description:
				'Céntrico de narices. A 10 min de San Lorenzo paseando tranquilamente (5 si vas con prisa por echar el primer culín del día).',
			tags: ['Céntrico', 'WiFi gratuita'],
			url: 'https://hotelhernancortes.es'
		},
		{
			name: 'Hotel Begoña Park',
			address: 'Ctra. de la Providencia 566, Gijón',
			phone: 'Tel: 985 133 909',
			description:
				'Cerca del Rinconín (la zona de los amaneceres bonitos). Con parking, que en Xixón se agradece más que un pincho de tortilla a las 2 de la tarde.',
			tags: ['Parking', 'WiFi'],
			url: 'https://hotelesbegona.com'
		},
		{
			name: 'Hotel ABBA',
			address: 'Doctor Fleming 37, Gijón',
			phone: 'Tel: 985 000 000',
			description:
				'Al lado de San Lorenzo y del Parque Isabel la Católica. Sales del hotel y en 5 minutos estás en la playa o mirando patos. Plan redondo.',
			tags: [],
			url: 'https://abbagijonhotel.com'
		},
		{
			name: 'Parador Nacional Molino Viejo',
			address: 'Parque Isabel la Católica s/n, Gijón',
			phone: 'Tel: 985 370 511',
			description:
				'Un molino centenario dentro del parque. La fabada del restaurante ye pa llorar de emoción. Si quieres darte un homenaje de los buenos, *este ye el sitiu*.',
			tags: ['Parking', 'WiFi'],
			url: 'https://parador.es'
		},
		{
			name: 'Hotel TRYP Rey Pelayo',
			address: 'V. Torcuato Fdez. Miranda 26, Gijón',
			phone: 'Tel: 985 199 800',
			description:
				'Cerca de playa, del Molinón (¡Puxa Sporting!) y la Plaza de Toros. Ubicación matadora, nunca mejor dicho.',
			tags: [],
			url: ''
		},
		{
			name: 'Hotel AC Gijón',
			address: 'Avda. de Oviedo 15, Gijón',
			phone: 'Tel: 985 990 500',
			description:
				'Moderno, en zona residencial. A 10 min del centro. Pa los que prefieren tranquilidad y no oír a la xente volviendo de copas a las 4.',
			tags: [],
			url: 'https://ac-hotels.com'
		},
		{
			name: 'Hotel Villa de Gijón',
			address: 'C/ San Juan de Vallés 3, Gijón',
			phone: 'Tel: 985 141 824',
			description: 'Buen hotel sin pretensiones. Duermes bien, desayunas bien, y sales a comerte Xixón.',
			tags: [],
			url: 'https://hotelvilladegijon.com'
		},
		{
			name: 'B&B Hotel Gijón Centro Begoña',
			address: 'Avda. de la Costa 44, Gijón',
			phone: 'Tel: 985 147 211',
			description:
				'El antiguo Begoña Centro, ahora reformado por la cadena B&B Hotels. Centro total: zona comercial, estaciones cerca, playa a un paso. No tienes excusa pa no salir a la calle.',
			tags: ['Céntrico'],
			url: 'https://www.hotel-bb.com/es/hotel/gijon-centro-begona'
		},
		{
			name: 'Hotel Blue Santa Rosa',
			address: 'Santa Rosa 4, Gijón',
			phone: 'Tel: 985 091 919',
			description:
				'Centro peatonal, a 50 metros de la playa. Literalmente te caes de la cama y ya estás en la arena (bueno, casi).',
			tags: ['Céntrico', 'WiFi'],
			url: 'https://bluehoteles.es'
		},
		{
			name: 'Hotel Blue Marqués de San Esteban',
			address: 'Avda Marqués de San Esteban 11, Gijón',
			phone: 'Tel: 985 090 929',
			description:
				'Edificio clásico restaurado junto al Puerto Deportivo. 27 habitaciones. Pequeñín pero matón, como los güajes asturianos.',
			tags: [],
			url: 'https://bluehoteles.es'
		},
		{
			name: 'Apartamentos San Esteban',
			address: 'C/ Marqués de San Esteban 11, Gijón',
			phone: 'Tel: 985 09 09 29',
			description:
				'Estudios y apartamentos de 1-2 habitaciones con cocina completa. Pa los que quieren sentirse como en casa (pero con vistes al puerto).',
			tags: ['WiFi'],
			url: 'https://bluehoteles.es'
		},
		{
			name: 'Hotel Celuisma Pathos',
			address: 'Santa Elena 6, Gijón',
			phone: 'Tel: 985 176 400',
			description:
				'Centro, con decoración temática de personajes del siglo XX. Cada habitación ye un viaje en el tiempo. Original y curioso.',
			tags: ['Céntrico'],
			url: ''
		},
		{
			name: 'Hotel Castilla',
			address: 'C/ Corrida 50, Gijón',
			phone: 'Tel: 985 346 200',
			description:
				'Clásico, centro, 2 estrellas. Sin lujos pero honesto. Como una buena fabada: sin adornos pero que cumple.',
			tags: ['Céntrico'],
			url: ''
		},
		{
			name: 'Hotel La Polar',
			address: 'Avda Juan Carlos I, 20, Gijón',
			phone: 'Tel: 984 29 64 03',
			description:
				'Centro histórico junto al mar, temática marina, balcón en todas las habitaciones. Despertarse con el olor a salitre y el sonido de las gaviotas: Asturias pura.',
			tags: [],
			url: ''
		},
		{
			name: 'Hotel Miramar',
			address: 'C/ Santa Lucía 9, Gijón',
			phone: 'Tel: 985 351 008',
			description:
				'Edificio de 1926. A metros de playa y puerto. Tanto clasicismo junto casi da miedo, pero mola.',
			tags: [],
			url: ''
		},
		{
			name: 'Hotel Arena',
			address: 'C/ Doctor Aquilino Hurlé 31, Gijón',
			phone: 'Tel: 985 339 700',
			description: 'A 100 metros de San Lorenzo. El nombre lo dice todo: arena a un paso.',
			tags: [],
			url: 'https://hotelarena.es'
		},
		{
			name: 'Hotel Alcomar',
			address: 'C/ Cabrales 24, Gijón',
			phone: 'Tel: 985 357 011',
			description:
				'Vistes al paseo marítimo, gestión familiar y recepción 24h. Como la sidrería que no cierra nunca: siempre están ahí pa ti.',
			tags: ['WiFi'],
			url: ''
		},
		{
			name: 'Casona de Cefontes',
			address: 'Camino de la Carbayera 564, Castiello de Bernueces, Gijón',
			phone: 'Tel: 606 163 410',
			description:
				'Hotel rural rodeado de verde. A 5 km de la playa pero a años luz del estrés. Pa desconectar de verdad (y de la wifi, que aquí lo que manda es la naturaleza).',
			tags: ['Parking'],
			url: ''
		},
		{
			name: 'Hotel Doña María',
			address: 'Ctra Carbonera 28, Gijón',
			phone: 'Tel: 985 14 01 17',
			description:
				'Con restaurante propio. Cenas, te subes a la habitación, y no tienes que conducir. Plan perfecto después de unas sidras.',
			tags: [],
			url: ''
		},
		{
			name: 'Camping Deva',
			address: 'Camín de la Pasadiella 85, Gijón',
			phone: 'Tel: 985 13 38 48',
			description:
				'Pa los aventureros y los espíritus libres. 1ª categoría, a 4 km del centro. Bungalows, cabañas y chalets. Porque dormir al aire libre en Asturias (y que no te llueva encima) ye toda una experiencia.',
			tags: [{ label: 'Camping', warm: true }],
			url: ''
		}
	];

	const pageTitle = 'Hoteles | ¡Puxa Asturies!';
	const pageDesc =
		'Hoteles en Gijón: desde el Parador hasta hoteles céntricos, con descripciones honestas y enlaces de reserva.';
	const canonical = 'https://manriquegarcia.com/hoteles';

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Hoteles', item: 'https://manriquegarcia.com/hoteles' }
		]
	});

	const hotelJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Hoteles en Gijón',
		itemListElement: hotels.map((h, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			item: {
				'@type': 'LodgingBusiness',
				name: h.name,
				address: { '@type': 'PostalAddress', streetAddress: h.address, addressLocality: 'Gijón', addressRegion: 'Asturias', addressCountry: 'ES' },
				...(h.phone ? { telephone: '+34 ' + h.phone.replace(/^Tel:\s*/, '') } : {}),
				...(h.url ? { url: h.url } : {})
			}
		}))
	});

	const faqJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: '¿Dónde es mejor alojarse en Asturias?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Gijón es ideal como base. Desde ahí puedes moverte a toda la región. Oviedo es alternativa si prefieres ciudad con menos turismo.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Cuánto cuesta un hotel en Asturias?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Pensiones y hostales desde 35€/noche. Hoteles 3 estrellas: 60-90€. Casas rurales: 50-80€. En agosto sube un 30-50%.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Es mejor hotel o casa rural?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Para costa y ciudad, hotel. Para interior, Picos de Europa y pueblos, casa rural sin duda.'
				}
			}
		]
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
	<meta
		property="og:image:alt"
		content="Hoteles y alojamiento en Gijón y Asturias — ¡Puxa Asturies!"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
	{@html `<script type="application/ld+json">${hotelJsonLd}<\/script>`}
	{@html '<script type="application/ld+json">' + faqJsonLd + '<\/script>'}
</svelte:head>

<main class="container">
	<h1>Hoteles y Alojamiento</h1>
	<Breadcrumb items={[{ label: 'Hoteles' }]} />

	<p class="page-intro">
		Gijón dispone de una gran variedad de hoteles. Aquí hemos resumido los más conocidos, con
		comentarios que nun van a sustituir a TripAdvisor pero sí a avisarte de lo importante: si ta
		cerca de la playa, si hay parking, y si vas a despertarte con ganas de fabada o con ganas de
		volver a dormir.
	</p>

	<div class="section-note">
		<p>Es importante reservar con tiempo.</p>
	</div>

	<h2>Hoteles en Gijón</h2>

	<div class="card-grid">
		{#each hotels as h (h.name)}
			<article class="card">
				<div class="hotel-title-row">
					<h3>{h.name}</h3>
					<div class="hotel-actions">
						<FavoriteButton slug={`hotel-${slugify(h.name)}`} name={h.name} />
						<ShareWhatsApp name={h.name} description={h.description} />
					</div>
				</div>
				<p class="address">{h.address}</p>
				{#if h.phone}
					<p class="phone">{h.phone}</p>
				{/if}
				<p class="description">{h.description}</p>
				{#if h.tags?.length}
					<p class="tags">
						{#each h.tags as tag}
							{#if typeof tag === 'string'}
								<span class="tag">{tag}</span>
							{:else}
								<span class="tag warm">{tag.label}</span>
							{/if}
						{/each}
					</p>
				{/if}
				{#if h.url}
					<p>
						<a href={h.url} rel="noopener noreferrer" target="_blank">{h.url.replace(/^https?:\/\//, '')}</a>
					</p>
				{/if}
			</article>
		{/each}
	</div>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/restaurantes" class="related-link"
				>🍴 Restaurantes<span>Dónde comer bien cerquina del hotel</span></a
			>
			<a href="/mapa" class="related-link"
				>🗺️ Ver nel mapa<span>Ubica los hoteles y tolo demás</span></a
			>
			<a href="/practico" class="related-link"
				>📋 Info práctica<span>Cómo llegar y moverse por Xixón</span></a
			>
		</div>
	</div>

	<ShareButtons title="Hoteles en Gijón" description="Dónde dormir sin romperte el bolsillu" />
	<CommentSection
		sectionTitle="Comentarios sobre hoteles"
		inputPlaceholder="¿Dormiste en dalgún sitiu que merezca la pena?…"
	/>
</main>

<style>
	.hotel-title-row {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.35rem;
	}

	.hotel-title-row h3 {
		margin: 0;
		flex: 1;
		min-width: 0;
	}

	.hotel-actions {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		flex-shrink: 0;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin: 0.5rem 0 0.75rem;
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
</style>
