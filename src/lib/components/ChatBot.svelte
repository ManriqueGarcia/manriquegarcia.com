<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const API = 'https://8u1htcpsr1.execute-api.eu-west-1.amazonaws.com/chat';

	const WELCOME_TEXT =
		'¡Hola, bañista! 🍎 Soy el concierge de Puxa Asturies. Pregúntame lo que quieras sobre Asturias: dónde comer, qué visitar, sidra, fiestas... ¡too lo que necesites!';

	const SUGGESTIONS = [
		'¿Dónde como bien de sidra?',
		'Plan para hoy',
		'¿Qué visito en 2 días?',
		'Recomiéndame un restaurante'
	];

	let open = $state(false);
	let messages = $state([{ role: 'assistant', text: WELCOME_TEXT }]);
	let input = $state('');
	let loading = $state(false);
	let hasSeenPulse = $state(browser && !!localStorage.getItem('puxa-chat-seen'));

	/** @type {HTMLDivElement | undefined} */
	let messagesEl = $state(undefined);

	function escapeHtml(s) {
		return s
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	}

	/** @param {string} text */
	function formatAssistantText(text) {
		let s = escapeHtml(text);
		s = s.replace(/\r\n/g, '\n');
		s = s.replace(/\n/g, '<br>');
		s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
		s = s.replace(/\*([^*]+?)\*/g, '<em>$1</em>');
		return s;
	}

	/** @param {string} text */
	function formatUserText(text) {
		return escapeHtml(text).replace(/\n/g, '<br>');
	}

	let showSuggestions = $derived(
		messages.length === 1 && messages[0].role === 'assistant' && !loading
	);

	onMount(() => {
		if (!browser) return;
		if (localStorage.getItem('puxa-chat-seen')) return;
		const t = setTimeout(() => {
			localStorage.setItem('puxa-chat-seen', '1');
			hasSeenPulse = true;
		}, 10000);
		return () => clearTimeout(t);
	});

	$effect(() => {
		void messages;
		void loading;
		queueMicrotask(() => {
			if (messagesEl) {
				messagesEl.scrollTop = messagesEl.scrollHeight;
			}
		});
	});

	function toggleOpen() {
		open = !open;
	}

	function closePanel() {
		open = false;
	}

	async function sendMessage() {
		if (!input.trim() || loading) return;
		const userMsg = input.trim();
		input = '';
		messages = [...messages, { role: 'user', text: userMsg }];
		loading = true;

		try {
			const history = messages.slice(0, -1).map((m) => ({ role: m.role, text: m.text }));
			const res = await fetch(API, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: userMsg, history })
			});
			const data = await res.json();
			const reply =
				typeof data?.reply === 'string'
					? data.reply
					: 'Perdona, nun recibí una respuesta clara. Prueba otra vuelta.';
			messages = [...messages, { role: 'assistant', text: reply }];
		} catch {
			messages = [
				...messages,
				{
					role: 'assistant',
					text: 'Perdona, el concierge está echando un culín. Prueba otra vuelta.'
				}
			];
		} finally {
			loading = false;
		}
	}

	/** @param {string} text */
	async function sendSuggestion(text) {
		if (loading) return;
		input = text;
		await sendMessage();
	}

	/** @param {KeyboardEvent} e */
	function onInputKeydown(e) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}
</script>

<button
	type="button"
	class="chat-fab"
	class:chat-fab-pulse={browser && !hasSeenPulse}
	class:chat-fab-open={open}
	aria-label={open ? 'Cerrar chat del concierge' : 'Abrir chat del concierge'}
	onclick={toggleOpen}
>
	{#if open}
		<span class="chat-fab-icon" aria-hidden="true">✕</span>
	{:else}
		<svg class="chat-fab-icon" width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" fill="none">
			<path
				d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
				stroke="currentColor"
				stroke-width="1.75"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	{/if}
</button>

{#if open}
	<div class="chat-panel" role="dialog" aria-modal="true" aria-labelledby="chatbot-title">
		<div class="chat-header">
			<div class="chat-header-text">
				<h2 id="chatbot-title" class="chat-title">🍎 Concierge Asturianu</h2>
				<p class="chat-subtitle">Pregúntame lo que quieras</p>
			</div>
			<button type="button" class="chat-close" onclick={closePanel} aria-label="Cerrar chat">✕</button>
		</div>

		<div
			class="chat-messages"
			bind:this={messagesEl}
			role="log"
			aria-live="polite"
			aria-relevant="additions"
		>
			{#each messages as m, i (`${m.role}-${i}-${m.text.slice(0, 48)}`)}
				<div class="chat-row" class:chat-row-user={m.role === 'user'}>
					<div
						class="chat-bubble"
						class:chat-bubble-user={m.role === 'user'}
						class:chat-bubble-assistant={m.role === 'assistant'}
					>
						{#if m.role === 'assistant'}
							{@html formatAssistantText(m.text)}
						{:else}
							{@html formatUserText(m.text)}
						{/if}
					</div>
				</div>
			{/each}

			{#if showSuggestions}
				<div class="chat-suggestions" aria-label="Sugerencies rápides">
					{#each SUGGESTIONS as s (s)}
						<button type="button" class="chat-suggestion" onclick={() => sendSuggestion(s)}>
							{s}
						</button>
					{/each}
				</div>
			{/if}

			{#if loading}
				<div class="chat-row">
					<div class="chat-bubble chat-bubble-assistant chat-loading-skeleton" aria-hidden="true">
						<div class="chat-skeleton">
							<div class="skeleton-line" style="width: 85%"></div>
							<div class="skeleton-line" style="width: 65%"></div>
							<div class="skeleton-line" style="width: 75%"></div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<div class="chat-input-row">
			<input
				class="chat-input"
				type="text"
				placeholder="Escribe tu pregunta..."
				bind:value={input}
				disabled={loading}
				onkeydown={onInputKeydown}
				aria-label="Escribe tu pregunta"
			/>
			<button
				type="button"
				class="chat-send"
				disabled={loading || !input.trim()}
				onclick={sendMessage}
				aria-label="Enviar mensaxe"
			>
				<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
					<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
				</svg>
			</button>
		</div>
	</div>
{/if}

<style>
	.chat-fab {
		position: fixed;
		bottom: 5rem;
		right: 2rem;
		z-index: 95;
		width: 56px;
		height: 56px;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		border-radius: 50%;
		background: var(--color-accent);
		color: #fff;
		cursor: pointer;
		box-shadow: 0 4px 18px rgba(0, 0, 0, 0.2);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.chat-fab:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 22px rgba(0, 0, 0, 0.24);
	}

	.chat-fab:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 3px;
	}

	.chat-fab-pulse {
		animation: chat-pulse 2s ease-in-out 5;
	}

	@keyframes chat-pulse {
		0%,
		100% {
			box-shadow: 0 0 0 0 rgba(26, 107, 60, 0.4);
		}
		50% {
			box-shadow: 0 0 0 12px rgba(26, 107, 60, 0);
		}
	}

	.chat-fab-icon {
		display: block;
		line-height: 1;
	}

	.chat-panel {
		position: fixed;
		bottom: 7rem;
		right: 2rem;
		z-index: 95;
		width: 380px;
		max-height: 500px;
		display: flex;
		flex-direction: column;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
		overflow: hidden;
		animation: chat-panel-in 0.38s cubic-bezier(0.22, 1, 0.36, 1) forwards;
	}

	:global([data-theme='dark']) .chat-panel {
		background: rgba(34, 34, 58, 0.85);
		border-color: rgba(255, 255, 255, 0.08);
	}

	@keyframes chat-panel-in {
		from {
			opacity: 0;
			transform: translateY(14px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.chat-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.9rem 1rem;
		background: var(--color-hero-bg);
		color: var(--color-hero-text, #f5f0e8);
		border-radius: 16px 16px 0 0;
	}

	.chat-header-text {
		min-width: 0;
	}

	.chat-title {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 700;
		line-height: 1.25;
	}

	.chat-subtitle {
		margin: 0.2rem 0 0;
		font-size: 0.82rem;
		opacity: 0.88;
	}

	.chat-close {
		flex-shrink: 0;
		appearance: none;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.12);
		color: inherit;
		font-size: 1.1rem;
		line-height: 1;
		cursor: pointer;
		transition: background 0.2s;
	}

	.chat-close:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.chat-messages {
		flex: 1 1 auto;
		min-height: 0;
		overflow-y: auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.chat-row {
		display: flex;
		justify-content: flex-start;
	}

	.chat-row-user {
		justify-content: flex-end;
	}

	.chat-bubble {
		max-width: 88%;
		padding: 0.55rem 0.75rem;
		border-radius: 14px;
		font-size: 0.92rem;
		line-height: 1.45;
		word-wrap: break-word;
	}

	.chat-bubble :global(strong) {
		font-weight: 700;
	}

	.chat-bubble :global(em) {
		font-style: italic;
	}

	.chat-bubble-user {
		background: var(--color-accent);
		color: #fff;
		border-bottom-right-radius: 4px;
	}

	.chat-bubble-assistant {
		background: color-mix(in srgb, var(--color-card) 88%, var(--color-border));
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-bottom-left-radius: 4px;
	}

	:global([data-theme='dark']) .chat-bubble-assistant {
		background: color-mix(in srgb, var(--color-card) 75%, #000 8%);
	}

	.chat-suggestions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-top: 0.15rem;
		padding-top: 0.35rem;
	}

	.chat-suggestion {
		appearance: none;
		padding: 0.35rem 0.65rem;
		font-size: 0.78rem;
		font-family: inherit;
		line-height: 1.3;
		border-radius: 999px;
		border: 1px solid var(--color-border);
		background: color-mix(in srgb, var(--color-accent) 12%, transparent);
		color: var(--color-text);
		cursor: pointer;
		transition:
			background 0.2s,
			border-color 0.2s,
			transform 0.15s;
	}

	.chat-suggestion:hover {
		background: color-mix(in srgb, var(--color-accent) 22%, transparent);
		border-color: color-mix(in srgb, var(--color-accent) 45%, var(--color-border));
		transform: translateY(-1px);
	}

	.chat-loading-skeleton {
		padding: 0;
		min-width: 72%;
		max-width: 88%;
	}

	.chat-skeleton {
		padding: 0.75rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.skeleton-line {
		height: 0.75rem;
		background: linear-gradient(
			90deg,
			var(--color-border) 25%,
			var(--color-card) 50%,
			var(--color-border) 75%
		);
		background-size: 200% 100%;
		animation: skeleton-shimmer 1.5s ease infinite;
		border-radius: 4px;
	}

	@keyframes skeleton-shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	.chat-input-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.65rem 0.75rem;
		border-top: 1px solid var(--color-border);
		background: color-mix(in srgb, var(--color-card) 96%, var(--color-border));
	}

	.chat-input {
		flex: 1;
		min-width: 0;
		padding: 0.55rem 0.75rem;
		font-size: 0.92rem;
		font-family: inherit;
		border: 1px solid var(--color-border);
		border-radius: 10px;
		background: var(--color-card);
		color: var(--color-text);
	}

	.chat-input:focus {
		outline: none;
		border-color: var(--color-accent);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-accent) 28%, transparent);
	}

	.chat-input:disabled {
		opacity: 0.65;
		cursor: not-allowed;
	}

	.chat-send {
		flex-shrink: 0;
		appearance: none;
		width: 2.65rem;
		height: 2.65rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		border-radius: 10px;
		background: var(--color-accent);
		color: #fff;
		cursor: pointer;
		transition:
			opacity 0.2s,
			transform 0.15s;
	}

	.chat-send:hover:not(:disabled) {
		transform: scale(1.04);
	}

	.chat-send:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	@media (max-width: 500px) {
		.chat-panel {
			width: calc(100vw - 1rem);
			right: 0.5rem;
			bottom: 5rem;
			max-height: calc(100vh - 8rem);
		}
	}
</style>
