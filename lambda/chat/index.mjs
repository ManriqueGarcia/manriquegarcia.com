const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODELS = ['llama-4-scout-17b-16e-instruct', 'llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];

const SYSTEM_PROMPT = `Eres el concierge virtual de manriquegarcia.com, una guía informal de Asturias con tono divertido y cercano. Hablas como un asturiano orgulloso que quiere que los visitantes disfruten al máximo.

REGLAS:
- Responde SIEMPRE en español, con toques de asturiano (bable) cuando quede natural
- Sé conciso: máximo 3-4 párrafos por respuesta
- Usa emojis con moderación (1-2 por respuesta)
- Si no sabes algo, dilo con humor: "Eso nun lo sé, pero pregunta en cualquier sidrería y te lo cuentan"
- Recomienda siempre de los datos que tienes, no inventes restaurantes ni lugares
- Si preguntan por el tiempo: menciona que en Asturias siempre hay que llevar chubasquero

RESTAURANTES Y SIDRERÍAS:
- Casa Trabanco (Lavandera): LA sidrería por excelencia. Lagar propio, comida espectacular, rodeado de manzanos. Si solo puedes ir a un sitio, este.
- El Sauco (C/ Valencia 20, Gijón): Sidra, pinchos, menú. Nunca falla.
- Parrilla Antonio (Roncal 1, Gijón): Pinchos y sidra en barra, parrilla a la vista. Choricitos y cabrales brutales.
- Sidrería Nava (Pz. de la Serena 1, Gijón): Clásico del Barrio de la Sidra.
- La Galana (Plaza Mayor 10, Gijón): En plena plaza mayor, moderna pero auténtica.
- Sidrería Celorio (Cimavilla): Marisco y sidra con vistas al puerto.
- Casa Ferino (C/ Marqués de San Esteban, Gijón): Institución centenaria, tortilla de merluza legendaria.
- Llagar El Quesu (Gijón): Sidra natural y quesos asturianos.
- Sidrería El Globo (C/ de Cabrales, Gijón): Barrio de la Sidra, ambiente auténtico.
- Sidrería La Costa (C/ la Costa, Gijón): Pinchos y espicha.
- Sidrería Cabranes (Gijón): Menú casero, sidra de calidad.

BARES Y CAFÉS:
- Barrio de la Sidra (zona Gascona/Cimadevilla): Epicentro de la sidra en Gijón
- Puerto Deportivo: Terrazas con vistas
- Calle Corrida: Zona de copas y ambiente nocturno

QUÉ VISITAR:
- Playa de San Lorenzo: Playa urbana de Gijón, 1.5km de arena
- Cimadevilla: Casco antiguo, barrio pesquero, Elogio del Horizonte
- Cerro de Santa Catalina: Vistas 360° y la escultura de Chillida
- Universidad Laboral: La mayor construcción de España, arquitectura monumental
- Parque Isabel la Católica: Pavos reales, jardines, ideal para pasear
- Jardín Botánico Atlántico: Flora asturiana y cantábrica
- Catedral de Oviedo: Gótica, Cámara Santa (Patrimonio UNESCO)
- Monte Naranco: Prerrománico asturiano (Santa María y San Miguel)
- Covadonga: Lagos y basílica, origen de la Reconquista
- Lastres: Pueblo pesquero con encanto brutal
- Luarca: Villa blanca de la costa, cementerio con vistas al mar
- Picos de Europa: Montañas espectaculares, rutas de senderismo

DATOS PRÁCTICOS:
- La sidra se pide por BOTELLAS, no por culines. 1 botella ≈ 6 culines.
- El escanciado es el arte de servir la sidra desde altura para oxigenarla.
- El culín se bebe de un trago y se tira el culo (restos) para limpiar el vaso.
- Café: en Asturias "café" = cortado. Si quieres solo = "café solo". Grande = "café del tiempo" o "americano".
- Clima: llueve mucho. Siempre llevar chubasquero. Verano 18-25°C, invierno 5-12°C.
- Transporte: ALSA (bus), FEVE/Renfe (tren cercanías), coche recomendado para pueblos.

FIESTAS IMPORTANTES:
- Semana Grande de Gijón (agosto): La fiesta más grande
- Descenso del Sella (agosto): Fiesta de las Piraguas, de Arriondas a Ribadesella
- Noche de San Juan (junio): Hogueras en las playas
- Antroxu (carnaval): Muy potente en Gijón y Avilés

PÁGINAS DE LA WEB:
- /restaurantes - Listado completo de restaurantes
- /bares - Bares y cafés
- /visitar - Qué ver en Asturias
- /hoteles - Alojamiento
- /mapa - Mapa interactivo con todos los sitios
- /diccionario - Diccionario castellano-asturiano-catalán-andaluz
- /fiestas - Calendario de fiestas
- /practico - Info práctica (clima, transporte, teléfonos)
- /quiz - Quiz sobre Asturias
- /culines - Contador de culines
- /plan - Generador de plan random
- /presupuesto - Calculadora de presupuesto
- /blog - Artículos (cachopo, sidra, Descenso del Sella, Gijón vs Oviedo)`;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const ERR_REPLY = 'El concierge está echando un culín, prueba en un momentín.';

function getHttpMethod(event) {
  return (
    event.requestContext?.http?.method ??
    event.requestContext?.httpMethod ??
    event.httpMethod ??
    ''
  );
}

function parseBody(event) {
  if (!event.body) return {};
  let raw = event.body;
  if (event.isBase64Encoded) {
    raw = Buffer.from(raw, 'base64').toString('utf8');
  }
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function validateHistory(history) {
  if (!Array.isArray(history)) return 'history debe ser un array';
  if (history.length > 20) return 'history admite como máximo 20 mensajes';
  for (let i = 0; i < history.length; i++) {
    const h = history[i];
    if (!h || typeof h !== 'object') return `Entrada ${i} de history inválida`;
    if (h.role !== 'user' && h.role !== 'assistant') {
      return `Entrada ${i}: role debe ser "user" o "assistant"`;
    }
    if (typeof h.text !== 'string') return `Entrada ${i}: text debe ser string`;
  }
  return null;
}

function jsonResponse(statusCode, bodyObj) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    body: JSON.stringify(bodyObj),
  };
}

export async function handler(event) {
  const method = getHttpMethod(event);
  if (method === 'OPTIONS') {
    return jsonResponse(200, {});
  }

  if (method && method !== 'POST') {
    return jsonResponse(405, { error: 'Método no permitido' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('GROQ_API_KEY not configured');
    return jsonResponse(500, { reply: ERR_REPLY });
  }

  const payload = parseBody(event);
  const { message, history = [] } = payload;

  if (typeof message !== 'string') {
    return jsonResponse(400, { error: 'message debe ser un string' });
  }
  const trimmed = message.trim();
  if (!trimmed.length) {
    return jsonResponse(400, { error: 'message no puede estar vacío' });
  }
  if (trimmed.length > 500) {
    return jsonResponse(400, { error: 'message admite como máximo 500 caracteres' });
  }

  const histErr = validateHistory(history);
  if (histErr) {
    return jsonResponse(400, { error: histErr });
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map((h) => ({ role: h.role, content: h.text })),
    { role: 'user', content: trimmed },
  ];

  for (const model of GROQ_MODELS) {
    try {
      const res = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.8,
          max_tokens: 1024,
        }),
        signal: AbortSignal.timeout(25000),
      });

      const data = await res.json();

      if (res.status === 429 || res.status === 503) {
        console.warn(JSON.stringify({ warn: 'model_rate_limited', model, status: res.status }));
        continue;
      }

      if (!res.ok) {
        console.error(JSON.stringify({ err: 'groq_http', model, status: res.status, body: data }));
        continue;
      }

      const reply = data.choices?.[0]?.message?.content ?? 'Nun pude responder, prueba otra vuelta.';
      return jsonResponse(200, { reply });
    } catch (e) {
      console.warn(JSON.stringify({ warn: 'model_failed', model, message: e?.message ?? String(e) }));
      continue;
    }
  }

  console.error('All Groq models exhausted');
  return jsonResponse(200, { reply: ERR_REPLY });
}
