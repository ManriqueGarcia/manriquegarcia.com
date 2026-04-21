<script>
	import ReadingProgress from '$lib/components/ReadingProgress.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';

	const pageTitle =
		'Ruta en coche por Asturias en 7 días: itinerario costa, Picos y Oviedo | ¡Puxa Asturies!';
	const pageDesc =
		'Ruta coche Asturias 7 días: Gijón, Lastres, Llanes, Picos y Lagos de Covadonga, Oviedo, Cudillero, Luarca, Taramundi y consejos de carretera y gasolina.';
	const canonical = 'https://manriquegarcia.com/blog/ruta-coche';
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
				name: 'Ruta en coche por Asturias en 7 días',
				item: canonical
			}
		]
	});

	const articleJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: 'Ruta en coche por Asturias en 7 días: itinerario costa, Picos y Oviedo',
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
		content="Ruta en coche por Asturias en 7 días — vista previa ¡Puxa Asturies!"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
	{@html `<script type="application/ld+json">${articleJsonLd}<\/script>`}
</svelte:head>

<ReadingProgress />
<main class="container">
	<h1>Ruta en coche por Asturias en 7 díes: costa, Picos y un poco de cordura</h1>
	<Breadcrumb
		items={[
			{ href: '/blog', label: 'Blog' },
			{ label: 'Ruta en coche por Asturias en 7 días' }
		]}
	/>

	<p class="article-meta">
		<time datetime={published}>21 de abril de 2026</time>
		· Por Puxa Asturies
	</p>

	<article class="article-body">
		<p>
			Asturias en <strong>coche</strong> ye otra película: curvas con vistas que corten la respiración,
			pueblos que nun salen en Google Maps como merecen y sensación de viaxe real (non de “paso rápido
			ente aeropuertu y hotel”). Esta ye una <strong>ruta coche Asturias 7 díes</strong> equilibrada: mar,
			montaña, ciudá y talleres de cuchillu, porque la cultura tamién se visita con llaves na mano.
		</p>

		<h2>Día 1 — Xixón: playa, Cimadevilla y Barriu de la Sidra</h2>
		<p>
			Empieza en <strong>Xixón</strong>: <strong>playa de San Lorenzo</strong> pa desfacerte del asientu
			del avión, <strong>Cimadevilla</strong> pa perdete ente cimientos y chigres, y una vuelta pel
			<strong>Barriu de la Sidra</strong> pa que’l primer culín sepa a victoria. Duerme en Xixón: asín
			empieces con ritmu urbanu sin renunciar al mar.
		</p>

		<h2>Día 2 — Xixón y alredores: cultura con vistas</h2>
		<p>
			Por la mañana, la <strong>Universidá Llaboral</strong>: arquiteutura imponente y fotos que parecen
			postal seria. Sigue con el <strong>Xardín Botánicu</strong> si quies naturaleza “educativa”, y cierra
			el día con <strong>La Campa Torres</strong> al atapecer: horizonte, brisa y sensación de haber
			encaxáu bien el primer tramu del viaxe.
		</p>

		<h2>Día 3 — Costa oriental: Lastres, Colunga, Ribadesella; dormir en Llanes</h2>
		<p>
			Ruta escontra l’este: <strong>Lastres</strong> (pueblu de Doctor Mateo, que en la vida real ye igual de
			fotogénico), <strong>Colunga</strong> col <strong>Museu del Xurásicu</strong> si vienes con críos o
			afición a lo prehistóricu, y <strong>Ribadesella</strong> pa respirar ríu y sabor marinero. La base
			de la nueche: <strong>Llanes</strong>, que ye puerta d’entrada a maravíes de la costa oriental.
		</p>

		<h2>Día 4 — Llanes y Picos: Gulpiyuri, bufones y Covadonga</h2>
		<p>
			<strong>Playa de Gulpiyuri</strong>: playa “interior” que suena a magia (y a explicar a tus amigos
			que sí, eso ye agua salada). Los <strong>bufones de Pría</strong> son espectáculu natural con
			salpicadura incluída. Luego sube a <strong>Covadonga</strong> y los <strong>Lagos</strong>: carretera
			de monte, vaca opcional nel encuadre y aire que limpia la cabeza. Vas acabar cansáu… pero feliz.
		</p>

		<h2>Día 5 — Uviéu: catedral, Naranco y Gascona</h2>
		<p>
			<strong>Uviéu</strong> pide calma urbana: <strong>catedral</strong>, casco, tapeo. El
			<strong>Monte Naranco</strong> (Santa María del Naranco, San Miguel de Lillo) ye prerrománicu con
			vistas de postal. Por la tarde, <strong>calle Gascona</strong>, el “cider boulevard”: sidreríes en
			fila pa que pruebes variedá sin convertir el viaxe en sprint. Duerme en Uviéu y respira ciudá.
		</p>

		<h2>Día 6 — Costa occidental: Cudillero, Ḷḷuarca y cabo Vidio</h2>
		<p>
			<strong>Cudillero</strong> ye probablemente’l pueblu más fotogénicu del itinerariu: casas en
			gradín, puertu y callejuelas que piden cámara. <strong>Ḷḷuarca</strong> añade encantu marinero y un
			<strong>cementeriu con vistes</strong> que ye’l típicu sitiu “impresiona y respeta”. Cierra con
			<strong>cabu Vidio</strong> si el tiempu ayuda: acantiláu, brisa y sensación de fin del mundu con
			señal móvil irregular.
		</p>

		<h2>Día 7 — Interior y vuelta: Taramundi, Grandas de Salime, Xixón</h2>
		<p>
			Vuelta por l’interior pa redondear: <strong>Taramundi</strong> y los <strong>cuchillos
			artesanales</strong> (comprar con cabeza, que la maleta tien límites físicu y moral). En
			<strong>Grandas de Salime</strong>, el <strong>museu etnográficu</strong> resume vida rural y
			encaxe col paisaxe. Cierra volviendo a <strong>Xixón</strong> pa devolver el coche o pa una última
			cena de despedida con culín incluíu.
		</p>

		<h2>Conseyos prácticos (pa que la ruta nun se convierta en anéudota)</h2>
		<p>
			Les <strong>carreteres de montaña</strong> son estreches: paciencia, espe retrovisor y xente local
			que conoz cada curva. Les <strong>gasolineres</strong> escaseen nel interior: reposta cuando puedas,
			non cuando te lo recuerde la ansiedá. En temporada alta, <strong>reserva coche</strong> con
			antelación: Asturies nun ye secreto. Pa mapes y puntos, usa la nuestra
			<a href="/mapa">mapa interactivu</a>; pa cenar bien, la llista de
			<a href="/restaurantes">restaurantes</a>; y pa dormir, guía de
			<a href="/hoteles">hoteles</a>. ¡Puxa Asturies, y que el GPS nun te mande por’l prau!
		</p>
	</article>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/mapa" class="related-link"
				>🗺️ Mapa<span>Puntos, favoritos y rutes nel mapa interactivu</span></a
			>
			<a href="/restaurantes" class="related-link"
				>🍴 Restaurantes<span>Onde comer cachopo, sidreríes y más</span></a
			>
			<a href="/hoteles" class="related-link"
				>🏨 Hoteles<span>Alojamientu pa cerrar el viaxe con glamour</span></a
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
