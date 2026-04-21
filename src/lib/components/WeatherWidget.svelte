<script>
	const API =
		'https://api.open-meteo.com/v1/forecast?latitude=43.5322&longitude=-5.6611&current=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe%2FMadrid&forecast_days=3';

	/** @param {unknown} code */
	function weatherEmoji(code) {
		const c = Number(code);
		if (c === 0) return '☀️';
		if (c >= 1 && c <= 3) return '⛅';
		if (c >= 45 && c <= 48) return '🌫️';
		if (c >= 51 && c <= 67) return '🌧️';
		if (c >= 71 && c <= 77) return '❄️';
		if (c >= 80 && c <= 82) return '🌦️';
		if (c >= 95 && c <= 99) return '⛈️';
		return '⛅';
	}

	/** CSS-only background animation class from WMO weathercode (current). */
	/** @param {number} code */
	function weatherAnimClass(code) {
		if (code >= 71 && code <= 77) return 'weather-snow';
		if (
			(code >= 51 && code <= 67) ||
			(code >= 80 && code <= 82) ||
			(code >= 95 && code <= 99)
		) {
			return 'weather-rain';
		}
		if (code >= 0 && code <= 1) return 'weather-sun';
		if ((code >= 2 && code <= 3) || (code >= 45 && code <= 48)) return 'weather-cloud';
		return '';
	}

	let animClass = $derived.by(() => {
		if (loading || error || !current) return '';
		return weatherAnimClass(current.code);
	});

	let loading = $state(true);
	/** @type {string | null} */
	let error = $state(null);
	/** @type {{ temp: number; code: number } | null} */
	let current = $state(null);
	/** @type {{ date: string; label: string; max: number; min: number; code: number }[]} */
	let days = $state([]);

	$effect(() => {
		let cancelled = false;
		loading = true;
		error = null;

		(async () => {
			try {
				const res = await fetch(API);
				if (!res.ok) throw new Error('bad response');
				const data = await res.json();
				if (cancelled) return;

				const cur = data?.current;
				const daily = data?.daily;
				if (!cur || !daily?.time?.length) throw new Error('invalid data');

				current = {
					temp: Math.round(Number(cur.temperature_2m)),
					code: Number(cur.weathercode),
				};

				const n = Math.min(3, daily.time.length);
				const out = [];
				for (let i = 0; i < n; i++) {
					const iso = String(daily.time[i]);
					const d = new Date(iso);
					const label = d.toLocaleDateString('es-ES', { weekday: 'short' });
					out.push({
						date: iso,
						label: label.charAt(0).toUpperCase() + label.slice(1),
						max: Math.round(Number(daily.temperature_2m_max[i])),
						min: Math.round(Number(daily.temperature_2m_min[i])),
						code: Number(daily.weathercode[i]),
					});
				}
				days = out;
			} catch {
				if (!cancelled) {
					error = 'Nun pudo cargar el tiempu. Prueba recargar.';
					current = null;
					days = [];
				}
			} finally {
				if (!cancelled) loading = false;
			}
		})();

		return () => {
			cancelled = true;
		};
	});
</script>

<div class="weather-bar" class:weather-rain={animClass === 'weather-rain'} class:weather-sun={animClass === 'weather-sun'} class:weather-cloud={animClass === 'weather-cloud'} class:weather-snow={animClass === 'weather-snow'} aria-live="polite">
	{#if loading}
		<p class="weather-status">Cargando tiempu…</p>
	{:else if error}
		<p class="weather-status weather-err">{error}</p>
	{:else}
		<div class="weather-current">
			<span class="weather-label">Xixón ahora</span>
			{#if current}
				<span class="weather-emoji" aria-hidden="true">{weatherEmoji(current.code)}</span>
				<span class="weather-temp-wrap">
					<span class="weather-temp">{current.temp}°C</span>
				</span>
			{/if}
		</div>
		{#if days.length > 0}
			<span class="weather-sep" aria-hidden="true"></span>
			{#each days as d (d.date)}
				<div class="weather-day">
					<span class="day-name">{d.label}</span>
					<span class="day-icon" aria-hidden="true">{weatherEmoji(d.code)}</span>
					<span class="day-temps">{d.max}° / {d.min}°</span>
				</div>
			{/each}
		{/if}
	{/if}
</div>

<style>
	.weather-bar {
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		background: var(--color-accent-light, #e8f5ed);
		border: 1px solid rgba(26, 107, 60, 0.15);
		border-radius: var(--radius, 12px);
		padding: 0.6rem 1.1rem;
		font-size: 0.85rem;
	}

	/* Rain */
	.weather-bar.weather-rain::after {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			transparent,
			transparent 4px,
			rgba(100, 150, 255, 0.12) 4px,
			rgba(100, 150, 255, 0.12) 5px
		);
		background-size: 10px 20px;
		animation: weather-rain-fall 0.8s linear infinite;
		pointer-events: none;
		border-radius: inherit;
	}

	@keyframes weather-rain-fall {
		to {
			background-position: 0 20px;
		}
	}

	/* Sun rays around temperature */
	.weather-temp-wrap {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.15rem 0.35rem;
	}

	.weather-bar.weather-sun .weather-temp-wrap::before {
		content: '';
		position: absolute;
		inset: -4px;
		border-radius: 50%;
		background: repeating-conic-gradient(
			from 0deg,
			transparent 0deg 14deg,
			rgba(255, 200, 80, 0.22) 14deg 16deg
		);
		animation: weather-sun-spin 24s linear infinite;
		pointer-events: none;
		z-index: 0;
		mask: radial-gradient(circle, transparent 55%, #000 56%);
		-webkit-mask: radial-gradient(circle, transparent 55%, #000 56%);
	}

	.weather-bar.weather-sun .weather-temp {
		position: relative;
		z-index: 1;
	}

	@keyframes weather-sun-spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Clouds */
	.weather-bar.weather-cloud::before,
	.weather-bar.weather-cloud::after {
		content: '';
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.45);
		pointer-events: none;
		filter: blur(0.5px);
	}

	.weather-bar.weather-cloud::before {
		width: 48px;
		height: 22px;
		left: -8%;
		top: 35%;
		animation: weather-cloud-drift 18s ease-in-out infinite;
		box-shadow: 22px 4px 0 -4px rgba(255, 255, 255, 0.35);
	}

	.weather-bar.weather-cloud::after {
		width: 38px;
		height: 18px;
		right: -6%;
		top: 40%;
		animation: weather-cloud-drift 22s ease-in-out infinite reverse;
		opacity: 0.75;
	}

	@keyframes weather-cloud-drift {
		0%,
		100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(12px);
		}
	}

	/* Snow */
	.weather-bar.weather-snow::after {
		content: '';
		position: absolute;
		inset: 0;
		background-image: radial-gradient(circle at 20% 10%, rgba(255, 255, 255, 0.55) 0 1px, transparent 2px),
			radial-gradient(circle at 55% 30%, rgba(255, 255, 255, 0.45) 0 1px, transparent 2px),
			radial-gradient(circle at 80% 55%, rgba(255, 255, 255, 0.5) 0 1px, transparent 2px),
			radial-gradient(circle at 35% 70%, rgba(255, 255, 255, 0.4) 0 1px, transparent 2px);
		background-size: 100% 100%;
		animation: weather-snow-fall 2.2s linear infinite;
		pointer-events: none;
		border-radius: inherit;
		opacity: 0.85;
	}

	@keyframes weather-snow-fall {
		0% {
			background-position: 0 0, 4px 6px, -3px 4px, 2px -2px;
		}
		100% {
			background-position: 0 14px, 4px 20px, -3px 18px, 2px 12px;
		}
	}

	.weather-bar > * {
		position: relative;
		z-index: 1;
	}

	.weather-status {
		margin: 0;
		color: var(--color-text-muted, #6b6b6b);
	}

	.weather-err {
		color: #a33;
	}

	.weather-current {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		font-weight: 600;
	}

	.weather-label {
		color: var(--color-accent, #1a6b3c);
		margin-right: 0.15rem;
	}

	.weather-emoji {
		font-size: 1.25rem;
		line-height: 1;
	}

	.weather-temp {
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}

	.weather-sep {
		width: 1px;
		height: 1.2rem;
		background: var(--color-border, #e8e4de);
	}

	.weather-day {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.day-name {
		font-weight: 500;
		color: var(--color-text, #2c2c2c);
	}

	.day-icon {
		font-size: 1rem;
		line-height: 1;
	}

	.day-temps {
		font-variant-numeric: tabular-nums;
		color: var(--color-text-muted, #6b6b6b);
		font-size: 0.8rem;
		white-space: nowrap;
	}
</style>
