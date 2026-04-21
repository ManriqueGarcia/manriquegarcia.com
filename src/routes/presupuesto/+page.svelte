<script>
	import ShareButtons from '$lib/components/ShareButtons.svelte';

	const pageTitle = 'Calculadora de viaje a Asturias | ¡Puxa Asturies!';
	const pageDesc =
		'Calcula cuánto te va a costar un viaje a Asturias según tu estilo: mochilero, normal o sibarita.';
	const canonical = 'https://manriquegarcia.com/presupuesto';

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Calculadora de viaje', item: canonical }
		]
	});

	const styles = [
		{
			id: 'mochilero',
			label: '🎒 Mochilero',
			night: 25,
			foodPerDay: 12,
			sidraPerBottle: 4,
			transportPerDay: 5
		},
		{
			id: 'normal',
			label: '😎 Normal',
			night: 60,
			foodPerDay: 45,
			sidraPerBottle: 5,
			transportPerDay: 10
		},
		{
			id: 'sibarita',
			label: '🥂 Sibarita',
			night: 120,
			foodPerDay: 85,
			sidraPerBottle: 6,
			transportPerDay: 20
		}
	];

	let days = $state(5);
	let styleId = $state(/** @type {'mochilero' | 'normal' | 'sibarita'} */ ('normal'));
	let bottlesPerDay = $state(2);
	let carRental = $state(false);

	let tripDays = $derived(clampDays(days));

	let activeStyle = $derived(styles.find((s) => s.id === styleId) ?? styles[1]);

	let alojamiento = $derived(activeStyle.night * tripDays);
	let comida = $derived(activeStyle.foodPerDay * tripDays);
	let sidraTotal = $derived(activeStyle.sidraPerBottle * bottlesPerDay * tripDays);
	let transporte = $derived(activeStyle.transportPerDay * tripDays);
	let coche = $derived(carRental ? 35 * tripDays : 0);

	let total = $derived(alojamiento + comida + sidraTotal + transporte + coche);

	let budgetComment = $derived.by(() => {
		if (total < 300) return '¡Chollo!';
		if (total < 600) return 'Buen plan';
		if (total <= 1000) return 'Vas a vivir bien';
		return 'Sibarita total';
	});

	function clampDays(/** @type {number} */ n) {
		const v = Math.round(Number(n));
		if (Number.isNaN(v)) return 5;
		return Math.min(30, Math.max(1, v));
	}
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
	<meta property="og:image:alt" content="Presupuesto estimado para viajar a Asturias — ¡Puxa Asturies!" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
</svelte:head>

<main class="container presupuesto-page">
	<h1>Calculadora de viaje a Asturias</h1>
	<p class="page-intro">{pageDesc}</p>

	<form class="calc-form" onsubmit={(e) => e.preventDefault()}>
		<div class="field">
			<label for="days">Días de viaje (1–30)</label>
			<input
				id="days"
				type="number"
				min="1"
				max="30"
				bind:value={days}
				onblur={() => (days = clampDays(days))}
			/>
		</div>

		<div class="field">
			<label for="estilo">Estilu</label>
			<select id="estilo" bind:value={styleId}>
				{#each styles as s (s.id)}
					<option value={s.id}>{s.label}</option>
				{/each}
			</select>
		</div>

		<div class="field">
			<label for="botellas">
				Botelles de sidra por día: <strong>{bottlesPerDay}</strong>
			</label>
			<input id="botellas" type="range" min="0" max="6" step="1" bind:value={bottlesPerDay} />
		</div>

		<div class="field checkbox-field">
			<label>
				<input type="checkbox" bind:checked={carRental} />
				¿Alquiler de coche? (+35&nbsp;€/día)
			</label>
		</div>
	</form>

	<section class="results" aria-live="polite">
		<h2 class="results-heading">Desglose</h2>
		<dl class="breakdown">
			<div class="row">
				<dt>Alojamiento</dt>
				<dd>{alojamiento} €</dd>
			</div>
			<div class="row">
				<dt>Comida</dt>
				<dd>{comida} €</dd>
			</div>
			<div class="row">
				<dt>Sidra</dt>
				<dd>{sidraTotal} €</dd>
			</div>
			<div class="row">
				<dt>Transporte</dt>
				<dd>{transporte} €</dd>
			</div>
			{#if carRental}
				<div class="row">
					<dt>Coche</dt>
					<dd>{coche} €</dd>
				</div>
			{/if}
		</dl>

		<p class="total-label">Total estimáu</p>
		<p class="total-value">{total} €</p>
		<p class="budget-comment">{budgetComment}</p>
	</section>

	<ShareButtons title={pageTitle} description={pageDesc} />

	<section class="related-pages" aria-labelledby="related-presupuesto">
		<h2 id="related-presupuesto">Siguir planificando</h2>
		<div class="related-grid">
			<a class="related-link" href="/hoteles">
				Hoteles en Xixón
				<span>Opciones pa dormir</span>
			</a>
			<a class="related-link" href="/restaurantes">
				Restaurantes
				<span>Presupuestu gastronómicu real</span>
			</a>
			<a class="related-link" href="/practico">
				Información práctica
				<span>Moverse, clima y más</span>
			</a>
		</div>
	</section>
</main>

<style>
	.presupuesto-page {
		max-width: 640px;
	}

	.calc-form {
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
		padding: 1.25rem 1.5rem;
		margin-bottom: 1.5rem;
	}

	.field {
		margin-bottom: 1.1rem;
	}

	.field:last-child {
		margin-bottom: 0;
	}

	.field label {
		display: block;
		font-size: 0.88rem;
		font-weight: 600;
		margin-bottom: 0.4rem;
		color: var(--color-text-muted);
	}

	.checkbox-field label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		color: var(--color-text);
	}

	.field input[type='number'],
	.field select {
		width: 100%;
		padding: 0.65rem 0.85rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
		font: inherit;
		background: var(--color-bg);
		color: var(--color-text);
	}

	.field input[type='range'] {
		width: 100%;
		margin-top: 0.25rem;
		accent-color: var(--color-accent);
	}

	.results {
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
		padding: 1.25rem 1.5rem 1.5rem;
		margin-bottom: 1.5rem;
	}

	.results-heading {
		margin-top: 0;
		font-size: 1.2rem;
	}

	.breakdown {
		margin: 0 0 1.25rem;
	}

	.breakdown .row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 0.45rem 0;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.95rem;
	}

	.breakdown .row:last-child {
		border-bottom: none;
	}

	.breakdown dt {
		font-weight: 500;
		color: var(--color-text-muted);
	}

	.breakdown dd {
		margin: 0;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}

	.total-label {
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-text-muted);
		margin: 0.5rem 0 0.25rem;
	}

	.total-value {
		font-family: var(--font-heading);
		font-size: 3rem;
		line-height: 1.1;
		margin: 0 0 0.5rem;
		color: var(--color-accent);
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.budget-comment {
		margin: 0;
		font-size: 1.15rem;
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
