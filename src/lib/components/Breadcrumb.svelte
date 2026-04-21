<script>
	let { items = [] } = $props();
</script>

<nav class="breadcrumb" aria-label="Breadcrumb">
	<ol>
		<li><a href="/">Inicio</a></li>
		{#each items as item, i}
			<li>
				{#if i === items.length - 1}
					<span aria-current="page">{item.label}</span>
				{:else}
					<a href={item.href}>{item.label}</a>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	.breadcrumb ol {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		margin: 0 0 1.5rem;
		font-size: 0.82rem;
		color: var(--color-text-muted);
	}
	.breadcrumb li + li::before {
		content: '›';
		margin: 0 0.5rem;
		color: var(--color-border);
	}
	.breadcrumb a {
		color: var(--color-text-muted);
		text-decoration: none;
	}
	.breadcrumb a:hover {
		color: var(--color-accent);
		text-decoration: underline;
	}
	.breadcrumb span {
		color: var(--color-text);
		font-weight: 500;
	}
</style>
