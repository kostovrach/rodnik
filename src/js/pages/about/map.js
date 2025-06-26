(function () {
	if (!document.getElementById("about-about-map")) return;

	ymaps.ready(() => {
		const map = new ymaps.Map("about-about-map", {
			center: [42.874296, 133.803304],
			zoom: 10,
			controls: ["zoomControl"],
		});

		const placemark = new ymaps.Placemark([42.874296, 133.803304], {
			balloonContent: "Rodnik, Отель",
		});

		map.geoObjects.add(placemark);
	});
})();