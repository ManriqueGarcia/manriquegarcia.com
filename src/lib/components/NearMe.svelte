<script>
	let { places = [] } = $props();

	let userLocation = $state(/** @type {{ lat: number; lng: number } | null} */ (null));
	let loading = $state(false);
	let error = $state('');
	let expanded = $state(false);
	let sorted = $state(/** @type {Array<Record<string, unknown> & { name: string; lat: number; lng: number; distKm?: number }>} */ ([]));

	/** @param {number} lat1 @param {number} lon1 @param {number} lat2 @param {number} lon2 */
	function haversineKm(lat1, lon1, lat2, lon2) {
		const R = 6371;
		const toRad = (d) => (d * Math.PI) / 180;
		const dLat = toRad(lat2 - lat1);
		const dLon = toRad(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c;
	}

	function requestLocation() {
		if (!navigator.geolocation) {
			error = 'Tu navegador nun permite saber la to ubicación.';
			return;
		}
		loading = true;
		error = '';
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				loading = false;
				userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
				const withDist = places
					.filter((p) => typeof p.lat === 'number' && typeof p.lng === 'number')
					.map((p) => {
						const distKm = haversineKm(userLocation.lat, userLocation.lng, p.lat, p.lng);
						return { ...p, distKm };
					})
					.sort((a, b) => (a.distKm ?? 0) - (b.distKm ?? 0))
					.slice(0, 5);
				sorted = withDist;
				expanded = true;
			},
			(err) => {
				loading = false;
				if (err.code === 1) {
					error =
						'Nun pudimos usar la to ubicación: tienes la ubicación desactivada o denegada. Puedes activarla en la configuración del navegador si quies ver qué pueblinos quedan más cerca.';
				} else {
					error = 'Nun pudimos obtener la to posición. Prueba otra vez en un momentu.';
				}
			},
			{ enableHighAccuracy: false, timeout: 12000, maximumAge: 60000 }
		);
	}
</script>

<div class="near-me">
	<button
		type="button"
		class="near-me-trigger"
		onclick={requestLocation}
		disabled={loading}
		aria-expanded={expanded}
	>
		📍 Cerca de mí
		{#if loading}
			<span class="loading-hint">…</span>
		{/if}
	</button>

	{#if error}
		<p class="near-me-error" role="status">{error}</p>
	{/if}

	{#if userLocation && sorted.length > 0}
		<div class="near-me-panel">
			<button
				type="button"
				class="toggle-panel"
				onclick={() => (expanded = !expanded)}
				aria-expanded={expanded}
			>
				Los 5 pueblinos más cercanos {expanded ? '▼' : '▶'}
			</button>
			{#if expanded}
				<ul class="near-list">
					{#each sorted as p (p.name)}
						<li>
							<strong>{p.name}</strong>
							<span class="dist">{p.distKm != null ? ` · ${p.distKm.toFixed(1)} km` : ''}</span>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</div>

<style>
	.near-me {
		margin: 1rem 0 1.25rem;
	}

	.near-me-trigger {
		appearance: none;
		border: 1px solid var(--color-border);
		background: var(--color-card);
		color: var(--color-text);
		padding: 0.5rem 0.9rem;
		border-radius: 999px;
		font: inherit;
		font-size: 0.95rem;
		cursor: pointer;
		transition:
			background 0.15s ease,
			border-color 0.15s ease;
	}

	.near-me-trigger:hover:not(:disabled) {
		border-color: var(--color-accent);
	}

	.near-me-trigger:disabled {
		opacity: 0.7;
		cursor: wait;
	}

	.loading-hint {
		opacity: 0.7;
	}

	.near-me-error {
		margin: 0.5rem 0 0;
		font-size: 0.9rem;
		color: var(--color-text-muted);
		max-width: 42rem;
	}

	.near-me-panel {
		margin-top: 0.65rem;
		padding: 0.75rem 1rem;
		border-radius: var(--radius);
		background: var(--color-card);
		border: 1px solid var(--color-border);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	}

	.toggle-panel {
		appearance: none;
		border: none;
		background: transparent;
		color: var(--color-accent);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
		padding: 0;
		text-align: left;
	}

	.near-list {
		margin: 0.6rem 0 0;
		padding-left: 1.15rem;
		font-size: 0.92rem;
	}

	.near-list li {
		margin: 0.35rem 0;
	}

	.dist {
		color: var(--color-text-muted);
		font-weight: 400;
	}
</style>
