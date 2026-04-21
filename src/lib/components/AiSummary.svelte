<script>
	const API = 'https://8u1htcpsr1.execute-api.eu-west-1.amazonaws.com/chat';

	let { pageTitle = '', pageContent = '' } = $props();

	let summary = $state('');
	let loading = $state(false);
	let shown = $state(false);

	async function generateSummary() {
		if (summary) {
			shown = !shown;
			return;
		}
		loading = true;
		try {
			const res = await fetch(API, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message: `Resume en exactamente 3 frases cortas y útiles el contenido de la página "${pageTitle}" de la guía de Asturias. Contexto: ${pageContent}. Sé directo y práctico.`,
					history: []
				})
			});
			const data = await res.json();
			summary =
				typeof data?.reply === 'string' ? data.reply : 'Nun pude generar el resumen.';
			shown = true;
		} catch {
			summary = 'Nun pude generar el resumen.';
			shown = true;
		} finally {
			loading = false;
		}
	}
</script>

<div class="ai-summary-wrap">
	<button
		type="button"
		class="ai-summary-btn"
		onclick={generateSummary}
		disabled={loading}
	>
		{loading ? '⏳ Generando...' : shown ? '📝 Ocultar resumen' : '🤖 TL;DR — Resumen rápido'}
	</button>
	{#if shown && summary}
		<div class="ai-summary-box">
			<p>{summary}</p>
		</div>
	{/if}
</div>

<style>
	.ai-summary-wrap {
		margin: 1rem 0 1.5rem;
	}

	.ai-summary-btn {
		appearance: none;
		font-family: var(--font-body);
		font-size: 0.95rem;
		font-weight: 600;
		padding: 0.65rem 1rem;
		border-radius: var(--radius, 12px);
		border: 1px solid var(--color-border);
		background: var(--color-card);
		color: var(--color-text);
		cursor: pointer;
		transition:
			background 0.2s,
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.ai-summary-btn:hover:not(:disabled) {
		border-color: var(--color-accent);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	}

	.ai-summary-btn:disabled {
		opacity: 0.7;
		cursor: wait;
	}

	.ai-summary-box {
		margin-top: 0.75rem;
		padding: 1rem 1.15rem;
		background: color-mix(in srgb, var(--color-card) 96%, var(--color-accent) 4%);
		border: 1px solid var(--color-border);
		border-left: 4px solid var(--color-accent);
		border-radius: var(--radius, 12px);
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--color-text);
	}

	.ai-summary-box p {
		margin: 0;
	}
</style>
