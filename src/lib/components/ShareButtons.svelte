<script>
	let { title = '', description = '' } = $props();

	function getUrl() {
		return typeof window !== 'undefined' ? window.location.href : '';
	}

	function shareWhatsApp() {
		const text = `🍎 ${title}${description ? ` — ${description}` : ''}\n${getUrl()}`;
		window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
	}

	function shareTwitter() {
		const text = `${title}${description ? ` — ${description}` : ''}`;
		const params = new URLSearchParams({ text, url: getUrl() });
		window.open(`https://twitter.com/intent/tweet?${params}`, '_blank', 'noopener,width=550,height=420');
	}

	function shareTelegram() {
		const text = `🍎 ${title}${description ? ` — ${description}` : ''}`;
		const params = new URLSearchParams({ url: getUrl(), text });
		window.open(`https://t.me/share/url?${params}`, '_blank', 'noopener,width=550,height=420');
	}

	function copyLink() {
		navigator.clipboard?.writeText(getUrl());
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	let copied = $state(false);
</script>

<div class="share-bar" aria-label="Compartir esta página">
	<span class="share-label">Compartir:</span>
	<button type="button" class="share-btn wa" onclick={shareWhatsApp} title="WhatsApp">
		<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12.04 2c-5.38 0-9.75 4.37-9.75 9.75 0 1.72.45 3.35 1.24 4.79L2 22l5.63-1.47A9.72 9.72 0 0012.04 22h.01c5.38 0 9.75-4.37 9.75-9.75S17.42 2 12.04 2zm5.52 13.86c-.24.67-1.4 1.3-1.94 1.38-.5.08-1.15.11-1.86-.11-.43-.12-.99-.28-1.71-.55-3.02-1.3-4.98-4.35-5.13-4.55-.15-.2-1.22-1.62-1.22-3.09 0-1.46.76-2.18 1.03-2.48.27-.3.6-.38.8-.38.2 0 .4 0 .58.01.19 0 .44-.07.69.53.24.6.83 2.09.9 2.24.08.15.13.33.02.53-.11.2-.17.33-.33.51-.16.17-.34.38-.48.51-.16.16-.33.34-.14.65.19.31.84 1.39 1.8 2.25 1.24 1.1 2.28 1.44 2.6 1.6.33.16.52.13.71-.08.19-.21.82-.96 1.04-1.29.22-.33.44-.28.74-.17.31.11 1.96.93 2.3 1.1.34.17.56.25.64.39.08.14.08.82-.16 1.49z"/></svg>
	</button>
	<button type="button" class="share-btn tw" onclick={shareTwitter} title="Twitter / X">
		<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
	</button>
	<button type="button" class="share-btn tg" onclick={shareTelegram} title="Telegram">
		<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
	</button>
	<button type="button" class="share-btn link" onclick={copyLink} title={copied ? '¡Copiado!' : 'Copiar enlace'}>
		{#if copied}
			<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
		{:else}
			<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
		{/if}
	</button>
</div>

<style>
	.share-bar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 2rem 0 1rem;
		padding: 0.75rem 1rem;
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
	}

	.share-label {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--color-text-muted);
		margin-right: 0.25rem;
	}

	.share-btn {
		appearance: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.2rem;
		height: 2.2rem;
		padding: 0;
		border: none;
		border-radius: 50%;
		color: #fff;
		cursor: pointer;
		transition: transform 0.1s, box-shadow 0.15s, opacity 0.15s;
		opacity: 0.9;
	}
	.share-btn:hover { transform: scale(1.1); opacity: 1; }
	.share-btn:active { transform: scale(0.95); }

	.wa { background: #25d366; }
	.wa:hover { box-shadow: 0 2px 8px rgba(37,211,102,0.4); }
	.tw { background: #000; }
	.tw:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
	.tg { background: #0088cc; }
	.tg:hover { box-shadow: 0 2px 8px rgba(0,136,204,0.4); }
	.link { background: var(--color-accent, #1a6b3c); }
	.link:hover { box-shadow: 0 2px 8px rgba(26,107,60,0.4); }

	@media (max-width: 400px) {
		.share-label { display: none; }
	}
</style>
