<script>
	import ReadingProgress from '$lib/components/ReadingProgress.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';

	const pageTitle = 'Guía de la sidra asturiana: escanciar, beber y repetir (manual completo) | ¡Puxa Asturies!';
	const pageDesc =
		'Sidra natural, escanciado, culín, tipos nuevos, espicha, precios, etiqueta y dónde beber en Gijón, Oviedo y Lavandera.';
	const canonical = 'https://manriquegarcia.com/blog/sidra';
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
				name: 'Guía de la sidra asturiana',
				item: canonical
			}
		]
	});

	const articleJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: 'Guía de la sidra asturiana: escanciar, beber y repetir (manual completo)',
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
		content="Guía de la sidra asturiana — imagen de vista previa ¡Puxa Asturies!"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
	{@html `<script type="application/ld+json">${articleJsonLd}<\/script>`}
</svelte:head>

<ReadingProgress />
<main class="container">
	<h1>Guía de la sidra asturiana: escanciar, beber y repetir (manual completo)</h1>
	<Breadcrumb
		items={[
			{ href: '/blog', label: 'Blog' },
			{ label: 'Guía de la sidra asturiana' }
		]}
	/>

	<p class="article-meta">
		<time datetime={published}>20 de abril de 2026</time>
		· Por Puxa Asturies
	</p>

	<article class="article-body">
		<h2>Qué ye la sidra asturiana (y qué nun ye)</h2>
		<p>
			La <strong>sidra natural asturiana</strong> ye, en esencia, <strong>zumo de mazana
			fermentáu</strong> ensin magia de laboratoriu: seca, terrosa, con burbuxa fina cuando ta bien, y
			con un puntín acídu que despierta l’apetitu. Si vienes buscando la sidra “dulzona de
			supermercáu” de otros países, vas flipar: esto nun ye refrescu, ye <strong>bebida de mesa y de
			ritual</strong>. Nun se bebe como un vino que meditas tres horas cola copa en mano: se bebe en
			<strong>culines</strong>, en compañía, y con movimientu de brazu que tien nome propiu.
		</p>
		<p>
			El truco cultural ye simple: en Asturies la sidra natural ye <em>social</em>. Si aceptes entrar
			nel juego, sales con nuevos amigos y, probablemente, con los zapatos moyaos. Ye parte del
			paquete.
		</p>

		<h2>Escanciado: el arte de verter dende arriba</h2>
		<p>
			<strong>Escanciar</strong> ye verter la sidra dende altura — brazu alzáu, botella inclinada,
			muñeca que controla el chorru — pa que rompa contra’l borde del vaso (de cristal finu, boca
			ancha), <strong>oxigenar</strong> y despertar burbuja y aroma. Si lo haces bien, suena a
			“chisss”; si lo haces regular, tampoco pasa nada: l’importante ye <strong>no sirvir “sidra
			muerta”</strong> llenando el vaso como si fuera cocacola.
		</p>
		<p>
			El <strong>culín</strong> ye la medida: un chorru cortu, lo xusto pa <strong>bebelo d’un
			tragu</strong>. Nun ye postureo: ye frescor y respetu al ritual. Lo que queda en el vaso en
			munchos chigres <strong>tírase al suelu</strong> antes del siguiente culín: nun ye
			malacEducación, ye tradición higiénica y social (y tamién da igual, que así ye la cosa).
		</p>

		<h2>Tipos: natural, nueva espresión y sidra ice</h2>
		<p>
			La <strong>sidra natural</strong> ye la reina del escanciado. La <strong>sidra de nueva
			expresión</strong> (con más gas, más “moderna”, a veces más cercana a espumosa) llegó pa quien
			quieren burbuja visible ensin tanto protocolu; ta bien, pero nun confundas: el ritual clásicu
			nació cola natural. La <strong>sidra ice</strong> ye básicamente postre alcohólicu de veranu: rica,
			pero nun la pidas si quieres que un mayordomo del escanciado te tome en serio.
		</p>
		<p>
			Si vienes en grupu mixtu — dalgunu que “nun bebe gas” y otru que quier probar too — la mesa
			suele acabar con <strong>dos botelles</strong>: una natural pa los culines “de verdad” y otra
			más accesible pa quien prefiere burbuja estable. Nun ye traición: ye diplomacia asturiana. Lo que
			sí ye traición ye pedir la natural y dejala calentada nel sol: eso mata la sidra más rápido que
			una discusión política en barra.
		</p>

		<h2>La espicha: primavera, barriles y xente feliz</h2>
		<p>
			La <strong>espicha</strong> ye cuando se abren barriles nuevos, se llena la mesa de platos
			sencillos (xamón, tortos, quesu, chorizu…) y la sidra fluye en modo <em>comida popular con
			carauter</em>. Si coincide la fecha cola tuya, vas: ye Asturies en estado puro, con conversación
			altu y culines en cadena.
		</p>

		<h2>Onde beber (nomes que tienes que saber)</h2>
		<p>
			En <strong>Uviéu</strong>, la <strong>Calle Gascona</strong> ye la senda del culín por
			excelencia: ruta curtia, munchos locales, ambiente de “primer contautu” cola sidrería urbana. En
			<strong>Xixón</strong>, el <strong>Barriu de la Sidra</strong> concentra sidrerías de barra onde
			vas aprender mirando. Y si quieres una experiencia casi peregrinación gastronómica, <strong>Casa
			Trabanco</strong> en <strong>Llavandera</strong> (conceyu de Xixón) ye de los sitios que más
			impresión causen: llagar, manzanu, cocina seria y sidra de los que producen ellos mesmos.
		</p>
		<p>
			Gascona ye perfecta pa una escapada dende Xixón en tren o bus: cenar en Uviéu y volver ye plan
			clásicu de fin de selmana. El Barriu de la Sidra, en cambéu, ye “casa” pa munchos xixonencos:
			ambiente de barra, escanciado en vivo y esa mezcla de families, grupos y turistes que acaben
			riendo igual. Casa Trabanco pide más tiempu (y munchas vegaes reserva), pero si quieres entender
			<strong>de dónde sale la sidra</strong> antes de que llegue al culín, ye de los meyores
			masterclass posibles.
		</p>
		<p>
			Pa más direiciones y valoraciones, mira la guía de <a href="/restaurantes">restaurantes y
			sidrerías</a>.
		</p>

		<h2>Precios (sidra barata, amistá cara solo si invitas tu)</h2>
		<p>
			Una <strong>botella de sidra natural</strong> en sidrería suele moverse entre <strong>4 y
			6€</strong>, según marca y sitio. Con una botella dan para munchos culines si vas con ritmu
			asturianu, non con ritmu “cata de catavinos”.
		</p>

		<h2>Etiqueta: regles que nun te van dicir bonu</h2>
		<p>
			Si te escancian, agradez. Si nun quieres más, dizlo con educación, pero <strong>nun hagas
			“finta”</strong> del culín que te ofrecen con cariñu: ye gestu de mesa. Lo del <strong>suelu
			moyáu</strong> ye normal en munchos sitios; si te molesta, alza los pies… o bebe más rápido (ye
			broma, bebe con sentíu). Y recordatorio serio: la sidra natural pega si nun respiras ente
			culín y culín. Hidrátate, come, y disfruta.
		</p>
		<p>
			Hai quien llega y se escacha cola regla del suelu; relax: naide te va xulgar si al principiu
			miras alredor pa copiar. Lo que sí mola mal ye <strong>refusar sistemáticamente</strong> el culín
			que te ofrecen con xenuina bienvenida: si nun bebes alcohol, dizlo al principiu con claridá y
			pide alternativa (agua, refrescu, mostu). Pero si bebes y te fas el remolón, la mesa se enfría.
			El culín ye compartíu, ye ritmu, ye “siguiente”. Eso ye lo bonu… y lo peligroso.
		</p>
		<p>
			¿Y el cachopo pa bajar la sidra? Tenemos <a href="/blog/cachopo">guía del cachopo</a>. ¡Puxa
			Asturies!
		</p>
	</article>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/restaurantes" class="related-link"
				>🍴 Restaurantes<span>Sidreríes, direiciones y valoraciones</span></a
			>
			<a href="/blog/cachopo" class="related-link"
				>🥩 Guía del cachopo<span>El compañeru inseparable del culín</span></a
			>
		</div>
	</div>

	<ShareButtons title="Guía de la sidra asturiana" description={pageDesc} />
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
