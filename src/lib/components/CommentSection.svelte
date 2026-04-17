<script>
	const API = 'https://8u1htcpsr1.execute-api.eu-west-1.amazonaws.com/comments';

	let {
		title = '💬 Comentarios — ¿qué te pareció?',
		placeholder = 'Escribe tu comentario aquí…',
		page,
	} = $props();

	let comments = $state([]);
	let loading = $state(false);
	let name = $state('');
	let comment = $state('');
	let submitting = $state(false);
	let statusMsg = $state('');
	let statusError = $state(false);

	const fieldId = $derived(`comments-${String(page ?? '').replace(/[^a-zA-Z0-9_-]/g, '-')}`);

	$effect(() => {
		page;
		statusMsg = '';
		statusError = false;
	});

	/** @param {unknown} text */
	function escapeHtml(text) {
		return String(text ?? '')
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replaceAll('"', '&quot;')
			.replaceAll("'", '&#039;');
	}

	/** @param {unknown} c */
	function commentAuthor(c) {
		if (!c || typeof c !== 'object') return 'Anónimu';
		const o = /** @type {Record<string, unknown>} */ (c);
		const v = o.name ?? o.author ?? o.authorName;
		return typeof v === 'string' ? v : 'Anónimu';
	}

	/** @param {unknown} c */
	function commentBody(c) {
		if (!c || typeof c !== 'object') return '';
		const o = /** @type {Record<string, unknown>} */ (c);
		const v = o.comment ?? o.text ?? o.body;
		return typeof v === 'string' ? v : '';
	}

	/** @param {unknown} c */
	function commentDate(c) {
		if (!c || typeof c !== 'object') return '';
		const o = /** @type {Record<string, unknown>} */ (c);
		const v = o.createdAt ?? o.timestamp ?? o.date ?? o.isoDate;
		return typeof v === 'string' || typeof v === 'number' ? String(v) : '';
	}

	/** @param {string | number} raw */
	function relativeTime(raw) {
		const t = new Date(raw).getTime();
		if (Number.isNaN(t)) return '';
		const diffMs = Date.now() - t;
		const sec = Math.floor(diffMs / 1000);
		if (sec < 60) return 'ahora mismo';
		const min = Math.floor(sec / 60);
		if (min < 60) return `${min} min`;
		const h = Math.floor(min / 60);
		if (h < 24) return `${h} h`;
		return new Date(t).toLocaleDateString('es-ES', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		});
	}

	async function loadComments() {
		loading = true;
		statusError = false;
		try {
			const res = await fetch(`${API}?page=${encodeURIComponent(String(page ?? ''))}`);
			if (!res.ok) throw new Error('bad response');
			const data = await res.json();
			const list = Array.isArray(data) ? data : data.comments ?? data.items ?? [];
			comments = Array.isArray(list) ? list : [];
		} catch {
			comments = [];
			statusError = true;
			statusMsg = 'Nun pudo cargar los comentarios.';
		} finally {
			loading = false;
		}
	}

	/** @param {ToggleEvent & { currentTarget: HTMLDetailsElement }} e */
	function onDetailsToggle(e) {
		if (e.currentTarget.open) {
			void loadComments();
		}
	}

	/** @param {SubmitEvent} e */
	async function onSubmit(e) {
		e.preventDefault();
		submitting = true;
		statusMsg = '';
		statusError = false;
		try {
			const res = await fetch(API, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					page: String(page ?? ''),
					name: name.trim(),
					comment: comment.trim(),
				}),
			});
			if (!res.ok) throw new Error('bad response');
			name = '';
			comment = '';
			statusMsg = '¡Comentario enviáu! Gracies, oh.';
			await loadComments();
		} catch {
			statusError = true;
			statusMsg = 'Nun se pudo unviar. Prueba otra vuelta.';
		} finally {
			submitting = false;
		}
	}
</script>

<section class="comment-section" aria-label="Comentarios">
	<details class="comment-details" ontoggle={onDetailsToggle}>
		<summary class="comment-summary">{title}</summary>

		<div class="comment-panel">
			{#if loading}
				<p class="comment-hint">Cargando comentarios…</p>
			{:else if comments.length === 0}
				<p class="comment-empty">Aún no hay comentarios. ¡Sé el primeru, bañista!</p>
			{:else}
				<ul class="comment-list">
					{#each comments as c}
						<li class="comment-item">
							<div class="comment-meta">
								<strong>{@html escapeHtml(commentAuthor(c))}</strong>
								<span class="comment-time">{relativeTime(commentDate(c))}</span>
							</div>
							<p class="comment-body">
								{@html escapeHtml(commentBody(c)).replaceAll('\n', '<br />')}
							</p>
						</li>
					{/each}
				</ul>
			{/if}

			{#if statusMsg}
				<p class="comment-status" class:error={statusError} role="status">{statusMsg}</p>
			{/if}

			<form class="comment-form" onsubmit={onSubmit}>
				<label class="sr-only" for={`${fieldId}-name`}>Nome</label>
				<input
					id={`${fieldId}-name`}
					class="comment-input"
					type="text"
					autocomplete="nickname"
					placeholder="El to nome (opcional)"
					bind:value={name}
				/>
				<label class="sr-only" for={`${fieldId}-body`}>Comentariu</label>
				<textarea
					id={`${fieldId}-body`}
					class="comment-textarea"
					rows="4"
					required
					{placeholder}
					bind:value={comment}
				></textarea>
				<button class="comment-submit" type="submit" disabled={submitting}>
					{submitting ? 'Unviando…' : 'Unviar comentariu'}
				</button>
			</form>
		</div>
	</details>
</section>

<style>
	.comment-section {
		margin: 2rem 0;
	}

	.comment-details {
		border: 1px solid var(--color-border, #e8e4de);
		border-radius: var(--radius, 12px);
		background: var(--color-card, #fff);
		overflow: hidden;
	}

	.comment-summary {
		cursor: pointer;
		list-style: none;
		padding: 1rem 1.25rem;
		font-weight: 600;
		font-size: 1rem;
		color: var(--color-text, #2c2c2c);
		user-select: none;
	}

	.comment-summary::-webkit-details-marker {
		display: none;
	}

	.comment-summary::before {
		content: '▸ ';
		color: var(--color-accent, #1a6b3c);
	}

	.comment-details[open] > .comment-summary::before {
		content: '▾ ';
	}

	.comment-panel {
		padding: 0 1.25rem 1.25rem;
		border-top: 1px solid var(--color-border, #e8e4de);
	}

	.comment-hint,
	.comment-empty {
		font-size: 0.92rem;
		color: var(--color-text-muted, #6b6b6b);
		margin: 1rem 0;
	}

	.comment-list {
		list-style: none;
		padding: 0;
		margin: 0 0 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.comment-item {
		border: 1px solid var(--color-border, #e8e4de);
		border-radius: 10px;
		padding: 0.85rem 1rem;
		background: #fdfcfa;
	}

	.comment-meta {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
		margin-bottom: 0.35rem;
		font-size: 0.88rem;
	}

	.comment-time {
		color: var(--color-text-muted, #6b6b6b);
		font-size: 0.8rem;
		white-space: nowrap;
	}

	.comment-body {
		margin: 0;
		font-size: 0.92rem;
		line-height: 1.55;
		color: var(--color-text, #2c2c2c);
	}

	.comment-status {
		font-size: 0.88rem;
		margin: 0.75rem 0;
		color: var(--color-accent, #1a6b3c);
	}

	.comment-status.error {
		color: #a33;
	}

	.comment-form {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		margin-top: 0.5rem;
	}

	.comment-input,
	.comment-textarea {
		width: 100%;
		border: 1px solid var(--color-border, #e8e4de);
		border-radius: 8px;
		padding: 0.55rem 0.75rem;
		font: inherit;
		background: #fff;
	}

	.comment-textarea {
		resize: vertical;
		min-height: 100px;
	}

	.comment-submit {
		align-self: flex-start;
		background: var(--color-accent, #1a6b3c);
		color: #fff;
		border: none;
		border-radius: 8px;
		padding: 0.55rem 1.15rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}

	.comment-submit:hover:not(:disabled) {
		background: var(--color-accent-hover, #145530);
	}

	.comment-submit:disabled {
		opacity: 0.65;
		cursor: not-allowed;
	}

	.sr-only {
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
