<script>
	import ShareButtons from '$lib/components/ShareButtons.svelte';

	const pageTitle = 'Qué hacer hoy en Asturias | ¡Puxa Asturies!';
	const pageDesc =
		'Recomendaciones para hoy según la época del año: qué comer, qué visitar y qué fiestas hay cerca.';
	const canonical = 'https://manriquegarcia.com/hoy';

	/** @param {number} m 0–11 from Date.getMonth() */
	function seasonKey(m) {
		if (m === 11 || m <= 1) return 'winter';
		if (m >= 2 && m <= 4) return 'spring';
		if (m >= 5 && m <= 7) return 'summer';
		return 'autumn';
	}

	const monthIndex = new Date().getMonth();
	const key = seasonKey(monthIndex);

	const seasons = {
		winter: {
			title: 'Iviernu',
			comer: ['Cocina de cuchara pa entrar en calor', 'Fabada que arrope', 'Callos que manden', 'Pote asturianu como abrigu moral'],
			visitar: ['Uviéu y el cascu históricu con calma', 'Museos cuando tira más pa dentro que pa fuera', 'Mercadillos y arquiteutura que brillen con la lluvia'],
			fiestas: ['Mercaos de Navidá (Uviéu, Xixón…)', 'Antroxu / Carnaval por toles ciudaes', 'Romeríes d’iviernu si pillas fecha']
		},
		spring: {
			title: 'Primavera',
			comer: ['Oricios cuando toque temporada', 'Cabritu y carnes de pastu', 'Espichas: tapeo llargu y sin prisa'],
			visitar: ['Sendes verdes que ya verdean de verdad', 'Xardín Botánicu Atlánticu', 'Miradores que nun taben tan “instagram” en febreru'],
			fiestas: ['Folixa na Primavera (música y calle)', 'Espichas por pueblos (pita, sidra y risa)', 'Romarías que van desperezando la xente']
		},
		summer: {
			title: 'Branu',
			comer: ['Bonitu a la brasa (o como lo fagan en casa)', 'Sardines que huelen a veranín', 'Mariscu cuando el bolsillo afloxa'],
			visitar: ['Playes de Xixón y costa central', 'Picos d’Europa si quies fríu “de verdad” nel branu', 'Chiringuitos, serones y tarde llarga'],
			fiestas: ['Descensu del Sella (agostu, leyenda viva)', 'Selmana Grande de Xixón', 'Selmana Negra (cultura, llibru y folixa)']
		},
		autumn: {
			title: 'Seronda',
			comer: ['Fabada otra vuelta (ye temporada)', 'Setes con respetu y conocencia', 'Castañes asaes y dulce de temporada'],
			visitar: ['Montes en color (hayedo, robledal…)', 'Rutes tranquilas en coche o senderu', 'Pueblos con niebla cinematográfica'],
			fiestas: ['San Matéu n’Uviéu (la gran selmana capitalina)', 'Amagüestu (castaña, folixa y magostu)', 'Fiesta de la Mazana en Villaviciosa']
		}
	};

	const active = seasons[key];

	const monthNames = [
		'xineru',
		'febreru',
		'marzu',
		'abril',
		'mayu',
		'xunu',
		'xunetu',
		'agostu',
		'setiembre',
		'ochobre',
		'payares',
		'avientu'
	];

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Qué hacer hoy', item: canonical }
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
	<meta property="og:image:alt" content="Qué hacer hoy en Asturias — ¡Puxa Asturies!" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
</svelte:head>

<main class="container">
	<h1>Qué hacer hoy en Asturias</h1>

	<p class="page-intro">
		Estamos en <strong>{monthNames[monthIndex]}</strong> — época de <strong>{active.title}</strong>. Nun ye
		una app milagrosa: ye un empujón de sentíu común con sabor a fabes y brisa del Cantábricu. Si tas en
		Xixón, Uviéu o rodando por Asturies, esto ye lo que sueli encaxar bien <em>esta</em> parte del añu.
	</p>

	<section class="season-block" aria-labelledby="comer-heading">
		<h2 id="comer-heading">🍴 Qué comer este mes</h2>
		<ul>
			{#each active.comer as line (line)}
				<li>{line}</li>
			{/each}
		</ul>
		<p class="section-cta">
			<a href="/restaurantes">Ver restaurantes y sidreríes →</a>
		</p>
	</section>

	<section class="season-block" aria-labelledby="visitar-heading">
		<h2 id="visitar-heading">🏛️ Qué visitar</h2>
		<ul>
			{#each active.visitar as line (line)}
				<li>{line}</li>
			{/each}
		</ul>
		<p class="section-cta">
			<a href="/visitar">Guía de qué visitar →</a>
		</p>
	</section>

	<section class="season-block" aria-labelledby="fiestas-heading">
		<h2 id="fiestas-heading">🎪 Fiestas cercanas</h2>
		<ul>
			{#each active.fiestas as line (line)}
				<li>{line}</li>
			{/each}
		</ul>
		<p class="section-cta">
			<a href="/fiestas">Calendariu completu de fiestas →</a>
		</p>
	</section>

	<p class="closing-note">
		Les dates exactes bailan cada añu: mira <a href="/fiestas">/fiestas</a>, pregunta nel chigre y fíaite
		del tique de la espicha. ¡Puxa Asturies!
	</p>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/fiestas" class="related-link"
				>🎉 Fiestas<span>Más de sesenta excusas pa brindar</span></a
			>
			<a href="/restaurantes" class="related-link"
				>🍴 Restaurantes<span>Onde comer sin drama</span></a
			>
			<a href="/visitar" class="related-link"
				>🏛️ Qué visitar<span>Xixón, Uviéu y pueblinos</span></a
			>
			<a href="/plan" class="related-link"
				>🎲 Plan random<span>Si prefieres que el destino elixa por ti</span></a
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

	.season-block {
		margin-top: 2rem;
		max-width: 720px;
	}

	.season-block h2 {
		font-size: 1.25rem;
		margin-bottom: 0.75rem;
	}

	.season-block ul {
		margin: 0 0 0.75rem 1.1rem;
		line-height: 1.7;
	}

	.season-block li {
		margin-bottom: 0.45rem;
	}

	.section-cta {
		margin: 0.5rem 0 0;
		font-size: 0.95rem;
	}

	.section-cta a {
		font-weight: 600;
		color: var(--color-accent);
	}

	.closing-note {
		margin-top: 2rem;
		max-width: 720px;
		line-height: 1.7;
		color: var(--color-text-muted);
		font-size: 0.98rem;
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
