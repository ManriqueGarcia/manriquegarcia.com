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

<div class="weather-bar" aria-live="polite">
	{#if loading}
		<p class="weather-status">Cargando tiempu…</p>
	{:else if error}
		<p class="weather-status weather-err">{error}</p>
	{:else}
		<div class="weather-current">
			<span class="weather-label">Xixón ahora</span>
			{#if current}
				<span class="weather-emoji" aria-hidden="true">{weatherEmoji(current.code)}</span>
				<span class="weather-temp">{current.temp}°C</span>
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
