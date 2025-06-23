(function () {
  const card = document.querySelector(".index-contacts__info");
  if (!card) return;

  const cardButton = card.querySelector(".index-contacts__button");
  const cardButtonText = cardButton.querySelector(".index-contacts__button--text");

  cardButton.addEventListener("click", () => {
    const isExpanded = card.classList.contains("expand");

    if (!isExpanded) {
      card.classList.add("expand");
      card.style.maxHeight = card.scrollHeight + "px";
      cardButton.classList.add("expand");
      cardButtonText.textContent = "Скрыть";
    } else {
      const currentHeight = card.scrollHeight;
      card.style.maxHeight = currentHeight + "px";

      requestAnimationFrame(() => {
        card.style.maxHeight = "";
      });

      card.classList.remove("expand");
      cardButton.classList.remove("expand");
      cardButtonText.textContent = "Показать полностью";

      const onCollapseEnd = (e) => {
        if (e.propertyName === "max-height") {
          card.style.maxHeight = "";
          card.removeEventListener("transitionend", onCollapseEnd);
        }
      };
      card.addEventListener("transitionend", onCollapseEnd, { once: true });
    }
  });
})();




// (function () {
// 	const card = document.querySelector(".index-contacts__info");
// 	if (!card) return;

// 	const cardButton = card.querySelector(".index-contacts__button");

// 	cardButton.addEventListener("click", (e) => {
// 		card.classList.toggle("expand");
// 		cardButton.classList.toggle("expand");

// 		if (cardButton.classList.contains("expand")) {
// 			cardButton.querySelector(".index-contacts__button--text").textContent = "Скрыть";
// 		} else {
// 			cardButton.querySelector(".index-contacts__button--text").textContent = "Показать полностью";
// 		}
// 	});
// })();
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
