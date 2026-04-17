<script>
	import CommentSection from '$lib/components/CommentSection.svelte';

	const fiestas = [
		{
			name: 'Carnaval de Xixón',
			date: 'Febreru (dates según añu)',
			location: 'Xixón',
			description:
				'Disfraces, chirigotas y ambientazu por les cais. Si nun vas disfrazáu, igual te sientes raru; si vas disfrazáu, ye la norma. Cuidáu col confeti en los bolsillos.',
		},
		{
			name: 'Selmana Santa',
			date: 'Marzu / abril (móvil)',
			location: 'Asturies (destaca en munchos pueblos)',
			description:
				'Procesiones, tradición y mucha xente en las cais. Respetu al ritmu lento y al silenciu cuando toque; depués sidra y risa cuando acabe.',
		},
		{
			name: 'Feria de Muestres d’Asturies',
			date: 'Agostu',
			location: 'Xixón',
			description:
				'Feria, conciertos, casetas y feria ambiente en plan “tol mundu pa’l mesmu sitiu”. Si nun te gusten las muchedumbres, ve con paciencia o mira dende la fresca.',
		},
		{
			name: 'Selmana Grande de Xixón',
			date: 'Agostu',
			location: 'Xixón',
			description:
				'La ciudá en modo fiesta: música, eventos y noches que se allargan. El turista avisáu lleva zapatillas cómodas y agua, que agosto pega.',
		},
		{
			name: 'Festival de la Sardina en Candás',
			date: '1 d’agostu',
			location: 'Candás',
			description:
				'Olors a brasa, mar de fondu y xente que flipa cola sardina. Un clásicu del veranu; si te gusta el pescáu, vas salir feliz como un reguizu.',
		},
		{
			name: 'Descensu Internacional del Sella',
			date: 'Primer sábadu d’agostu',
			location: 'Ribadesella / ríu Sella',
			description:
				'Miles de piraguas, folixa y ríu pa dar y regalar. Si nun remas, igual acabas animando con una sidra na mano. Caos bonu y deportivu a la vez.',
		},
		{
			name: 'Nueche de San Xuan',
			date: '23 de xunu',
			location: 'Plages y costa (tamién interior)',
			description:
				'Hogueras, saltos (opcional) y magia de nueche corta. En la playa, l’ambientu ye de esos que recordes años. Cuidáu co’ fueu y co’ les toallas ajenas.',
		},
		{
			name: 'Festival de la Sidra Natural de Xixón',
			date: 'Agostu',
			location: 'Xixón',
			description:
				'Sidra natural, culines y discuticiones amistoses sobre qué chigre ye “el verdaderu”. Ven con sed y sal con opinión.',
		},
		{
			name: 'San Matéu n’Uviéu',
			date: 'Septiembre',
			location: 'Uviéu',
			description:
				'Fiestes grandes na capital: conciertos, ambiente y casco históricu petáu de xente. Vale la pena coger tren o bus y pasar el día.',
		},
		{
			name: 'Fiesta de la Mazana en Villaviciosa',
			date: 'Octubre',
			location: 'Villaviciosa',
			description:
				'Manzana en toles sos formas: dulce, sidra de la zona y paisaxe de valle. Ideal si busques folixa tranquila y sabores de tierra.',
		},
		{
			name: 'Amagüestu',
			date: 'Payares',
			location: 'Tol país (tradición rural)',
			description:
				'Castañes asaes, nues longues y olor a fueu. Si nun has probáu castaña con sidra, falta dalgo importante na to vida. Corrixe eso.',
		},
	];

	const pageTitle = 'Calendariu de fiestes | ¡Puxa Asturies!';
	const pageDesc =
		'Calendario de fiestas de Asturias: Descenso del Sella, Semana Grande de Gijón, San Juan y más celebraciones.';
	const canonical = 'https://manriquegarcia.com/fiestas';

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Fiestas', item: 'https://manriquegarcia.com/fiestas' }
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
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDesc} />
	<meta property="og:image" content="https://manriquegarcia.com/images/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
</svelte:head>

<main class="container">
	<h1>Calendariu de fiestes (con dates aproximao)</h1>

	<p class="page-intro">
		Asturies nun para: hay fiesta pa’l que quiera folixa y pa’l que quiera tradición. Dates
		<strong>orientativas</strong> — confirma siempre nel ayuntamientu o na web oficial, que los
		calendarios muden y equí somos guía, nun somos axenda oficial.
	</p>

	<div class="section-note">
		<p>
			<strong>Conseyu:</strong> n’agostu todo el mundu pensa lo mesmo. Reserva coche, cama o paciencia
			antes, que si nun, vas acabar en cola pa aparcar hasta el año que viene.
		</p>
	</div>

	<ol class="fiesta-timeline">
		{#each fiestas as f, i (f.name + i)}
			<li class="fiesta-card card">
				<div class="fiesta-marker" aria-hidden="true"></div>
				<div class="fiesta-body">
					<h2 class="fiesta-title">{f.name}</h2>
					<p class="fiesta-meta">
						<span class="tag">📅 {f.date}</span>
						<span class="tag warm">📍 {f.location}</span>
					</p>
					<p class="description">{f.description}</p>
				</div>
			</li>
		{/each}
	</ol>

	<CommentSection
		title="Comentarios — fiestes"
		placeholder="¿Qué fiesta recomiendas o qué cayeron mal? Cuéntanoslo…"
		page="/fiestas"
	/>
</main>

<style>
	.fiesta-timeline {
		list-style: none;
		padding: 0;
		margin: 2rem 0 0;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.fiesta-timeline::before {
		content: '';
		position: absolute;
		left: 0.65rem;
		top: 0.5rem;
		bottom: 0.5rem;
		width: 3px;
		background: linear-gradient(
			to bottom,
			var(--color-accent, #1a6b3c),
			rgba(26, 107, 60, 0.25)
		);
		border-radius: 3px;
	}

	.fiesta-card {
		position: relative;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem;
		align-items: start;
		padding-left: 2.25rem;
		margin: 0;
		border-left: none;
	}

	.fiesta-marker {
		position: absolute;
		left: 0.2rem;
		top: 1.35rem;
		width: 12px;
		height: 12px;
		background: var(--color-accent, #1a6b3c);
		border: 2px solid var(--color-card, #fff);
		border-radius: 50%;
		box-shadow: 0 0 0 2px rgba(26, 107, 60, 0.35);
	}

	.fiesta-title {
		margin: 0 0 0.35rem;
		font-size: 1.3rem;
		font-family: var(--font-heading, Georgia, serif);
		color: var(--color-accent, #1a6b3c);
	}

	.fiesta-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0 0 0.65rem;
	}

	.fiesta-body .description {
		margin: 0;
	}
</style>
