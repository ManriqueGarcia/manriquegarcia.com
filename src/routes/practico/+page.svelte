<script>
	import CommentSection from '$lib/components/CommentSection.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import AiSummary from '$lib/components/AiSummary.svelte';

	const pageTitle = 'Información práctica | ¡Puxa Asturies!';
	const pageDesc =
		'Información práctica para visitar Asturias: cómo llegar, transporte, teléfonos útiles, clima, gastronomía, sidra y costumbres.';
	const canonical = 'https://manriquegarcia.com/practico';

	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://manriquegarcia.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Info Práctica', item: 'https://manriquegarcia.com/practico' }
		]
	});

	const faqJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: '¿Cómo llegar a Asturias?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Puedes llegar en avión al aeropuerto de Asturias (OVD), en tren con Renfe/ALSA, o en coche por la A-66 o la autovía del Cantábrico.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Cómo moverse por Gijón?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Gijón se recorre fácil a pie. También hay autobuses urbanos y puedes alquilar bicicletas. Para pueblos cercanos necesitarás coche.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Qué tiempo hace en Asturias?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Asturias tiene clima oceánico. Llueve bastante, las temperaturas son suaves (8-25°C) y siempre hay que llevar chubasquero, incluso en verano.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Se deja propina en Asturias?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'No es obligatorio pero se agradece. Redondear la cuenta o dejar 1-2€ en restaurantes es lo habitual.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Qué es el escanciado de sidra?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Es la forma tradicional de servir sidra asturiana: se vierte desde altura para que la sidra se oxigene y coja ese punto espumoso. Se sirve en un culín (vaso pequeño) y se bebe de un trago.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Cuáles son los platos típicos de Asturias?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'La fabada asturiana, el cachopo, los oricios, el pixín (rape), los quesos (Cabrales, Gamonéu, Afuega el Pitu), y la tortilla de patatas son imprescindibles.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Qué ropa llevar a Asturias?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Chubasquero o paraguas siempre, calzado cómodo para caminar, y ropa de capas porque la temperatura cambia varias veces al día. Bañador también, incluso en primavera.'
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
		content="Información práctica para visitar Asturias — ¡Puxa Asturies!"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content="https://manriquegarcia.com/images/og-image.png" />
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}<\/script>`}
	{@html `<script type="application/ld+json">${faqJsonLd}<\/script>`}
</svelte:head>

<main class="container">
	<h1>Información práctica (pa que nun te pierdas)</h1>
	<Breadcrumb items={[{ label: 'Práctico' }]} />

	<AiSummary
		pageTitle={pageTitle}
		pageContent="Info práctica sobre clima, transporte, sidra y consejos para viajar a Asturias"
	/>

	<p class="page-intro">
		Lo básico pa llegar, moverte, comer y llamar a quién toque si pasa dalgo. Nada de postureo: esto ye lo
		que te diría un amigu en el chigre antes del segundu culín.
	</p>

	<div class="section-note">
		<p>
			<strong>Conseyu asturianu:</strong> si llueve (y va llover), nun te enfades: ye parte del
			charme. Lleva paragües o chubasquero y sigues siendo guay.
		</p>
	</div>

	<h2>Cómo llegar</h2>
	<p>
		<strong>Aeropuerto de Asturias (OVD):</strong> ta a unos <strong>40 km de Xixón</strong>. Vuelos
		nacionales y dalgunu internacional; desde ahí, bus o coche pa la costa. Fácil de pillar si vienes
		de lejos y nun quieres dar mil vueltes.
	</p>
	<p>
		<strong>Autobús (ALSA):</strong> bien conectáu con otras ciudáes; ye opción top si vienes con
		maleta y presupuestu comedíu. Mira horarios en la web de ALSA y va con margen, que el tráficu en
		festivu existe.
	</p>
	<p>
		<strong>Tren (RENFE / FEVE):</strong> la red ferroviaria asturiana ye de eses que molan pa mirar
		paisaxe. FEVE va costeando; RENFE pa trayectos más largos. Si vienes en tren, llegarás con ganas
		de sidra, casi seguro.
	</p>
	<p>
		<strong>Carretera:</strong> la <strong>A-8</strong> escueye la costa cantábrica como si fuera
		una autopista con vistas; la <strong>A-66</strong> une con el interior y el sur de la región.
		Buen asfaltu, respetu al límite y ojo co' niebla en inviernu.
	</p>

	<h2>Moverse por Xixón</h2>
	<p>
		<strong>Bus urbanu (EMTUSA):</strong> la forma cómoda de saltar de la playa al centro sin sudar la
		camiseta. Horarios razonables; si vas pa un barrio concretu, mira la llinia en la parada o na app.
	</p>
	<p>
		<strong>Taxi:</strong> <strong>Radio Taxi 985 252 500</strong> — guarda el númberu, que a
		medianueche ye oru puro.
	</p>
	<p>
		<strong>Bici y andando:</strong> Xixón se disfruta a pasu lentu: paseu marítimu, Cimadevilla,
		subidicas que entrenen pierna... Si alquilas bici o traes la tuya, respeta carriles y peatones: aquí
		la xente va con prisa pero con educación (naide perfectu, eh).
	</p>
	<p>
		<strong>Coche de alquiler:</strong> imprescindible si quieres explorar pueblos, montaña o la costa
		occidental. Hay oferta en el aeropuerto y en Xixón centro. Las carreteras de montaña son estrechas
		pero con vistas que compensan cada curva. Aparcamiento en Xixón: en el centro ye limitáu, usa los
		parkings subterráneos (Begoña, Plaza Mayor, Puerto Deportivo).
	</p>

	<h2>Teléfonos útiles</h2>
	<div class="table-scroll">
		<table class="dict-table">
			<thead>
				<tr>
					<th>Qué</th>
					<th>Númberu</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Emerxencias (todo en uno)</td>
					<td><strong>112</strong></td>
				</tr>
				<tr>
					<td>Policía Llocal</td>
					<td><strong>092</strong></td>
				</tr>
				<tr>
					<td>Guardia Civil</td>
					<td><strong>062</strong></td>
				</tr>
				<tr>
					<td>Hospital de Cabueñes (Xixón)</td>
					<td><strong>985 185 000</strong></td>
				</tr>
				<tr>
					<td>HUCA - Hospital Central de Asturias (Uviéu)</td>
					<td><strong>985 108 000</strong></td>
				</tr>
				<tr>
					<td>Farmacia de guardia (información)</td>
					<td><strong>010</strong></td>
				</tr>
				<tr>
					<td>Radio Taxi Xixón</td>
					<td><strong>985 252 500</strong></td>
				</tr>
				<tr>
					<td>EMTUSA (bus urbanu Xixón)</td>
					<td><strong>985 291 811</strong></td>
				</tr>
				<tr>
					<td>ALSA (autobuses interurbanos)</td>
					<td><strong>902 422 242</strong></td>
				</tr>
			</tbody>
		</table>
	</div>

	<h2>La sidra: manual de supervivencia</h2>
	<p>
		La sidra ye la bebida sagrada d'Asturies. Si vienes y nun pruebas un culín, ye como ir a Roma y nun
		ver al Papa: técnicamente posible, pero ¿pa qué?
	</p>
	<p>
		<strong>El escanciado:</strong> la sidra asturiana se sirve escanciao — el camareru (o tú, si te
		atreves) vierte la botella desde arriba pa que la sidra caya con fuerza nel vasu y se oxigene.
		Se sirve un <strong>culín</strong> (un dedín de sidra nel vasu) y se bebe d'un trago. Si
		dexes un pocu nel fondu del vasu, tíralo al suelu — antes los vasos eran compartidos
		y al tirar lo que sobraba se llimpiaba el borde pal siguiente. Hoy nun se comparte vasu,
		pero la costumbre quedó.
	</p>
	<p>
		<strong>Cuánto cuesta:</strong> una botella de sidra natural en sidrería ronda los
		<strong>4-6 euros</strong>. Con una botella salen unos 6-7 culines. Un menú del día en
		sidrería cuesta entre <strong>12 y 18 euros</strong> con primer platu, segundu, postre, pan
		y sidra o agua.
	</p>
	<p>
		<strong>Sidra natural vs. sidra de nueva expresión:</strong> la natural ye la clásica
		(escanciao obligatorio, sabor ácidu-afrutáu); la de nueva expresión viene con burbujas como
		el champán y nun necesita escanciar. Ambas son buenísimes, pero un asturianu de cepa
		siempre te va recomendar la natural.
	</p>
	<p>
		<strong>Temporada de sidra:</strong> la sidra natural se elabora entre octubre y enero, y
		se empieza a beber en primavera (les espichas, cuando se abren los toneles). L'añada varía
		de sabor cada año según la mazana. En verano se bebe a tope; en inviernu la xente tira más
		pa sidra de nueva expresión o vinu.
	</p>

	<h2>Comer en Asturias: lo esencial</h2>
	<p>
		Asturies ye una potencia gastronómica que come bastante por encima de lo que su tamaño sugiere.
		Aquí van los imprescindibles:
	</p>
	<p>
		<strong>Fabada asturiana:</strong> el platu estrella. Fabes de la granja, compango (morcilla,
		chorizu, tocín, lacón) y hores de fueu lentu. Pídela solo si tienes hambre de verdá: ye
		contundente como un abrazu asturianu.
	</p>
	<p>
		<strong>Cachopo:</strong> dos filetes de ternera empanaos con jamón y quesu nel mediu. El
		tamaño ye brutal: un cachopo individual alimenta a dos personas normales (o a un asturianu
		hambrientu). Hay versiones con centollo, boletus, cabrales...
	</p>
	<p>
		<strong>Mariscu y pescáu:</strong> oricios (erizos de mar), percebes, nécores, pixín (rape),
		bonitu del norte, xarda (caballa)... si te gusta el mar, Asturies ye un paraísu. Na costa los
		precios son razonables comparaos con otras zonas turístiques.
	</p>
	<p>
		<strong>Quesos:</strong> Asturies tien más de <strong>40 variedades de quesu</strong>. El
		Cabrales ye el más famoso (azul, intensu), pero tamién el Afuega'l Pitu, el Beyos, el Gamonéu,
		el Vidiago y decenes más. Pide una tabla de quesos asturianos y descubre.
	</p>
	<p>
		<strong>Postres:</strong> arroz con leche (el de verdá, con costra de canela quemada),
		frixuelos (crepes fininos), casadielles (empanadillas dulces de nuez) y torrija asturiana
		empapada en sidra. Pa chuparse los deos.
	</p>

	<h2>Costumbres y propinas</h2>
	<p>
		Aquí <strong>nun hai propina obligatoria</strong> como en otros sitios: si el serviciu mola,
		<strong>redondes</strong> la cuenta o dexas un pocu más, pero nun te sientas mal si nun llevas
		suelto. Lo importante ye el respetu al personal del bar o del restaurante — eso sí que cuenta.
	</p>
	<p>
		<strong>Horarios de comida:</strong> la comida suele ser sobre las <strong>14:00-16:00</strong> y
		la cena <strong>21:00-23:00</strong>. Si pides cena a las 19:00, igual te miran con cariñu... o con
		pena. Los <strong>domingos</strong> muchas tiendas cierran o abren menos: planifica la compra o
		vas a comer bocadillo de máquina (nun ye plan ideal, créenos).
	</p>
	<p>
		<strong>El "ir de chigres":</strong> ye la versión asturiana del tapeo. Entras en un bar, pides
		un culín y una tapa (o un pinchin), y a los 15-20 minutos cambias de local. Así se puede hacer
		una ruta de 5-6 chigres en una nueche sin problema. La zona clásica en Xixón ye la calle
		de la Corrida, el barrio de Cimadevilla y el Muro de San Lorenzo.
	</p>

	<h2>Clima por estaciones</h2>
	<p>
		Asturies ye <strong>lluviosa</strong>: lleva <strong>chubasquero o paragües</strong> aunque el
		móvil diga "soleáu", que aquí el Cantábricu cambia de humor en cinco minutos.
	</p>
	<p>
		<strong>Primavera (marzo-mayo):</strong> temperaturas entre 10 y 20 °C, florece too el verde que
		vas a fotografiar. Llueve, sí, pero con intermitencia: sol y lluvia se alternan nel mesmu día.
		Ideal si quieres evitar aglomeraciones y disfrutar de paisaxe sin cola.
	</p>
	<p>
		<strong>Veranu (junio-septiembre):</strong> la época estrella pa playa. Las temperatures
		raramente pasan de 28 °C, así que ye un refugio pa quien fuxe del calor del sur. Eso sí,
		agosto ta petáu: reserva con tiempu.
	</p>
	<p>
		<strong>Seronda / otoño (octubre-noviembre):</strong> la seronda asturiana ye espectacular: colores ocre,
		castañes, setes y los montes en modo postal. Más lluvia, pero tolo compensa con gastronomía
		de temporada (fabada, callos, pote, amagüestu).
	</p>
	<p>
		<strong>Inviernu (diciembre-febrero):</strong> perfecto pa cocina de cuchara, mariscu y
		sidra nel chigre. Nieva en los Picos de Europa y les estaciones de esquí funcionan. Na costa
		el fríu ye moderáu, sobre 8-12 °C, pero húmedu. Los mercados de Navidá en Uviéu son una pasada.
	</p>

	<h2>Qué llevar en la maleta</h2>
	<p>
		<strong>Chubasquero o paragües:</strong> da igual la época. Ye el accesorio estrella n'Asturies.
		Quien viene sin ún, acaba comprándolu nel primer bazar.
	</p>
	<p>
		<strong>Calzáu cómodo:</strong> vas caminar muncho — playa, casco viejo, sendas verdes,
		subidicas a miradores. Nun ye sitiu de tacón (bueno, excepto pa salir de noche, y aun así...).
	</p>
	<p>
		<strong>Ropa de capes:</strong> la temperatura cambia varias veces al día. Una camiseta,
		un forro polar o chaqueta fina y el chubasquero encima ye la fórmula mágica.
	</p>
	<p>
		<strong>Bañador:</strong> sí, incluso si vienes en mayo. El Cantábricu ye frío pero refrescante,
		y si pilla un día de sol vas querer metete na playa de San Lorenzo aunque sea cinco minutos.
	</p>
	<p>
		<strong>Protector solar:</strong> el sol asturianu ye traicioneru. Cuando sale, pega de verdá.
		La gente se confía porque "está nublado" y acaba colorao como un pixín.
	</p>

	<h2>Frases útiles en asturiano</h2>
	<p>
		L'asturianu (bable) nun ye un dialecto: ye una llingua propia con gramática, lliteratura y
		una comunidad que la cuida. Aunque todo el mundo habla castellano, soltar alguna expresión
		en asturianu te va ganar sonrises y respetu. Aquí tienes les más prácticas:
	</p>
	<div class="table-scroll">
		<table class="dict-table">
			<thead>
				<tr>
					<th>Asturiano</th>
					<th>Castellano</th>
					<th>Cuándo usala</th>
				</tr>
			</thead>
			<tbody>
				<tr><td>¡Puxa Asturies!</td><td>¡Viva Asturias!</td><td>Siempre. Ye el grito de guerra.</td></tr>
				<tr><td>¿Qué tal, ñeru?</td><td>¿Qué tal, amigo?</td><td>Al saludar a alguien de confianza.</td></tr>
				<tr><td>Ponme un culín</td><td>Ponme una sidra</td><td>En cualquier sidrería.</td></tr>
				<tr><td>Toi afayadísimu</td><td>Estoy a gustísimo</td><td>Cuando te pregunten qué tal.</td></tr>
				<tr><td>¿Hai fabada?</td><td>¿Hay fabada?</td><td>Nada más sentarte nel restaurante.</td></tr>
				<tr><td>Ye lo que hai</td><td>Es lo que hay</td><td>Pa resignarte con filosofía.</td></tr>
				<tr><td>Tas tayao</td><td>Estás loco</td><td>Si alguien propone algo descabellao.</td></tr>
				<tr><td>Presta mucho</td><td>Me encanta / Mola mucho</td><td>Cuando algo te guste de verdá.</td></tr>
				<tr><td>¡Qué fríu fai!</td><td>¡Qué frío hace!</td><td>Casi cualquier mañana de inviernu.</td></tr>
				<tr><td>Echa un culín</td><td>Sirve una sidra</td><td>Si quieres hacerte el entendíu.</td></tr>
			</tbody>
		</table>
	</div>

	<h2>Datos prácticos rápidos</h2>
	<div class="table-scroll">
		<table class="dict-table">
			<thead>
				<tr>
					<th>Dato</th>
					<th>Detalle</th>
				</tr>
			</thead>
			<tbody>
				<tr><td>Moneda</td><td>Euro (€). Tarjetas aceptadas en casi todos los sitios.</td></tr>
				<tr><td>Idioma</td><td>Castellano (oficial) y asturiano/bable (cooficial en trámite).</td></tr>
				<tr><td>Zona horaria</td><td>CET (UTC+1) / CEST en verano (UTC+2).</td></tr>
				<tr><td>Corriente eléctrica</td><td>230V, 50Hz. Enchufes tipo C y F (europeo estándar).</td></tr>
				<tr><td>Agua del grifo</td><td>Se bebe sin problema. Ye de las mejores de España.</td></tr>
				<tr><td>WiFi</td><td>Disponible en casi todos los hoteles, bares y restaurantes.</td></tr>
				<tr><td>Propina</td><td>No obligatoria. Redondear o dejar 1-2 euros se agradece.</td></tr>
				<tr><td>Urgencias</td><td>Teléfono 112 (policía, ambulancia, bomberos).</td></tr>
				<tr><td>Mejor época</td><td>Junio-septiembre pa playa; todo el año pa gastronomía y naturaleza.</td></tr>
				<tr><td>Aparcamiento Xixón</td><td>Zona azul en centro. Parkings: Begoña, Plaza Mayor, Puerto Deportivo.</td></tr>
			</tbody>
		</table>
	</div>

	<div class="related-pages">
		<h2>Tamién te puede interesar</h2>
		<div class="related-grid">
			<a href="/restaurantes" class="related-link"
				>🍴 Dónde comer<span>Les sidrerías y restaurantes</span></a
			>
			<a href="/diccionario" class="related-link"
				>📖 Diccionario<span>Frases pa entenderte con la xente</span></a
			>
			<a href="/mapa" class="related-link">🗺️ Mapa interactivo<span>Too ubicao nun mesmu sitiu</span></a>
		</div>
	</div>

	<ShareButtons title="Información práctica de Asturias" description="Cómo llegar, moverse, comer y sobrevivir" />
	<CommentSection
		title="Comentarios — información práctica"
		placeholder="¿Dalgo que añadirías pa otros visitantes? Cuéntanoslo..."
		page="/practico"
	/>
</main>

<style>
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
</style>
