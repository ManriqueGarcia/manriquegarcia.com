<script>
	import ShareButtons from '$lib/components/ShareButtons.svelte';

	const pageTitle =
		'Guía del cachopo asturiano: qué es, dónde comerlo y cómo no morir en el intento | ¡Puxa Asturies!';
	const pageDesc =
		'Qué es el cachopo, tipos, precios, consejos pa pedir en sidrería y los mejores sitios en Gijón: Casa Gerardo, Tierra Astur, La Galana y más.';
	const canonical = 'https://manriquegarcia.com/blog/cachopo';
	const published = '2026-04-20';

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://manriquegarcia.com/blog' },
			{
				'@type': 'ListItem',
				position: 3,
				name: 'Guía del cachopo asturiano',
				item: canonical
			}
		]
	});

	const articleJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: 'Guía del cachopo asturiano: qué es, dónde comerlo y cómo no morir en el intento',
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
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
	{@html `<script type="application/ld+json">${articleJsonLd}<\/script>`}
</svelte:head>

<main class="container">
	<h1>Guía del cachopo asturiano: qué es, dónde comerlo y cómo no morir en el intento</h1>

	<p class="article-meta">
		<time datetime={published}>20 de abril de 2026</time>
		· Por Puxa Asturies
	</p>

	<article class="article-body">
		<h2>Primero lo importante: ¿qué demonios ye un cachopo?</h2>
		<p>
			Si vienes de fuera y piensas que ye “un escalope grande”, vas bien encamináu… pero te falta metá
			de la película. El <strong>cachopo asturiano</strong> clásico son <strong>dos filetes de
			ternera</strong> (o a veces cerdo, pero lo noble ye ternera) empanados a la milanesa, con un
			<strong>rellenu de xamón y quesu</strong> que funde al fritu y queda en hilos cuando cortas.
			Rebozado crujiente, interior cremoso, y un tamaño que na carta parece inofensivo hasta que lo ves
			en mesa: ahí ye cuando entiendes por qué los asturianos te miran con respetu si te lo acabas tu
			solín.
		</p>
		<p>
			El cachopo ye platu de sidrería, de domingu, de “vengo visitando y quiero comer de verdá”. Ye
			también el platu del <em>“uff, pedí demasiao”</em>. Nun te avergüences: pedir cajita pa llevar ye
			casi deporte nacional.
		</p>

		<h2>Un pelín d’historia (sin aburrite)</h2>
		<p>
			El cachopo como lo conocemos hoy ye un inventu relativamente modernu de la cocina asturiana del
			XXu: la idea de empanar dos carnes con rellenu grasientu y pasalo por freidora casa bien cola
			tradición de <strong>casa de comidas</strong> y sidrería, onde había que alimentar a xente que
			trabayaba duru y faía fríu. Nun busques un manuscritu medieval cola receta: lo que importa ye la
			evolución pa convertise nel <strong>iconu gastronómicu</strong> que ta en toles redes sociales con
			el quesu estirándose como promesa de felicidá.
		</p>

		<h2>Tipos de cachopo: el clásicu y los que flipan</h2>
		<p>
			El <strong>cachopo clásicu</strong> ye jamón york o serranu + quesu fundente (tipo San Simón o
			similares de tierna fila). A partir d’ahí, Asturies abre el melón creativu: <strong>cachopo de
			Cabrales</strong> (intensidá azul que te despierta hasta los güesos), <strong>con centollo</strong>
			(pa presumir en mesa y mezclar mar y montaña), <strong>con boletus</strong> (aroma de monte y
			temporada), versiones con <strong>pixin</strong>, con morcilla, con verdures… y cada vez más
			<strong>opciones vegetarianas</strong> serias (rellenu de pisto, setas, quesos artesanos) pa que
			naide se quede sin la esperiencia del rebozáu xigante.
		</p>
		<p>
			Lo que nun cambia ye la lóxica: <strong>dos capes de carne</strong> que suxeten un rellenu que
			manda en sabor. Si te ofrecen “mediu cachopo” o ración, escucha al camarero: de normal saben de
			qué tamaño va la casa.
		</p>

		<h2>Onde comer un bon cachopo en Xixón (nomes propios)</h2>
		<p>
			En Xixón tienes sidrerías y casas de comidas que viven del cachopo como quien vive del escanciado.
			Tres referencies que suelen salir cuando la xente seria fala de <strong>cachopo en Gijón</strong>:
		</p>
		<ul>
			<li>
				<strong>Casa Gerardo</strong> en <strong>Prendes</strong> (Carreño, a tiro de piedra de Xixón):
				ye cocina de referencia asturiana; si vas con ilusión por productu y técnica, merece la pena la
				escapada. Nun ye la sidrería de barra de tolos díes, ye más <em>plan especial</em>… pero el
				cachopo (o lo que hagan en su línea) va con mimo de los que saben de Asturies.
			</li>
			<li>
				<strong>Sidrería Tierra Astur</strong>: cadena conocida con locales grandes, ambiente de “vienen
				familias y grupos”, y cachopos presentaos con <strong>contundencia</strong>. Si quieres
				experiencia asturiana “de manual” con carta amplia, suele cumplir.
			</li>
			<li>
				<strong>La Galana</strong>, en plena <strong>Plaza Mayor</strong>: céntrica, con sidrería y
				cocina asturiana, y un cachopo que mucha xente asocia al <strong>plan turísticu bonu</strong> en
				el corazón del centro.
			</li>
		</ul>
		<p>
			¿Quieres más nombres, direiciones y valoraciones? Tenemos la lista en
			<a href="/restaurantes">restaurantes y sidrerías</a>: pasa y copia ruta.
		</p>

		<h2>Cuánto cuesta (pa que nun te sangre la cartera)</h2>
		<p>
			En munchos sitios vas atopar <strong>cachopo individual</strong> ente <strong>12 y 18€</strong>,
			según zona, carta y si lleva productu “gourmet” dentro. El <strong>cachopo grande pa compartir</strong>
			— que ye onde la cosa se pone cinematográfica — suele irse a <strong>20–30€</strong> o más, según
			tamañu y rellenu. Si pides botella de sidra, cuenta aparte, pero sigue siendo de lo más razonable
			de España pa lo que comes.
		</p>

		<h2>Conseyos d’orde (el camarero nun ye tu enemigu)</h2>
		<p>
			Pide claru: <strong>“individual”</strong> si vais tu o en pareya normal; <strong>“pa
			compartir”</strong> si vais en grupo o quieres probar más cosas na mesa. Y oye bien esto:
			<strong>casi siempre vien con patates frites</strong>. Nun fa falta que preguntes “¿lleva
			guarnición?”: va. Si quieres ensalada, pídela aparte y salva tu conciencia verde.
		</p>
		<p>
			El truco final ye mental: el cachopo ye maratón, nun ye sprint. Sidra, descansu, conversación, y
			si sobra… mañana sabe igual de bien recalentáu con un culín. ¡Puxa Asturies!
		</p>
		<h2>Últimu conseyu: va con tiempo (y con hambre de verdad)</h2>
		<p>
			Munches sidrerías faen el cachopo con mimo, y eso significa espera en cocina cuando va petada la
			sala. Si vas con prisa de “comer en veinte minutos”, vas acabar estresáu: pide primero un
			pinchu, abre conversación, y dexa que el platu llegue cuando toque. El cachopo ta pensáu pa
			saborese, pa cortar con cuchillo y tenedor y pa hacer ese “crunch” del rebozu que ye casi
			música. Si te queda grande, compartir nun ye pecáu: ye intelixencia nutricional asturiana.
		</p>
	</article>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/restaurantes" class="related-link"
				>🍴 Restaurantes<span>Lista completa de sidreríes y sitios onde comer</span></a
			>
			<a href="/blog/sidra" class="related-link"
				>🍎 Guía de la sidra<span>Escanciado, culines y etiqueta nel chigre</span></a
			>
		</div>
	</div>

	<ShareButtons title="Guía del cachopo asturiano" description={pageDesc} />
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

	.article-body ul {
		margin: 0 0 1rem 1.1rem;
	}

	.article-body li {
		margin-bottom: 0.65rem;
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
