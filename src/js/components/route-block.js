(function () {
	const button = document.querySelector(".route-block__button");
	const block = document.querySelector(".route-block__info");

	if (!button || !block) return;

	button.addEventListener("click", function () {
		const isExpanded = block.classList.toggle("expand");

		if (isExpanded) {
			block.style.maxHeight = block.scrollHeight + "px";
		button.querySelector(".route-block__button--text").textContent = "Скрыть";
		} else {
			block.style.maxHeight = block.scrollHeight + "px";
		button.querySelector(".route-block__button--text").textContent = "Показать полностью";

			requestAnimationFrame(() => {
				block.style.maxHeight = "360px";
			});

			block.addEventListener("transitionend", function handler(e) {
				if (e.propertyName === "max-height") {
					block.style.maxHeight = "";
					block.removeEventListener("transitionend", handler);
				}
			});
		}
	});
})();

// (function () {
// 	const card = document.querySelector(".route-block__info");
// 	if (!card) return;

// 	const cardButton = card.querySelector(".route-block__button");

// 	cardButton.addEventListener("click", (e) => {
// 		card.classList.toggle("expand");
// 		cardButton.classList.toggle("expand");

// 		if (cardButton.classList.contains("expand")) {
// 			cardButton.querySelector(".route-block__button--text").textContent = "Скрыть";
// 		} else {
// 			cardButton.querySelector(".route-block__button--text").textContent = "Показать полностью";
// 		}
// 	});
// })();
