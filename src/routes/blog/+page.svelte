<script>
	import ShareButtons from '$lib/components/ShareButtons.svelte';

	const pageTitle = 'Blog | ¡Puxa Asturies!';
	const pageDesc =
		'Artículos sobre Asturias: guías de sidra, cachopo, playas, fiestas y todo lo que necesitas saber para tu viaje.';
	const canonical = 'https://manriquegarcia.com/blog';

	const posts = [
		{
			href: '/blog/cachopo',
			emoji: '🥩',
			title: 'Guía del cachopo asturiano',
			date: '20 abr 2026',
			excerpt:
				'Qué ye, dónde lo comes en Xixón sin quedate tiesu y cómo pides “individual” o pa compartir sin sustos.'
		},
		{
			href: '/blog/sidra',
			emoji: '🍎',
			title: 'Guía de la sidra asturiana',
			date: '20 abr 2026',
			excerpt:
				'Escanciado, culines, etiqueta del suelu moyáu y onde beber en Xixón y alrededores como unu más.'
		},
		{
			href: '/blog/descenso-del-sella',
			emoji: '🛶',
			title: 'Descenso del Sella 2026',
			date: '20 abr 2026',
			excerpt:
				'La carrera, la folixa, los meyores sitios pa ver y cómo sobrevivir si nun pillasti habitación a tiempo.'
		}
	];

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Blog', item: canonical }
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
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
</svelte:head>

<main class="container">
	<h1>Blog</h1>

	<p class="page-intro">
		Artículos largos, con manía y datos útiles: cocina, sidra, fiestas y esos detalles que naide te cuenta
		na oficina de turismo. Si tas planeando el viaxe, léetelos con un culín al lao.
	</p>

	<div class="blog-grid">
		{#each posts as post (post.href)}
			<a class="blog-card" href={post.href}>
				<span class="blog-card-icon" aria-hidden="true">{post.emoji}</span>
				<h2 class="blog-card-title">{post.title}</h2>
				<time class="blog-card-date" datetime="2026-04-20">{post.date}</time>
				<p class="blog-card-excerpt">{post.excerpt}</p>
				<span class="blog-card-cta">Lleer artículu →</span>
			</a>
		{/each}
	</div>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/restaurantes" class="related-link"
				>🍴 Restaurantes<span>Onde comer cachopo, sidreríes y too lo demás</span></a
			>
			<a href="/fiestas" class="related-link"
				>🎉 Fiestas<span>Calendariu de folixa asturiana</span></a
			>
			<a href="/practico" class="related-link"
				>📋 Práctico<span>Transporte, maleta y supervivencia xixonenca</span></a
			>
		</div>
	</div>

	<ShareButtons title="Blog ¡Puxa Asturies!" description="Artículos sobre Asturias pa tu viaxe" />
</main>

<style>
	.blog-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0 2.5rem;
	}

	.blog-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 1.25rem 1.35rem;
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		text-decoration: none;
		color: var(--color-text);
		transition:
			border-color 0.2s,
			box-shadow 0.2s,
			transform 0.15s;
	}

	.blog-card:hover {
		border-color: var(--color-accent);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
		transform: translateY(-2px);
		color: var(--color-text);
	}

	.blog-card-icon {
		font-size: 2rem;
		line-height: 1;
		margin-bottom: 0.5rem;
	}

	.blog-card-title {
		font-family: var(--font-heading);
		font-size: 1.35rem;
		margin: 0 0 0.35rem;
		color: var(--color-accent);
		line-height: 1.2;
	}

	.blog-card:hover .blog-card-title {
		color: var(--color-accent-hover);
	}

	.blog-card-date {
		font-size: 0.82rem;
		color: var(--color-text-muted);
		margin-bottom: 0.65rem;
	}

	.blog-card-excerpt {
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.55;
		color: var(--color-text-muted);
		flex: 1;
	}

	.blog-card-cta {
		margin-top: 1rem;
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--color-accent);
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
