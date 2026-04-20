<script>
	import Confetti from '$lib/components/Confetti.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import { fly } from 'svelte/transition';

	const pageTitle = 'Quiz: ¿Cuánto sabes de Asturias? | ¡Puxa Asturies!';
	const pageDesc =
		'Pon a prueba tus conocimientos sobre Asturias con este quiz divertido. ¿Eres bañista o asturiano de cepa?';
	const canonical = 'https://manriquegarcia.com/quiz';

	const QUESTIONS = [
		{
			text: '¿Cómo se llama el acto de servir sidra desde altura?',
			options: ['Escanciado', 'Trasiego', 'Vertido libre', 'Cascadeo'],
			correct: 0
		},
		{
			text: '¿Cuántos culines salen aproximadamente de una botella de sidra?',
			options: ['6', '3', '12', 'Da igual, siempre parecen pocos'],
			correct: 0
		},
		{
			text: '¿Qué es un cachopo?',
			options: [
				'Dos filetes empanados rellenos',
				'Un tipo de queso',
				'Una montaña',
				'El alcalde de Gijón'
			],
			correct: 0
		},
		{
			text: '¿Cuál es la playa urbana de Gijón?',
			options: [
				'San Lorenzo',
				'La Concha',
				'Cimadevilla',
				'La playa no existe, esto es Asturias'
			],
			correct: 0
		},
		{
			text: '¿Qué significa "¡Puxa Asturies!"?',
			options: [
				'¡Viva Asturias!',
				'¡Empuja Asturias!',
				'¡Llueve en Asturias!',
				'Es un tipo de queso'
			],
			correct: 0
		},
		{
			text: '¿Qué debes hacer con lo que sobra del culín de sidra?',
			options: [
				'Tirarlo al suelo',
				'Bebértelo todo',
				'Dárselo al de al lado',
				'Guardarlo para luego'
			],
			correct: 0
		},
		{
			text: '¿Cuál de estos quesos es asturiano?',
			options: ['Cabrales', 'Manchego', 'Idiazábal', 'Roquefort'],
			correct: 0
		},
		{
			text: '¿Qué es el Descenso del Sella?',
			options: [
				'Competición de piraguas',
				'Un río que baja de nivel',
				'Una fiesta de la cerveza',
				'Un tobogán acuático natural'
			],
			correct: 0
		},
		{
			text: '¿En qué ciudad está la Catedral de San Salvador?',
			options: ['Oviedo', 'Gijón', 'Avilés', 'Cangas de Onís'],
			correct: 0
		},
		{
			text: '¿Cómo se dice "me gusta" en asturiano?',
			options: ['Préstame', 'Págame', 'Cómeme', 'Véndeme'],
			correct: 0
		}
	];

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Quiz', item: canonical }
		]
	});

	/** @type {number | null} */
	let picked = $state(null);
	let locked = $state(false);
	let index = $state(0);
	let score = $state(0);
	let finished = $state(false);
	let advanceTimer = 0;

	function resultTitle(s) {
		if (s <= 3) return '🏖️ Bañista total — Necesitas más culines y menos Google';
		if (s <= 6) return '🍎 Medio asturianu — Vas pel bon camín, pero falta sidra';
		if (s <= 9) return '🎯 Casi de Xixón — Un pocu más y te damos el carné';
		return "👑 Asturianu de cepa — ¡Puxa! Sabes más que munchos d'equí";
	}

	function selectOption(optionIndex) {
		if (locked || finished) return;
		locked = true;
		picked = optionIndex;
		const q = QUESTIONS[index];
		if (optionIndex === q.correct) score += 1;

		advanceTimer = window.setTimeout(() => {
			advanceTimer = 0;
			picked = null;
			locked = false;
			if (index < QUESTIONS.length - 1) {
				index += 1;
			} else {
				finished = true;
			}
		}, 1400);
	}

	function resetQuiz() {
		if (advanceTimer) {
			clearTimeout(advanceTimer);
			advanceTimer = 0;
		}
		picked = null;
		locked = false;
		index = 0;
		score = 0;
		finished = false;
	}

	function shareResultWhatsApp() {
		const text = `He sacado ${score}/10 en el quiz de ¡Puxa Asturies! ¿Cuánto sabes tú? ${canonical}`;
		window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
	}

	let progressPercent = $derived(
		finished ? 100 : Math.round(((index + 1) / QUESTIONS.length) * 100)
	);
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
	<Confetti active={finished && score >= 7} />
	<h1>¿Cuánto sabes de Asturias?</h1>

	<p class="page-intro">
		Pon a prueba tus conocimientos sobre Asturias con este quiz divertido. ¿Eres bañista o asturiano de cepa?
	</p>

	{#if finished}
		<section class="quiz-card result-card" in:fly={{ y: 16, duration: 350, delay: 80 }} aria-live="polite">
			<p class="result-score">{score} / {QUESTIONS.length}</p>
			<h2 class="result-heading">{resultTitle(score)}</h2>
			<div class="result-actions">
				<button type="button" class="btn btn-wa" onclick={shareResultWhatsApp}>
					Compartir resultado por WhatsApp
				</button>
				<button type="button" class="btn btn-secondary" onclick={resetQuiz}>Volver a intentar</button>
			</div>
		</section>
	{:else}
		<div class="quiz-meta" aria-live="polite">
			<span class="quiz-step">Pregunta {index + 1} de {QUESTIONS.length}</span>
			<span class="quiz-score-inline">Llevas {score} aciertos</span>
		</div>

		<div class="progress-track" aria-hidden="true">
			<div class="progress-fill" style="width: {progressPercent}%"></div>
		</div>

		{#key index}
			<section
				class="quiz-card"
				in:fly={{ x: 28, duration: 280, delay: 40 }}
				out:fly={{ x: -20, duration: 200 }}
				aria-labelledby="quiz-q-{index}"
			>
				<h2 id="quiz-q-{index}" class="question-title">{QUESTIONS[index].text}</h2>

				<div class="options" role="group" aria-labelledby="quiz-q-{index}">
					{#each QUESTIONS[index].options as label, i (i)}
						<button
							type="button"
							class="option"
							class:correct={locked && i === QUESTIONS[index].correct}
							class:wrong={locked && picked === i && i !== QUESTIONS[index].correct}
							class:dim={locked && picked !== i && i !== QUESTIONS[index].correct}
							disabled={locked}
							onclick={() => selectOption(i)}
						>
							<span class="option-letter">{String.fromCharCode(65 + i)}</span>
							<span class="option-label">{label}</span>
						</button>
					{/each}
				</div>
			</section>
		{/key}
	{/if}

	<div class="related-pages">
		<h2>Sigue explorando</h2>
		<div class="related-grid">
			<a href="/diccionario" class="related-link"
				>📖 Diccionario<span>Frases pa entenderte con la xente</span></a
			>
			<a href="/faq" class="related-link">❓ FAQ<span>Respuestas rápidas antes del viaxe</span></a>
			<a href="/practico" class="related-link"
				>📋 Práctico<span>Transporte, costumbres y supervivencia</span></a
			>
		</div>
	</div>

	<ShareButtons title="Quiz: ¿Cuánto sabes de Asturias?" description={pageDesc} />
</main>

<style>
	.quiz-meta {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.5rem 1rem;
		margin-bottom: 0.65rem;
		font-size: 0.9rem;
		color: var(--color-text-muted);
		font-weight: 500;
	}

	.quiz-score-inline {
		color: var(--color-accent);
	}

	.progress-track {
		height: 0.45rem;
		background: var(--color-border);
		border-radius: 999px;
		overflow: hidden;
		margin-bottom: 1.5rem;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--color-accent), var(--color-warm));
		border-radius: 999px;
		transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.quiz-card {
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
		padding: 1.5rem 1.35rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
		margin-bottom: 2rem;
	}

	.question-title {
		font-family: var(--font-heading);
		font-size: 1.35rem;
		margin: 0 0 1.25rem;
		line-height: 1.35;
		color: var(--color-text);
	}

	.options {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.option {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		width: 100%;
		text-align: left;
		padding: 0.85rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
		background: var(--color-bg);
		color: var(--color-text);
		font-family: var(--font-body);
		font-size: 0.98rem;
		line-height: 1.45;
		cursor: pointer;
		transition:
			border-color 0.2s,
			background 0.2s,
			transform 0.15s,
			box-shadow 0.2s;
	}

	.option:hover:not(:disabled) {
		border-color: var(--color-accent);
		box-shadow: 0 2px 10px rgba(26, 107, 60, 0.12);
		transform: translateX(2px);
	}

	.option:active:not(:disabled) {
		transform: scale(0.99);
	}

	.option:disabled {
		cursor: default;
	}

	.option-letter {
		flex-shrink: 0;
		width: 1.65rem;
		height: 1.65rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		background: var(--color-accent-light);
		color: var(--color-accent);
		font-weight: 700;
		font-size: 0.82rem;
	}

	.option.correct {
		border-color: #1e8a4a;
		background: rgba(30, 138, 74, 0.12);
		box-shadow: 0 0 0 2px rgba(30, 138, 74, 0.25);
	}

	.option.correct .option-letter {
		background: #1e8a4a;
		color: #fff;
	}

	.option.wrong {
		border-color: #c0392b;
		background: rgba(192, 57, 43, 0.1);
		box-shadow: 0 0 0 2px rgba(192, 57, 43, 0.2);
	}

	.option.wrong .option-letter {
		background: #c0392b;
		color: #fff;
	}

	.option.dim:not(.correct):not(.wrong) {
		opacity: 0.45;
	}

	.result-card {
		text-align: center;
		padding: 2rem 1.5rem;
	}

	.result-score {
		font-family: var(--font-heading);
		font-size: 3rem;
		line-height: 1;
		margin: 0 0 0.75rem;
		color: var(--color-accent);
	}

	.result-heading {
		font-size: 1.25rem;
		margin: 0 0 1.75rem;
		color: var(--color-text);
		font-weight: 400;
		line-height: 1.4;
	}

	.result-actions {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-width: 360px;
		margin: 0 auto;
	}

	.btn {
		appearance: none;
		font-family: var(--font-body);
		font-size: 1rem;
		font-weight: 600;
		padding: 0.85rem 1.25rem;
		border-radius: var(--radius, 12px);
		border: none;
		cursor: pointer;
		transition: transform 0.12s, box-shadow 0.2s, opacity 0.2s;
	}

	.btn:active {
		transform: scale(0.98);
	}

	.btn-wa {
		background: #25d366;
		color: #fff;
	}

	.btn-wa:hover {
		box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
	}

	.btn-secondary {
		background: var(--color-card);
		color: var(--color-accent);
		border: 2px solid var(--color-accent);
	}

	.btn-secondary:hover {
		background: var(--color-accent-light);
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
