<script>
	import { onMount } from 'svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';

	const pageTitle = 'Planificador random | ¡Puxa Asturies!';
	const pageDesc =
		'Genera un plan aleatorio para tu día en Asturias: dónde comer, qué visitar y dónde tomar el culín.';
	const canonical = 'https://manriquegarcia.com/plan';

	const restaurants = [
		'Casa Trabanco (Lavandera)',
		'El Sauco',
		'Parrilla Antonio',
		'Sidrería Nava',
		'La Galana',
		'Sidrería Celorio',
		'Casa Ferino',
		'Llagar El Quesu',
		'Sidrería El Globo',
		'Sidrería La Costa',
		'Sidrería Cabranes'
	];

	const places = [
		'Playa de San Lorenzo',
		'Cimadevilla',
		'Cerro de Santa Catalina',
		'Parque Isabel la Católica',
		'Universidad Laboral',
		'La Campa de Torres',
		'Jardín Botánico Atlántico',
		'Catedral de Oviedo',
		'Monte Naranco',
		'Lastres',
		'Luarca',
		'Colunga',
		'Teatro Campoamor'
	];

	const bars = [
		'Barrio de la Sidra',
		'Calle Corrida',
		'Puerto Deportivo',
		'Calle Gascona (Oviedo)',
		'Cimadevilla de noche',
		'Muro de San Lorenzo',
		'Zona de Fomento',
		'Tascas del centro'
	];

	const STORAGE_KEY = 'puxa-asturies-random-day-plan';

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Planificador random', item: canonical }
		]
	});

	/** @type {{ lunch: string; visit: string; evening: string } | null} */
	let plan = $state(null);

	let hydrated = $state(false);

	const hasPlan = $derived(plan !== null);

	function pickRandom(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	function generatePlan() {
		plan = {
			lunch: pickRandom(restaurants),
			visit: pickRandom(places),
			evening: pickRandom(bars)
		};
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
		}
	}

	function sharePlanWhatsApp() {
		if (!plan) return;
		const text = `🍎 Mi plan pa hoy n'Asturies (¡Puxa Asturies!)\n\n🍴 Comida: ${plan.lunch}\n🏛️ Visita: ${plan.visit}\n🍺 Culines: ${plan.evening}\n\n${canonical}`;
		window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
	}

	onMount(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const p = JSON.parse(raw);
				if (p && typeof p.lunch === 'string' && typeof p.visit === 'string' && typeof p.evening === 'string') {
					plan = p;
				}
			}
		} catch {
			/* ignore */
		}
		hydrated = true;
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
	<h1>Planificador random</h1>

	<p class="page-intro">
		¿Nun sabes qué facer hoy? Dale al botón y deja que el destino (y un algoritmo con buen gustu) decida por ti.
	</p>

	<div class="plan-actions">
		{#if !hasPlan}
			<button type="button" class="plan-btn plan-btn--primary" onclick={generatePlan}>
				🎲 ¡Genera un plan!
			</button>
		{/if}
	</div>

	{#if hydrated && !hasPlan}
		<p class="plan-hint">Pulsa el botón y saldrán trés tarxetes con comida, visita y culines.</p>
	{/if}

	{#if hasPlan}
		<div class="plan-cards" aria-live="polite">
			<article class="plan-card plan-card--food">
				<h2 class="plan-card__title"><span class="plan-card__emoji" aria-hidden="true">🍴</span> Comida</h2>
				<p class="plan-card__body">{plan.lunch}</p>
			</article>
			<article class="plan-card plan-card--visit">
				<h2 class="plan-card__title"><span class="plan-card__emoji" aria-hidden="true">🏛️</span> Visita</h2>
				<p class="plan-card__body">{plan.visit}</p>
			</article>
			<article class="plan-card plan-card--drinks">
				<h2 class="plan-card__title"><span class="plan-card__emoji" aria-hidden="true">🍺</span> Culines</h2>
				<p class="plan-card__body">{plan.evening}</p>
			</article>
		</div>

		<div class="plan-actions plan-actions--after-cards">
			<div class="plan-actions-row">
				<button type="button" class="plan-btn plan-btn--primary" onclick={generatePlan}>
					🔄 Otro plan
				</button>
				<button type="button" class="plan-btn plan-btn--secondary" onclick={sharePlanWhatsApp}>
					📱 Compartir plan
				</button>
			</div>
		</div>
	{/if}

	<ShareButtons title={pageTitle} description={pageDesc} />

	<section class="related-pages" aria-labelledby="related-heading">
		<h2 id="related-heading">Siguir explorando</h2>
		<div class="related-grid">
			<a class="related-link" href="/restaurantes">
				Restaurantes y sidreríes
				<span>Onde comer como un xefe</span>
			</a>
			<a class="related-link" href="/mapa">
				Mapa interactivo
				<span>Llugares en el mapa</span>
			</a>
			<a class="related-link" href="/visitar">
				Qué visitar
				<span>Idees pa perdes (nel bon sentíu)</span>
			</a>
		</div>
	</section>

	<p class="plan-tip">
		Conseyu: si el plan nun te convence, dale otra vez. Si después de 5 intentos nun te gusta ninguno, ye que lo
		que quieres ye quedarte nel sofá. Respetamos eso.
	</p>
</main>

<style>
	.plan-actions {
		margin: 1.5rem 0 2rem;
	}

	.plan-actions--after-cards {
		margin-top: 0;
		margin-bottom: 0;
	}

	.plan-actions-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		align-items: center;
	}

	.plan-btn {
		appearance: none;
		font-family: var(--font-body);
		font-size: 1rem;
		font-weight: 600;
		padding: 0.85rem 1.35rem;
		border-radius: var(--radius, 12px);
		border: 2px solid transparent;
		cursor: pointer;
		transition:
			background 0.2s,
			border-color 0.2s,
			transform 0.1s,
			box-shadow 0.2s;
	}

	.plan-btn:active {
		transform: scale(0.98);
	}

	.plan-btn--primary {
		background: var(--color-accent);
		color: var(--color-card);
		border-color: var(--color-accent);
		box-shadow: 0 2px 12px rgba(26, 107, 60, 0.25);
	}

	.plan-btn--primary:hover {
		background: var(--color-accent-hover);
		border-color: var(--color-accent-hover);
		box-shadow: 0 4px 16px rgba(26, 107, 60, 0.3);
	}

	.plan-btn--secondary {
		background: var(--color-card);
		color: var(--color-text);
		border: 2px solid var(--color-border);
	}

	.plan-btn--secondary:hover {
		border-color: var(--color-accent);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	}

	.plan-hint {
		font-size: 0.95rem;
		color: var(--color-text-muted);
		margin-bottom: 1.5rem;
	}

	.plan-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1.25rem;
		margin: 0 0 2rem;
	}

	.plan-card {
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
		padding: 1.25rem 1.25rem 1.25rem 1.1rem;
		border-left-width: 5px;
		border-left-style: solid;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
	}

	.plan-card--food {
		border-left-color: #22a36b;
	}

	.plan-card--visit {
		border-left-color: #2563eb;
	}

	.plan-card--drinks {
		border-left-color: #d97706;
	}

	.plan-card__title {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		margin: 0 0 0.65rem;
		color: var(--color-text);
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.plan-card__emoji {
		font-size: 1.35rem;
		line-height: 1;
	}

	.plan-card__body {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 600;
		line-height: 1.45;
		color: var(--color-text);
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

	.plan-tip {
		margin-top: 2rem;
		padding: 1rem 1.15rem;
		background: var(--color-accent-light);
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
		font-size: 0.92rem;
		color: var(--color-text-muted);
		line-height: 1.65;
	}
</style>
