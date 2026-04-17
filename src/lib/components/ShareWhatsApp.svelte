<script>
	let { name, description = '', url = '' } = $props();

	function share() {
		const u = url || (typeof window !== 'undefined' ? window.location.href : '');
		const desc = description ? String(description).trim() : '';
		const text = `🍎 ${name}${desc ? ` - ${desc}` : ''} | Guía Asturias: ${u}`;
		const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;
		window.open(wa, '_blank', 'noopener,noreferrer');
	}
</script>

<button
	type="button"
	class="wa-share"
	onclick={share}
	aria-label="Compartir en WhatsApp"
	title="Compartir en WhatsApp"
>
	<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
		<path
			fill="currentColor"
			d="M12.04 2c-5.38 0-9.75 4.37-9.75 9.75 0 1.72.45 3.35 1.24 4.79L2 22l5.63-1.47A9.72 9.72 0 0012.04 22h.01c5.38 0 9.75-4.37 9.75-9.75S17.42 2 12.04 2zm5.52 13.86c-.24.67-1.4 1.3-1.94 1.38-.5.08-1.15.11-1.86-.11-.43-.12-.99-.28-1.71-.55-3.02-1.3-4.98-4.35-5.13-4.55-.15-.2-1.22-1.62-1.22-3.09 0-1.46.76-2.18 1.03-2.48.27-.3.6-.38.8-.38.2 0 .4 0 .58.01.19 0 .44-.07.69.53.24.6.83 2.09.9 2.24.08.15.13.33.02.53-.11.2-.17.33-.33.51-.16.17-.34.38-.48.51-.16.16-.33.34-.14.65.19.31.84 1.39 1.8 2.25 1.24 1.1 2.28 1.44 2.6 1.6.33.16.52.13.71-.08.19-.21.82-.96 1.04-1.29.22-.33.44-.28.74-.17.31.11 1.96.93 2.3 1.1.34.17.56.25.64.39.08.14.08.82-.16 1.49z"
		/>
	</svg>
</button>

<style>
	.wa-share {
		appearance: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		vertical-align: middle;
		width: 2rem;
		height: 2rem;
		padding: 0;
		border: none;
		border-radius: 999px;
		background: #25d366;
		color: #fff;
		cursor: pointer;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
		transition:
			transform 0.1s ease,
			box-shadow 0.15s ease,
			opacity 0.15s ease;
		opacity: 0.92;
	}

	.wa-share:hover {
		transform: scale(1.06);
		opacity: 1;
		box-shadow: 0 2px 8px rgba(37, 211, 102, 0.45);
	}

	.wa-share:active {
		transform: scale(0.98);
	}
</style>
