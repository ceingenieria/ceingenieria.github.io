importScripts("/precache-manifest.743bd4a3a3a4b58394c6b3d6160e261d.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* eslint-disable no-undef */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js");
importScripts("https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
	apiKey: "AIzaSyD3H93e6rh_bpzc26VYt-_Y75OyThaX75s",
	projectId: "centro-cei",
	appId: "1:775416718209:web:8e4f27fe554572d6",
	messagingSenderId: "775416718209"
});

if (firebase.messaging.isSupported()) {
	// Retrieve an instance of Firebase Messaging so that it can handle background
	// messages.
	const FB_CM = firebase.messaging();

	FB_CM.setBackgroundMessageHandler(function(payload) {
		console.log("Received background message ", payload);
	});

	const showMessage = function(payload) {
		//console.log("showMessage", payload);
		const notificationTitle = payload.notification.title;
		const notificationOptions = {
			body: payload.notification.body,
			icon: payload.notification.icon,
			badge: payload.notification.badge,
			image: payload.notification.image,
			click_action: payload.notification.click_action,
			data: payload.notification.click_action,
			actions: payload.notification.actions
		};

		return self.registration.showNotification(notificationTitle, notificationOptions);
	};

	self.addEventListener("message", function(evt) {
		//console.log("self", self);
		if (evt.data.notification) {
			showMessage(evt.data);
		}
	});

	// Add an event listener to handle notification clicks
	self.addEventListener("notificationclick", function(event) {
		if (event.action === "") {
			//CLikea
		} else if (event.action === "unsubscribe") {
			// Unsubscribe button was clicked
			//console.warn("UNSUB");
		}

		//console.warn("CLICK: ", event);

		event.notification.close();
	});
}

if (workbox) {
	//console.log(`Yay! Workbox is loaded 🎉`);

	workbox.googleAnalytics.initialize();

	self.__precacheManifest = [].concat(self.__precacheManifest || []);
	//workbox.precaching.suppressWarnings();
	workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

	workbox.routing.registerRoute(
		/.*\.(?:png|jpg|jpeg|svg|gif)/,
		new workbox.strategies.CacheFirst({
			cacheName: "images-cache",
			plugins: [
				new workbox.expiration.ExpirationPlugin({
					maxEntries: 25,
					maxAgeSeconds: 15 * 24 * 60 * 60 // 15 Days
				})
			]
		})
	);
} else {
	//console.log(`Boo! Workbox didn't load 😬`);
}

