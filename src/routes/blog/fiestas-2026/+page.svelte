<script>
	import ReadingProgress from '$lib/components/ReadingProgress.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';

	const pageTitle =
		'Fiestas de Asturias 2026: calendario completo mes a mes | ¡Puxa Asturies!';
	const pageDesc =
		'Fiestas Asturias 2026: Antroxu, Semana Santa, Noche de San Juan, Festival de la Sidra en Nava, Semana Grande de Gijón, Descenso del Sella, Día de Asturias y más. Consejos pa viaxar.';
	const canonical = 'https://manriquegarcia.com/blog/fiestas-2026';
	const published = '2026-04-21';

	const shareTitle = $derived(pageTitle.replace(/\s*\|\s*¡Puxa Asturies!\s*$/, '').trim());

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://manriquegarcia.com/blog' },
			{
				'@type': 'ListItem',
				position: 3,
				name: 'Fiestas de Asturias 2026',
				item: canonical
			}
		]
	});

	const articleJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: 'Fiestas de Asturias 2026: calendario completo mes a mes',
		description: pageDesc,
		image: 'https://manriquegarcia.com/images/og-image.png',
		datePublished: published,
		author: { '@type': 'Organization', name: 'Puxa Asturies' },
		publisher: {
			'@type': 'Organization',
			name: '¡Puxa Asturies!',
			logo: { '@type': 'ImageObject', url: 'https://manriquegarcia.com/favicon.svg' }
		},
		mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDesc} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDesc} />
	<meta property="og:site_name" content="¡Puxa Asturies!" />
	<meta property="og:locale" content="es_ES" />
	<meta property="article:published_time" content={`${published}T12:00:00+02:00`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDesc} />
	<meta property="og:image" content="https://manriquegarcia.com/images/og-image.png" />
	<meta
		property="og:image:alt"
		content="Fiestas de Asturias 2026 — calendario — vista previa ¡Puxa Asturies!"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
	{@html `<script type="application/ld+json">${articleJsonLd}<\/script>`}
</svelte:head>

<ReadingProgress />
<main class="container">
	<h1>Fiestas de Asturias 2026: calendariu completu (con plan B pa la lluvia)</h1>
	<Breadcrumb
		items={[
			{ href: '/blog', label: 'Blog' },
			{ label: 'Fiestas de Asturias 2026' }
		]}
	/>

	<p class="article-meta">
		<time datetime={published}>21 de abril de 2026</time>
		· Por Puxa Asturies
	</p>

	<article class="article-body">
		<p>
			En Asturias hai fiesta casi cada selmana del añu: si coincide la to visita con una romería, un
			festival o una hoguera, el viaxe pasa de “bonu” a “¿por qué nun me mudé yá?”. Esta ye la guía de
			<strong>fiestas Asturias 2026</strong> pa que planifiques con cabeza y maleta: mes a mes, con humor
			y con respetu al culín.
		</p>

		<h2>Eneru–Febreru: Antroxu (carnaval con camiseta interior creativa)</h2>
		<p>
			<strong>Antroxu</strong> ye disfraz, vergüenza controlada y chigres abiertos hasta horas indecentes.
			<strong>Xixón</strong> y <strong>Avilés</strong> suelen llevarse les palmes de volumen y ambiente: comparsas,
			carrozas y xente que decide ser pirata un día y dinosauriu al siguiente. Conseyu: si vas con familia,
			mira el programa municipal; si vas con amigos, mira la batería del móvil. Va a faer falta.
		</p>

		<h2>Marzu–Abril: Semana Santa (procesiones y torrijas con culín)</h2>
		<p>
			La <strong>Semana Santa</strong> en <strong>Uviéu</strong> tien procesiones serias, calles llenes y
			esa mezcla de tradición y turisme que se nota en el aire (y en les terraces). Maridaxe asturiana
			non escrita: <strong>torrijas</strong> con culín de sidra, porque la vida ye demasiado curti pa
			comer dulce sin ritual.
		</p>

		<h2>Mayu–Xunu: feria, San Xuan y la noche que quema playes</h2>
		<p>
			La <strong>feria de muestras</strong> marca tempu de ciudad y puestos; ye plan distintu, más
			comercial, pero con su pulsu. Lo imprescindible del calendariu ye la <strong>Nueche de San Xuan (23
			de xunu)</strong>: hogueras en <strong>toles playes</strong> que puedas imaxinar, saltos, risa y
			agüita fría si la cosa se pone cinematográfica. Si solo puedes escoyer una fecha “máxica” en branu,
			apunta esta en mayúsculas.
		</p>

		<h2>Xunetu: Festival de la Sidra en Nava (Guinness y botellines al unísonu)</h2>
		<p>
			En <strong>xunetu</strong> el mapa apunta a <strong>Nava</strong> pal <strong>Festival de la
			Sidra</strong>: miles de persones escanciando a la vez, ambiente de romería nacional y récor Guinness
			incluíu pa que Instagram tenga material pa un mes. Si te gusta la sidra, la xente y el “too al
			mesmu tiempu”, vas flipar.
		</p>

		<h2>Agostu: temporada alta con mayúscules</h2>
		<p>
			<strong>Agostu</strong> ye <strong>LA</strong> temporada: la <strong>Semana Grande de Xixón</strong>
			con fuegos artificiales que merecen ovación; el <strong>Descensu del Sella</strong> el primer
			sábadu de agostu (si vienes por piragüismu y folixa fluvial, ye cita sagrada). El
			<strong>Día d’Asturies</strong> ye’l <strong>8 de setiembre</strong>, pero les fiestes grandes
			arrincan en <strong>agostu</strong> en munchos sitios: ambiente previo, conciertos y sensación de
			“aquí pasa algo grande”.
		</p>

		<h2>Setiembre: Asturies en el corazón (y sidra en Villaviciosa)</h2>
		<p>
			El <strong>Día d’Asturies</strong> concentra orguyu regional, bandes y celebración. L’
			<strong>Américanu en Ḷḷuarca</strong> añade color marinero. El <strong>Festival de la Sidra de
			Villaviciosa</strong> sigue la tradición con manzana, cultura y brindis que suenan a principiu de
			temporada seria.
		</p>

		<h2>Octubre–Noviembre: castañes, desarme y sidra dulce</h2>
		<p>
			<strong>Amagüestu</strong> ye castaña asada, manos tibies y sidra dulce pa acompañar: Asturies en
			modo otoñu boniquísimu. En <strong>Uviéu</strong>, la <strong>Fiesta del Desarme</strong> mezcla
			potaje, tradición y sidra como si fuera deporte. Si vienes con chaqueta y ganas de comer, ganas.
		</p>

		<h2>Avientu: mercaos navideños y Olentzero (con sabor asturianu)</h2>
		<p>
			Los <strong>mercaos navideños</strong> llenen plazas de regalos comestibles y luces; l’
			<strong>Olentzero asturianu</strong> (el Anguleru y variantes locales) trae regalos con humor y
			un pelín de ironía costera. Perfectu pa cerrar el añu con culín y propósitos gastronómicos.
		</p>

		<h2>Conseyos de supervivencia pa 2026</h2>
		<p>
			<strong>Reserva alcuentru con meses de antelación</strong> si vienes en <strong>agostu</strong>: nun
			ye broma de guía, ye estadística. Y lleva <strong>chubasquero</strong> siempre: Asturies ye verde por
			algo, y la uviella nun pide permisu. Pa profundizar en fiestas y dates, mira la seición de
			<a href="/fiestas">fiestas</a> y el prácticu de
			<a href="/practico">consejos de viaxe</a>. Si toca Sella, tenemos
			<a href="/blog/descenso-del-sella">descensu del Sella</a> pa que nun te pierdas ni un remu.
		</p>
	</article>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/fiestas" class="related-link"
				>🎉 Fiestas<span>Calendariu y romeríes pa marcar nel mapa</span></a
			>
			<a href="/practico" class="related-link"
				>📋 Práctico<span>Transporte, maleta y supervivencia asturiana</span></a
			>
			<a href="/blog/descenso-del-sella" class="related-link"
				>🛶 Descensu del Sella<span>La carrera, la folixa y cómo verla en vivu</span></a
			>
		</div>
	</div>

	<ShareButtons title={shareTitle} description={pageDesc} />
</main>

<style>
	.article-body {
		max-width: 720px;
		line-height: 1.75;
		font-size: 1.05rem;
	}

	.article-body h2 {
		margin-top: 2rem;
	}

	.article-meta {
		color: var(--color-text-muted);
		font-size: 0.85rem;
		margin-bottom: 2rem;
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
