(function () {
	if (!document.getElementById("contacts-map")) return;

	ymaps.ready(() => {
		const map = new ymaps.Map("contacts-map", {
			center: [42.874296, 133.803304],
			zoom: 12,
			controls: ["zoomControl"],
		});

		const placemarkCoords = [42.874296, 133.803304];
		const placemark = new ymaps.Placemark(placemarkCoords, {
			balloonContent: "Rodnik, Отель",
		});
		map.geoObjects.add(placemark);

		const pixelCenter = map.options.get('projection').toGlobalPixels(placemarkCoords, map.getZoom());
		pixelCenter[0] -= 300;

		const newCenter = map.options.get('projection').fromGlobalPixels(pixelCenter, map.getZoom());
		map.setCenter(newCenter);
	});
})();
