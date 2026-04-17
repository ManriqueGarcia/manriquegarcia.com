<script>
	import CommentSection from '$lib/components/CommentSection.svelte';

	const entries = [
		{ es: 'Mujeres', ast: 'Muyeres (las que mandan de verdad)', cat: 'Dones', and: 'Mujere' },
		{ es: 'Hombres', ast: 'Paisanus (los que obedecen)', cat: 'Homes', and: 'Homes' },
		{
			es: 'Creo que te has equivocado',
			ast: 'Yes bobu, yes bobu del todo',
			cat: "Nen, t'equivoques",
			and: 'Nanai de la china'
		},
		{
			es: 'Ese lugar queda lejos',
			ast: "Ta a tomar pol culo pa'ya (término técnico de distancia)",
			cat: "N'hem en metro",
			and: 'De Fernandopo pa ya'
		},
		{
			es: 'Tengo mucha hambre',
			ast: 'Toy de un esfamiao que mete mieu (hambre que da miedo, literalmente)',
			cat: 'Tinc fam',
			and: 'Toi desmayao'
		},
		{
			es: '¿Te has hecho daño?',
			ast: '¿Mancastete? (una sola palabra, eficiencia asturiana)',
			cat: "T'has fet mal?",
			and: '¿Tasescoñao?'
		},
		{
			es: '¿Qué sucede?',
			ast: '¿Que ye oh? (sirve pa todo, úsala con frecuencia)',
			cat: 'Qué succeeix?',
			and: '¿Que paha?'
		},
		{
			es: 'No te entiendo',
			ast: '¡Que babayaes me cuentes, oh!',
			cat: 'Però, qué dius!',
			and: 'Es un bastinazo'
		},
		{
			es: 'Se ha caído rodando',
			ast: '¡Mialu com rueda tovia! (con palomites, por favor)',
			cat: 'Ha caigut per la montanya!',
			and: '¡Que carajazo se ha pegao, pixa!'
		},
		{
			es: 'Oiga, joven',
			ast: 'Ah, güaje, esti cosu como ye, oh?',
			cat: 'Jove, si-us-plau',
			and: 'Killo, ven pacá'
		},
		{
			es: 'Sigue recto',
			ast: 'To tieso (GPS asturiano: breve y efectivo)',
			cat: "No sóc d'aquí",
			and: 'To palante'
		},
		{
			es: '¿Otra sidra?',
			ast: 'Pon un culín, oh (respuesta correcta: siempre sí)',
			cat: 'Fem un pensament?',
			and: '¿Un rebujito?'
		},
		{
			es: 'Invito yo',
			ast: 'Ya pago, oh (frase que te hará popular al instante)',
			cat: 'Una merda!',
			and: 'Convío'
		},
		{
			es: 'Me gusta',
			ast: 'Préstame (ojo: no significa prestarse nada, ye "me mola")',
			cat: "M'agrada molt, merci",
			and: 'Ta guapo'
		},
		{
			es: 'Fiesta',
			ast: 'Folixia asgalla (fiesta a lo grande, sin medias tintas)',
			cat: 'Fes-te la festa',
			and: 'La feria'
		},
		{
			es: 'Voy al baño',
			ast: 'Voi mixiar la sidrina! (poético, ¿verdad?)',
			cat: 'Vaig a fer un pipi',
			and: 'Voy a echar el litro'
		},
		{
			es: 'Vete a la mierda',
			ast: 'A tomar pol culo (multifuncional: enfado, sorpresa, admiración)',
			cat: 'No en dic de paraulotes',
			and: 'Te qui i pui ya'
		},
		{
			es: 'Me gusta el fútbol',
			ast: '¡Puxa Sporting! (la única respuesta aceptable)',
			cat: 'Força Barça!',
			and: '¡Viva er Beti manque pierda!'
		},
		{
			es: 'Estar atento',
			ast: 'Enterome de to',
			cat: 'Escolta, noi',
			and: 'Aliquindoi'
		},
		{
			es: 'No queda sidra',
			ast: '(no existe) — esta frase ye ilegal en Asturias',
			cat: 'Un Vichy, si-us-plau',
			and: 'Un cardo'
		}
	];

	let searchQuery = $state('');

	const filtered = $derived.by(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return entries;
		return entries.filter(
			(row) =>
				row.es.toLowerCase().includes(q) ||
				row.ast.toLowerCase().includes(q) ||
				row.cat.toLowerCase().includes(q) ||
				row.and.toLowerCase().includes(q)
		);
	});
</script>

<svelte:head>
	<title>Diccionario | ¡Puxa Asturies!</title>
</svelte:head>

<main class="container">
	<h1>Diccionario Asturiano</h1>

	<p class="page-intro">
		Llibru pa entenderse con la xente. Un pequeño diccionario pa que puedas comunicarte durante la
		tu estancia n’Asturies sin que te miren con cara de <em>“¿tú d’ónde vienes, bañista?”</em>
	</p>

	<div class="section-note">
		<p>
			<strong>Nota seria en tonu informal:</strong> esto ye humor y aproximación cultural, nun un
			manual de llingua. El bable tien variantes; el catalán y el andaluz aquí son chistes
			hermanos, nun leyes filolóxicas. Si un filólogu mira esto, que pida un culín primero.
		</p>
	</div>

	<label class="search-label" for="dict-search">Buscar na tabla</label>
	<input
		id="dict-search"
		class="dict-search"
		type="search"
		placeholder="Buscar expresión..."
		autocomplete="off"
		bind:value={searchQuery}
	/>

	<div class="table-scroll">
		{#if filtered.length === 0}
			<p class="no-results">Nun atopé ná, bañista. Prueba con otra palabra.</p>
		{:else}
			<table class="dict-table">
				<thead>
					<tr>
						<th>Castellano</th>
						<th>Asturiano (Bable)</th>
						<th>Catalán</th>
						<th>Andaluz</th>
					</tr>
				</thead>
				<tbody>
					{#each filtered as row (row.es + row.ast)}
						<tr>
							<td>{row.es}</td>
							<td>{row.ast}</td>
							<td>{row.cat}</td>
							<td>{row.and}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>

	<div class="section-note">
		<p>
			Si dominas esto, ya puedes pedir un culín, protestar pol tiempo y decir que yes bobu con
			solera. ¡Puxa Asturies!
		</p>
	</div>

	<CommentSection
		sectionTitle="Comentarios del diccionario"
		inputPlaceholder="¿La to frase favorita o una corrección con cariñu?…"
	/>
</main>

<style>
	.search-label {
		display: block;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-text-muted);
		margin-bottom: 0.35rem;
	}

	.dict-search {
		width: 100%;
		margin-bottom: 1.25rem;
		padding: 0.85rem 1.1rem;
		font: inherit;
		font-size: 1rem;
		border-radius: 999px;
		border: 1px solid var(--color-border);
		background: var(--color-card);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.dict-search:focus {
		outline: none;
		border-color: color-mix(in srgb, var(--color-accent) 55%, var(--color-border));
		box-shadow:
			0 0 0 3px color-mix(in srgb, var(--color-accent) 22%, transparent),
			0 2px 8px rgba(0, 0, 0, 0.06);
	}

	.dict-search::placeholder {
		color: var(--color-text-muted);
		opacity: 0.85;
	}

	.no-results {
		padding: 2rem 1rem;
		text-align: center;
		font-size: 1.05rem;
		color: var(--color-text-muted);
	}
</style>
