import { browser } from '$app/environment';

/** @typedef {{ slug: string, name: string }} FavoriteItem */

const STORAGE_KEY = 'favorites';

/**
 * @returns {FavoriteItem[]}
 */
function readStorage() {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const data = JSON.parse(raw);
		if (!Array.isArray(data)) return [];
		return data.filter(
			(x) => x && typeof x.slug === 'string' && typeof x.name === 'string'
		);
	} catch {
		return [];
	}
}

/**
 * Reactive favorites container (synced to localStorage in the browser).
 * Mutate only `items` (replace the array) — do not reassign `favorites`.
 */
export const favorites = $state(/** @type {{ items: FavoriteItem[] }} */ ({ items: readStorage() }));

$effect(() => {
	if (!browser) return;
	const { items } = favorites;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
});

/**
 * Returns the current favorites array (reactive when read inside components).
 * @returns {FavoriteItem[]}
 */
export function getFavorites() {
	return favorites.items;
}

/**
 * @param {string} slug
 * @param {string} name
 */
export function toggleFavorite(slug, name) {
	const cur = favorites.items;
	const exists = cur.some((f) => f.slug === slug);
	if (exists) {
		favorites.items = cur.filter((f) => f.slug !== slug);
	} else {
		favorites.items = [...cur, { slug, name }];
	}
}

/**
 * @param {string} slug
 */
export function removeFavorite(slug) {
	favorites.items = favorites.items.filter((f) => f.slug !== slug);
}

/**
 * @param {string} slug
 */
export function isFavorite(slug) {
	return favorites.items.some((f) => f.slug === slug);
}
