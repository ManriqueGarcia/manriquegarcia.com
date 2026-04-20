<script>
	import { onMount } from 'svelte';

	let progress = $state(0);

	function updateProgress() {
		const scrollTop = window.scrollY;
		const scrollable = document.documentElement.scrollHeight - window.innerHeight;
		const ratio = scrollable > 0 ? scrollTop / scrollable : 0;
		progress = Math.min(100, Math.max(0, ratio * 100));
	}

	onMount(() => {
		updateProgress();
		window.addEventListener('scroll', updateProgress, { passive: true });
		window.addEventListener('resize', updateProgress);
		return () => {
			window.removeEventListener('scroll', updateProgress);
			window.removeEventListener('resize', updateProgress);
		};
	});
</script>

<div
	class="reading-progress"
	style:width="{progress}%"
	aria-hidden="true"
></div>

<style>
	.reading-progress {
		position: fixed;
		top: 0;
		left: 0;
		height: 3px;
		z-index: 1000;
		background: var(--color-accent, #1a6b3c);
		pointer-events: none;
		transition: width 0.15s ease-out;
	}
</style>
