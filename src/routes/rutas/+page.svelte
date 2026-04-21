<script>
	import ShareButtons from '$lib/components/ShareButtons.svelte';

	const pageTitle = 'Rutas a pie por Asturias | ¡Puxa Asturies!';
	const pageDesc =
		'Rutas a pie por Gijón y Oviedo: paseos de 2 horas con paradas en los mejores sitios.';
	const canonical = 'https://manriquegarcia.com/rutas';

	const routes = [
		{
			title: 'Cimadevilla y el mar',
			duration: '~2 h',
			note: 'Toa a pie en Xixón.',
			stops: [
				{
					n: 1,
					name: 'Puerto Deportivo',
					tip: 'Empieza con vistas al cantil y olor a salitre.',
					mapa: true
				},
				{ n: 2, name: 'Plaza Mayor', tip: 'Corazón del centru: pa tomar pulsu de la ciudá.', mapa: false },
				{
					n: 3,
					name: 'Cimadevilla (callejear)',
					tip: 'Perdite voluntariamente: escalones, casines de colores, bodegues.',
					mapa: true
				},
				{
					n: 4,
					name: 'Cerro Santa Catalina (Elogio del Horizonte)',
					tip: 'Sube con calma; Chillida te espera arriba con viento gratis.',
					mapa: true
				},
				{
					n: 5,
					name: 'Playa San Lorenzo (paseo marítimo)',
					tip: 'Baxa al arenales y camina el muro como si yá vivieras aquí.',
					mapa: true
				},
				{
					n: 6,
					name: 'Sidra en el Muro',
					tip: 'Culín de despedida mirando al mar — nun fa falda más discursu.',
					mapa: false
				}
			]
		},
		{
			title: 'Oviedo monumental',
			duration: '~2,5 h',
			note: 'Paseu urbanu n’Uviéu, con fuelgu pa Gascona.',
			stops: [
				{
					n: 1,
					name: 'Catedral de San Salvador',
					tip: 'Torre si abre, claustru siempre dignu de fotu “seria”.',
					mapa: true
				},
				{
					n: 2,
					name: 'Plaza de la Constitución',
					tip: 'Ayuntamientu, cafés y sensación de capital con mayúscules.',
					mapa: false
				},
				{
					n: 3,
					name: 'Calle Gascona (sidra!)',
					tip: 'Tapeo horizontal: un culín equí, otru acullá, ensin remordimientos.',
					mapa: true
				},
				{
					n: 4,
					name: 'Parque San Francisco',
					tip: 'Pavos reales, sombra y bancos pa digestionar la sidra.',
					mapa: false
				},
				{
					n: 5,
					name: 'Teatro Campoamor',
					tip: 'Fachada neoclásica; si hai función, meyor con entrada.',
					mapa: true
				},
				{
					n: 6,
					name: 'El Fontán (mercado)',
					tip: 'Arcos, productu frescu y excusa perfecta pa un últimu pinchu.',
					mapa: false
				}
			]
		},
		{
			title: 'Costa y naturaleza',
			duration: '~3 h',
			note: 'Necesites coche (o valentía ciclista) pa enllazar tramos.',
			stops: [
				{
					n: 1,
					name: 'Playa de San Lorenzo',
					tip: 'Salida clásica: arena, olas y barcos al fondu.',
					mapa: true
				},
				{
					n: 2,
					name: 'Jardín Botánico Atlántico',
					tip: 'Verde que ordena la cabeza antes de más km.',
					mapa: true
				},
				{
					n: 3,
					name: 'Universidad Laboral',
					tip: 'Brien monumental: fotu obligada y piernes que lo agradecen.',
					mapa: true
				},
				{
					n: 4,
					name: 'Playa de La Ñora',
					tip: 'Más íntima que San Lorenzo; ideal pa respirar.',
					mapa: false
				},
				{
					n: 5,
					name: 'Candás (pueblo marinero)',
					tip: 'Puertu, terrazas y sensación de que el mar manda.',
					mapa: true
				},
				{
					n: 6,
					name: 'Luanco y vuelta',
					tip: 'Puertu bonitu, faru y café antes de tornar a Xixón.',
					mapa: true
				}
			]
		}
	];

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Rutas a pie', item: canonical }
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
	<meta property="og:image:alt" content="Rutas y planes por Asturias — ¡Puxa Asturies!" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
</svelte:head>

<main class="container">
	<h1>Rutas a pie por Asturias</h1>

	<p class="page-intro">
		Tres itinerarios pensaos pa caminar, flipar y parar. Dos en ciudá (Xixón y Uviéu) y unu costeru que
		pide ruedes pa enllazar pueblos. Tiempu aproximáu: valle con valle según el ritmu y los culines
		intermedios.
	</p>

	{#each routes as route (route.title)}
		<article class="route-card">
			<header class="route-head">
				<h2>{route.title}</h2>
				<p class="route-meta">
					<span class="route-time">{route.duration}</span>
					<span class="route-note">{route.note}</span>
				</p>
			</header>
			<ol class="stop-list">
				{#each route.stops as stop (stop.n)}
					<li>
						<span class="stop-num" aria-hidden="true">{stop.n}</span>
						<div class="stop-body">
							<h3 class="stop-title">
								{#if stop.mapa}
									<a href="/mapa">{stop.name}</a>
								{:else}
									{stop.name}
								{/if}
							</h3>
							<p class="stop-tip">{stop.tip}</p>
						</div>
					</li>
				{/each}
			</ol>
		</article>
	{/each}

	<p class="map-hint">
		Les paraxes con enllaz abren el <a href="/mapa">mapa interactivu</a>: busca’l mesmu nome nel mapa y
		fai zoom hasta que el GPS perdone.
	</p>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/mapa" class="related-link"
				>🗺️ Mapa<span>Marcadores de too lo que importa</span></a
			>
			<a href="/visitar" class="related-link"
				>🏛️ Qué visitar<span>Idees si quies allargar el viaxe</span></a
			>
			<a href="/restaurantes" class="related-link"
				>🍴 Restaurantes<span>Pa cuando la ruta pide sidrería</span></a
			>
			<a href="/hoy" class="related-link"
				>📅 Qué hacer hoy<span>Recomendaciones según el mes</span></a
			>
		</div>
	</div>

	<ShareButtons title={pageTitle} description={pageDesc} />
</main>

<style>
	.page-intro {
		font-size: 1.05rem;
		line-height: 1.75;
		max-width: 720px;
	}

	.route-card {
		margin: 2rem 0;
		padding: 1.25rem 1.35rem;
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
		max-width: 760px;
	}

	.route-head h2 {
		margin: 0 0 0.35rem;
		font-size: 1.35rem;
	}

	.route-meta {
		margin: 0;
		font-size: 0.9rem;
		color: var(--color-text-muted);
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		align-items: baseline;
	}

	.route-time {
		font-weight: 600;
		color: var(--color-text);
	}

	.stop-list {
		list-style: none;
		margin: 1.25rem 0 0;
		padding: 0;
	}

	.stop-list li {
		display: flex;
		gap: 0.85rem;
		align-items: flex-start;
		margin-bottom: 1.1rem;
		padding-bottom: 1.1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.stop-list li:last-child {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.stop-num {
		flex-shrink: 0;
		width: 1.85rem;
		height: 1.85rem;
		border-radius: 50%;
		background: var(--color-accent);
		color: #fff;
		font-weight: 700;
		font-size: 0.95rem;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}

	.stop-body {
		min-width: 0;
	}

	.stop-title {
		margin: 0 0 0.25rem;
		font-size: 1.05rem;
		font-weight: 700;
	}

	.stop-title a {
		color: var(--color-text);
		text-decoration: underline;
		text-decoration-color: var(--color-accent);
		text-underline-offset: 3px;
	}

	.stop-title a:hover {
		color: var(--color-accent);
	}

	.stop-tip {
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.55;
		color: var(--color-text-muted);
	}

	.map-hint {
		max-width: 720px;
		line-height: 1.65;
		font-size: 0.95rem;
		color: var(--color-text-muted);
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
		transition: border-color 0.2s, box-shadow 0.2s;
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
