const LINK_MAP = [
	{ pattern: /\bBarrio de la Sidra\b/gi, href: '/bares', title: 'Bares del Barrio de la Sidra' },
	{ pattern: /\bCimadevilla\b/gi, href: '/visitar', title: 'Qué visitar en Cimadevilla' },
	{ pattern: /\bPlaya de San Lorenzo\b/gi, href: '/visitar', title: 'Playa de San Lorenzo' },
	{ pattern: /\bPicos de Europa\b/gi, href: '/visitar', title: 'Picos de Europa' },
	{ pattern: /\bCovadonga\b/gi, href: '/visitar', title: 'Lagos de Covadonga' },
	{ pattern: /\bUniversidad Laboral\b/gi, href: '/visitar', title: 'Universidad Laboral' },
	{ pattern: /\bCatedral de Oviedo\b/gi, href: '/visitar', title: 'Catedral de Oviedo' },
	{ pattern: /\bDescenso del Sella\b/gi, href: '/blog/descenso-del-sella', title: 'Guía del Descenso del Sella' },
	{ pattern: /\bcachopo\b/gi, href: '/blog/cachopo', title: 'Guía del cachopo asturiano' },
	{ pattern: /\bcabrales\b/gi, href: '/diccionario', title: 'Diccionario asturiano' },
	{ pattern: /\bescanciado\b/gi, href: '/blog/sidra', title: 'Guía de la sidra' },
	{ pattern: /\bculín\b/gi, href: '/diccionario', title: 'Diccionario asturiano' },
	{ pattern: /\bfabada\b/gi, href: '/restaurantes', title: 'Restaurantes asturianos' }
];

/**
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

/**
 * Replace known place/food names in text with internal links.
 * Returns HTML string. Only replaces first occurrence of each pattern.
 * @param {string} text
 * @returns {string}
 */
export function autolink(text) {
	let result = text;
	for (const { pattern, href, title } of LINK_MAP) {
		const regex = new RegExp(pattern.source, 'i');
		result = result.replace(regex, (match) => {
			const safeTitle = escapeHtml(title);
			return `<a href="${href}" title="${safeTitle}" class="auto-link">${match}</a>`;
		});
	}
	return result;
}
