<script>
	import { onMount } from 'svelte';
	import Confetti from '$lib/components/Confetti.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';

	const pageTitle = 'Contador de culines | ¡Puxa Asturies!';
	const pageDesc =
		'Lleva la cuenta de cuánta sidra llevas en tu viaje a Asturias. ¿Cuántas botellas van?';
	const canonical = 'https://manriquegarcia.com/culines';

	const STORAGE_KEY = 'puxa-asturies-culines-counter';
	const CULINES_PER_BOTTLE = 6;

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Contador de culines', item: canonical }
		]
	});

	const milestones = [
		{
			bottles: 1,
			emoji: '🌱',
			title: 'Aprendiz',
			label: 'Aprendiz',
			desc: 'Has empezáu bien',
			fill: '#c8e6c9',
			stroke: '#81c784',
			strokeWidth: 1
		},
		{
			bottles: 3,
			emoji: '🍎',
			title: 'Aficionáu',
			label: 'Aficionáu',
			desc: 'Ya controles el culín',
			fill: '#4caf50',
			stroke: '#2e7d32',
			strokeWidth: 1
		},
		{
			bottles: 5,
			emoji: '⭐',
			title: 'Sidrero',
			label: 'Sidrero',
			desc: 'Empiezes a escanciar con estilu',
			fill: '#ffd54f',
			stroke: '#ff8f00',
			strokeWidth: 1
		},
		{
			bottles: 10,
			emoji: '🏆',
			title: 'Maestru escanciador',
			label: 'Maestru',
			desc: 'Respetu total',
			fill: '#ffb74d',
			stroke: '#f57c00',
			strokeWidth: 1
		},
		{
			bottles: 20,
			emoji: '👑',
			title: 'Leyenda',
			label: 'Leyenda',
			desc: 'Ye impossible que sigas de pie',
			fill: '#9575cd',
			stroke: '#d4af37',
			strokeWidth: 3
		}
	];

	/** @type {{ bottleIndex: number; place: string; time: string }[]} */
	let history = $state([]);
	let placeInput = $state('');
	let shareCopied = $state(false);
	let milestoneConfetti = $state(false);
	let milestoneConfettiTimer = 0;

	let bottleCount = $derived(history.length);
	let culines = $derived(bottleCount * CULINES_PER_BOTTLE);

	let topMilestone = $derived.by(() => {
		let best = null;
		for (const m of milestones) {
			if (bottleCount >= m.bottles) best = m;
		}
		return best;
	});

	function persist() {
		if (typeof localStorage === 'undefined') return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ history }));
	}

	onMount(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const data = JSON.parse(raw);
				if (Array.isArray(data.history)) {
					history = data.history;
				} else if (typeof data.bottleCount === 'number' && data.bottleCount > 0) {
					/** @type {{ bottleIndex: number; place: string; time: string }[]} */
					const rebuilt = [];
					for (let i = 1; i <= data.bottleCount; i++) {
						rebuilt.push({ bottleIndex: i, place: '', time: '' });
					}
					history = rebuilt;
					persist();
				}
			}
		} catch {
			// ignore corrupt storage
		}
	});

	function addBottle() {
		const next = bottleCount + 1;
		const now = new Date();
		const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
		const place = placeInput.trim();
		history = [...history, { bottleIndex: next, place, time }];
		placeInput = '';
		persist();

		if (next === 5 || next === 10 || next === 20) {
			milestoneConfetti = true;
			if (milestoneConfettiTimer) clearTimeout(milestoneConfettiTimer);
			milestoneConfettiTimer = window.setTimeout(() => {
				milestoneConfetti = false;
				milestoneConfettiTimer = 0;
			}, 2500);
		}
	}

	function removeBottle() {
		if (bottleCount <= 0) return;
		history = history.slice(0, -1);
		persist();
	}

	function resetTrip() {
		if (!confirm('¿Seguro que quies reaniciar el viaxe? Va desaniciar toles botelles.')) return;
		if (milestoneConfettiTimer) {
			clearTimeout(milestoneConfettiTimer);
			milestoneConfettiTimer = 0;
		}
		milestoneConfetti = false;
		history = [];
		persist();
	}

	async function shareProgress() {
		const url = typeof window !== 'undefined' ? window.location.href : canonical;
		const text = `Llevo ${bottleCount} botellas (${culines} culines) en mi viaje a Asturias 🍎 ${url}`;
		if (typeof navigator !== 'undefined' && navigator.share) {
			try {
				await navigator.share({ title: pageTitle, text });
				return;
			} catch (e) {
				if (e && /** @type {{ name?: string }} */ (e).name === 'AbortError') return;
			}
		}
		try {
			await navigator.clipboard.writeText(text);
			shareCopied = true;
			setTimeout(() => (shareCopied = false), 2200);
		} catch {
			window.prompt('Copia esti mensaxe:', text);
		}
	}

	function formatLogLine(/** @type {{ bottleIndex: number; place: string; time: string }} */ entry) {
		const where = entry.place ? ` — ${entry.place}` : '';
		const when = entry.time ? ` — ${entry.time}` : '';
		return `🍾 Botella #${entry.bottleIndex}${where}${when}`;
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
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
</svelte:head>

<main class="container culines-page">
	<Confetti active={milestoneConfetti} />
	<h1>Contador de culines</h1>
	<p class="page-intro">
		{pageDesc} Una botella da aproximadamente {CULINES_PER_BOTTLE} culines: rexistra botelles y el contador fai'l restu.
	</p>

	<section class="counter-card" aria-live="polite">
		<div class="big-stats">
			<div class="stat">
				<span class="stat-label">Botelles</span>
				<span class="stat-value">{bottleCount}</span>
			</div>
			<div class="stat-divider" aria-hidden="true">≈</div>
			<div class="stat">
				<span class="stat-label">Culines (×{CULINES_PER_BOTTLE})</span>
				<span class="stat-value accent">{culines}</span>
			</div>
		</div>

		<div class="controls">
			<button type="button" class="btn btn-minus" onclick={removeBottle} disabled={bottleCount === 0} aria-label="Quitar una botella">
				−
			</button>
			<button type="button" class="btn btn-plus" onclick={addBottle} aria-label="Amestar una botella">
				+
			</button>
		</div>

		<div class="optional-where">
			<label for="sidreria">¿Ó la tomasti? (opcional)</label>
			<input
				id="sidreria"
				type="text"
				bind:value={placeInput}
				placeholder="Ex.: Casa Trabanco"
				autocomplete="off"
			/>
		</div>
	</section>

	<section class="milestone-badges" aria-label="Insignias del viaxe por botelles">
		<div class="badge-row" role="list">
			{#each milestones as m (m.bottles)}
				{@const unlocked = bottleCount >= m.bottles}
				{@const isCurrent = topMilestone !== null && topMilestone.bottles === m.bottles}
				<div class="badge-item" role="listitem">
					<div
						class="badge"
						class:locked={!unlocked}
						class:current={unlocked && isCurrent}
						title="{m.title} ({m.bottles} bot.): {m.desc}"
					>
						<svg class="badge-svg" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
							<circle
								cx="32"
								cy="32"
								r="28"
								fill={m.fill}
								stroke={m.stroke}
								stroke-width={m.strokeWidth}
							/>
						</svg>
						<span class="badge-emoji" aria-hidden="true">{m.emoji}</span>
					</div>
					<p class="badge-label">{m.label}</p>
				</div>
			{/each}
		</div>
		{#if topMilestone}
			<p class="milestone-caption">{topMilestone.desc}</p>
		{/if}
	</section>

	<section class="history-section" aria-labelledby="history-heading">
		<h2 id="history-heading">Historial</h2>
		{#if history.length === 0}
			<p class="empty-history">Entá nun hai botelles. ¡Pulsa + cuando pidas la primera!</p>
		{:else}
			<ul class="history-list">
				{#each history as entry (entry.bottleIndex + entry.time + entry.place)}
					<li>{formatLogLine(entry)}</li>
				{/each}
			</ul>
		{/if}
	</section>

	<div class="action-row">
		<button type="button" class="btn-secondary" onclick={resetTrip}>Resetear viaje</button>
		<button type="button" class="btn-share" onclick={shareProgress}>
			{shareCopied ? '¡Copiado al portapapeles!' : 'Compartir progresu'}
		</button>
	</div>

	<ShareButtons title={pageTitle} description={pageDesc} />

	<section class="related-pages" aria-labelledby="related-culines">
		<h2 id="related-culines">Tamién te puede interesar</h2>
		<div class="related-grid">
			<a class="related-link" href="/restaurantes">
				Restaurantes y sidrerías
				<span>Onde comer y beber como corresponde</span>
			</a>
			<a class="related-link" href="/plan">
				Planificador random
				<span>Un día al azar en Asturies</span>
			</a>
		</div>
	</section>
</main>

<style>
	.culines-page {
		max-width: 640px;
	}

	.counter-card {
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
		padding: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.big-stats {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 1.25rem;
	}

	.stat {
		text-align: center;
		min-width: 120px;
	}

	.stat-label {
		display: block;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin-bottom: 0.35rem;
	}

	.stat-value {
		font-family: var(--font-heading);
		font-size: 3rem;
		line-height: 1;
		color: var(--color-text);
	}

	.stat-value.accent {
		color: var(--color-accent);
	}

	.stat-divider {
		font-size: 1.5rem;
		color: var(--color-text-muted);
		opacity: 0.6;
	}

	.controls {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 1.25rem;
	}

	.btn {
		appearance: none;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		font-size: 1.75rem;
		font-weight: 700;
		line-height: 1;
		cursor: pointer;
		border: 2px solid var(--color-border);
		transition: transform 0.1s, border-color 0.2s, background 0.2s;
	}

	.btn:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.btn-minus {
		background: var(--color-bg);
		color: var(--color-text);
	}

	.btn-plus {
		background: var(--color-accent);
		color: #fff;
		border-color: var(--color-accent);
	}

	.btn:not(:disabled):hover {
		transform: scale(1.06);
	}

	.optional-where label {
		display: block;
		font-size: 0.88rem;
		font-weight: 600;
		margin-bottom: 0.4rem;
		color: var(--color-text-muted);
	}

	.optional-where input {
		width: 100%;
		padding: 0.65rem 0.85rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
		font: inherit;
		background: var(--color-bg);
		color: var(--color-text);
	}

	.milestone-badges {
		margin-bottom: 1.5rem;
	}

	.badge-row {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
		margin: 1.5rem 0 0.5rem;
		flex-wrap: wrap;
	}

	.badge-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 4.5rem;
	}

	.badge {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		transition: all 0.3s;
		position: relative;
	}

	.badge-svg {
		display: block;
		width: 64px;
		height: 64px;
		flex-shrink: 0;
	}

	.badge-emoji {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		line-height: 1;
		pointer-events: none;
	}

	.badge.locked {
		filter: grayscale(1);
		opacity: 0.3;
	}

	.badge.current {
		animation: badge-pulse 2s ease infinite;
	}

	@keyframes badge-pulse {
		0%,
		100% {
			box-shadow: 0 0 0 0 rgba(26, 107, 60, 0.4);
		}
		50% {
			box-shadow: 0 0 0 10px rgba(26, 107, 60, 0);
		}
	}

	.badge-label {
		font-size: 0.65rem;
		text-align: center;
		margin-top: 0.25rem;
		color: var(--color-text-muted);
		margin-bottom: 0;
	}

	.milestone-caption {
		text-align: center;
		margin: 0.75rem 0 0;
		font-size: 0.92rem;
		color: var(--color-text-muted);
	}

	.history-section h2 {
		margin-top: 0;
	}

	.empty-history {
		color: var(--color-text-muted);
		font-size: 0.95rem;
	}

	.history-list {
		list-style: none;
		margin: 0;
		padding: 0;
		max-height: 280px;
		overflow-y: auto;
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
		background: var(--color-card);
	}

	.history-list li {
		padding: 0.65rem 1rem;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.92rem;
	}

	.history-list li:last-child {
		border-bottom: none;
	}

	.action-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin: 1.5rem 0 0.5rem;
	}

	.btn-secondary {
		appearance: none;
		padding: 0.6rem 1rem;
		border-radius: var(--radius, 12px);
		border: 1px solid var(--color-border);
		background: var(--color-card);
		color: var(--color-text);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
		transition: border-color 0.2s;
	}

	.btn-secondary:hover {
		border-color: var(--color-warm);
	}

	.btn-share {
		appearance: none;
		padding: 0.6rem 1rem;
		border-radius: var(--radius, 12px);
		border: none;
		background: var(--color-warm);
		color: #fff;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.btn-share:hover {
		opacity: 0.92;
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
