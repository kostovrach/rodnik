(function () {
	const modalForm = document.querySelector("#modal-booking");
	if (!modalForm) return;

	const selectWrapper = modalForm.querySelector(".modal-form__form-services-select");
	const dropdown = selectWrapper.querySelector(".modal-form__form-services-dropdown");
	const inputHidden = selectWrapper.querySelector("#booking-selected-services");
	const serviceItems = Array.from(dropdown.querySelectorAll(".select__item"));
	const tagsContainer = modalForm.querySelector(".modal-form__form-services");
	const displayInput = selectWrapper.querySelector(".modal-form__form-services-input");

	let selected = [];

	// Обработка выбора услуги
	serviceItems.forEach((item) => {
		item.addEventListener("click", (e) => {
			e.stopPropagation();
			const value = item.dataset.value;
			const label = item.dataset.label;
			const price = item.dataset.price;

			if (!selected.includes(value)) {
				selected.push(value);
				addTag(label, price, value);
				item.style.display = "none";
				updateHiddenInput();
			}
		});
	});

	// Функция создания плашки
	function addTag(label, price, value) {
		const li = document.createElement("li");
		li.className = "modal-form__form-services-item";
		li.dataset.value = value;
		li.innerHTML = `
			<span class="modal-form__form-services-item-name">${label}</span>
			<span class="modal-form__form-services-item-price">+${price}&#8381;</span>
			<i class="modal-form__form-services-item-remove icon-trash" role="button" aria-label="Удалить услугу"></i>
		`;

		li.querySelector(".modal-form__form-services-item-remove").addEventListener("click", () => {
			removeTag(value);
		});

		tagsContainer.appendChild(li);
	}

	// Функция удаления плашки
	function removeTag(value) {
		selected = selected.filter((v) => v !== value);

		const tagEl = tagsContainer.querySelector(`[data-value="${value}"]`);
		if (tagEl) tagEl.remove();

		const item = dropdown.querySelector(`[data-value="${value}"]`);
		if (item) item.style.display = "";

		updateHiddenInput();
	}

	// Обновление значения скрытого инпута
	function updateHiddenInput() {
		inputHidden.value = selected.join(",");
	}
})();
