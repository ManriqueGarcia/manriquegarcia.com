<script>
	import ReadingProgress from '$lib/components/ReadingProgress.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';

	const pageTitle =
		'Guía de quesos asturianos: DOP, maridajes y dónde comprarlos | ¡Puxa Asturies!';
	const pageDesc =
		'Quesos asturianos con nombre propio: Cabrales, Afuega’l Pitu, Gamonéu, Casín y más. Dónde comprar, maridaje con sidra y trucos pa no llorar en el chigre.';
	const canonical = 'https://manriquegarcia.com/blog/quesos';
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
				name: 'Guía de quesos asturianos',
				item: canonical
			}
		]
	});

	const articleJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: 'Guía de quesos asturianos: DOP, maridajes y dónde comprarlos',
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
		content="Guía de quesos asturianos — vista previa ¡Puxa Asturies!"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
	{@html `<script type="application/ld+json">${articleJsonLd}<\/script>`}
</svelte:head>

<ReadingProgress />
<main class="container">
	<h1>Guía de quesos asturianos: del Cabrales al postre (sin drama)</h1>
	<Breadcrumb
		items={[
			{ href: '/blog', label: 'Blog' },
			{ label: 'Guía de quesos asturianos' }
		]}
	/>

	<p class="article-meta">
		<time datetime={published}>21 de abril de 2026</time>
		· Por Puxa Asturies
	</p>

	<article class="article-body">
		<p>
			Si crees que Asturias ye solo monte y sidra, te falta un trocito del mapa gastronómicu: aquí hay
			<strong>más de 40 variedaes de quesu</strong> con nombre, historia y fan club propio. Los
			<strong>quesos asturianos</strong> son, sin exagerar, un parque temáticu pa la boca: dende azules que
			te despiertan el alma hasta cremosos que abrazan. Si vienes de visita, considera esto un aviso
			amistosu: vas salir con más quesu en la maleta que ropa interior.
		</p>

		<h2>Cabrales: el rey (y el que manda en la mesa)</h2>
		<p>
			El <strong>Cabrales</strong> ye el azul de los Picos de Europa, curáu en cueva, con personalidá de
			rockstar y olor que avisa antes de abrir la nevera. Fuerte, intenso, saláu en justa medida: si el
			cabrales te mira fijamente, ye que ya ta llistu pa comerse la conversación. Ye
			<strong>DOP</strong>, ye leyenda, y nun ye pa cobardes del gustu suave. Prueba un triángulu en pan
			de hogaza y entenderás por qué Asturies presume de cuevas y de valientes.
		</p>

		<h2>Afuega’l Pitu: “ahoga’l pollu” y lo pastoso</h2>
		<p>
			El nome ye poesía pura: <strong>Afuega’l Pitu</strong> vien de lo pastoso, de esa textura que se
			pega al cielu de la boca como abrazu. Lo tienes en versión <strong>roxu</strong> (con pimentón, que
			le da color de fiesta) o <strong>blancu</strong>, y con formes que van de la tetilla a lo que llamen
			<strong>trapu</strong> (trapo), según el molde y el oficiu del queseru. Tamién ye
			<strong>DOP</strong>. Si quieres enseñar fotos en redes sin mentir, esti quesu ye escenografía
			auténtica asturiana.
		</p>

		<h2>Gamonéu: humu de monte y mezcla noble</h2>
		<p>
			El <strong>Gamonéu</strong> ye ahumáu artesanal de los Picos: mezcla de lleche de vaca, oveya y
			cabra, con pasu por la madera y curación en cueva. Ye un quesu que huele a historia de pastores, a
			senderu y a “esto nun ye industrial”. <strong>DOP</strong>, otra vez. Si te gusta lo complejo, el
			Gamonéu ye conversación larga; si vienes buscando “quesu light”, meyor pasa al siguiente apartáu.
		</p>

		<h2>Casín: antiguu como pocos</h2>
		<p>
			El <strong>Casín</strong> presume de ser de los más antiguos d’España, con referencies que remonten al
			sieglu XIV. Ye discu con grabaos, sabor fuerte y puntín mantecosu que se funde na lengua. Ye
			<strong>DOP</strong> y ye de los que te faen sentir que nun tas comiendo “un quesu cualquiera”:
			tas comiendo herencia.
		</p>

		<h2>Beyos y Vidiago: montaña y costa en racions</h2>
		<p>
			Los <strong>Beyos</strong> vienen de los desfiladeros de Beyos: curáu, tipu montaña, duru, con alma
			de camín y piernes cansines. Va como anillu al deu con una botella de sidra natural y una tarde sin
			prisa. El <strong>Vidiago</strong>, pela otra parte, ye más cremosu y suave, de la zona de Llanes:
			ideal si fuxes del Cabrales como quien fux de un debate políticu — quies sabor, pero con elegancia.
		</p>

		<h2>Dónde comprar quesos asturianos (sin pirarse)</h2>
		<p>
			Vas atopar tesoros en cualquier <strong>mercáu tradicional</strong>, na propia
			<strong>quesería</strong> del pueblu o en tiendes especializaes como <strong>La Quesería
			Asturiana</strong> (y similares). Conseyu de amigu: pide cortar a ojo, lleva nevera isotérmica si
			vienes en coche en xera, y nun te fíes solo del súper pa llevente la experiencia completa. Y oye:
			<strong>prueba una tabla de quesos con sidra</strong> en cualquier sidrería seria; ye maridaxe
			oficial del buen vivir asturianu.
		</p>

		<h2>Maridaxe con sidra: que nun te lo cuenten mal</h2>
		<p>
			<strong>Cabrales + sidra natural</strong> = esplosión controlada de sabor (y brindis de
			respetu). <strong>Afuega’l Pitu roxu + pan de escanda</strong> = boda por lo civil y lo canonico.
			<strong>Gamonéu + miel asturiana</strong> = postre de montaña sin postureo innecesariu. Si quies
			profundizar nel ritual del botellín, tenemos la
			<a href="/blog/sidra">guía de la sidra</a> pa que escancies como dios manda.
		</p>

		<p>
			En resume: los <strong>quesos asturianos</strong> nun son accessorio del viaxe, son parte del
			argumentu. Puxa Asturies, y que la nevera te perdone.
		</p>
	</article>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/restaurantes" class="related-link"
				>🍴 Restaurantes<span>Onde comer y beber con mapa y valoraciones</span></a
			>
			<a href="/diccionario" class="related-link"
				>📖 Diccionario<span>Palabras asturianes pa sonar local (o casi)</span></a
			>
			<a href="/blog/sidra" class="related-link"
				>🍎 Guía de la sidra<span>Escanciado, culines y etiqueta nel chigre</span></a
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
