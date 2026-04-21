<script>
	import { fade } from 'svelte/transition';
	import SidraRating from '$lib/components/SidraRating.svelte';
	import CommentSection from '$lib/components/CommentSection.svelte';
	import FavoriteButton from '$lib/components/FavoriteButton.svelte';
	import ShareWhatsApp from '$lib/components/ShareWhatsApp.svelte';
	import QuickRating from '$lib/components/QuickRating.svelte';
	import { slugify } from '$lib/utils/slugify.js';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import { autolink, escapeHtml } from '$lib/utils/autolink.js';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';

	const CHAT_API = 'https://8u1htcpsr1.execute-api.eu-west-1.amazonaws.com/chat';

	/** @typedef {'Gijón centro' | 'Gijón playa' | 'Gijón otros' | 'Oviedo' | 'Rural'} RestZone */
	/** @typedef {{ role: 'user' | 'assistant'; text: string }} ChatMsg */

	const TAG_OPTIONS = [
		'sidrería',
		'parrilla',
		'marisquería',
		'cocina tradicional',
		'pinchos',
		'alta cocina',
		'económico'
	];

	const ZONE_OPTIONS = ['Gijón centro', 'Gijón playa', 'Gijón otros', 'Oviedo', 'Rural'];

	const restaurants = [
		{
			name: 'Casa Trabanco',
			rating: 'sublime',
			address: 'Ctra. de Lavandera 3255, 33350 Gijón',
			phone: '985 136 462',
			/** @type {RestZone} */
			zone: 'Gijón otros',
			tags: ['sidrería', 'cocina tradicional', 'alta cocina'],
			description:
				'Esto no es una sidrería. Esto ye LA sidrería. Casa Trabanco ye el Bernabéu de la sidra, el Vaticano del escanciado, el sitio donde los asturianos llevan a la xente de fuera cuando quieren dejarles la boca abierta. Producen su propia sidra (que ye una maravilla), la comida ye espectacular, y el sitio en sí — un lagar enorme rodeado de manzanos — ye pa quedase vivir. Si solo puedes ir a un sitio en toda Asturias, que sea este. Luego nos das las gracias.',
			url: 'https://www.casatrabanco.com'
		},
		{
			name: 'El Sauco',
			rating: 5,
			address: 'C/ Valencia 20, 33210 Gijón',
			phone: '985 39 83 30',
			zone: 'Gijón centro',
			tags: ['sidrería', 'pinchos'],
			description:
				'Sidra por la tarde con pinchos que quitan el sentíu, menú al mediodía, carta por la noche. Todo está riquísimo. Una de las sidrerías que nunca falta en nuestra ruta xixonenca. Si solo puedes ir a un sitio, ve aquí. Luego repite.',
			url: 'http://www.elsauco.com'
		},
		{
			name: 'Parrilla Antonio',
			rating: 4,
			address: 'Roncal 1, 33208 Gijón',
			phone: '985 154 973',
			zone: 'Gijón otros',
			tags: ['sidrería', 'parrilla', 'pinchos'],
			description:
				'Llegas, te plantas en la barra, y empiezas a picar pinchos y sidra como si no hubiera mañana. La parrilla funciona de cara al público, así que ves cómo se hace tu comida. Los choricitos y el queso cabrales están pa chuparse los deos.',
			url: 'https://parrilla-antonio-gijon.es'
		},
		{
			name: 'Sidrería Nava',
			rating: 4,
			address: 'Pz. de la Serena 1, 33208 Gijón',
			phone: '985 380 447',
			zone: 'Gijón otros',
			tags: ['sidrería', 'pinchos', 'cocina tradicional'],
			description:
				'La sidra ye de primera, los pinchos nun fallan, y el menú del día merece la pena. Un clásico del Barrio de la Sidra al que siempre se vuelve.'
		},
		{
			name: 'La Galana',
			rating: 4,
			address: 'Plaza Mayor 10, 33201 Gijón',
			phone: '985 17 24 29',
			zone: 'Gijón centro',
			tags: ['sidrería', 'cocina tradicional'],
			description:
				'Muy céntrico (en la mismísima Plaza Mayor), sidra buena, comida muy buena. Eso sí, al estar en el meollo los precios suben un pelín. Pero oye, las vistas no te las quita nadie.',
			url: 'https://restauranteasturianolagalana.es'
		},
		{
			name: 'Sidrería Celorio',
			rating: 4,
			address: 'C/ Domingo Juliana 6, 33212 Gijón',
			phone: '984 293 447',
			zone: 'Gijón playa',
			tags: ['sidrería', 'cocina tradicional', 'pinchos'],
			description:
				'Aquí se viene a por el cachopo: bistec + jamón + queso + pimientos, rebozado y con patatas fritas. Un cuarto de cachopo ya es para dos personas. ¿Uno entero? Solo si llevas tres días sin comer o eres un asturiano de pura cepa.',
			url: 'https://restaurante-celorio.es'
		},
		{
			name: 'Casa Ferino',
			rating: 4,
			address: 'Ctra. de la Carbonera, 33209 Gijón',
			phone: '985 380 471',
			zone: 'Gijón otros',
			tags: ['sidrería', 'cocina tradicional'],
			description:
				'Los callos de Casa Ferino son legendarios. Si vas a comer los encontrarás seguro, pero por la noche… nun te lo garantizo, güaje. Vuelan.',
			url: 'http://www.casaferino.com'
		},
		{
			name: 'Llagar El Quesu',
			rating: 5,
			address: 'Ctra. AS-17 Km 26, 33429 Bobes, Siero',
			phone: '985 985 304',
			zone: 'Rural',
			tags: ['sidrería', 'parrilla', 'cocina tradicional'],
			description:
				'Está en Siero (un poco fuera de Xixón, pero merece la escapada). Parrilla tipo argentina que ta pa morirse, decoración guapísima, ambiente acogedor. Ye de esos sitios de los que sales diciendo "hay que volver".',
			url: 'https://elquesu.es'
		},
		{
			name: 'Sidrería El Globo',
			rating: 3,
			address: 'C/ San Bernardo 13, 33201 Gijón',
			phone: '985 17 22 47',
			zone: 'Gijón centro',
			tags: ['sidrería', 'cocina tradicional', 'económico'],
			description:
				'Comida típica asturiana, sin florituras. Vas, comes bien, y vuelves a casa contentu. A veces no hace falta más, ¿no?',
			url: 'http://www.sidreriaelglobo.es'
		},
		{
			name: 'Sidrería La Costa',
			rating: 4,
			address: 'Av. de la Costa 32, 33205 Gijón',
			phone: '985 161 499',
			zone: 'Gijón playa',
			tags: ['sidrería', 'parrilla'],
			description:
				'Especialidad en carnes argentinas. Si te gusta un buen chuletón o una entraña a la parrilla, este ye tu sitio. La mezcla de sidra asturiana con corte argentino suena rara pero funciona de maravilla.',
			url: 'http://sidrerialacosta.com'
		},
		{
			name: 'Sidrería Cabranes',
			rating: 4,
			address: 'Av. Pablo Iglesias 23, 33205 Gijón',
			phone: '985 131 487',
			zone: 'Gijón playa',
			tags: ['sidrería', 'cocina tradicional'],
			description:
				'El rabo de toro de Cabranes ye pa llorar de la emoción. Si está en carta, pídelo. Si no está, llora igualmente y pide otra cosa, que too ta ricu.',
			url: 'https://sidreriacabranes.es'
		}
	];

	/** @type {'all' | 'sublime' | '5' | '4' | '3'} */
	let activeFilter = $state('all');

	/** @type {Set<string>} */
	let selectedTags = $state(new Set());

	/** @type {string | null} */
	let selectedZone = $state(null);

	function toggleTag(tag) {
		const next = new Set(selectedTags);
		if (next.has(tag)) next.delete(tag);
		else next.add(tag);
		selectedTags = next;
	}

	function clearAllFilters() {
		activeFilter = 'all';
		selectedTags = new Set();
		selectedZone = null;
	}

	let filtered = $derived.by(() => {
		let list =
			activeFilter === 'all'
				? restaurants
				: restaurants.filter((r) => {
						if (activeFilter === 'sublime') return r.rating === 'sublime';
						if (activeFilter === '5') return r.rating === 5;
						if (activeFilter === '4') return r.rating === 4;
						if (activeFilter === '3') return r.rating === 3;
						return false;
					});
		if (selectedZone) {
			list = list.filter((r) => r.zone === selectedZone);
		}
		if (selectedTags.size > 0) {
			list = list.filter((r) => [...selectedTags].every((t) => r.tags.includes(t)));
		}
		return list;
	});

	let hasActiveFilters = $derived(
		activeFilter !== 'all' || selectedTags.size > 0 || selectedZone !== null
	);

	let filterListKey = $derived(
		`${activeFilter}|${selectedZone ?? ''}|${[...selectedTags].sort().join(',')}`
	);

	/** @type {string | null} */
	let activeChat = $state(null);

	/** @type {ChatMsg[]} */
	let inlineMessages = $state([]);

	let inlineLoading = $state(false);
	let inlineInput = $state('');

	let visibleInlineMessages = $derived(inlineMessages.slice(-3));

	/** @param {string} text */
	function formatInlineAssistant(text) {
		let s = escapeHtml(text);
		s = s.replace(/\r\n/g, '\n');
		s = s.replace(/\n/g, '<br>');
		return s;
	}

	/** @param {string} text */
	function formatInlineUser(text) {
		return escapeHtml(text).replace(/\n/g, '<br>');
	}

	/** @type {AbortController | null} */
	let conciergeAbort = null;

	/** @param {{ name: string; description: string }} r */
	async function toggleConcierge(r) {
		if (activeChat === r.name) {
			activeChat = null;
			inlineMessages = [];
			inlineInput = '';
			conciergeAbort?.abort();
			conciergeAbort = null;
			return;
		}
		conciergeAbort?.abort();
		const controller = new AbortController();
		conciergeAbort = controller;
		const targetName = r.name;
		activeChat = targetName;
		inlineInput = '';
		inlineMessages = [];
		inlineLoading = true;
		const firstMsg = `Cuéntame más sobre ${r.name}: qué pedir, ambiente, y cuándo ir`;
		try {
			const res = await fetch(CHAT_API, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: firstMsg, history: [] }),
				signal: controller.signal
			});
			if (activeChat !== targetName) return;
			const data = await res.json();
			const reply =
				typeof data?.reply === 'string'
					? data.reply
					: 'Perdona, nun recibí respuesta. Prueba otra vuelta.';
			inlineMessages = [
				{ role: 'user', text: firstMsg },
				{ role: 'assistant', text: reply }
			];
		} catch (e) {
			if (e instanceof DOMException && e.name === 'AbortError') return;
			inlineMessages = [
				{ role: 'user', text: firstMsg },
				{
					role: 'assistant',
					text: 'Perdona, el concierge ta ocupáu. Prueba otra vuelta.'
				}
			];
		} finally {
			if (activeChat === targetName) inlineLoading = false;
		}
	}

	function closeConcierge() {
		activeChat = null;
		inlineMessages = [];
		inlineInput = '';
	}

	async function sendInlineFollowUp() {
		if (!activeChat || !inlineInput.trim() || inlineLoading) return;
		const userMsg = inlineInput.trim();
		inlineInput = '';
		const next = [...inlineMessages, { role: 'user', text: userMsg }];
		inlineMessages = next;
		inlineLoading = true;
		const history = next.slice(0, -1).map((m) => ({ role: m.role, text: m.text }));
		try {
			const res = await fetch(CHAT_API, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: userMsg, history })
			});
			const data = await res.json();
			const reply =
				typeof data?.reply === 'string'
					? data.reply
					: 'Perdona, nun recibí respuesta. Prueba otra vuelta.';
			inlineMessages = [...next, { role: 'assistant', text: reply }];
		} catch {
			inlineMessages = [
				...next,
				{ role: 'assistant', text: 'Equí falló dalgo. Prueba otra vuelta.' }
			];
		} finally {
			inlineLoading = false;
		}
	}

	/** @param {KeyboardEvent} e */
	function onInlineKeydown(e) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendInlineFollowUp();
		}
	}

	const pageTitle = 'Restaurantes y Sidrerías | ¡Puxa Asturies!';
	const pageDesc =
		'Las mejores sidrerías y restaurantes de Gijón y Asturias con valoraciones, direcciones y el ritual del escanciado de sidra.';
	const canonical = 'https://manriquegarcia.com/restaurantes';
	const restaurantJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Mejores sidrerías y restaurantes de Asturias',
		itemListElement: restaurants.map((r, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			item: {
				'@type': 'Restaurant',
				name: r.name,
				address: r.address,
				...(r.phone && { telephone: `+34${r.phone.replace(/\s/g, '')}` }),
				...(r.url && { url: r.url }),
				servesCuisine: 'Asturiana'
			}
		}))
	});

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Restaurantes y Sidrerías',
				item: 'https://manriquegarcia.com/restaurantes'
			}
		]
	});

	const faqJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: '¿Cuál es la mejor sidrería de Gijón?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Casa Trabanco en Lavandera es la referencia. Pero El Sauco y Parrilla Antonio son también imprescindibles.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Qué se come en una sidrería asturiana?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Sidra natural escanciada, tabla de quesos cabrales, tortilla de merluza, chorizo a la sidra, cachopo y fabada.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Cuánto cuesta comer en una sidrería?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Un menú del día ronda los 12-15€. Una comida con sidra, entrantes y plato fuerte: 20-30€ por persona.'
				}
			}
		]
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
	<meta
		property="og:image:alt"
		content="Sidrerías y restaurantes en Asturias — guía ¡Puxa Asturies!"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
	{@html `<script type="application/ld+json">${restaurantJsonLd}<\/script>`}
	{@html '<script type="application/ld+json">' + faqJsonLd + '<\/script>'}
</svelte:head>

<main class="container">
	<h1>Restaurantes y Sidrerías</h1>
	<Breadcrumb items={[{ label: 'Restaurantes' }]} />

	<p class="page-intro">
		Bienveníu al capítulo más serio de esta guía: dónde comer en Asturias sin que te vendan
		<em>paella con chorizo</em> y sin que te miren como si llevaras chanclas con calcetines. Aquí
		va sidra, va pinchu, va ritual, va respetu al productu.
	</p>

	<h2>El ritual del escanciado (léete esto antes de ir)</h2>

	<p>
		En una sidrería asturiana, la sidra natural <strong>no se sirve como un vino</strong>: no hay
		copas individuales pa cada uno con su botellín en la mesa como si fueras a un brunch de
		Instagram. Lo normal es que pidas botella (o medía) y que el ritual del
		<strong>escanciado</strong> marque el ritmo de la sobremesa.
	</p>

	<p>
		<strong>¿Qué es escanciar?</strong> Ye verter la sidra desde arriba — con brazo extendíu y
		muñeca firme — pa que chispe contra el borde del vaso, oxigenar la sidra y sacar el gas y el
		aroma que lleva dentro. Si lo haces bien, suena como una promesa. Si lo haces regular, igual
		te sale bien: lo importante ye la intención y no te quedes con la sidra “muerta” en el vaso.
	</p>

	<p>
		<strong>El culín</strong> ye la medida asturiana de prudencia y de gloria al mismo tiempo: un
		poco de sidra en el vaso, lo justo pa beberlo de un tirón. No es “un sorbito decoroso”: es
		terminar el culín, dejar el vaso casi vacío, y pasar el vaso. Sí: <strong>se comparte vaso</strong>.
		No te asustes: es tradición, es higiene de barra (el alcohol ayuda) y, sobre todo, es
		<em>ritual social</em>. Tú escancias, sirves un culín a tu vecino de barra, bebes el tuyo, y
		el círculo continúa. Si te ofrecen escanciar, acepta con educación; si no sabes, pide ayuda con
		honestidad: en la sidrería se enseña mirando.
	</p>

	<p>
		<strong>Pinchos y barra:</strong> en muchos sitios vas a empezar (o acabar) pegáu a la barra,
		con tapas frías en exposición y cosas calientes que salen a tumba abierta. El sistema puede
		cambiar (pides, te apuntan, pagas al final…), pero la regla de oro ye la misma:
		<strong>ordeña con respetu</strong>, no acapares, y deja sitio pa la xente del barrio. Y si te
		invitan a un culín, recuerda lo del inicio: <em>siempre se acepta</em>.
	</p>

	<p>
		<strong>Consexu final:</strong> si vas con prisa, dilo; si vas con hambre, pide con calma; y si
		vas con curiosidad, sube el tonu de la noche. La sidrería premia a quien se deja llevar… pero
		sin perder los modales, que esto no ye un parque temático: ye una institución.
	</p>

	<div class="section-note">
		<p>
			<strong>Sobre las valoraciones:</strong> usamos una escala que va de “buena” a “sublime”.
			<strong>Sublime</strong> es reservado pa sitios que son casi una experiencia religiosa (sí,
			con culín incluido). <strong>5</strong> ye excelente: te lo recomendaríamos a un amigo sin
			pensarlo. <strong>4</strong> ye muy buena: confiable, con personalidad, y con ganas de
			volver. <strong>3</strong> ye buena: cumple, alimenta, y a veces eso es lo más asturiano que
			hay: honestidá sin postureo.
		</p>
		<p>
			<strong>Barrio de la Sidra (Xixón):</strong> hay varias sidrerías concentradas por la zona
			de La Arena / Natahoyo. Es fácil hacer ruta, pero ojo con el horario y con el ritmo: la sidra
			engaña porque va tan llisa.
		</p>
		<p>
			<strong>Reservas:</strong> fines de semana, puentes y temporada alta pueden llenar todo. Si
			vienes con ilusión (y con hambre), reserva con antelación. Si no hay hueco, no es personal:
			es que aquí se cena temprano y se alarga la noche.
		</p>
	</div>

	<h2>Nuestras recomendaciones</h2>

	<div class="filter-bar filter-bar--rating" role="group" aria-label="Filtrar por valoración">
		<button
			type="button"
			class="filter-btn"
			class:is-active={activeFilter === 'all'}
			onclick={() => (activeFilter = 'all')}
		>
			Todas
		</button>
		<button
			type="button"
			class="filter-btn"
			class:is-active={activeFilter === 'sublime'}
			onclick={() => (activeFilter = 'sublime')}
		>
			Sublime 🏆
		</button>
		<button
			type="button"
			class="filter-btn"
			class:is-active={activeFilter === '5'}
			onclick={() => (activeFilter = '5')}
		>
			Excelente (5)
		</button>
		<button
			type="button"
			class="filter-btn"
			class:is-active={activeFilter === '4'}
			onclick={() => (activeFilter = '4')}
		>
			Muy buena (4)
		</button>
		<button
			type="button"
			class="filter-btn"
			class:is-active={activeFilter === '3'}
			onclick={() => (activeFilter = '3')}
		>
			Buena (3)
		</button>
	</div>

	<div class="filter-bar filter-bar--tags" aria-label="Filtrar por etiqueta y zona">
		<div class="filter-row tags-row">
			{#each TAG_OPTIONS as tag (tag)}
				<button
					type="button"
					class="filter-pill"
					class:active={selectedTags.has(tag)}
					onclick={() => toggleTag(tag)}
				>
					{tag}
				</button>
			{/each}
		</div>

		<div class="filter-row zone-row">
			<label class="zone-label" for="zone-filter">Zona</label>
			<select
				id="zone-filter"
				class="zone-select"
				value={selectedZone ?? ''}
				onchange={(e) => {
					const v = e.currentTarget.value;
					selectedZone = v === '' ? null : v;
				}}
			>
				<option value="">Todas las zonas</option>
				{#each ZONE_OPTIONS as z (z)}
					<option value={z}>{z}</option>
				{/each}
			</select>
		</div>

		<p class="filter-count">
			Mostrando {filtered.length} de {restaurants.length} restaurantes
		</p>

		{#if hasActiveFilters}
			<button type="button" class="filter-clear" onclick={clearAllFilters}>Quitar filtros</button>
		{/if}
	</div>

	{#key filterListKey}
		<div class="card-grid">
			{#each filtered as r, i (r.name)}
				<article class="rest-card" in:fade={{ duration: 240, delay: Math.min(i * 35, 180) }} out:fade={{ duration: 180 }}>
					<div class="rest-header">
						<h3>{r.name}</h3>
						<SidraRating rating={r.rating} />
					</div>
					<div class="rest-body">
						<p class="meta">{r.address}</p>
						{#if r.phone}
							<p class="meta"><a href={`tel:${r.phone.replace(/\s+/g, '')}`}>{r.phone}</a></p>
						{/if}
						{#if r.tags?.length}
							<p class="rest-tags" aria-label="Etiquetas">
								{#each r.tags as tag (tag)}
									<span class="tag-stamp">{tag}</span>
								{/each}
							</p>
						{/if}
						<p class="description">{@html autolink(escapeHtml(r.description))}</p>
						{#if r.url}
							<p class="card-actions">
								<a href={r.url} target="_blank" rel="noopener noreferrer">Web oficial →</a>
							</p>
						{/if}
						<div class="card-actions-row">
							<FavoriteButton slug={`rest-${slugify(r.name)}`} name={r.name} />
							<ShareWhatsApp
								name={r.name}
								description={r.description.length > 140 ? r.description.slice(0, 137) + '…' : r.description}
							/>
							<QuickRating itemId={`rest-${slugify(r.name)}`} label="¿Qué tal?" />
						</div>
						<button
							type="button"
							class="concierge-toggle"
							onclick={() => toggleConcierge(r)}
							aria-expanded={activeChat === r.name}
						>
							💬 Pregúntale al concierge
						</button>
					</div>
					{#if activeChat === r.name}
						<div class="inline-concierge" transition:fade={{ duration: 180 }}>
							<div class="inline-concierge__head">
								<span class="inline-concierge__title">Concierge</span>
								<button
									type="button"
									class="inline-concierge__close"
									onclick={closeConcierge}
									aria-label="Cerrar chat"
								>
									✕
								</button>
							</div>
							<div class="inline-concierge__messages" role="log" aria-live="polite">
								{#each visibleInlineMessages as m, mi (`${m.role}-${mi}-${m.text.slice(0, 24)}`)}
									<div class="inline-msg" class:inline-msg--user={m.role === 'user'}>
										<div
											class="inline-msg__bubble"
											class:inline-msg__bubble--user={m.role === 'user'}
										>
											{#if m.role === 'assistant'}
												{@html formatInlineAssistant(m.text)}
											{:else}
												{@html formatInlineUser(m.text)}
											{/if}
										</div>
									</div>
								{/each}
								{#if inlineLoading}
									<div class="inline-msg">
										<div class="inline-msg__bubble inline-msg__bubble--loading" aria-hidden="true">
											<span class="inline-dots">…</span>
										</div>
									</div>
								{/if}
							</div>
							<div class="inline-concierge__input-row">
								<input
									class="inline-concierge__input"
									type="text"
									placeholder="Otra pregunta…"
									bind:value={inlineInput}
									disabled={inlineLoading}
									onkeydown={onInlineKeydown}
									aria-label="Siguiente pregunta al concierge"
								/>
								<button
									type="button"
									class="inline-concierge__send"
									disabled={inlineLoading || !inlineInput.trim()}
									onclick={sendInlineFollowUp}
								>
									Enviar
								</button>
							</div>
						</div>
					{/if}
				</article>
			{/each}
		</div>
	{/key}

	<h2>Uviéu y la calle Gascona</h2>

	<p>
		Si te vas a la capital, la sidrería también se vive con intensidad. La famosa
		<strong>Calle Gascona</strong> es la “Senda’l culín” por antonomasia: una sucesión de locales
		donde el ritual del escanciado se convierte en paseo. Es perfecta pa una ruta corta y
		compartida: pocos culines en cada sitio, pinchu, y a otra sidrería. No se trata de “ganarle” a
		la calle: se trata de <em>gozarla</em> sin prisas, con respeto al oficiu y a la xente que trabaja
		en barra.
	</p>

	<p>
		En Uviéu hay mucho más allá de Gascona (barrios, plazas, cocina tradicional, marisquerías…),
		pero si vienes de fuera y quieres un “primer contacto” con la sidrería en modo ciudad, Gascona
		es un buen aperitivo cultural. Luego ya te buscas sidrerías de barrio, menús de cercanía y
		sitios donde el cachopo pesa lo suyo en la mesa… y en la conciencia.
	</p>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/bares" class="related-link"
				>🍺 Bares y cafés<span>Pa tomar un culín entre comida y comida</span></a
			>
			<a href="/mapa" class="related-link"
				>🗺️ Ver nel mapa<span>Toles sidrerías y restaurantes ubicaos</span></a
			>
			<a href="/practico" class="related-link"
				>📋 Info práctica<span>Horarios, propinas y consejos pa comer</span></a
			>
		</div>
	</div>

	<ShareButtons title="Restaurantes y sidrerías en Asturias" description="Dónde comer de verdá en Xixón y alrededores" />
	<CommentSection
		title="💬 ¿Conoces algún sitio más? ¿Qué tal comiste? ¡Cuéntanos!"
		page="/restaurantes"
	/>
</main>

<style>
	.filter-bar--rating {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 1.25rem 0 1.5rem;
	}

	.filter-bar--tags {
		margin: 1.5rem 0;
	}

	.filter-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.filter-row.tags-row {
		flex-wrap: nowrap;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 0.2rem;
		margin-bottom: 0.75rem;
		scrollbar-width: thin;
	}

	@media (min-width: 768px) {
		.filter-row.tags-row {
			flex-wrap: wrap;
			overflow-x: visible;
			padding-bottom: 0;
		}
	}

	.filter-pill {
		padding: 0.35rem 0.85rem;
		border-radius: 20px;
		font-size: 0.82rem;
		flex-shrink: 0;
		border: 1px solid var(--color-border);
		background: var(--color-card);
		cursor: pointer;
		transition: all 0.2s;
		color: var(--color-text);
		font: inherit;
	}

	.filter-pill:hover {
		border-color: var(--color-accent);
	}

	.filter-pill.active {
		background: var(--color-accent);
		color: white;
		border-color: var(--color-accent);
	}

	.zone-row {
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem 0.75rem;
	}

	.zone-label {
		font-size: 0.85rem;
		color: var(--color-text-muted);
		font-weight: 600;
	}

	.zone-select {
		min-width: min(100%, 12rem);
		padding: 0.4rem 0.65rem;
		border-radius: 8px;
		border: 1px solid var(--color-border);
		background: var(--color-card);
		color: var(--color-text);
		font: inherit;
		font-size: 0.88rem;
		cursor: pointer;
	}

	.filter-count {
		font-size: 0.85rem;
		color: var(--color-text-muted);
		margin: 0 0 1rem;
	}

	.filter-clear {
		appearance: none;
		border: none;
		background: transparent;
		color: var(--color-accent);
		font: inherit;
		font-weight: 600;
		font-size: 0.88rem;
		cursor: pointer;
		text-decoration: underline;
		text-underline-offset: 3px;
		padding: 0;
		margin: -0.35rem 0 0;
	}

	.filter-clear:hover {
		opacity: 0.85;
	}

	.filter-btn {
		appearance: none;
		border: 1px solid var(--color-border);
		background: var(--color-card);
		color: var(--color-text);
		padding: 0.5rem 0.9rem;
		border-radius: 999px;
		font: inherit;
		cursor: pointer;
		transition:
			background 0.15s ease,
			border-color 0.15s ease,
			transform 0.1s ease;
	}

	.filter-btn:hover {
		transform: translateY(-1px);
		border-color: var(--color-accent);
	}

	.filter-btn.is-active {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: var(--color-hero-text);
	}

	.rest-card {
		background: var(--color-card);
		border-radius: var(--radius);
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
		transition: box-shadow 0.3s, transform 0.3s;
	}

	.rest-card:hover {
		box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
		transform: translateY(-2px);
	}

	.rest-header {
		background: var(--color-hero-bg);
		padding: 1.1rem 1.4rem;
	}

	.rest-header h3 {
		margin: 0;
		font-size: 1.45rem;
		font-weight: 700;
		line-height: 1.25;
		color: #fff;
		font-family: var(--font-heading);
		word-break: break-word;
	}

	.rest-body {
		padding: 1.1rem 1.4rem 1.4rem;
	}

	.rest-tags {
		margin: 0.5rem 0 0;
		line-height: 1.5;
	}

	.meta {
		margin: 0.15rem 0;
		font-size: 0.92rem;
		color: var(--color-text-muted);
	}

	.meta a {
		color: var(--color-text-muted);
	}

	.meta a:hover {
		color: var(--color-accent);
	}

	.description {
		margin: 0.75rem 0 0;
		font-size: 0.92rem;
	}

	.card-actions {
		margin: 0.75rem 0 0;
	}

	.card-actions a {
		font-weight: 600;
		color: var(--color-accent);
	}

	.card-actions-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 0.75rem;
		margin-top: 0.85rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--color-border);
	}

	.related-pages {
		margin: 2.5rem 0 1rem;
	}

	.related-pages h2 {
		font-size: 1.15rem;
		margin-bottom: 0.75rem;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 0.75rem;
	}

	.related-link {
		display: block;
		padding: 1rem;
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius, 12px);
		text-decoration: none;
		color: var(--color-text);
		font-weight: 600;
		font-size: 0.95rem;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.related-link:hover {
		border-color: var(--color-accent);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
		text-decoration: none;
		color: var(--color-text);
	}

	.related-link span {
		display: block;
		font-weight: 400;
		font-size: 0.82rem;
		color: var(--color-text-muted);
		margin-top: 0.2rem;
	}

	.concierge-toggle {
		appearance: none;
		margin-top: 0.65rem;
		padding: 0.45rem 0.75rem;
		font: inherit;
		font-size: 0.86rem;
		font-weight: 600;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--color-accent) 45%, var(--color-border));
		background: color-mix(in srgb, var(--color-accent) 10%, var(--color-card));
		color: var(--color-text);
		cursor: pointer;
		transition:
			background 0.2s,
			border-color 0.2s;
	}

	.concierge-toggle:hover {
		background: color-mix(in srgb, var(--color-accent) 18%, var(--color-card));
		border-color: var(--color-accent);
	}

	.inline-concierge {
		margin-top: 0;
		padding: 0.85rem 1.1rem 1rem;
		border-top: 1px solid var(--color-border);
		background: color-mix(in srgb, var(--color-card) 94%, var(--color-border));
	}

	.inline-concierge__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.55rem;
	}

	.inline-concierge__title {
		font-size: 0.78rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-text-muted);
	}

	.inline-concierge__close {
		appearance: none;
		width: 1.85rem;
		height: 1.85rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		border-radius: 8px;
		background: transparent;
		color: var(--color-text-muted);
		font-size: 1rem;
		line-height: 1;
		cursor: pointer;
	}

	.inline-concierge__close:hover {
		background: color-mix(in srgb, var(--color-border) 80%, transparent);
		color: var(--color-text);
	}

	.inline-concierge__messages {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		max-height: 11rem;
		overflow-y: auto;
		margin-bottom: 0.55rem;
	}

	.inline-msg {
		display: flex;
		justify-content: flex-start;
	}

	.inline-msg--user {
		justify-content: flex-end;
	}

	.inline-msg__bubble {
		max-width: 92%;
		padding: 0.45rem 0.6rem;
		border-radius: 10px;
		font-size: 0.86rem;
		line-height: 1.45;
		word-wrap: break-word;
		background: color-mix(in srgb, var(--color-card) 90%, var(--color-border));
		border: 1px solid var(--color-border);
		color: var(--color-text);
	}

	.inline-msg__bubble--user {
		background: var(--color-accent);
		color: #fff;
		border-color: var(--color-accent);
	}

	.inline-msg__bubble--loading {
		min-width: 3rem;
		opacity: 0.85;
	}

	.inline-dots {
		animation: inline-pulse 1s ease-in-out infinite;
	}

	@keyframes inline-pulse {
		50% {
			opacity: 0.35;
		}
	}

	.inline-concierge__input-row {
		display: flex;
		gap: 0.45rem;
		align-items: center;
	}

	.inline-concierge__input {
		flex: 1;
		min-width: 0;
		padding: 0.45rem 0.6rem;
		font: inherit;
		font-size: 0.88rem;
		border-radius: 8px;
		border: 1px solid var(--color-border);
		background: var(--color-card);
		color: var(--color-text);
	}

	.inline-concierge__input:focus {
		outline: none;
		border-color: var(--color-accent);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-accent) 22%, transparent);
	}

	.inline-concierge__send {
		appearance: none;
		flex-shrink: 0;
		padding: 0.45rem 0.75rem;
		font: inherit;
		font-size: 0.86rem;
		font-weight: 600;
		border: none;
		border-radius: 8px;
		background: var(--color-accent);
		color: #fff;
		cursor: pointer;
	}

	.inline-concierge__send:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}
</style>
