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

<div class="weather-widget" aria-live="polite">
	<div class="weather-head">
		<span class="weather-place">Xixón</span>
		{#if loading}
			<p class="weather-status">Cargando tiempu…</p>
		{:else if error}
			<p class="weather-status weather-err">{error}</p>
		{:else if current}
			<div class="weather-now">
				<span class="weather-emoji" aria-hidden="true">{weatherEmoji(current.code)}</span>
				<span class="weather-temp">{current.temp}°C</span>
			</div>
		{/if}
	</div>

	{#if !loading && !error && days.length > 0}
		<ul class="weather-days">
			{#each days as d (d.date)}
				<li class="weather-day">
					<span class="day-name">{d.label}</span>
					<span class="day-icon" aria-hidden="true">{weatherEmoji(d.code)}</span>
					<span class="day-temps"><span class="max">{d.max}°</span> / <span class="min">{d.min}°</span></span>
				</li>
			{/each}
		</ul>
	{/if}

	<p class="weather-foot">
		Datos de <a href="https://open-meteo.com/" rel="noopener noreferrer">Open-Meteo</a>
	</p>
</div>

<style>
	.weather-widget {
		background: var(--color-card, #fff);
		border: 1px solid var(--color-border, #e8e4de);
		border-radius: var(--radius, 12px);
		padding: 1rem 1.15rem;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
		max-width: 320px;
	}

	.weather-head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem 1rem;
		margin-bottom: 0.65rem;
	}

	.weather-place {
		font-family: var(--font-heading, Georgia, serif);
		font-weight: 700;
		font-size: 1rem;
		color: var(--color-accent, #1a6b3c);
	}

	.weather-status {
		margin: 0;
		font-size: 0.88rem;
		color: var(--color-text-muted, #6b6b6b);
	}

	.weather-err {
		color: #a33;
	}

	.weather-now {
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.weather-emoji {
		font-size: 1.75rem;
		line-height: 1;
	}

	.weather-temp {
		font-size: 1.35rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}

	.weather-days {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		border-top: 1px solid var(--color-border, #e8e4de);
		padding-top: 0.65rem;
	}

	.weather-day {
		display: grid;
		grid-template-columns: 1fr auto auto;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.82rem;
	}

	.day-name {
		color: var(--color-text, #2c2c2c);
		font-weight: 500;
	}

	.day-icon {
		font-size: 1.15rem;
		line-height: 1;
		text-align: center;
	}

	.day-temps {
		font-variant-numeric: tabular-nums;
		color: var(--color-text-muted, #6b6b6b);
		font-size: 0.8rem;
		white-space: nowrap;
	}

	.day-temps .max {
		color: var(--color-text, #2c2c2c);
		font-weight: 600;
	}

	.weather-foot {
		margin: 0.65rem 0 0;
		font-size: 0.72rem;
		color: var(--color-text-muted, #6b6b6b);
	}

	.weather-foot a {
		color: inherit;
		text-decoration: underline;
	}
</style>
