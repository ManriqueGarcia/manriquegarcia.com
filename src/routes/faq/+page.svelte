<script>
	import ShareButtons from '$lib/components/ShareButtons.svelte';

	const pageTitle = 'Preguntas frecuentes sobre Asturias | ¡Puxa Asturies!';
	const pageDesc = 'Respuestas a las preguntas más frecuentes sobre viajar a Asturias: cuándo ir, qué comer, cómo escanciar sidra, playas, lluvia y más.';
	const canonical = 'https://manriquegarcia.com/faq';

	const faqs = [
		{ q: '¿Cuál es la mejor época para visitar Asturias?', a: 'Junio a septiembre para playa y buen tiempo. Pero Asturias tiene encanto todo el año: otoño para castañas y setas, invierno para cocina de cuchara y esquí en los Picos de Europa, primavera para paisajes verdes sin aglomeraciones. Agosto es el mes con más fiestas pero también el más masificado.' },
		{ q: '¿Llueve mucho en Asturias?', a: 'Sí, pero no tanto como dicen. Asturias tiene clima oceánico: lluvias frecuentes pero no torrenciales. En verano hay muchos días de sol (18-25°C). El truco: lleva siempre chubasquero y disfruta cuando escampa, que los paisajes post-lluvia son espectaculares.' },
		{ q: '¿Cómo se escancia la sidra?', a: 'Se vierte desde arriba (brazo estirado) al vaso que sostienes abajo, para que la sidra se oxigene y haga espuma. Se sirve un "culín" (un dedo de sidra) y se bebe de un trago. Lo que sobre en el vaso se tira al suelo. Se hacía porque los vasos eran compartidos: al tirar el resto se limpiaba el borde para el siguiente. Hoy se mantiene la costumbre.' },
		{ q: '¿Cuánto cuesta comer en una sidrería?', a: 'Un menú del día ronda los 12-18€ con primer plato, segundo, postre, pan y sidra o agua. Una botella de sidra natural cuesta 4-6€ y da para 6-7 culines. Es de las zonas más baratas de España para comer así de bien.' },
		{ q: '¿Qué es un cachopo?', a: 'Dos filetes de ternera empanados rellenos de jamón y queso. Es ENORME: uno individual puede alimentar a dos personas. Hay versiones con Cabrales, centollo, boletus... Es el plato que más fotos de Instagram genera en Asturias.' },
		{ q: '¿Se puede ir a la playa en Asturias?', a: '¡Por supuesto! La Playa de San Lorenzo en Gijón es una de las mejores playas urbanas de España (1.5 km de arena). El agua del Cantábrico está fresca (16-21°C en verano), pero muy limpia. Hay decenas de playas salvajes espectaculares en toda la costa.' },
		{ q: '¿Necesito coche para moverme por Asturias?', a: 'Para Gijón y Oviedo no: se recorren bien a pie y tienen bus urbano. Para visitar pueblos, playas remotas o montaña, sí necesitas coche. Hay alquiler en el aeropuerto y en el centro de Gijón.' },
		{ q: '¿Cómo llego a Asturias?', a: 'En avión al aeropuerto de Asturias (OVD), a 40 km de Gijón. En tren con RENFE o el FEVE (panorámico por la costa). En bus con ALSA desde las principales ciudades. En coche por la A-8 (costa) o A-66 (desde el sur).' },
		{ q: '¿Qué diferencia hay entre Gijón y Oviedo?', a: 'Gijón es la ciudad de playa, sidrerías, ambiente marinero y vida nocturna. Oviedo es la capital, con casco histórico, la catedral, museos y un ambiente más señorial. Están a 30 minutos en coche y se complementan perfectamente.' },
		{ q: '¿Qué quesos hay en Asturias?', a: 'Más de 40 variedades. El Cabrales es el más famoso (azul, intenso), pero también el Gamonéu (ahumado), Afuega el Pitu (cremoso), Beyos (suave), Vidiago y muchos más. Pide una tabla de quesos asturianos en cualquier restaurante.' },
		{ q: '¿Qué es el Descenso del Sella?', a: 'Una fiesta-competición de piragüismo que se celebra el primer sábado de agosto entre Arriondas y Ribadesella. Es Fiesta de Interés Turístico Internacional. Miles de personas, piraguas y mucha sidra. Si vas, reserva TODO con meses de antelación.' },
		{ q: '¿Se habla asturiano?', a: 'El asturiano (bable) es una lengua propia con gramática y literatura. No es oficial pero sí cooficial en trámite. Todo el mundo habla castellano, pero oirás expresiones en asturiano por todas partes. Aprende "¡Puxa Asturies!" y "ponme un culín" y serás uno más.' },
		{ q: '¿Es caro viajar a Asturias?', a: 'No especialmente. Los menús del día son económicos (12-18€), los alojamientos rurales y hostales son asequibles, y muchas de las mejores experiencias (playas, sendas, pueblos) son gratis. El coche de alquiler es el mayor gasto si no vienes con el tuyo.' },
		{ q: '¿Qué fiestas hay en Asturias?', a: 'Hay fiestas todo el año: Carnaval en febrero, Semana Negra en julio, Descenso del Sella y Semana Grande en agosto, San Mateo en Oviedo en septiembre, Amagüestu en noviembre... Consulta nuestro <a href="/fiestas">calendario completo de fiestas</a>.' },
		{ q: '¿Puedo hacer senderismo en Asturias?', a: 'Asturias es un paraíso del senderismo. La Ruta del Cares, los Lagos de Covadonga, la Senda del Oso, las Sendas Verdes de Gijón, el Camino de Santiago... Hay rutas para todos los niveles, desde paseos costeros hasta alta montaña en Picos de Europa.' },
	];

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'FAQ', item: canonical }
		]
	});

	const faqJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map(f => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') }
		}))
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDesc} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDesc} />
	<meta property="og:site_name" content="¡Puxa Asturies!" />
	<meta property="og:locale" content="es_ES" />
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

<main class="container">
	<h1>Preguntas frecuentes sobre Asturias</h1>

	<p class="page-intro">
		Too lo que la xente pregunta antes de venir (y dalgo que debería preguntar pero nun se atreve).
	</p>

	<div class="faq-list">
		{#each faqs as faq, i (faq.q)}
			<details class="faq-item" open={i === 0}>
				<summary class="faq-question">{faq.q}</summary>
				<div class="faq-answer"><p>{@html faq.a}</p></div>
			</details>
		{/each}
	</div>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/practico" class="related-link">📋 Info práctica<span>Teléfonos, transporte, maleta y costumbres</span></a>
			<a href="/restaurantes" class="related-link">🍴 Restaurantes<span>Sidrerías y dónde comer de verdá</span></a>
			<a href="/diccionario" class="related-link">📖 Diccionario<span>Frases pa entenderte con la xente</span></a>
		</div>
	</div>

	<ShareButtons title="Preguntas frecuentes sobre Asturias" description="15 respuestas pa planificar tu viaje" />
</main>

<style>
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1.5rem 0 2rem;
	}

	.faq-item {
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
		overflow: hidden;
		transition: border-color 0.2s;
	}

	.faq-item[open] {
		border-color: var(--color-accent, #1a6b3c);
	}

	.faq-question {
		padding: 1rem 1.25rem;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		list-style: none;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.faq-question::-webkit-details-marker { display: none; }
	.faq-question::before {
		content: '+';
		flex-shrink: 0;
		width: 1.5rem;
		height: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: var(--color-accent, #1a6b3c);
		color: #fff;
		font-size: 1.1rem;
		font-weight: 700;
		transition: transform 0.2s;
	}
	.faq-item[open] .faq-question::before {
		content: '−';
		transform: rotate(180deg);
	}

	.faq-answer {
		padding: 0 1.25rem 1rem 3.5rem;
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--color-text);
	}
	.faq-answer p { margin: 0; }
	.faq-answer :global(a) {
		color: var(--color-accent, #1a6b3c);
		text-decoration: underline;
	}

	.related-pages { margin: 2.5rem 0 1rem; }
	.related-pages h2 { font-size: 1.15rem; margin-bottom: 0.75rem; }
	.related-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; }
	.related-link { display: block; padding: 1rem; background: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius, 12px); text-decoration: none; color: var(--color-text); font-weight: 600; font-size: 0.95rem; transition: border-color 0.2s, box-shadow 0.2s; }
	.related-link:hover { border-color: var(--color-accent); box-shadow: 0 2px 8px rgba(0,0,0,0.06); text-decoration: none; color: var(--color-text); }
	.related-link span { display: block; font-weight: 400; font-size: 0.82rem; color: var(--color-text-muted); margin-top: 0.2rem; }
</style>
