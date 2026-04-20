<script>
	/** @type {{ active?: boolean }} */
	let { active = false } = $props();

	const PALETTE = ['#1a6b3c', '#c9a227', '#c0392b', '#2980b9', '#d63384'];

	/** Deterministic “scatter” so SSR/hydration stay aligned (no JS confetti libs). */
	const pieces = Array.from({ length: 30 }, (_, i) => {
		const left = ((i * 47 + 7) % 94) + 3;
		const delay = (i * 53) % 280;
		const drift = ((i % 9) - 4) * 18;
		const rotEnd = 360 + ((i * 71) % 540) * (i % 2 === 0 ? 1 : -1);
		const size = 6 + (i % 5);
		const circle = i % 3 === 0;
		return {
			left,
			delay,
			drift,
			rotEnd,
			size,
			circle,
			color: PALETTE[i % PALETTE.length]
		};
	});
</script>

{#if active}
	<div class="confetti-root" aria-hidden="true">
		{#each pieces as p, i (i)}
			<span
				class="confetti-piece"
				class:circle={p.circle}
				style:left="{p.left}%"
				style:--delay="{p.delay}ms"
				style:--drift="{p.drift}px"
				style:--rot-end="{p.rotEnd}deg"
				style:--size="{p.size}px"
				style:--bg={p.color}
			></span>
		{/each}
	</div>
{/if}

<style>
	.confetti-root {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 999;
		overflow: hidden;
	}

	.confetti-piece {
		position: absolute;
		top: -12px;
		width: var(--size);
		height: var(--size);
		background: var(--bg);
		animation: confetti-fall 2s ease-out forwards;
		animation-delay: var(--delay);
		will-change: transform, opacity;
	}

	.confetti-piece.circle {
		border-radius: 50%;
	}

	@keyframes confetti-fall {
		0% {
			transform: translateY(0) translateX(0) rotate(0deg);
			opacity: 1;
		}
		100% {
			transform: translateY(100vh) translateX(var(--drift)) rotate(var(--rot-end));
			opacity: 0;
		}
	}
</style>
