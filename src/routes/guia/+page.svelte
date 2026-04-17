<script>
	import { onMount } from 'svelte';

	const ratingLabel = { 3: '★★★ Buena', 4: '★★★★ Muy buena', 5: '★★★★★ Excelente', sublime: '★★★★★+ Sublime' };

	const restaurants = [
		{ name: 'Casa Trabanco', rating: 'sublime', address: 'Camín de la Sidra, Lavandera, Gijón', phone: '985 16 72 86', url: 'casatrabanco.com', description: 'LA sidrería. Producen su propia sidra, la comida ye espectacular, y el sitio — un lagar rodeado de manzanos — ye pa quedase vivir.' },
		{ name: 'El Sauco', rating: 5, address: 'C/ Valencia 20, 33210 Gijón', phone: '985 39 83 30', url: 'elsauco.com', description: 'Sidra, pinchos, menú y carta. Todo riquísimo. Nunca falta en nuestra ruta xixonenca.' },
		{ name: 'Parrilla Antonio', rating: 4, address: 'Roncal 1, 33208 Gijón', phone: '985 154 973', description: 'Pinchos y parrilla de cara al público. Choricitos y queso cabrales pa chuparse los deos.' },
		{ name: 'Sidrería Nava', rating: 4, address: 'C/ de la Serena 1, 33208 Gijón', phone: '985 380 447', description: 'Sidra de primera, pinchos que nun fallan, buen menú del día.' },
		{ name: 'La Galana', rating: 4, address: 'Plaza Mayor 10, 33201 Gijón', phone: '985 17 24 29', description: 'Céntrico, sidra buena, comida muy buena. Vistes a la Plaza Mayor.' },
		{ name: 'La Chalana', rating: 4, address: 'C/ San José 31, 33209 Gijón', phone: '98 516 48 27', url: 'lachalana.com', description: 'Especialidad en marisco. Merece cada céntimo.' },
		{ name: 'El Celorio', rating: 4, address: 'C/ Juliana Domingo 6, 33212 Gijón', phone: '984 393 962', description: 'El cachopo asturiano: bistec + jamón + queso + pimientos. Un cuarto ya da pa dos.' },
		{ name: 'Casa Ferino', rating: 4, address: 'Ctra. de la Carbonera, 33209 Gijón', phone: '985 380 471', url: 'casaferino.com', description: 'Los callos de Casa Ferino son legendarios. Vuelan por la noche.' },
		{ name: 'El Llagar del Quesu', rating: 5, address: 'Bobes 2, 33429 Siero', phone: '98 579 28 94', description: 'Parrilla tipo argentina en Siero. Decoración guapísima, ambiente acogedor.' },
		{ name: 'Sidrería El Globo', rating: 3, address: 'C/ San Bernardo 13, 33201 Gijón', phone: '985 17 22 47', url: 'sidreriaelglobo.es', description: 'Comida típica asturiana sin florituras.' },
		{ name: 'Sidrería La Costa', rating: 4, address: 'Av. Costa 32, 33205 Gijón', url: 'sidrerialacosta.com', description: 'Especialidad en carnes argentinas. Chuletón y entraña a la parrilla con sidra asturiana.' },
		{ name: 'Tino El Roxu', rating: 4, address: 'Av. de la Costa 30, 33204 Gijón', phone: '985 141 792', description: 'Cocina tradicional asturiana: carnes, pescados, mariscos.' },
		{ name: 'Sidrería Cabranes', rating: 4, address: 'Av. Pablo Iglesias 23, 33205 Gijón', phone: '98 513 1487', description: 'El rabo de toro ye pa llorar de la emoción.' },
	];

	const bars = [
		{ zone: 'Puerto Deportivo (Xixón)', desc: 'Escondite, Bulevar, La Habana… La noche empieza y a veces acaba aquí.' },
		{ zone: 'Zona de Fomento (Xixón)', desc: 'Bodeguita del Medio, El Diario. Más recogidín pero con mucho ambiente.' },
		{ zone: 'Zona El Rosal (Uviéu)', desc: 'Zona clásica de copas, xente de todas las edades.' },
		{ zone: 'Zona El Antiguo (Uviéu)', desc: 'Ambiente nocturno y tapeo por callejuelas con encanto.' },
	];

	const coffees = [
		{ name: 'Café de desayuno', size: 'Tazón grande', note: 'No existe en otros lugares. 70% leche, 30% café.' },
		{ name: 'Café mediano', size: 'Café con leche normal', note: 'Lo que en el resto de España es un café con leche. 55% leche, 45% café.' },
		{ name: 'Café con leche', size: 'Tamaño cortado', note: 'Ojo: aquí tiene la medida de un cortado. 45% leche, 55% café.' },
		{ name: 'Cortado', size: 'Café solo + gota', note: 'Café solo con una mancha de leche. 15% leche, 85% café.' },
	];

	const gijon = [
		{ name: 'Playa de San Lorenzo', desc: 'Playa urbana en pleno centro. El Cantábrico está fresquín… bueno, helao.' },
		{ name: 'Barrio de Cimadevilla', desc: 'La parte más vieja. Vestigios romanos, Termas de Campo Valdés, callejuelas con encanto.' },
		{ name: 'Cerro de Santa Catalina', desc: 'Elogio del Horizonte de Chillida. Panorámica de toda la costa.' },
		{ name: 'Parque Isabel la Católica', desc: 'Patos, cisnes, avestruces y pavos reales. Gratis y perfecto pa pasear.' },
		{ name: 'El Molinón', desc: 'Estadio del Real Sporting de Gijón. ¡PUXA SPORTING!' },
		{ name: 'Universidad Laboral', desc: 'El edificio más grande de España. 270.000 m² de los años 50.' },
		{ name: 'La Campa de Torres', desc: 'Parque arqueológico: restos del castro celta de Noega.' },
		{ name: 'Jardín Botánico Atlántico', desc: 'Primer jardín botánico del noroeste. Flora atlántica y senderos guapos.' },
	];

	const oviedo = [
		{ name: 'La Catedral', desc: 'Gótica, prerrománica, románica, renacentista y barroca. Cámara Santa, Patrimonio de la Humanidad.' },
		{ name: 'Barrio Antiguo', desc: 'Casco viejo. Palacio Arzobispal, Universidad Vieja (s. XVI), estatua de Woody Allen.' },
		{ name: 'Teatro Campoamor', desc: 'Teatro de ópera (1892). Premios Princesa de Asturias. Joya arquitectónica en pleno centro.' },
		{ name: 'Monte Naranco', desc: 'Santa María del Naranco (s. IX), Patrimonio de la Humanidad. Cruz de la Victoria de 35 m.' },
	];

	const pueblinos = [
		{ name: 'Candás', dist: '15 km / 40 km', desc: 'Miradores, playas, puerto pesquero. Festival de la Sardina (1 de agosto).' },
		{ name: 'Luanco', dist: '20 km / 45 km', desc: 'Zona de veraneo favorita de los asturianos. Playas guapes, buen pescao.' },
		{ name: 'Colunga', dist: '45 km / 65 km', desc: 'Tierra de dinosaurios (MUJA). Lastres pertenece a Colunga.' },
		{ name: 'Lastres', dist: '50 km / 70 km', desc: '"San Martín del Sella" de la serie Doctor Mateo.' },
		{ name: 'Cudillero', dist: '60 km / 55 km', desc: 'Casines de colores apilaes en la ladera. El pueblo más fotogénico de Asturias.' },
		{ name: 'Ribadesella', dist: '70 km / 85 km', desc: 'Descenso Internacional del Sella en piraguas. Playa de Santa Marina.' },
		{ name: 'Llanes', dist: '110 km / 130 km', desc: 'Cubos de la Memoria de Ibarrola. Playas de postal.' },
		{ name: 'Luarca', dist: '115 km / 95 km', desc: 'Villa Blanca de la Costa Verde. Puerto, faro y cementerio con vistas al mar.' },
		{ name: 'Tapia de Casariego', dist: '170 km / 150 km', desc: 'Capital del surf en Asturias. Isla del faro y playas salvajes.' },
		{ name: 'Taramundi', dist: '195 km / 175 km', desc: 'Turismo rural, navajas artesanales y Os Teixois.' },
	];

	const hotels = [
		{ name: 'Hotel Hernán Cortés', address: 'Fernández Vallín 5', phone: '985 346 000' },
		{ name: 'Hotel Begoña Park', address: 'Ctra. Providencia 566', phone: '985 133 909' },
		{ name: 'Hotel ABBA', address: 'Doctor Fleming 37', phone: '985 000 000' },
		{ name: 'Parador Molino Viejo', address: 'Parque Isabel la Católica', phone: '985 370 511' },
		{ name: 'Hotel TRYP Rey Pelayo', address: 'V. Torcuato F. Miranda 26', phone: '985 199 800' },
		{ name: 'Hotel AC Gijón', address: 'Avda. de Oviedo 15', phone: '985 990 500' },
		{ name: 'Hotel Villa de Gijón', address: 'C/ San Juan de Vallés 3', phone: '985 141 824' },
		{ name: 'Hotel Begoña Centro', address: 'Avda. de la Costa 44', phone: '985 147 211' },
		{ name: 'Hotel Blue Santa Rosa', address: 'Santa Rosa 4', phone: '985 091 919' },
		{ name: 'Hotel Blue Marqués', address: 'Marqués de San Esteban 11', phone: '985 090 929' },
		{ name: 'Apartamentos San Esteban', address: 'Marqués de San Esteban 11', phone: '985 09 09 29' },
		{ name: 'Hotel León', address: 'Avda. de la Costa 45', phone: '985 37 01 11' },
		{ name: 'Hotel Celuisma Pathos', address: 'Santa Elena 6', phone: '985 176 400' },
		{ name: 'Hotel Castilla', address: 'C/ Corrida 50', phone: '985 346 200' },
		{ name: 'Hotel La Polar', address: 'Avda Juan Carlos I, 20', phone: '984 29 64 03' },
		{ name: 'Hotel Miramar', address: 'C/ Santa Lucía 9', phone: '985 351 008' },
		{ name: 'Hotel Arena', address: 'Dr. Aquilino Hurlé 31', phone: '985 339 700' },
		{ name: 'Hotel Alcomar', address: 'C/ Cabrales 24', phone: '985 357 011' },
		{ name: 'Casona de Cefontes', address: 'Camino de la Carbayera 564', phone: '606 163 410' },
		{ name: 'Hotel Doña María', address: 'Ctra Carbonera 28', phone: '985 14 01 17' },
		{ name: 'Camping Deva', address: 'Camín de la Pasadiella 85', phone: '985 13 38 48' },
	];

	const dict = [
		{ es: 'Mujeres', ast: 'Muyeres', cat: 'Dones', and: 'Mujere' },
		{ es: 'Hombres', ast: 'Paisanus', cat: 'Homes', and: 'Homes' },
		{ es: 'Creo que te has equivocado', ast: 'Yes bobu, yes bobu del todo', cat: "Nen, t'equivoques", and: 'Nanai de la china' },
		{ es: 'Ese lugar queda lejos', ast: "Ta a tomar pol culo pa'ya", cat: "N'hem en metro", and: 'De Fernandopo pa ya' },
		{ es: 'Tengo mucha hambre', ast: 'Toy de un esfamiao que mete mieu', cat: 'Tinc fam', and: 'Toi desmayao' },
		{ es: '¿Te has hecho daño?', ast: '¿Mancastete?', cat: "T'has fet mal?", and: '¿Tasescoñao?' },
		{ es: '¿Qué sucede?', ast: '¿Que ye oh?', cat: 'Qué succeeix?', and: '¿Que paha?' },
		{ es: 'No te entiendo', ast: '¡Que babayaes me cuentes, oh!', cat: 'Però, qué dius!', and: 'Es un bastinazo' },
		{ es: 'Oiga, joven', ast: 'Ah, güaje', cat: 'Jove, si-us-plau', and: 'Killo, ven pacá' },
		{ es: 'Sigue recto', ast: 'To tieso', cat: "No sóc d'aquí", and: 'To palante' },
		{ es: '¿Otra sidra?', ast: 'Pon un culín, oh', cat: 'Fem un pensament?', and: '¿Un rebujito?' },
		{ es: 'Invito yo', ast: 'Ya pago, oh', cat: 'Una merda!', and: 'Convío' },
		{ es: 'Me gusta', ast: 'Préstame', cat: "M'agrada molt", and: 'Ta guapo' },
		{ es: 'Fiesta', ast: 'Folixia asgalla', cat: 'Fes-te la festa', and: 'La feria' },
		{ es: 'Voy al baño', ast: 'Voi mixiar la sidrina!', cat: 'Vaig a fer un pipi', and: 'Voy a echar el litro' },
		{ es: 'Me gusta el fútbol', ast: '¡Puxa Sporting!', cat: 'Força Barça!', and: '¡Viva er Beti!' },
		{ es: 'No queda sidra', ast: '(no existe) — ilegal en Asturias', cat: 'Un Vichy, si-us-plau', and: 'Un cardo' },
	];

	function doPrint() {
		window.print();
	}

	onMount(() => {
		if (window.location.hash === '#print') {
			setTimeout(doPrint, 400);
		}
	});
</script>

<svelte:head>
	<title>Guía completa — ¡Puxa Asturies!</title>
</svelte:head>

<main class="guia container">
	<div class="print-header">
		<h1>¡Puxa Asturies!</h1>
		<p class="guia-subtitle">Guía de Gijón, Oviedo y alrededores — manriquegarcia.com</p>
	</div>

	<div class="no-print btn-bar">
		<button class="print-btn" onclick={doPrint}>
			<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
				<rect x="6" y="14" width="12" height="8"/>
			</svg>
			Guardar como PDF
		</button>
		<p class="btn-hint">Se abrirá el diálogo de impresión. Elige "Guardar como PDF" como destino.</p>
	</div>

	<p class="guia-intro">
		Esta guía nació como el manual de supervivencia para los invitados de nuestra boda.
		Queríamos que la xente de fuera supiera dónde comer, qué visitar y cómo sobrevivir
		en Asturias sin parecer un bañista. Gustó tanto que la mantuvimos viva pa todo el mundo.
	</p>

	<!-- RESTAURANTES -->
	<section class="guia-section">
		<h2>🍽️ Restaurantes y Sidrerías</h2>
		<p class="guia-note">
			La sidra se escancia vertiendo desde altura pa que rompa en el vaso. Se bebe el culín de un
			trago y se comparte vaso. Si te ofrecen, siempre se acepta.
		</p>
		<table class="guia-table">
			<thead><tr><th>Restaurante</th><th>Valoración</th><th>Dirección / Tlf.</th><th>Descripción</th></tr></thead>
			<tbody>
			{#each restaurants as r}
				<tr>
					<td class="td-name">{r.name}{#if r.url}<br><small>{r.url}</small>{/if}</td>
					<td class="td-rating">{ratingLabel[r.rating]}</td>
					<td class="td-addr">{r.address}{#if r.phone}<br>{r.phone}{/if}</td>
					<td>{r.description}</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</section>

	<!-- BARES -->
	<section class="guia-section">
		<h2>🍺 Bares y Copas</h2>
		<table class="guia-table compact">
			<thead><tr><th>Zona</th><th>Descripción</th></tr></thead>
			<tbody>
			{#each bars as b}
				<tr><td class="td-name">{b.zone}</td><td>{b.desc}</td></tr>
			{/each}
			</tbody>
		</table>
	</section>

	<!-- CAFÉS -->
	<section class="guia-section">
		<h2>☕ Guía del Café Asturiano</h2>
		<p class="guia-note">En Asturias los nombres del café no coinciden con el resto de España. Cuidado al pedir.</p>
		<table class="guia-table compact">
			<thead><tr><th>Nombre</th><th>Equivale a</th><th>Detalle</th></tr></thead>
			<tbody>
			{#each coffees as c}
				<tr><td class="td-name">{c.name}</td><td>{c.size}</td><td>{c.note}</td></tr>
			{/each}
			</tbody>
		</table>
	</section>

	<!-- VISITAR -->
	<section class="guia-section">
		<h2>🏔️ Qué Visitar</h2>

		<h3>Xixón (Gijón)</h3>
		<ul class="place-list">
			{#each gijon as p}<li><strong>{p.name}</strong> — {p.desc}</li>{/each}
		</ul>

		<h3>Uviéu (Oviedo)</h3>
		<ul class="place-list">
			{#each oviedo as p}<li><strong>{p.name}</strong> — {p.desc}</li>{/each}
		</ul>

		<h3>Pueblinos con encanto</h3>
		<p class="dist-legend">Distancias: desde Xixón / desde Uviéu</p>
		<ul class="place-list">
			{#each pueblinos as p}<li><strong>{p.name}</strong> <span class="dist-inline">({p.dist})</span> — {p.desc}</li>{/each}
		</ul>
	</section>

	<!-- HOTELES -->
	<section class="guia-section">
		<h2>🏨 Hoteles</h2>
		<table class="guia-table compact">
			<thead><tr><th>Hotel</th><th>Dirección</th><th>Teléfono</th></tr></thead>
			<tbody>
			{#each hotels as h}
				<tr><td class="td-name">{h.name}</td><td>{h.address}</td><td>{h.phone}</td></tr>
			{/each}
			</tbody>
		</table>
	</section>

	<!-- DICCIONARIO -->
	<section class="guia-section">
		<h2>📖 Diccionario</h2>
		<table class="guia-table compact">
			<thead>
				<tr>
					<th>🇪🇸 Castellano</th>
					<th>Asturiano</th>
					<th>Catalán</th>
					<th>Andaluz</th>
				</tr>
			</thead>
			<tbody>
			{#each dict as d}
				<tr><td>{d.es}</td><td><strong>{d.ast}</strong></td><td>{d.cat}</td><td>{d.and}</td></tr>
			{/each}
			</tbody>
		</table>
	</section>

	<!-- MAPA -->
	<section class="guia-section">
		<div class="guia-note map-note">
			<strong>🗺️ Mapa interactivo:</strong> consulta todos los puntos en el mapa online en
			<strong>manriquegarcia.com/mapa</strong>
		</div>
	</section>

	<footer class="guia-footer">
		<p>manriquegarcia.com — ¡Puxa Asturies! — Fechu con cariñu y sidra</p>
	</footer>
</main>

<style>
	.guia { max-width: 960px; }

	.print-header { text-align: center; margin-bottom: 1.5rem; }
	.print-header h1 { font-size: 2.5rem; margin-bottom: 0.25rem; }
	.guia-subtitle { font-size: 1.05rem; color: var(--color-text-muted); margin: 0; }
	.guia-intro { font-size: 0.95rem; color: var(--color-text-muted); max-width: 700px; margin: 0 auto 2rem; text-align: center; }

	.btn-bar { text-align: center; margin-bottom: 2.5rem; }
	.print-btn {
		display: inline-flex; align-items: center; gap: 0.5rem;
		background: var(--color-accent); color: #fff;
		border: none; padding: 0.75rem 1.5rem; border-radius: 999px;
		font: inherit; font-size: 1rem; font-weight: 600; cursor: pointer;
		transition: background 0.2s, transform 0.1s;
	}
	.print-btn:hover { background: var(--color-accent-hover); transform: translateY(-1px); }
	.btn-hint { font-size: 0.8rem; color: var(--color-text-muted); margin-top: 0.5rem; }

	.guia-section { margin-bottom: 2rem; }
	.guia-section h2 { font-size: 1.5rem; margin-top: 2rem; margin-bottom: 0.75rem; page-break-after: avoid; }
	.guia-section h3 { font-size: 1.15rem; margin-top: 1.25rem; page-break-after: avoid; }

	.guia-note { background: var(--color-accent-light); padding: 0.6rem 1rem; border-radius: 8px; font-size: 0.88rem; margin-bottom: 1rem; }

	.guia-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; margin-bottom: 1rem; }
	.guia-table th { background: var(--color-hero-bg); color: var(--color-hero-text); text-align: left; padding: 0.5rem 0.6rem; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.03em; }
	.guia-table td { padding: 0.5rem 0.6rem; border-bottom: 1px solid var(--color-border); vertical-align: top; }
	.guia-table tr:nth-child(even) td { background: rgba(0,0,0,0.015); }
	.guia-table.compact td { padding: 0.4rem 0.6rem; }
	.td-name { font-weight: 600; white-space: nowrap; }
	.td-name small { font-weight: 400; color: var(--color-accent); }
	.td-rating { white-space: nowrap; font-size: 0.8rem; }
	.td-addr { font-size: 0.82rem; color: var(--color-text-muted); white-space: nowrap; }

	.place-list { margin: 0.5rem 0 1rem 1.2rem; font-size: 0.9rem; }
	.place-list li { margin-bottom: 0.35rem; }
	.place-list li strong { color: var(--color-accent); }
	.dist-inline { font-size: 0.82rem; color: #27ae60; font-weight: 500; }
	.dist-legend { font-size: 0.82rem; color: var(--color-text-muted); margin: 0.25rem 0 0.5rem; font-style: italic; }

	.map-note { text-align: center; }
	.guia-footer { text-align: center; color: var(--color-text-muted); font-size: 0.82rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--color-border); }

	@media print {
		.guia { padding: 0; max-width: 100%; }
		.print-header h1 { font-size: 2rem; }
		.guia-section { page-break-inside: avoid; }
		.guia-section h2 { margin-top: 1rem; }
		.guia-table { font-size: 0.75rem; }
		.guia-table th { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
		.guia-table tr:nth-child(even) td { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
		.guia-note { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
		.guia-footer { margin-top: 1rem; }
	}
</style>
