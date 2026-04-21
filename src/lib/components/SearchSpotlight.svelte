<script>
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let { open = $bindable(false) } = $props();

	/** @type {HTMLInputElement | undefined} */
	let inputEl = $state();
	let query = $state('');
	let selectedIndex = $state(0);
	let applePlatform = $state(true);

	const SEARCH_ENTRIES = [
		{ title: 'Inicio', path: '/', emoji: '🏠', category: 'Páginas' },
		{ title: 'Restaurantes y Sidrerías', path: '/restaurantes', emoji: '🍽️', category: 'Páginas' },
		{ title: 'Bares y Cafés', path: '/bares', emoji: '🍺', category: 'Páginas' },
		{ title: 'Qué visitar', path: '/visitar', emoji: '🏔️', category: 'Páginas' },
		{ title: 'Hoteles', path: '/hoteles', emoji: '🏨', category: 'Páginas' },
		{ title: 'Mapa', path: '/mapa', emoji: '🗺️', category: 'Páginas' },
		{ title: 'Diccionario asturiano', path: '/diccionario', emoji: '📖', category: 'Páginas' },
		{ title: 'Info práctica', path: '/practico', emoji: '🧳', category: 'Páginas' },
		{ title: 'Fiestas y calendario', path: '/fiestas', emoji: '🎉', category: 'Páginas' },
		{ title: 'FAQ', path: '/faq', emoji: '❓', category: 'Páginas' },
		{ title: 'Qué hacer hoy', path: '/hoy', emoji: '📍', category: 'Interactivo' },
		{ title: 'Rutas a pie', path: '/rutas', emoji: '🥾', category: 'Interactivo' },
		{ title: 'Plan random', path: '/plan', emoji: '🎲', category: 'Interactivo' },
		{ title: 'Quiz de Asturias', path: '/quiz', emoji: '🧠', category: 'Interactivo' },
		{ title: 'Contador de culines', path: '/culines', emoji: '🍺', category: 'Interactivo' },
		{ title: 'Calculadora de presupuesto', path: '/presupuesto', emoji: '💰', category: 'Interactivo' },
		{ title: 'Blog', path: '/blog', emoji: '📝', category: 'Blog' },
		{ title: 'Guía del cachopo', path: '/blog/cachopo', emoji: '🥩', category: 'Blog' },
		{ title: 'Guía de la sidra', path: '/blog/sidra', emoji: '🍎', category: 'Blog' },
		{ title: 'Descenso del Sella', path: '/blog/descenso-del-sella', emoji: '🛶', category: 'Blog' },
		{ title: 'Gijón vs Oviedo', path: '/blog/gijon-vs-oviedo', emoji: '⚔️', category: 'Blog' },
		{ title: 'Favoritos guardados', path: '/favoritos', emoji: '♥', category: 'Otros' },
		{ title: 'Guía PDF', path: '/guia', emoji: '📄', category: 'Otros' },
		{ title: 'English guide', path: '/en', emoji: '🇬🇧', category: 'Otros' },
		{
			title: 'Casa Trabanco',
			path: '/restaurantes',
			emoji: '🍽️',
			keywords: 'trabanco sidrería lagar',
			category: 'Restaurantes'
		},
		{
			title: 'El Sauco',
			path: '/restaurantes',
			emoji: '🍽️',
			keywords: 'sauco sidra pinchos',
			category: 'Restaurantes'
		},
		{
			title: 'Parrilla Antonio',
			path: '/restaurantes',
			emoji: '🍽️',
			keywords: 'parrilla antonio chorizo',
			category: 'Restaurantes'
		},
		{
			title: 'Playa de San Lorenzo',
			path: '/visitar',
			emoji: '🏖️',
			keywords: 'playa san lorenzo gijón',
			category: 'Lugares'
		},
		{
			title: 'Picos de Europa',
			path: '/visitar',
			emoji: '⛰️',
			keywords: 'picos europa montaña',
			category: 'Lugares'
		},
		{
			title: 'Cimadevilla',
			path: '/visitar',
			emoji: '🏘️',
			keywords: 'cimadevilla casco antiguo',
			category: 'Lugares'
		}
	];

	let queryLower = $derived(query.trim().toLowerCase());

	let filtered = $derived(
		SEARCH_ENTRIES.filter((e) => {
			const q = queryLower;
			if (!q) return true;
			const hay = `${e.title} ${e.keywords ?? ''}`.toLowerCase();
			return hay.includes(q);
		})
	);

	let visibleMatches = $derived(filtered.slice(0, 8));
	let moreCount = $derived(Math.max(0, filtered.length - 8));

	let shortcutLabel = $derived(applePlatform ? '⌘K' : 'Ctrl+K');

	$effect(() => {
		if (typeof navigator !== 'undefined') {
			applePlatform = /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent);
		}
	});

	$effect(() => {
		queryLower;
		selectedIndex = 0;
	});

	$effect(() => {
		const len = visibleMatches.length;
		if (len === 0) {
			selectedIndex = 0;
		} else if (selectedIndex >= len) {
			selectedIndex = len - 1;
		}
	});

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
			void tick().then(() => inputEl?.focus());
			return () => {
				document.body.style.overflow = '';
			};
		}
		document.body.style.overflow = '';
	});

	$effect(() => {
		if (!open) {
			query = '';
			selectedIndex = 0;
		}
	});

	/** @param {KeyboardEvent} e */
	function onWindowKeydown(e) {
		if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
			return;
		}
		if (!open) return;

		if (e.key === 'Escape') {
			e.preventDefault();
			open = false;
			return;
		}

		const n = visibleMatches.length;
		if (n === 0) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = (selectedIndex + 1) % n;
			return;
		}
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = (selectedIndex - 1 + n) % n;
			return;
		}
		if (e.key === 'Enter') {
			e.preventDefault();
			go(visibleMatches[selectedIndex]);
		}
	}

	function backdropClose() {
		open = false;
	}

	/** @param {MouseEvent} e */
	function onBackdropClick(e) {
		if (e.target === e.currentTarget) backdropClose();
	}

	/** @param {typeof SEARCH_ENTRIES[number]} entry */
	function go(entry) {
		if (!entry) return;
		open = false;
		goto(entry.path);
	}

	/** @param {number} i */
	function isNewCategory(i) {
		if (i === 0) return true;
		return visibleMatches[i].category !== visibleMatches[i - 1].category;
	}
</script>

<svelte:window onkeydown={onWindowKeydown} />

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="spotlight-backdrop"
		role="presentation"
		tabindex="-1"
		onclick={onBackdropClick}
		transition:fade={{ duration: 180 }}
		aria-hidden="false"
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="spotlight-modal"
			role="dialog"
			tabindex="-1"
			aria-modal="true"
			aria-labelledby="search-spotlight-title"
			onclick={(e) => e.stopPropagation()}
			transition:scale={{ duration: 220, easing: cubicOut, start: 0.96 }}
		>
			<h2 id="search-spotlight-title" class="visually-hidden">Buscar en la guía</h2>

			<div class="search-field">
				<span class="search-icon" aria-hidden="true">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="11" cy="11" r="8" />
						<path d="m21 21-4.3-4.3" />
					</svg>
				</span>
				<input
					bind:this={inputEl}
					type="search"
					class="search-input"
					placeholder="Buscar en la guía..."
					autocomplete="off"
					spellcheck="false"
					aria-autocomplete="list"
					aria-controls="search-spotlight-results"
					bind:value={query}
				/>
				<span class="kbd-hint" aria-hidden="true"><kbd>{shortcutLabel}</kbd></span>
			</div>

			<div id="search-spotlight-results" class="results-wrap" role="listbox" aria-label="Resultados">
				{#if visibleMatches.length === 0}
					<p class="empty">Nun hai resultaos pa esti criteriu.</p>
				{:else}
					<ul class="results-list">
						{#each visibleMatches as entry, i (entry.title + entry.path + i)}
							{#if isNewCategory(i)}
								<li class="category-heading" role="presentation">{entry.category}</li>
							{/if}
							<li class="result-item" role="presentation">
								<button
									type="button"
									role="option"
									id="spotlight-opt-{i}"
									class="result-btn"
									class:selected={i === selectedIndex}
									aria-selected={i === selectedIndex}
									onclick={() => go(entry)}
									onmouseenter={() => (selectedIndex = i)}
								>
									<span class="result-emoji" aria-hidden="true">{entry.emoji}</span>
									<span class="result-main">
										<span class="result-title">{entry.title}</span>
										<span class="result-cat">{entry.category}</span>
									</span>
								</button>
							</li>
						{/each}
					</ul>
					{#if moreCount > 0}
						<p class="more-hint">{moreCount} más resultaos…</p>
					{/if}
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
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

	.spotlight-backdrop {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: 10vh 1rem 2rem;
		background: rgba(10, 12, 22, 0.55);
		backdrop-filter: blur(4px);
	}

	.spotlight-modal {
		width: min(560px, 100%);
		background: var(--color-card);
		color: var(--color-text);
		border-radius: var(--radius, 12px);
		border: 1px solid var(--color-border);
		box-shadow:
			0 24px 80px rgba(0, 0, 0, 0.28),
			0 0 0 1px rgba(255, 255, 255, 0.04) inset;
		overflow: hidden;
		transform-origin: top center;
	}

	.search-field {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.85rem 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.search-icon {
		display: flex;
		color: var(--color-text-muted);
		opacity: 0.72;
		flex-shrink: 0;
	}

	.search-input {
		flex: 1;
		min-width: 0;
		border: none;
		background: transparent;
		font: inherit;
		font-size: 1.1rem;
		color: var(--color-text);
		outline: none;
	}

	.search-input::placeholder {
		color: var(--color-text-muted);
		opacity: 0.75;
	}

	.kbd-hint {
		flex-shrink: 0;
	}

	.kbd-hint kbd {
		display: inline-block;
		padding: 0.2rem 0.45rem;
		font-size: 0.7rem;
		font-family: inherit;
		line-height: 1.2;
		color: var(--color-text-muted);
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 6px;
		box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
	}

	.results-wrap {
		max-height: 400px;
		overflow-y: auto;
		padding: 0.25rem 0 0.5rem;
	}

	.empty {
		padding: 1.25rem 1rem;
		text-align: center;
		font-size: 0.95rem;
		color: var(--color-text-muted);
	}

	.results-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.category-heading {
		padding: 0.65rem 1rem 0.35rem;
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		list-style: none;
	}

	.result-item {
		list-style: none;
	}

	.result-btn {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		width: 100%;
		padding: 0.55rem 1rem;
		border: none;
		background: transparent;
		font: inherit;
		text-align: left;
		cursor: pointer;
		color: inherit;
		border-radius: 0;
		transition: background 0.15s ease;
	}

	.result-btn:hover,
	.result-btn.selected {
		background: var(--color-accent-light);
	}

	.result-btn.selected .result-title {
		color: var(--color-accent);
	}

	.result-emoji {
		font-size: 1.15rem;
		line-height: 1;
		width: 1.5rem;
		text-align: center;
		flex-shrink: 0;
	}

	.result-main {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		min-width: 0;
	}

	.result-title {
		font-size: 0.95rem;
		font-weight: 600;
		line-height: 1.3;
		transition: color 0.15s ease;
	}

	.result-cat {
		font-size: 0.72rem;
		color: var(--color-text-muted);
		opacity: 0.9;
	}

	.more-hint {
		padding: 0.5rem 1rem 0.85rem;
		margin: 0;
		font-size: 0.8rem;
		color: var(--color-text-muted);
		text-align: center;
		border-top: 1px solid var(--color-border);
	}
</style>
