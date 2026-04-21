<script>
	import ReadingProgress from '$lib/components/ReadingProgress.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';

	const pageTitle = 'Gijón vs Oviedo: ¿cuál visitar? (la respuesta es ambas) | ¡Puxa Asturies!';
	const pageDesc =
		'Comparativa entre Gijón y Oviedo: playa vs montaña, sidra vs cultura, ambiente vs señorío. Guía para decidir (o no).';
	const canonical = 'https://manriquegarcia.com/blog/gijon-vs-oviedo';
	const published = '2026-04-20';

	const headlineShort = 'Gijón vs Oviedo: ¿cuál visitar? (la respuesta es ambas)';

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://manriquegarcia.com/blog' },
			{
				'@type': 'ListItem',
				position: 3,
				name: 'Gijón vs Oviedo',
				item: canonical
			}
		]
	});

	const articleJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: headlineShort,
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
		content="Gijón vs Oviedo — comparativa — vista previa ¡Puxa Asturies!"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
	{@html `<script type="application/ld+json">${articleJsonLd}<\/script>`}
</svelte:head>

<ReadingProgress />
<main class="container">
	<h1>Gijón vs Oviedo: ¿cuál visitar? (la respuesta ye ambes)</h1>
	<Breadcrumb
		items={[
			{ href: '/blog', label: 'Blog' },
			{ label: 'Gijón vs Oviedo' }
		]}
	/>

	<p class="article-meta">
		<time datetime={published}>20 de abril de 2026</time>
		· Por Puxa Asturies
	</p>

	<article class="article-body">
		<p>
			Si vienes a Asturies y solo tienes espacio mental pa <strong>una</strong> gran dúa existencial,
			Internet te va a vender el combate del sieglu: <strong>Xixón vs Uviéu</strong>. Playa contra
			montaña, muro contra catedral, “soy más mar” contra “soy más capital con prisa”. Spoiler pa
			les prisas: <strong>visita les dos</strong>. Tán a media hora en coche o tren, que ye menos que
			lo que tardas eligiendo filtru na foto del culín.
		</p>

		<h2>Playa: gana Xixón (con perdón del Cantábricu)</h2>
		<p>
			Uviéu tien parque, xardín y encantu, pero nun te va a faer la ola na mesma medida que
			<strong>San Lorenzo</strong> con bata de toalla y brisa de salitre. Si lo que busques ye
			levantarte, baxar a la arena y discutir si “fa fríu” con solo 22 graos, Xixón gana por
			KO. Nun ye Hawaii: ye Cantábricu honestu, onde el bañu valiente cuenta doble en redes. Si vienes
			con neños, patinete o necesidá de “ver el mar” pa creer que tas de vacaciones, el norte xixonés
			cumple ensin letra pequeña… bueno, salvo la del aparcamientu en branu, que ahí cada cual espíe
			como pueda.
		</p>

		<h2>Casco histórico: gana Uviéu (y lo sabe)</h2>
		<p>
			Cimadevilla ye preciosu, pero Uviéu lleva siglos practicando <strong>señoríu monumental</strong>:
			<strong>la Catedral</strong>, la <strong>Plaza de la Constitución</strong>, recodos que huelen
			a piedra húmeda y café recién puyáu. Si te va la arquiteutura, los museos pa un día de sirimiri,
			y esa sensación de “esto ye capital de verdad”, Uviéu te mira con ternura y un pelín de altura.
			Amás, caminar Gascona con culín ye casi deporte olímpicu local: entrenamiento de codo y
			conversación al empar.
		</p>

		<h2>Sidra: empate téunicu (y victoria moral pa toos)</h2>
		<p>
			Que si la sidra “ye más de conceyu X”, que si “nun escancies bien si nun vienes de Y”. Calma:
			<strong>en dambes ciudaes vas beber bien</strong> si entras onde hay respetu al productu y a la
			xente que lo escancia. Xixón tien <strong>El Llano</strong> y sidrerías con nombre propio;
			Uviéu tien <strong>Gascona</strong> como autopista emocional del culín. El truco nun ye escoyer
			ciudá, ye escoyer sitiu con manes que sepan del barril y con ambiente que nun te trate como
			turista ambulante… aunque lo seas, que nun pasa nada.
		</p>

		<h2>Gastronomía: empate con sabor a cachopo</h2>
		<p>
			Fabes, pixin, marisquería, cachopo que amenaza con salise del platu: <strong>too eso vive en
			Asturies enteru</strong>, y dambes ciudaes tienen restaurantes que te van a encantar y otros que
			son “pa turistes con prisa”. Si vienes con hambre seria, fai casu a recomendaciones locales, mira
			cartes con ojo críticu y recorda que compartir nun ye debilidá: ye estratexa anticuá de
			supervivencia ante un cachopo industrial.
		</p>

		<h2>Vida nocturna: gana Xixón (si busques “hasta que el cuerpu aguante”)</h2>
		<p>
			Uviéu tien tarde-nueche culturales de lujo, pero si lo tuyo ye <strong>chigre, terraza, muro y
			ambiente</strong> que se alarga como si mañana nun existiera, Xixón suele llevar la delantera en
			“folixa fácil”. Nun ye que Uviéu se vaya a la cama a les diez: ye que el relato turísticu
			marina–sidra–concienu encaxa bien con Xixón. Si lo que quies ye tranquilidá, dambes pueden
			ofrecela: depende más del barriu que del mapa políticu.
		</p>

		<h2>Museos y cultura: gana Uviéu (con boletu y tiempo)</h2>
		<p>
			<strong>Campoamor</strong>, museos, programación estable, capitalidad administrativa que se
			traduz en oferta cultural seria: si vienes con ganas de “hacer turismo de verdad” con mayúscules
			de museu, Uviéu paga la pena ensin discutir. Xixón tien cultura potente — Selmana Negra, espacios
			chulos, cine, música — pero si tienes que escoyer <em>una</em> escapada de museu+catedral+tarde
			lliteraria, la balanza pénzase pa Uviéu ensin mieu.
		</p>

		<h2>Fútbol: gana Xixón (y nun se discute)</h2>
		<p>
			A ver, esto nun ye una comparativa: ye una verdá absoluta. El <strong>Real Sporting de
			Xixón</strong> ye historia viva del fútbol español. La tierra de <strong>Quini</strong>, el
			brujo de El Molinón, <strong>siete veces Pichichi</strong> entre Primera y Segunda División.
			Solo Messi lo supera. Léelo otra vez: <em>solo Messi</em>. Quini ye eterno, y El Molinón —el estadiu
			más antiguo d'España en activo— ye una catedral onde la xente reza con bufanda rojiblanca.
		</p>
		<p>
			Uviéu tien el so equipo, sí, y se-y respeta como vecín. Pero si alguien te pregunta
			"¿Sporting o Oviedo?", la respuesta correcta na esta web ye: <strong>¡Puxa Sporting!</strong>
			Y si nun estás d'acuerdo, ye que necesites más culines hasta que cambies de opinión.
		</p>

		<h2>Transporte: trenta minutos y visita les dos</h2>
		<p>
			Lo mejor del artículu llega al final: <strong>nun tienes qu’escoyer</strong>. Tren, bus o coche:
			en media hora cambias de “olía mar” a “olía café y piedra”. Puedes durmir nuna y cenar na otra
			como si fueres asturianu con agenda de finde. Si solo tienes <strong>un día</strong> y quies
			resumen meme: <strong>Xixón</strong> pa playa y sidra con vistas; <strong>Uviéu</strong> pa
			cultura, cascu y Gascona. Si tienes <strong>dos</strong>, deixa de leer comparativos y vive: el
			Cantábricu nun va a enfadase.
		</p>

		<h2>Bonus: clima, maletas y otra mitología urbana</h2>
		<p>
			“¿Lloverá?” Sí, posiblemente, y tamién puede hacer sol el mesmu día: lleva capa, xéitu y
			actitú de “si llueve, entramos nun muséu”. Sobre maletas: Uviéu premia zapatu cómodu pa cuestes y
			empedrado; Xixón premia gafes de sol aunque la nube parez amenazante. Sobre discutir con
			locales qué ciudá ye “la bona”: ye deporte social, pero la respuesta correcta ye sonreír y
			pedir otru culín. Si vienes con familia, dambes tienen parques, zonas tranquilones y sitios onde
			alimentar a neños ensin drama; si vienes en parexa romántica, dambes tienen rincones pa farse
			compaña una farola. El truco ye dejar de tratar Asturies como si fueres un menú únicu: ye
			menú degustación, y el camareru —el paisaxe— ye generosu.
		</p>

		<h2>Veredictu final (sin suspense innecesariu)</h2>
		<p>
			<strong>Visita les dos. Tán a trenta minutos.</strong> Si solo tienes un día, Xixón pa playa y
			sidra; Uviéu pa cultura y Gascona. Y si daquien te diz que “solo merez la pena una”, sonríi,
			pide un culín y cambia de conversación: Asturies ye más grande que una encuesta de Twitter.
			¡Puxa Asturies!
		</p>
	</article>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/visitar" class="related-link"
				>🏛️ Qué visitar<span>Xixón, Uviéu y alredores</span></a
			>
			<a href="/restaurantes" class="related-link"
				>🍴 Restaurantes<span>Sidreríes y sitios onde comer de verdá</span></a
			>
			<a href="/blog" class="related-link"
				>📰 Blog<span>Más artículos con manía</span></a
			>
			<a href="/blog/sidra" class="related-link"
				>🍎 Guía de la sidra<span>Gascona, Llano y etiqueta del culín</span></a
			>
		</div>
	</div>

	<ShareButtons title={headlineShort} description={pageDesc} />
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
