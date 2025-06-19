(function () {
	const card = document.querySelector(".index-contacts__info");
	if (!card) return;

	const cardButton = card.querySelector(".index-contacts__button");

	cardButton.addEventListener("click", (e) => {
		card.classList.toggle("expand");
		cardButton.classList.toggle("expand");

		if (cardButton.classList.contains("expand")) {
			cardButton.querySelector(".index-contacts__button--text").textContent = "Скрыть";
		} else {
			cardButton.querySelector(".index-contacts__button--text").textContent = "Показать полностью";
		}
	});
})();
(function () {
	if (!document.getElementById("index-contacts-map")) return;

	ymaps.ready(() => {
		const map = new ymaps.Map("index-contacts-map", {
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
