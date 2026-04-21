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

	const CHAT_API = 'https://8u1htcpsr1.execute-api.eu-west-1.amazonaws.com/chat';

	const INTEREST_OPTIONS = [
		{ id: 'sidra', label: 'Sidra/Gastronomía' },
		{ id: 'naturaleza', label: 'Naturaleza' },
		{ id: 'cultura', label: 'Cultura' },
		{ id: 'playa', label: 'Playa' },
		{ id: 'fiesta', label: 'Fiesta' }
	];

	/** @type {Set<string>} */
	let aiInterestIds = $state(new Set(INTEREST_OPTIONS.map((o) => o.id)));

	let aiDays = $state(3);
	/** @type {'Mochilero' | 'Normal' | 'Sibarita'} */
	let aiBudget = $state('Normal');
	let aiLoading = $state(false);
	let aiResult = $state('');
	let aiError = $state('');

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

	function toggleAiInterest(id) {
		const next = new Set(aiInterestIds);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		aiInterestIds = next;
	}

	/** @param {SubmitEvent} e */
	async function generateAiItinerary(e) {
		e.preventDefault();
		const interests = INTEREST_OPTIONS.filter((o) => aiInterestIds.has(o.id)).map((o) => o.label);
		if (interests.length === 0) {
			aiError = 'Selecciona polo menos un interés.';
			return;
		}
		aiError = '';
		const days = Math.min(7, Math.max(1, Number(aiDays) || 3));
		const prompt = `Genera un itinerario de ${days} días en Asturias para alguien interesado en: ${interests.join(', ')}. Presupuesto: ${aiBudget}. Usa SOLO restaurantes y lugares de la guía. Formato: para cada día pon "Día X:" seguido de mañana, comida, tarde, cena. Sé concreto con nombres de sitios.`;
		aiLoading = true;
		aiResult = '';
		try {
			const res = await fetch(CHAT_API, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: prompt, history: [] })
			});
			const data = await res.json();
			const reply = typeof data?.reply === 'string' ? data.reply : '';
			if (!reply) {
				aiError = 'Nun recibí una respuesta clara. Prueba otra vuelta.';
			} else {
				aiResult = reply;
			}
		} catch {
			aiError = 'Equí falló la conexión. Prueba más tarde.';
		} finally {
			aiLoading = false;
		}
	}

	function shareAiPlanWhatsApp() {
		if (!aiResult) return;
		const text = `🗓️ Itinerariu IA — ¡Puxa Asturies!\n\n${aiResult}\n\n${canonical}`;
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
	<meta property="og:image:alt" content="Planificador de viaje a Asturias — ¡Puxa Asturies!" />
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

	<section class="ai-planner" aria-labelledby="ai-planner-heading">
		<h2 id="ai-planner-heading" class="ai-planner__title">🗓️ Planificador inteligente</h2>
		<form class="ai-planner__form" onsubmit={generateAiItinerary}>
			<div class="ai-field">
				<label class="ai-label" for="ai-days">Días</label>
				<input
					id="ai-days"
					class="ai-input ai-input--days"
					type="number"
					min="1"
					max="7"
					bind:value={aiDays}
					disabled={aiLoading}
				/>
			</div>

			<fieldset class="ai-fieldset">
				<legend class="ai-legend">Intereses</legend>
				<div class="ai-checks">
					{#each INTEREST_OPTIONS as opt (opt.id)}
						<label class="ai-check">
							<input
								type="checkbox"
								checked={aiInterestIds.has(opt.id)}
								onchange={() => toggleAiInterest(opt.id)}
								disabled={aiLoading}
							/>
							<span>{opt.label}</span>
						</label>
					{/each}
				</div>
			</fieldset>

			<div class="ai-field">
				<label class="ai-label" for="ai-budget">Presupuesto</label>
				<select id="ai-budget" class="ai-select" bind:value={aiBudget} disabled={aiLoading}>
					<option value="Mochilero">Mochilero</option>
					<option value="Normal">Normal</option>
					<option value="Sibarita">Sibarita</option>
				</select>
			</div>

			<button type="submit" class="plan-btn plan-btn--primary ai-submit" disabled={aiLoading}>
				✨ Generar itinerario con IA
			</button>
		</form>

		{#if aiError}
			<p class="ai-error" role="alert">{aiError}</p>
		{/if}

		{#if aiLoading}
			<div class="ai-result-card ai-result-card--loading" aria-busy="true" aria-live="polite">
				<div class="ai-skeleton">
					<div class="ai-skeleton-line" style="width: 92%"></div>
					<div class="ai-skeleton-line" style="width: 78%"></div>
					<div class="ai-skeleton-line" style="width: 85%"></div>
					<div class="ai-skeleton-line" style="width: 64%"></div>
				</div>
				<p class="ai-loading-hint">Generando itinerario…</p>
			</div>
		{:else if aiResult}
			<div class="ai-result-card" aria-live="polite">
				<div class="ai-itinerary-text">
					{#each aiResult.split('\n') as line}
						{#if line.trim() === ''}
							<br />
						{:else}
							<p class="ai-itinerary-line">{line}</p>
						{/if}
					{/each}
				</div>
				<div class="ai-result-actions">
					<button type="button" class="plan-btn plan-btn--secondary" onclick={shareAiPlanWhatsApp}>
						📱 Compartir plan
					</button>
				</div>
			</div>
		{/if}
	</section>

	<hr class="plan-section-sep" />

	<section class="random-planner" aria-labelledby="random-planner-heading">
		<h2 id="random-planner-heading" class="random-planner__title">🎲 Planificador random</h2>

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

	<p class="plan-tip">
		Conseyu: si el plan nun te convence, dale otra vez. Si después de 5 intentos nun te gusta ninguno, ye que lo
		que quieres ye quedarte nel sofá. Respetamos eso.
	</p>
	</section>

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

	.ai-planner {
		margin: 0 0 2rem;
		padding: 1.35rem 1.25rem;
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
	}

	.ai-planner__title {
		font-family: var(--font-heading);
		font-size: 1.35rem;
		margin: 0 0 1.1rem;
		color: var(--color-text);
	}

	.ai-planner__form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.ai-field {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.ai-label {
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--color-text-muted);
	}

	.ai-input,
	.ai-select {
		font: inherit;
		font-size: 1rem;
		padding: 0.55rem 0.75rem;
		border-radius: 10px;
		border: 1px solid var(--color-border);
		background: var(--color-card);
		color: var(--color-text);
		max-width: 8rem;
	}

	.ai-input--days {
		max-width: 5rem;
	}

	.ai-fieldset {
		border: 1px solid var(--color-border);
		border-radius: 10px;
		padding: 0.75rem 1rem 1rem;
		margin: 0;
	}

	.ai-legend {
		font-size: 0.88rem;
		font-weight: 600;
		padding: 0 0.35rem;
		color: var(--color-text-muted);
	}

	.ai-checks {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
	}

	.ai-check {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.92rem;
		cursor: pointer;
	}

	.ai-check input {
		width: 1.1rem;
		height: 1.1rem;
		accent-color: var(--color-accent);
	}

	.ai-select {
		max-width: min(100%, 16rem);
	}

	.ai-submit {
		align-self: flex-start;
		margin-top: 0.25rem;
	}

	.ai-error {
		margin: 0.75rem 0 0;
		font-size: 0.92rem;
		color: #b91c1c;
	}

	.ai-result-card {
		margin-top: 1.25rem;
		padding: 1.15rem 1.2rem;
		background: color-mix(in srgb, var(--color-accent-light) 55%, var(--color-card));
		border: 1px solid var(--color-border);
		border-left: 4px solid var(--color-accent);
		border-radius: var(--radius, 12px);
	}

	.ai-result-card--loading {
		border-left-color: var(--color-border);
	}

	.ai-itinerary-text {
		font-size: 0.96rem;
		line-height: 1.55;
		color: var(--color-text);
	}

	.ai-itinerary-line {
		margin: 0 0 0.4rem;
	}

	.ai-result-actions {
		margin-top: 1rem;
		padding-top: 0.85rem;
		border-top: 1px solid var(--color-border);
	}

	.ai-loading-hint {
		margin: 0.65rem 0 0;
		font-size: 0.88rem;
		color: var(--color-text-muted);
	}

	.ai-skeleton {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.ai-skeleton-line {
		height: 0.72rem;
		background: linear-gradient(
			90deg,
			var(--color-border) 25%,
			var(--color-card) 50%,
			var(--color-border) 75%
		);
		background-size: 200% 100%;
		animation: ai-skel-shimmer 1.4s ease infinite;
		border-radius: 4px;
	}

	@keyframes ai-skel-shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	.plan-section-sep {
		border: none;
		border-top: 2px dashed var(--color-border);
		margin: 2.25rem 0 2rem;
	}

	.random-planner__title {
		font-family: var(--font-heading);
		font-size: 1.35rem;
		margin: 0 0 1rem;
		color: var(--color-text);
	}
</style>
