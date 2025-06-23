(function () {
	const checkboxes = document.querySelectorAll(".booking-booking__filters-filter-checkbox-input");
	const cards = document.querySelectorAll(".booking-booking__item");

	if (!checkboxes.length || !cards.length) return;

	const priceMinInput = document.getElementById("booking-price-min");
	const priceMaxInput = document.getElementById("booking-price-max");
	const priceMinVal = document.getElementById("booking-price-min-val");
	const priceMaxVal = document.getElementById("booking-price-max-val");

	const rangeTrack = document.querySelector(".booking-booking__price-range-track");
	const activeRange = document.createElement("div");
	activeRange.className = "booking-booking__price-range-active";
	rangeTrack.appendChild(activeRange);

	function getCardTags(card) {
		return Array.from(card.querySelectorAll(".booking-booking__item-tag")).map((tag) => tag.dataset.tag?.trim().toLowerCase());
	}

	function getCardPrice(card) {
		const priceText = card.querySelector(".booking-booking__item-price--number")?.textContent || "0";
		return parseInt(priceText.replace(/\s/g, ""), 10);
	}

	function initPriceRange() {
		const prices = Array.from(cards).map(getCardPrice);
		const min = Math.min(...prices);
		const max = Math.max(...prices);

		priceMinInput.min = priceMinInput.value = min;
		priceMinInput.max = priceMaxInput.max = max;
		priceMaxInput.value = max;

		priceMinVal.textContent = min.toLocaleString("ru-RU");
		priceMaxVal.textContent = max.toLocaleString("ru-RU");

		updateActiveRange();
	}

	function filterCards() {
		const activeFilters = Array.from(checkboxes)
			.filter((cb) => cb.checked)
			.map((cb) => cb.value.trim().toLowerCase());

		const minPrice = parseInt(priceMinInput.value, 10);
		const maxPrice = parseInt(priceMaxInput.value, 10);

		cards.forEach((card) => {
			const tags = getCardTags(card);
			const price = getCardPrice(card);
			const matchesTags = activeFilters.every((f) => tags.includes(f));
			const matchesPrice = price >= Math.min(minPrice, maxPrice) && price <= Math.max(minPrice, maxPrice);

			const visible = (activeFilters.length === 0 || matchesTags) && matchesPrice;
			card.style.display = visible ? "block" : "none";
		});

		updateCounters(activeFilters, minPrice, maxPrice);
	}

	function updateCounters(activeFilters, minPrice, maxPrice) {
		document.querySelectorAll(".booking-booking__filters-filter").forEach((label) => {
			const input = label.querySelector("input");
			const value = input.value.trim().toLowerCase();
			const counter = label.querySelector(".booking-booking__filters-filter-count");

			let count = 0;
			cards.forEach((card) => {
				const tags = getCardTags(card);
				const price = getCardPrice(card);
				const matchesTags = activeFilters.every((f) => tags.includes(f));
				const matchesPrice = price >= Math.min(minPrice, maxPrice) && price <= Math.max(minPrice, maxPrice);

				if ((matchesTags || activeFilters.length === 0) && tags.includes(value) && matchesPrice) {
					count++;
				}
			});

			counter.textContent = count;
		});
	}

	function updateActiveRange() {
		const min = parseInt(priceMinInput.value);
		const max = parseInt(priceMaxInput.value);
		const rangeMin = parseInt(priceMinInput.min);
		const rangeMax = parseInt(priceMinInput.max);

		const percentMin = ((Math.min(min, max) - rangeMin) / (rangeMax - rangeMin)) * 100;
		const percentMax = ((Math.max(min, max) - rangeMin) / (rangeMax - rangeMin)) * 100;

		activeRange.style.left = `${percentMin}%`;
		activeRange.style.width = `${percentMax - percentMin}%`;
	}

	function handlePriceInputChange(e) {
		const isMin = e.target === priceMinInput;
		let min = parseInt(priceMinInput.value, 10);
		let max = parseInt(priceMaxInput.value, 10);

		if (isMin && min > max) {
			min = max;
			priceMinInput.value = min;
		}
		if (!isMin && max < min) {
			max = min;
			priceMaxInput.value = max;
		}

		priceMinVal.textContent = min.toLocaleString("ru-RU");
		priceMaxVal.textContent = max.toLocaleString("ru-RU");

		updateActiveRange();
		filterCards();
	}

	checkboxes.forEach((cb) => cb.addEventListener("change", filterCards));
	priceMinInput.addEventListener("input", handlePriceInputChange);
	priceMaxInput.addEventListener("input", handlePriceInputChange);

	initPriceRange();
	filterCards();
})();
