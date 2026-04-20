<script>
	import ShareButtons from '$lib/components/ShareButtons.svelte';

	const pageTitle =
		'Descenso del Sella 2026: guía completa para vivirlo (con o sin piragua) | ¡Puxa Asturies!';
	const pageDesc =
		'Historia del Descenso del Sella, meyores sitios pa ver la carrera, cómo participar, folixa, alojamientu y consejos prácticos.';
	const canonical = 'https://manriquegarcia.com/blog/descenso-del-sella';
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
				name: 'Descenso del Sella 2026',
				item: canonical
			}
		]
	});

	const articleJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: 'Descenso del Sella 2026: guía completa para vivirlo (con o sin piragua)',
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
	<h1>Descenso del Sella 2026: guía completa para vivirlo (con o sin piragua)</h1>

	<p class="article-meta">
		<time datetime={published}>20 de abril de 2026</time>
		· Por Puxa Asturies
	</p>

	<article class="article-body">
		<h2>Qué ye esto del Descenso (por si vienes de Marte)</h2>
		<p>
			El <strong>Descenso Internacional del Sella</strong> ye una <strong>carrera de piragüismu en
			masa</strong> que se celebra el <strong>primer sábadu d’agostu</strong>, tradicionalmente nel
			tramu del ríu Sella ente <strong>Arriondas</strong> y <strong>Ribadesella</strong>. Miles de
			piraguas, decenas de miles de persones na vera, y un ambiente que mezcla <strong>deporte seriu</strong>
			con <strong>folixa asturiana</strong> de altu voltaxe. Si piensas “voy a ver un ratu la carrera
			y vuelvo”, probablemente te quedes tol día… y la sidra tendrá la culpa.
		</p>

		<h2>Historia rápida (desde 1930 pa acá)</h2>
		<p>
			La prueba lleva celebrándose dende <strong>1930</strong>, convirtiéndose nel referente del
			piragüismu popular n’España y nuna cita que xune clubes, peñas, families y turismo. Tien la
			consideración de <strong>Fiesta de Interés Turístico Internacional</strong>, y eso nun ye solo
			un pegatinu bonu: ye reconocimientu a un eventu que define agostu n’Asturies como pocos.
		</p>

		<h2>Cómo ver la carrera: vera, sombrilla y paciencia</h2>
		<p>
			Lo meyor ye plantate con antelación a lo llargo del ríu: <strong>Arriondas</strong> y les zones
			cercanes al arranque tienen ambiente de “salida”; nel tramo intermediu vas ver el ríu en
			movimientu con perspectiva amplia; al acercate a <strong>Ribadesella</strong> aumenta la
			espectación de llegada. Trae <strong>calzáu cómodu</strong>, agua, protección solar y, si puedes,
			<strong>transporte planificáu</strong> porque el tráfico y el aparcamientu son el boss final del
			xuegu. Si vas en grupu, queda sitiu y hora: na folixa ye fácil perdelos.
		</p>
		<p>
			Los <strong>mejores sitios pa ver</strong> dependen de lo que busques: si quieres bulliciu y
			primer fila na salida, Arriondas ye caóticu pero épico; si prefieres ver el ríu “en canal” con
			menos apreturas, busca curvas amplias onde se vea venir la marea de piraguas; si te mola el
			final con playa y ambiente de llegada, Ribadesella concentra el cierre con públicu que lleva
			horas entrenando la garganta con botellín. Ojo cola sombrilla si tas delantre de xente: el
			respetu al espacio personal ye oro, igual que'l reciclaxe de basura: el Sella nun ye pa deixalo
			hecho un vertideru.
		</p>

		<h2>Cómo participar (si vas en piragua, nun solo en chanclas)</h2>
		<p>
			Participar ye otra liga: hai <strong>categoríes</strong> (kayak, canoe, equipos mixtos, clubes…)
			y normes de inscripción que cambien cada añu según la organización. Lo serio ye entrar na web
			oficial del eventu, revisar <strong>plazos, requisitos y seguros</strong>, y entrenar el tramu
			con respetu al ríu. El Sella nun ye piscina: corriente, masas humanes y piraguas alredor
			esixen cabeza fría.
		</p>
		<p>
			Si vienes de fuera y piensas “me apunto porque suena divertío”, para un momentu: el Descenso
			popular ye masificáu, y eso significa <strong>remu, técnica y reflejos</strong> en aguas onde
			falta sitiu. Muncha xente entrena tol añu; otros van con club y entrenador. Si ye la to primer
			vegada, al menos hazte acompañar por quien conozca el ríu y lleva <strong>chalecu</strong>,
			casco y actitú de aprendiz. Ganar ye guay; llegar sanu y con ganes de sidra ye meyor.
		</p>

		<h2>La parte “folixa”: la carrera ye la metá</h2>
		<p>
			Que naide te engañe: el Descenso ye deporte… y tamién ye <strong>cámpings llenos</strong>, barres
			que nun paran, peñes que canten, xente que baxa del ríu con una sonrisa y otra botella, y una
			<strong>cultura de terraza</strong> que se estiende por Ribadesella y alrededores. Si vienes solo
			a “ver cinco minutos”, igual acabas conociendo media España en una barra de sidra. Nun ye
			problema: ye Asturies en agosto.
		</p>
		<p>
			La <strong>fiesta paralela</strong> incluye conciertos, verbenas, mercadillos y esa sensación de
			“tou el mundu conoce a tou el mundu”. Vas ver families con sábanes nel césped, grupos que
			cocinen na acera del cámping, y sobremesas que duren más que la carrera. Si vienes con niños,
			planifica descansos y sombra; si vienes sin niños, planifica… lo mesmo, que la sidra nun
			discrimina edaes na resaca.
		</p>

		<h2>Conseyos prácticos (los que te salven la vida)</h2>
		<p>
			<strong>Alojamientu</strong>: si nun bookas con meses de antelación, vas sufrir. Piensa
			Ribadesella, Llanes, conceyos colindantes, o combinación de <strong>tren / bus</strong> si nun
			quieres conducir entre multitudes. El <strong>transporte públicu</strong> ayuda, pero les
			horas punta del eventu castigan: mira horarios con calma y un plan B. Lleva <strong>chubasquero</strong>
			(aunque haga sol, el microclima del valle ye traicioneru), calzáu que pueda moyase, y paciencia
			pa colas.
		</p>
		<p>
			<strong>Qué llevar</strong>: crema solar, gorra, bidón reutilizable, bolsa pa basura (sí, sé
			heavy, pero el valle agradézlo), powerbank, y diner en efectivu por si les daten fallen cola
			multitud. Si vas a pasar tol día nel ríu, un <strong>sándwich asturianu</strong> nel morral ye
			mejor que depender del primer chiringuito que veas cola fila infinita. Y si vas en coche,
			aparca con cabeza: dexar el vehículu “a ver qué pasa” ye receta pa caminar más que los
			piragüistas.
		</p>
		<p>
			Pa más fiestes y dates del añu, pasa por el <a href="/fiestas">calendariu de fiestas</a>. Y si
			dempués del calor quieres entender por qué la xente bebe así, llee la
			<a href="/blog/sidra">guía de la sidra</a>. ¡Puxa Asturies!
		</p>
	</article>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/fiestas" class="related-link"
				>🎉 Fiestas<span>Calendariu completu de folixa asturiana</span></a
			>
			<a href="/blog/sidra" class="related-link"
				>🍎 Guía de la sidra<span>Culines, escanciado y etiqueta</span></a
			>
		</div>
	</div>

	<ShareButtons title="Descenso del Sella 2026 — guía" description={pageDesc} />
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
