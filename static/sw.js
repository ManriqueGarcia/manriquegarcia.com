const CACHE_NAME = 'puxa-v4';

self.addEventListener('install', () => {
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
			)
			.then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	const url = new URL(event.request.url);

	if (url.pathname.startsWith('/_app/immutable/')) {
		event.respondWith(
			caches.match(event.request).then(
				(cached) =>
					cached ||
					fetch(event.request).then((res) => {
						const clone = res.clone();
						caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
						return res;
					})
			)
		);
		return;
	}

	if (event.request.mode === 'navigate') {
		event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
		return;
	}

	if (url.pathname.match(/\.(js|css|png|jpg|svg|webp|woff2?)$/)) {
		event.respondWith(
			caches.match(event.request).then(
				(cached) =>
					cached ||
					fetch(event.request).then((res) => {
						const clone = res.clone();
						caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
						return res;
					})
			)
		);
		return;
	}

	event.respondWith(fetch(event.request));
});
