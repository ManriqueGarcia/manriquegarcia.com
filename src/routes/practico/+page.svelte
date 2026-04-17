<script>
	import CommentSection from '$lib/components/CommentSection.svelte';

	const pageTitle = 'Información práctica | ¡Puxa Asturies!';
	const pageDesc =
		'Información práctica para visitar Asturias: cómo llegar, transporte, teléfonos útiles, clima y costumbres.';
	const canonical = 'https://manriquegarcia.com/practico';
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
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDesc} />
</svelte:head>

<main class="container">
	<h1>Información práctica (pa que nun te pierdas)</h1>

	<p class="page-intro">
		Lo básico pa llegar, moverte y llamar a quién toque si pasa dalgo. Nada de postureo: esto ye lo
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
		Buen asfaltu, respetu al límite y ojo co’ niebla en inviernu.
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
		subidicas que entrenen pierna… Si alquilas bici o traes la tuya, respeta carriles y peatones: aquí
		la xente va con prisa pero con educación (naide perfectu, eh).
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
					<td>Farmacia de guardia (información)</td>
					<td><strong>010</strong></td>
				</tr>
			</tbody>
		</table>
	</div>

	<h2>Costumbres y propinas</h2>
	<p>
		Aquí <strong>nun hai propina obligatoria</strong> como en otros sitios: si el serviciu mola,
		<strong>redondes</strong> la cuenta o dexas un pocu más, pero nun te sientas mal si nun llevas
		suelto. Lo importante ye el respetu al personal del bar o del restaurante — eso sí que cuenta.
	</p>
	<p>
		<strong>Horarios de comida:</strong> la comida suele ser sobre las <strong>14:00–16:00</strong> y
		la cena <strong>21:00–23:00</strong>. Si pides cena a las 19:00, igual te miran con cariñu… o con
		pena. Los <strong>domingos</strong> muchas tiendas cierran o abren menos: planifica la compra o
		vas a comer bocadillo de máquina (nun ye plan ideal, créenos).
	</p>

	<h2>Clima</h2>
	<p>
		Asturies ye <strong>lluviosa</strong>: lleva <strong>chubasquero o paragües</strong> aunque el
		móvil diga “soleáu”, que aquí el Cantábrico cambia de humor en cinco minutos. Los
		<strong>veranos</strong> son <strong>suaves</strong>, más o menos <strong>18–25 °C</strong>; los
		<strong>iviernos</strong>, <strong>templaos</strong> al comparar con el interior peninsular,
		<strong>8–14 °C</strong> como referencia, con xornaes de niebla que parecen de película en blanco y
		negru.
	</p>

	<CommentSection
		title="Comentarios — información práctica"
		placeholder="¿Dalgo que añadirías pa otros visitantes? Cuéntanoslo…"
		page="/practico"
	/>
</main>
