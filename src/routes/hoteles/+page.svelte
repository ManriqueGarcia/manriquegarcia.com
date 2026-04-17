<script>
	import CommentSection from '$lib/components/CommentSection.svelte';

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
			name: 'Hotel Begoña Centro',
			address: 'Avda. de la Costa 44, Gijón',
			phone: 'Tel: 985 147 211',
			description:
				'Centro total: zona comercial, estaciones cerca, playa a un paso. No tienes excusa pa no salir a la calle.',
			tags: ['Céntrico'],
			url: 'https://hotelesbegona.com'
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
			name: 'Hotel León',
			address: 'Avda. de la Costa 45, Gijón',
			phone: 'Tel: 985 37 01 11',
			description: 'Más de 30 años abriendo la puerta a los visitantes. Un veterano que sabe lo que hace.',
			tags: [],
			url: 'https://hotel-leon.com'
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
</script>

<svelte:head>
	<title>Hoteles | ¡Puxa Asturies!</title>
</svelte:head>

<main class="container">
	<h1>Hoteles y Alojamiento</h1>

	<p class="page-intro">
		Gijón dispone de una gran variedad de hoteles. Aquí hemos resumido los más conocidos, con
		comentarios que nun van a sustituir a TripAdvisor pero sí a avisarte de lo importante: si ta
		cerca de la playa, si hay parking, y si vas a despertate con ganas de fabada o con ganas de
		volver a dormir.
	</p>

	<div class="section-note">
		<p>Es importante reservar con tiempo.</p>
	</div>

	<h2>Hoteles en Gijón</h2>

	<div class="card-grid">
		{#each hotels as h (h.name)}
			<article class="card">
				<h3>{h.name}</h3>
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

	<CommentSection
		sectionTitle="Comentarios sobre hoteles"
		inputPlaceholder="¿Dormiste en dalgún sitiu que merezca la pena?…"
	/>
</main>

<style>
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin: 0.5rem 0 0.75rem;
	}
</style>
