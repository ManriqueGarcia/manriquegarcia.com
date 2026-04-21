<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let visible = $state(false);

	onMount(() => {
		function onScroll() {
			visible = window.scrollY > 400;
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		return () => window.removeEventListener('scroll', onScroll);
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

{#if visible}
	<button
		type="button"
		class="back-to-top"
		aria-label="Volver arriba"
		onclick={scrollToTop}
		in:fly={{ y: 10, duration: 220, opacity: 0 }}
		out:fly={{ y: 10, duration: 220, opacity: 0 }}
	>
		<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">
			<path d="M12 19V5M5 12l7-7 7 7" />
		</svg>
	</button>
{/if}

<style>
	.back-to-top {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		z-index: 90;
		width: 48px;
		height: 48px;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		border-radius: 50%;
		background: var(--color-accent);
		color: white;
		cursor: pointer;
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.back-to-top:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22);
	}

	.back-to-top:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 3px;
	}
</style>
