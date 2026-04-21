<script>
	import CommentSection from '$lib/components/CommentSection.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import AiSummary from '$lib/components/AiSummary.svelte';

	const fiestas = [
		{ month: 'Xineru', items: [
			{ name: 'El Guirria y el Aguinaldo', date: '1 de xineru', location: 'Ponga', description: 'Personaxe tradicional que recorre los pueblos pidiendo l\'aguinaldu. Empieza l\'anu con folklore de verdá.' },
			{ name: 'Fiesta de los Nabos', date: 'Xineru', location: 'La Foz de Morcín', description: 'Nabu, cocíu y tradición. Suena raru pero ye de lo más auténticu del mes.' },
			{ name: 'Certamen del Quesu d\'Afuega\'l Pitu', date: 'Xineru', location: 'Morcín', description: 'El quesu más asturianu del mundu en competición. Si te gusta el quesu, esto ye Disneyland.' },
			{ name: 'Jornades Gastronómiques de los Oricios', date: 'Xineru', location: 'Xixón', description: 'Oricios (erizos de mar) na so máxima expresión. Solo pa valientes y pa golosos del mar.' },
			{ name: 'Jornades de la Fabada', date: 'Tol mes de xineru', location: 'Carreño', description: 'Un mes enteru de fabada. ¿Necesites más motivación pa venir en xineru?' },
		]},
		{ month: 'Febreru', items: [
			{ name: 'Les Comadres', date: 'Febreru', location: 'Pola de Siero', description: 'Fiesta de muyeres con raíces medievales. Ambiente, sidra y sororidá a lo asturiano.' },
			{ name: 'Antroxu de Xixón', date: 'Febreru', location: 'Xixón', description: 'Disfraces, chirigotas y ambientazu por les cais. Si nun vas disfrazáu, igual te sientes raru.' },
			{ name: 'Antroxu d\'Avilés', date: 'Febreru', location: 'Avilés', description: 'Unu de los carnavales más grandes d\'Asturies. El Descensu de Galiana ye mítico.' },
			{ name: 'Antroxu de Langreo', date: 'Febreru', location: 'Langreo', description: 'Les cuenques tamién saben de carnaval. Comparsas, folixa y ambiente mineru festivo.' },
			{ name: 'Jornades de la Calderada y Caldereta', date: 'Febreru', location: 'Luanco (Gozón)', description: 'Pescáu, cuchara y mar. El aperitivu perfecto antes de los carnavales.' },
			{ name: 'Domingo de Sidros y Comedies', date: 'Febreru', location: 'Valdesoto (Siero)', description: 'Tradición centenaria: música, teatro y sidra nos pueblos.' },
		]},
		{ month: 'Marzu', items: [
			{ name: 'Festival de los Oricios', date: 'Marzu', location: 'Bañugues (Gozón)', description: 'Más oricios, esta vez con vistes al Cantábricu. Frescu del mar directo al platu.' },
			{ name: 'Festival Gastronómicu de la Angula', date: 'Marzu', location: 'Soto del Barco', description: 'Pa los bolsillos valientes: angulas del Nalón a precios de pueblo, que nun ye poco.' },
			{ name: 'Jornades del Cabritu', date: 'Marzu', location: 'Laviana', description: 'Cabritu al hornu, cuenques mineres y paisaxe verde. Carne con raíz.' },
			{ name: 'Espichas en Laviana', date: 'Marzu a mayu', location: 'Laviana', description: 'Meses d\'espichas (sidra directo del tonel). Si te gusta la sidra sin filtros, tas nel sitiu.' },
			{ name: 'Jornades de San José', date: '19 de marzu', location: 'Xixón y varios', description: 'El santu que trae les primeres jornades gastronómiques de primavera.' },
		]},
		{ month: 'Abril', items: [
			{ name: 'Selmana Santa', date: 'Marzu / abril (móvil)', location: 'Asturies', description: 'Procesiones con tradición. Depués, sidra y risa cuando acabe, que equí nun aguantamos serios muncho tiempu.' },
			{ name: 'Folixa na Primavera', date: 'Abril', location: 'Mieres', description: 'Conciertos, ambiente y una de les fiestes más populares de les cuenques mineres.' },
			{ name: 'Jornades del Pixín', date: 'Abril', location: 'Muros del Nalón', description: 'Pixín (rape) fresquísimo na costa asturiana. Cuchara y mar.' },
			{ name: 'Certamen de Quesos Artesanos d\'Asturies', date: 'Abril', location: 'Salas', description: 'Más de 40 variedades de quesu asturianu nun mesmu sitiu. Peligrosu pal bolsillu.' },
			{ name: 'Primera Sidra del Anu', date: 'Abril', location: 'Xixón', description: 'Se descorcha la primera sidra de la temporada. Ritual sagráu.' },
			{ name: 'Campeonatu Mundial de Surf', date: 'Abril', location: 'Tapia de Casariego', description: 'Oles del Cantábricu y competición internacional. Tapia ye la capital del surf en Asturies.' },
		]},
		{ month: 'Mayu', items: [
			{ name: 'GastroLuarca', date: 'Mayu', location: 'Luarca (Valdés)', description: 'La Villa Blanca se llena de gastronomía. Sidra, mar y cocina d\'autor a precios de conceyu.' },
			{ name: 'Fiesta de La Flor', date: 'Mayu', location: 'Lada (Langreo)', description: 'Flores, folklore y tradición industrial. Les cuenques en primavera brillen.' },
			{ name: 'Festival Somos la Ostra', date: 'Mayu', location: 'Castropol', description: 'Ostras del Eo, una de les ríes más belles. Mariscu y paisaxe sin competencia.' },
			{ name: 'Certamen de Tapas de Xixón', date: 'Mayu', location: 'Xixón', description: 'Les barres de Xixón en competición. Tu misión: probar toles que puedas. Suerte.' },
			{ name: 'Jornades de Platos a la Sidra', date: 'Mayu', location: 'Nava', description: 'Too cocinao con sidra: el ríu, el mar y la tierra pasaos por tonel.' },
		]},
		{ month: 'Xunu', items: [
			{ name: 'Nueche de San Xuan', date: '23 de xunu', location: 'Plages y costa', description: 'Hogueras na playa, saltos y magia de nueche corta. L\'ambientu ye de esos que recordes anos.' },
			{ name: 'Martes de Campo', date: 'Xunu (variable)', location: 'Uviéu', description: 'La jira más antigua d\'Asturies: El Fontán se llena y Uviéu celebra al aire libre.' },
			{ name: 'Festival de la Fresa de Candamo', date: 'Xunu', location: 'Grullos (Candamo)', description: 'Freses naturales y postres de la tierra. Dulce como l\'asturianu en verano.' },
			{ name: 'Corpus Christi', date: 'Xunu', location: 'Varios (Taramundi, Pravia...)', description: 'Alfombres florales, procesiones y tradición relixosa con toque popular.' },
			{ name: 'Feria de Muestres de Vegadeo', date: 'Xunu', location: 'Vegadeo', description: 'El occidente asturianu presume de productos locales, ganáu y artesanía.' },
		]},
		{ month: 'Xullo', items: [
			{ name: 'Semana Negra de Xixón', date: 'Xullo', location: 'Xixón (El Natahoyo)', description: 'Festival de novela negra, ciencia ficción y cultura popular. Carpas, conciertos y tertulies nocturnes.' },
			{ name: 'Festival de la Sidra en Nava', date: 'Xullo', location: 'Nava', description: 'La capital de la sidra celebra la so fiesta. Escanciáu, concursos y culines hasta nun poder más.' },
			{ name: 'Jornades del Bonito en Avilés', date: 'Xullo', location: 'Avilés', description: 'Bonitu del Cantábricu: frescu, a la plancha, encebollao... Como quieras, pero que sea d\'equí.' },
			{ name: 'Jornades del Bonito en Luanco', date: 'Xullo', location: 'Luanco (Gozón)', description: 'Más bonitu, ahora con vistes al puerto de Luanco. Pescáu con paisaxe.' },
			{ name: 'Mercáu Medieval en Xixón', date: 'Xullo', location: 'Xixón', description: 'Puestos medievales, artesanía y olor a especias nel centru de Xixón.' },
			{ name: 'Los Exconxuraos', date: 'Xullo', location: 'Llanera', description: 'Festival con música celta, brujas y tradición. De les fiestes más peculiares d\'Asturies.' },
		]},
		{ month: 'Agostu', items: [
			{ name: 'Festival de la Sardina', date: '1 d\'agostu', location: 'Candás (Carreño)', description: 'Sardines a la brasa, mar de fondu y xente que flipa. Un clásicu absolutu del veranu.' },
			{ name: 'Descensu Internacional del Sella', date: 'Primer sábadu d\'agostu', location: 'Ribadesella', description: 'Miles de piraguas, folixa y ríu. Fiesta de Interés Turístico Internacional. Nun te la pierdas.' },
			{ name: 'Selmana Grande de Xixón', date: 'Agostu', location: 'Xixón', description: 'La ciudá en modo fiesta total: música, eventos y noches interminables na Plaza Mayor.' },
			{ name: 'Festival de la Sidra Natural', date: 'Agostu', location: 'Xixón (Plaza Mayor)', description: 'Culines, escanciáu y discusiones sobre qué chigre ye "el verdaderu". Ven con sed.' },
			{ name: 'Feria de Muestres d\'Asturies (FIDMA)', date: 'Agostu', location: 'Xixón (Recinto Ferial)', description: 'Feria, conciertos y casetes. Tol mundu pal mesmu sitiu. Reserva paciencia.' },
			{ name: 'Día de Asturias en Xixón', date: '2 d\'agostu', location: 'Xixón (Cerro Sta. Catalina)', description: 'Celebración nel Elogio del Horizonte. Gaites, sidra y vistes espectaculares.' },
			{ name: 'El Xiringüelu', date: 'Agostu', location: 'Pravia', description: 'Una de les romeries más multitudinaries. Gaitas, baile y sidra nel campu.' },
			{ name: 'Ntra. Sra. de la Barca y San Roque', date: '14-17 agostu', location: 'Navia', description: 'Les fiestes patronales de Navia: tradición marinera, conciertos y ambiente costero.' },
		]},
		{ month: 'Septiembre', items: [
			{ name: 'San Matéu n\'Uviéu', date: 'Septiembre', location: 'Uviéu', description: 'Fiestes grandes na capital: conciertos y cascu históricu petáu de xente. Imprescindible.' },
			{ name: 'Virxen de Covadonga', date: '8 de septiembre', location: 'Xixón y Uviéu', description: 'La Santina. Procesu rexu, devoción y folixa por too lo alto n\'ambas ciudades.' },
			{ name: 'Fiesta de la Sidra de Villaviciosa', date: 'Septiembre', location: 'Villaviciosa', description: 'La otra capital de la sidra tamién tiene la so fiesta. Escanciáu y competición.' },
			{ name: 'Mercáu Marinero', date: 'Septiembre', location: 'Villaviciosa', description: 'Productu del mar, tradición pesquera y ambiente costeru nel corazón del conceyu.' },
		]},
		{ month: 'Octubre', items: [
			{ name: 'Fiesta de la Mazana', date: 'Octubre', location: 'Villaviciosa', description: 'Manzana en toles sos formes: dulce, sidra y paisaxe de valle. Ideal pa folixa tranquila.' },
			{ name: 'Les Tres Arribadas de Lastres', date: 'Octubre', location: 'Lastres (Colunga)', description: 'Fiesta marinera nel pueblu de Doctor Mateo. Tradición pesquera y paisaxe increíble.' },
			{ name: 'Fiesta de la Vendimia', date: 'Octubre', location: 'Cangas del Narcea', description: 'Vendimia nel corazón del vinu asturianu. Nun todo ye sidra: tamién hay vines nobles.' },
			{ name: 'Gijón de Sidras', date: 'Octubre', location: 'Xixón', description: 'Ruta de sidres per les barres de Xixón. Semana entera de culines y gastronomía.' },
			{ name: 'Jornades de les Setes', date: 'Octubre-payares', location: 'Piloña y Riosa', description: 'Setes, boletus y fungi de los montes asturianos. Otonu nel platu.' },
		]},
		{ month: 'Payares', items: [
			{ name: 'Amagüestu', date: 'Payares', location: 'Tol país', description: 'Castanes asaes, sidra y olor a fueu. Si nun probaste castana con sidra, falta dalgo na to vida.' },
			{ name: 'Certamen de la Castana en Arriondas', date: 'Payares', location: 'Arriondas (Parres)', description: 'El amagüestu más famoso del oriente. Castanes, folklore y ambiente de pueblu.' },
			{ name: 'Fiesta de La Seronda', date: 'Payares', location: 'Avilés', description: 'Avilés celebra l\'otonu con gastronomía, cultura y el calor de la ciudá vieya.' },
			{ name: 'Jornades de los Callos', date: 'Payares', location: 'Xixón', description: 'Callos, fabes y cuchara. Xixón en modo otonu ye un placer culinario.' },
			{ name: 'Jornades de les Fabes', date: 'Payares', location: 'Llanes y Colunga', description: 'Les fabes asturianes en too so esplendor. Cada conceyu tien la so receta y el so orgullo.' },
			{ name: 'Esfoyón y Amagosto en Navelgas', date: 'Payares', location: 'Navelgas (Tineo)', description: 'Tradición rural en estáu puru: esfoyar el maíz, castanes y folixa.' },
		]},
		{ month: 'Avientu', items: [
			{ name: 'Santa Bárbara', date: '4 d\'avientu', location: 'Mieres, Langreo, Cangas del Narcea', description: 'La patrona de los mineros. Les cuenques y Cangas celebren con orgullo la so historia.' },
			{ name: 'Festival del Percebu y Mariscu', date: 'Avientu', location: 'Tapia de Casariego', description: 'Percebes frescos del Cantábricu. Si te gusta el mariscu, esto ye un suenu.' },
			{ name: 'Jornades de la Matanza', date: 'Avientu', location: 'Caso, Llanera, Felechosa', description: 'Matanza tradicional: embutidos, morcilla y tradición del gochín.' },
			{ name: 'Mercáu de Navidá', date: 'Avientu', location: 'Uviéu y La Felguera', description: 'Lluz, puestos y ambiente navideñu. Uviéu queda preciosa nel Nadal.' },
			{ name: 'Selmana de les Fabes', date: 'Avientu', location: 'Colunga', description: 'Fabes con too: almejas, pixín, centollo... Colunga nun escatima.' },
			{ name: 'Jornades del Pote Asturiano', date: 'Avientu', location: 'Valle de Turón (Mieres)', description: 'Pote, cuchara y mina. La cocina que calentaba a los mineros, agora pa todos.' },
		]},
	];

	const allEvents = fiestas.flatMap(m => m.items);

	const pageTitle = 'Calendariu de fiestes | ¡Puxa Asturies!';
	const pageDesc =
		'Calendario completo de fiestas de Asturias mes a mes: Descenso del Sella, Semana Grande, San Juan, Semana Negra y 60+ celebraciones.';
	const canonical = 'https://manriquegarcia.com/fiestas';

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Fiestas', item: 'https://manriquegarcia.com/fiestas' }
		]
	});

	const eventJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Fiestas de Asturias',
		itemListElement: allEvents.map((f, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			item: {
				'@type': 'Event',
				name: f.name,
				description: f.description,
				location: { '@type': 'Place', name: f.location, address: { '@type': 'PostalAddress', addressRegion: 'Asturias', addressCountry: 'ES' } },
				eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode'
			}
		}))
	});

	const faqJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: '¿Cuál es la fiesta más importante de Asturias?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'La Semana Grande de Gijón en agosto. Fuegos artificiales, conciertos y mucha sidra.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Qué es el Descenso del Sella?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Una fiesta-carrera de piraguas de Arriondas a Ribadesella, el primer sábado de agosto. Miles de personas celebran en la orilla.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Cuándo es la Noche de San Juan en Asturias?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'El 23 de junio. Se encienden hogueras en todas las playas de la costa. En Gijón es espectacular.'
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
		content="Calendario de fiestas de Asturias — ¡Puxa Asturies!"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
	{@html `<script type="application/ld+json">${eventJsonLd}<\/script>`}
	{@html '<script type="application/ld+json">' + faqJsonLd + '<\/script>'}
</svelte:head>

<main class="container">
	<h1>Calendariu de fiestes (con dates aproximao)</h1>
	<Breadcrumb items={[{ label: 'Fiestas' }]} />

	<AiSummary
		pageTitle={pageTitle}
		pageContent="Calendario completo de fiestas y festivales de Asturias"
	/>

	<p class="page-intro">
		Asturies nun para: hay fiesta pa'l que quiera folixa y pa'l que quiera tradición. Dates
		<strong>orientativas</strong> — confirma siempre nel ayuntamientu o na web oficial, que los
		calendarios muden y equí somos guía, nun somos axenda oficial.
	</p>

	<div class="section-note">
		<p>
			<strong>Conseyu:</strong> n'agostu todo el mundu pensa lo mesmo. Reserva coche, cama o paciencia
			antes, que si nun, vas acabar en cola pa aparcar hasta el año que viene.
		</p>
	</div>

	{#each fiestas as monthGroup (monthGroup.month)}
		<h2 class="month-heading">{monthGroup.month}</h2>
		<ol class="fiesta-timeline">
			{#each monthGroup.items as f, i (f.name + i)}
				<li class="fiesta-card card">
					<div class="fiesta-marker" aria-hidden="true"></div>
					<div class="fiesta-body">
						<h3 class="fiesta-title">{f.name}</h3>
						<p class="fiesta-meta">
							<span class="tag">📅 {f.date}</span>
							<span class="tag warm">📍 {f.location}</span>
						</p>
						<p class="description">{f.description}</p>
					</div>
				</li>
			{/each}
		</ol>
	{/each}

	<div class="section-note source-note">
		<p>
			Calendario elaboráu a partir de
			<a href="https://www.asturiasdefiesta.es/" target="_blank" rel="noopener noreferrer">AsturiasDeFiesta.es</a>,
			la referencia más completa de fiestes y eventos n'Asturies. Visita la so web pa dates exactes y fiestes de cada pueblo.
		</p>
	</div>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/mapa" class="related-link"
				>🗺️ Ver nel mapa<span>Les fiestas marcaes nel mapa</span></a
			>
			<a href="/restaurantes" class="related-link"
				>🍴 Dónde comer<span>Sidrerías pa reposar depués de la folixa</span></a
			>
			<a href="/visitar" class="related-link"
				>🏛️ Qué visitar<span>Completar la ruta con cultura</span></a
			>
		</div>
	</div>

	<ShareButtons title="Calendario de fiestas de Asturias" description="Más de 60 fiestas mes a mes" />
	<CommentSection
		title="Comentarios — fiestes"
		placeholder="¿Qué fiesta recomiendas o qué cayeron mal? Cuéntanoslo…"
		page="/fiestas"
	/>
</main>

<style>
	.month-heading {
		margin: 2.5rem 0 0.5rem;
		font-size: 1.6rem;
		font-family: var(--font-heading, Georgia, serif);
		color: var(--color-accent, #1a6b3c);
		border-bottom: 2px solid var(--color-accent, #1a6b3c);
		padding-bottom: 0.3rem;
	}

	.fiesta-timeline {
		list-style: none;
		padding: 0;
		margin: 0.75rem 0 0;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.fiesta-timeline::before {
		content: '';
		position: absolute;
		left: 0.65rem;
		top: 0.5rem;
		bottom: 0.5rem;
		width: 3px;
		background: linear-gradient(
			to bottom,
			var(--color-accent, #1a6b3c),
			rgba(26, 107, 60, 0.25)
		);
		border-radius: 3px;
	}

	.fiesta-card {
		position: relative;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem;
		align-items: start;
		padding-left: 2.25rem;
		margin: 0;
		border-left: none;
	}

	.fiesta-marker {
		position: absolute;
		left: 0.2rem;
		top: 1.35rem;
		width: 12px;
		height: 12px;
		background: var(--color-accent, #1a6b3c);
		border: 2px solid var(--color-card, #fff);
		border-radius: 50%;
		box-shadow: 0 0 0 2px rgba(26, 107, 60, 0.35);
	}

	.fiesta-title {
		margin: 0 0 0.35rem;
		font-size: 1.2rem;
		font-family: var(--font-heading, Georgia, serif);
		color: var(--color-accent, #1a6b3c);
	}

	.fiesta-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0 0 0.65rem;
	}

	.fiesta-body .description {
		margin: 0;
	}

	.source-note {
		margin-top: 2.5rem;
		font-size: 0.9rem;
	}

	.source-note a {
		font-weight: 600;
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
