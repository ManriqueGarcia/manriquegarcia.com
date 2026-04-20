<script>
	import ShareButtons from '$lib/components/ShareButtons.svelte';

	const pageTitle = 'Asturias Travel Guide — Gijón, Cider & More | ¡Puxa Asturies!';
	const pageDesc = 'Your essential guide to Asturias, Spain: best restaurants, cider houses, beaches, festivals, and practical tips for visiting Gijón and beyond.';
	const canonical = 'https://manriquegarcia.com/en';

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'English Guide', item: canonical }
		]
	});

	const faqJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{ '@type': 'Question', name: 'What is Asturian cider?', acceptedAnswer: { '@type': 'Answer', text: 'Natural apple cider poured from height (escanciado) into a glass. You drink a small amount (culín) in one gulp. A bottle costs 4-6€ in cider houses.' }},
			{ '@type': 'Question', name: 'What is a cachopo?', acceptedAnswer: { '@type': 'Answer', text: 'Two large breaded veal fillets stuffed with ham and cheese. It is the signature dish of Asturias and portions are enormous.' }},
			{ '@type': 'Question', name: 'When is the best time to visit Asturias?', acceptedAnswer: { '@type': 'Answer', text: 'June to September for beach weather (18-25°C). The region is beautiful year-round: autumn for food festivals, winter for skiing and stews, spring for green landscapes.' }},
			{ '@type': 'Question', name: 'Does it rain a lot in Asturias?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but the rain is usually light and intermittent. Always pack a rain jacket. Summer has many sunny days.' }},
			{ '@type': 'Question', name: 'How do I get to Gijón?', acceptedAnswer: { '@type': 'Answer', text: 'Fly to Asturias Airport (OVD), 40km from Gijón. Also reachable by train (RENFE), bus (ALSA) or car via the A-8 coastal motorway.' }}
		]
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDesc} />
	<link rel="canonical" href={canonical} />
	<link rel="alternate" hreflang="es" href="https://manriquegarcia.com/" />
	<link rel="alternate" hreflang="en" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDesc} />
	<meta property="og:site_name" content="¡Puxa Asturies!" />
	<meta property="og:locale" content="en_GB" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDesc} />
	<meta property="og:image" content="https://manriquegarcia.com/images/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
	{@html `<script type="application/ld+json">${faqJsonLd}<\/script>`}
</svelte:head>

<main class="container en-guide">
	<p class="lang-switch"><a href="/">🇪🇸 Ver en español</a></p>

	<h1>Asturias Travel Guide</h1>
	<p class="page-intro">
		Everything you need to enjoy Gijón and Asturias like a local. Originally created as a wedding
		guest guide, this site grew into the most fun travel resource for northern Spain's greenest region.
	</p>

	<h2>🍎 Cider (Sidra) — The Sacred Drink</h2>
	<p>
		Asturian cider is <strong>natural apple cider</strong> — no bubbles, no sweetness, just pure fermented apple juice.
		It's poured from height (<em>escanciado</em>) so it hits the glass and gets oxygenated. You drink
		a small amount called a <strong>culín</strong> in one gulp, then throw the rest on the floor.
		Yes, really. A bottle costs <strong>€4-6</strong> and gets you 6-7 culines.
	</p>
	<p>
		Best cider spots: <strong>Calle Gascona</strong> in Oviedo ("Cider Boulevard"),
		<strong>Barrio de la Sidra</strong> in Gijón, and <strong>Casa Trabanco</strong> in Lavandera
		(the OG cider house). See our <a href="/restaurantes">full restaurant list</a>.
	</p>

	<h2>🍴 What to Eat</h2>
	<p>
		<strong>Fabada asturiana:</strong> white bean stew with chorizo, morcilla (blood sausage) and bacon.
		Rich, hearty and the national dish. Only order if you're genuinely hungry.
	</p>
	<p>
		<strong>Cachopo:</strong> two massive breaded veal fillets stuffed with ham and cheese. One "individual"
		portion can feed two normal humans. Available with Cabrales blue cheese, crab, mushrooms and more.
		Costs around <strong>€12-18</strong>.
	</p>
	<p>
		<strong>Seafood:</strong> sea urchins (<em>oricios</em>), barnacles (<em>percebes</em>), monkfish
		(<em>pixín</em>), and northern tuna (<em>bonito</em>) are all exceptional and fresh from the Cantabrian Sea.
	</p>
	<p>
		<strong>Cheese:</strong> Asturias has <strong>40+ cheese varieties</strong>. Try Cabrales (intense blue),
		Gamonéu (smoked), Afuega'l Pitu (creamy). Order a local cheese board and explore.
	</p>

	<h2>🏖️ Gijón Highlights</h2>
	<ul class="en-list">
		<li><strong>Playa de San Lorenzo:</strong> 1.5 km of golden sand in the city centre. One of Spain's best urban beaches.</li>
		<li><strong>Cimadevilla:</strong> the old fishermen's quarter on a headland. Narrow streets, bars and the famous Elogio del Horizonte sculpture.</li>
		<li><strong>Universidad Laboral:</strong> Spain's largest building. Stunning architecture, theatre and cultural centre.</li>
		<li><strong>Puerto Deportivo:</strong> the marina with restaurants, terraces and sunset views.</li>
	</ul>

	<h2>🏛️ Oviedo — 30 Minutes Away</h2>
	<p>
		The capital of Asturias: Gothic cathedral, pre-Romanesque churches (UNESCO), the charming old town,
		Woody Allen statue, and <strong>Calle Gascona</strong> — the best street in Spain for cider houses.
	</p>

	<h2>🏔️ Day Trips</h2>
	<ul class="en-list">
		<li><strong>Covadonga Lakes:</strong> glacial lakes in the Picos de Europa mountains. Stunning views, 1.5h drive.</li>
		<li><strong>Lastres:</strong> picturesque fishing village on a cliff. Where "Doctor Mateo" was filmed.</li>
		<li><strong>Luarca:</strong> "The White Village of the Costa Verde". Beautiful harbour and beaches.</li>
		<li><strong>Cudillero:</strong> colourful houses cascading down to a tiny harbour.</li>
	</ul>

	<h2>🎪 Festivals</h2>
	<p>
		<strong>Descenso del Sella</strong> (first Saturday of August): massive canoe race with a huge party.
		<strong>Semana Grande</strong> (August): Gijón's biggest festival week.
		<strong>Semana Negra</strong> (July): crime fiction festival with concerts and culture.
		See our <a href="/fiestas">full festival calendar</a> (60+ events year-round).
	</p>

	<h2>📋 Practical Info</h2>
	<div class="table-scroll">
		<table class="dict-table">
			<thead><tr><th>Item</th><th>Details</th></tr></thead>
			<tbody>
				<tr><td>Airport</td><td>Asturias (OVD), 40 km from Gijón</td></tr>
				<tr><td>Currency</td><td>Euro (€). Cards accepted almost everywhere.</td></tr>
				<tr><td>Language</td><td>Spanish (official) + Asturian/Bable (co-official in progress)</td></tr>
				<tr><td>Weather</td><td>Oceanic climate. Summer 18-25°C. Always pack a rain jacket.</td></tr>
				<tr><td>Tap water</td><td>Safe and excellent quality. Among the best in Spain.</td></tr>
				<tr><td>Tipping</td><td>Not mandatory. Rounding up or leaving €1-2 is appreciated.</td></tr>
				<tr><td>Getting around</td><td>Walk in cities. Rent a car for villages and mountains.</td></tr>
				<tr><td>Emergency</td><td>112 (police, ambulance, fire)</td></tr>
			</tbody>
		</table>
	</div>

	<h2>🗣️ Useful Asturian Phrases</h2>
	<div class="table-scroll">
		<table class="dict-table">
			<thead><tr><th>Asturian</th><th>Meaning</th><th>When to use</th></tr></thead>
			<tbody>
				<tr><td>¡Puxa Asturies!</td><td>Long live Asturias!</td><td>Always. The battle cry.</td></tr>
				<tr><td>Ponme un culín</td><td>Pour me a cider</td><td>At any cider house.</td></tr>
				<tr><td>Presta mucho</td><td>I love it / It's great</td><td>When something's awesome.</td></tr>
				<tr><td>Ye lo que hai</td><td>It is what it is</td><td>Philosophical resignation.</td></tr>
				<tr><td>¡Puxa Sporting!</td><td>Go Sporting!</td><td>The only acceptable football answer.</td></tr>
			</tbody>
		</table>
	</div>

	<div class="related-pages">
		<h2>Explore more (in Spanish)</h2>
		<div class="related-grid">
			<a href="/restaurantes" class="related-link">🍴 Restaurants<span>Full list of cider houses and restaurants</span></a>
			<a href="/mapa" class="related-link">🗺️ Interactive Map<span>Every place marked on the map</span></a>
			<a href="/fiestas" class="related-link">🎪 Festival Calendar<span>60+ events throughout the year</span></a>
		</div>
	</div>

	<ShareButtons title="Asturias Travel Guide" description="Everything you need to visit Gijón and Asturias" />
</main>

<style>
	.lang-switch {
		margin-bottom: 0.5rem;
		font-size: 0.85rem;
	}
	.lang-switch a {
		color: var(--color-accent, #1a6b3c);
		text-decoration: none;
		font-weight: 500;
	}
	.lang-switch a:hover { text-decoration: underline; }

	.en-list {
		padding-left: 1.25rem;
		line-height: 1.7;
		margin: 0.75rem 0 1.25rem;
	}
	.en-list li { margin-bottom: 0.5rem; }

	.related-pages { margin: 2.5rem 0 1rem; }
	.related-pages h2 { font-size: 1.15rem; margin-bottom: 0.75rem; }
	.related-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; }
	.related-link { display: block; padding: 1rem; background: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius, 12px); text-decoration: none; color: var(--color-text); font-weight: 600; font-size: 0.95rem; transition: border-color 0.2s, box-shadow 0.2s; }
	.related-link:hover { border-color: var(--color-accent); box-shadow: 0 2px 8px rgba(0,0,0,0.06); text-decoration: none; color: var(--color-text); }
	.related-link span { display: block; font-weight: 400; font-size: 0.82rem; color: var(--color-text-muted); margin-top: 0.2rem; }
</style>
