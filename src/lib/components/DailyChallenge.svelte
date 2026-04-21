<script>
	import { onMount } from 'svelte';

	const CHALLENGES = [
		{ emoji: '🍎', text: 'Escancia tu propia sidra (sin mojarte)', difficulty: '⭐' },
		{ emoji: '🧀', text: 'Prueba 3 quesos asturianos distintos', difficulty: '⭐⭐' },
		{ emoji: '🗣️', text: 'Dile "¿Qué hai, bañista?" a alguien', difficulty: '⭐' },
		{ emoji: '📸', text: 'Hazte una foto en la playa de San Lorenzo', difficulty: '⭐' },
		{ emoji: '🥩', text: 'Cómete un cachopo entero tú solo', difficulty: '⭐⭐⭐' },
		{ emoji: '🏔️', text: 'Sube al Cerro de Santa Catalina', difficulty: '⭐' },
		{ emoji: '🍺', text: 'Tómate 3 culines en 3 sidrerías distintas', difficulty: '⭐⭐' },
		{ emoji: '📖', text: 'Aprende 5 palabras en asturiano del diccionario', difficulty: '⭐' },
		{ emoji: '🎵', text: 'Escucha una canción en asturiano', difficulty: '⭐' },
		{ emoji: '🌧️', text: 'Sal sin paraguas y sobrevive', difficulty: '⭐⭐⭐' },
		{ emoji: '🐟', text: 'Come pescaíto frito mirando al mar', difficulty: '⭐' },
		{ emoji: '🏃', text: 'Camina por el Muro de San Lorenzo entero', difficulty: '⭐⭐' },
		{ emoji: '🧥', text: 'Lleva chubasquero aunque haga sol', difficulty: '⭐' },
		{ emoji: '🗺️', text: 'Visita un pueblo que no puedas pronunciar', difficulty: '⭐⭐' },
		{ emoji: '🎪', text: 'Pregunta a un local cuándo es la próxima fiesta', difficulty: '⭐' },
		{ emoji: '🍎', text: 'Visita un llagar de sidra', difficulty: '⭐⭐' },
		{ emoji: '☕', text: 'Pide un café sin mirar la guía del café', difficulty: '⭐⭐⭐' },
		{ emoji: '🎣', text: 'Ve al puerto pesquero antes de las 9', difficulty: '⭐⭐⭐' },
		{ emoji: '🧗', text: 'Haz una ruta de senderismo por los Picos', difficulty: '⭐⭐⭐' },
		{ emoji: '🏖️', text: 'Báñate en el mar (sí, aunque esté frío)', difficulty: '⭐⭐' },
		{ emoji: '🎭', text: 'Ve a ver algo al Teatro Jovellanos', difficulty: '⭐⭐' },
		{ emoji: '🧃', text: 'Prueba el zumo de manzana asturiano', difficulty: '⭐' },
		{ emoji: '📮', text: 'Manda una postal desde Asturias', difficulty: '⭐' },
		{ emoji: '🍰', text: 'Prueba un frisuelo o un carbayón', difficulty: '⭐' },
		{ emoji: '🚂', text: 'Viaja en el FEVE al menos una parada', difficulty: '⭐⭐' },
		{ emoji: '🎨', text: 'Visita el Museo del Pueblo de Asturias', difficulty: '⭐' },
		{ emoji: '🌅', text: 'Ve un atardecer desde el Cerro de Santa Catalina', difficulty: '⭐' },
		{ emoji: '🥘', text: 'Prueba la fabada en un sitio de verdad', difficulty: '⭐⭐' },
		{ emoji: '👑', text: 'Pasa por la estatua de Don Pelayo en Covadonga', difficulty: '⭐⭐⭐' },
		{ emoji: '🎶', text: 'Busca un chigre con música en directo', difficulty: '⭐⭐' }
	];

	const DAY_MS = 86400000;
	const dayIndex = Math.floor(Date.now() / DAY_MS) % CHALLENGES.length;
	const challenge = CHALLENGES[dayIndex];
	const storageKey = `puxa-daily-challenge-${dayIndex}`;

	let completed = $state(false);

	const dateLabel = new Date().toLocaleDateString('es-ES', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const dateLabelPretty =
		dateLabel.charAt(0).toUpperCase() + dateLabel.slice(1);

	onMount(() => {
		completed = localStorage.getItem(storageKey) === '1';
	});

	function toggleCompleted() {
		completed = !completed;
		if (completed) {
			localStorage.setItem(storageKey, '1');
		} else {
			localStorage.removeItem(storageKey);
		}
	}

	function shareChallenge() {
		const text = `🎯 Mi reto asturiano de hoy: ${challenge.text} ¿Te atreves? https://manriquegarcia.com`;
		const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
		window.open(url, '_blank', 'noopener,noreferrer');
	}
</script>

<section class="daily-challenge section-note" aria-labelledby="daily-challenge-heading">
	<header class="daily-challenge-header">
		<h2 id="daily-challenge-heading">🎯 Reto del día</h2>
		<p class="daily-challenge-date">{dateLabelPretty}</p>
	</header>

	<div class="daily-challenge-body">
		<div class="daily-challenge-emoji" aria-hidden="true">{challenge.emoji}</div>
		<p class="daily-challenge-text">{challenge.text}</p>
		<p class="daily-challenge-difficulty">
			<span class="visually-hidden">Dificultad:</span>
			{challenge.difficulty}
		</p>

		{#if completed}
			<p class="daily-challenge-celebration" role="status">
				<span class="daily-challenge-check" aria-hidden="true">✅</span>
				¡Tás fecho un asturianu!
				<span class="confetti" aria-hidden="true">🎉 ✨ 🍎</span>
			</p>
		{/if}
	</div>

	<div class="daily-challenge-actions">
		<button type="button" class="btn-daily primary" onclick={toggleCompleted}>
			{completed ? '↩️ Desmarcar' : '✅ ¡Completado!'}
		</button>
		<button type="button" class="btn-daily secondary" onclick={shareChallenge}>
			📱 Compartir reto
		</button>
	</div>
</section>

<style>
	.daily-challenge {
		margin: 2rem 0;
	}

	.daily-challenge-header {
		margin-bottom: 1rem;
	}

	.daily-challenge-header h2 {
		margin: 0 0 0.25rem;
		font-size: 1.2rem;
		color: var(--color-accent);
	}

	.daily-challenge-date {
		margin: 0;
		font-size: 0.88rem;
		color: var(--color-text-muted);
	}

	.daily-challenge-body {
		text-align: center;
	}

	.daily-challenge-emoji {
		font-size: 3.5rem;
		line-height: 1;
		margin-bottom: 0.75rem;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
	}

	.daily-challenge-text {
		margin: 0 0 0.5rem;
		font-size: 1.05rem;
		font-weight: 600;
		line-height: 1.4;
	}

	.daily-challenge-difficulty {
		margin: 0;
		font-size: 1rem;
		letter-spacing: 0.02em;
	}

	.daily-challenge-celebration {
		margin: 1rem 0 0;
		padding: 0.75rem 1rem;
		border-radius: var(--radius, 12px);
		background: color-mix(in srgb, #22c55e 12%, var(--color-card));
		border: 1px solid color-mix(in srgb, #22c55e 35%, transparent);
		font-weight: 600;
		color: var(--color-text);
		font-size: 0.98rem;
		line-height: 1.45;
	}

	.daily-challenge-check {
		margin-right: 0.35rem;
	}

	.confetti {
		display: inline-block;
		margin-left: 0.35rem;
	}

	.daily-challenge-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		justify-content: center;
		margin-top: 1.25rem;
	}

	.btn-daily {
		appearance: none;
		border-radius: 999px;
		padding: 0.55rem 1.1rem;
		font-size: 0.92rem;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		transition:
			background 0.2s,
			border-color 0.2s,
			transform 0.15s;
	}

	.btn-daily.primary {
		border: 2px solid var(--color-accent);
		background: var(--color-accent);
		color: #fff;
	}

	.btn-daily.primary:hover {
		filter: brightness(1.05);
	}

	.btn-daily.secondary {
		border: 2px solid var(--color-border);
		background: var(--color-card);
		color: var(--color-text);
	}

	.btn-daily.secondary:hover {
		border-color: var(--color-accent);
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
