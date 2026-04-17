<script>
	import CoffeeGuide from '$lib/components/CoffeeGuide.svelte';
	import CommentSection from '$lib/components/CommentSection.svelte';
</script>

<svelte:head>
	<title>Bares y Cafés | ¡Puxa Asturies!</title>
</svelte:head>

<main>
	<div class="container">
		<h1>Bares, Copas y el Drama del Café</h1>
		<p class="page-intro">
			¿De copas? Tenemos. ¿Cafeterías? También. ¿Un sistema de medidas de café que desafía toda
			lógica conocida? <strong>Especialmente eso.</strong> Bienveníu al caos organizado de la noche
			asturiana y al misterio cósmico del café.
		</p>

		<h2>Zona de copas en Xixón</h2>
		<p>
			Cuando cae el sol y ya llevas unas sidras encima, la folixia se traslada a estas zonas.
			Consejo: ve con zapatos cómodos. La noche ye llarga.
		</p>
		<div class="card-grid">
			<div class="card">
				<h3>Puerto Deportivo</h3>
				<p class="description">
					El clásico. Escondite, Bulevar, La Habana… Aquí empieza la noche y a veces también
					acaba, porque es fácil perder la noción del tiempo con las vistes al mar y un cubata en
					la mano.
				</p>
			</div>
			<div class="card">
				<h3>Zona de Fomento</h3>
				<p class="description">
					Bodeguita del Medio, El Diario y compañía. Más recogidín pero con mucho ambiente. Ideal pa
					cuando quieres copas pero sin que te reviente el oído un altavoz a las 2 de la mañana.
				</p>
			</div>
		</div>

		<h2>Zona de copas en Uviéu</h2>
		<p>
			La capital no se queda atrás, ¡oh! Si ya escanciaste en Gascona, la noche continúa aquí. Y si
			no escanciaste en Gascona… ¿a qué tas esperando?
		</p>
		<div class="card-grid">
			<div class="card">
				<h3>Zona El Rosal</h3>
				<p class="description">
					Una de las zonas clásiques de Uviéu pa salir de copas. Aquí se junta xente de todas las
					edades y lo mismo te tomas un gin-tonic que acabas bailando salsa. Asturias es así de
					impredecible.
				</p>
			</div>
			<div class="card">
				<h3>Zona El Antiguo</h3>
				<p class="description">
					Ambiente nocturno y muchas opciones pa tapear y beber. El barrio tiene esa onda de "me
					pierdo por estas callejueles y ya veré dónde acabo". Spoiler: siempre acabas bien.
				</p>
			</div>
		</div>

		<h2>El Misterio Asturiano del Café ☕</h2>
		<p class="page-intro">
			Atención, esto es <strong>importante</strong>. En Asturias, pedir un café es como resolver un
			acertijo. Los nombres no coinciden con el resto de España, y si pides "un café con leche"
			pensando que te van a poner una taza normalita… prepárate pa la sorpresa. Un café con leche
			aquí ye lo que en el resto del mundo llaman cortado. Sí, <em>cortado</em>. Nosotros inventamos
			las reglas y el resto que se adapte.
		</p>
		<p>
			Pa que no te pille despreveníu, aquí tienes las medidas explicadas con dibuxinos. Fíjate bien
			en el tamaño de cada taza y la proporción café/leche, que luego en la barra no valen
			reclamaciones:
		</p>
		<CoffeeGuide />

		<div class="section-note">
			<p>
				<strong>Truco nivel experto:</strong> Si quieres quedar como un auténtico asturianu, pide
				"<em>un café de desayuno</em>" con naturalidad. El camarero te mirará con respeto y sabrá que
				no eres un bañista cualquiera.
			</p>
		</div>

		<CommentSection
			title="💬 ¿Tienes algún bar favorito o anécdota cafetera? ¡Compártela!"
			page="/bares"
		/>
	</div>
</main>
