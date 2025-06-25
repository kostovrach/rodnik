(function () {
	let events = {};
	let picker = null;

	// Загружаем данные о событиях
	fetch("./js/schedule.json")
		.then((response) => response.json())
		.then((data) => {
			events = data;
			initCalendar();
		})
		.catch((error) => {
			console.error("Ошибка загрузки событий:", error);
			initCalendar();
		});

	function initCalendar() {
		const calendarElement = document.getElementById("events-schedule");
		if (!calendarElement) {
			console.error("Элемент календаря не найден");
			return;
		}

		picker = new Litepicker({
			element: calendarElement,
			inlineMode: true,
			lang: "ru-RU",
			format: "YYYY-MM-DD",
			numberOfMonths: 1,
			numberOfColumns: 1,
			dropdowns: {
				minYear: new Date().getFullYear() - 1,
				maxYear: new Date().getFullYear() + 1,
				months: true,
				years: true,
			},
			minDate: dayjs().subtract(6, "month").format("YYYY-MM-DD"),
			maxDate: dayjs().add(6, "month").format("YYYY-MM-DD"),
			setup(picker) {
				picker.on("render", () => {
					setTimeout(() => {
						attachEventListeners();
					}, 100);
				});
			},
		});
	}

	function attachEventListeners() {
		const dayElements = document.querySelectorAll(".day-item");

		if (dayElements.length === 0) {
			return;
		}

		// Добавляем обработчики событий к каждому дню
		dayElements.forEach((day) => {
			const date = day.dataset.time;

			if (!date) {
				return;
			}

			// Удаляем старые обработчики событий
			day.replaceWith(day.cloneNode(true));
		});

		// Получаем обновленные элементы после клонирования
		const updatedDayElements = document.querySelectorAll(".day-item");

		updatedDayElements.forEach((day) => {
			const date = day.dataset.time;

			if (!date) return;

			const dateStr = dayjs(Number(date)).format("YYYY-MM-DD");

			if (events[dateStr]) {
				day.classList.add("has-event");

				day.addEventListener("mouseenter", (e) => {
					showTooltip(e.currentTarget, events[dateStr]);
				});

				day.addEventListener("mouseleave", (e) => {
					hideTooltip(e.currentTarget);
				});
			} else {
				day.addEventListener("mouseenter", (e) => {
					showTooltip(e.currentTarget, ["На эту дату нет мероприятий :("]);
				});

				day.addEventListener("mouseleave", (e) => {
					hideTooltip(e.currentTarget);
				});
			}
		});
	}

	function showTooltip(dayElem, messages) {
		// Удаляем все существующие тултипы
		document.querySelectorAll(".calendar-tooltip").forEach((tooltip) => {
			tooltip.remove();
		});

		// Создаем новый тултип
		const tooltip = document.createElement("div");
		tooltip.className = "calendar-tooltip";

		// Создаем содержимое тултипа
		const content = messages.map((message) => `<div class="calendar-tooltip__item">${message}</div>`).join("");
		tooltip.innerHTML = `
      <div class="calendar-tooltip__content">${content}</div>
    `;

		// Добавляем тултип в элемент дня
		dayElem.style.position = "relative";
		dayElem.appendChild(tooltip);

		// Обработчик закрытия
		// const closeBtn = tooltip.querySelector(".calendar-tooltip__close");
		// if (closeBtn) {
		//   closeBtn.addEventListener('click', (e) => {
		//     e.stopPropagation();
		//     tooltip.remove();
		//   });
		// }

		// Позиционируем тултип
		positionTooltip(tooltip, dayElem);
	}

	function hideTooltip(dayElem) {
		const tooltip = dayElem.querySelector(".calendar-tooltip");
		if (tooltip) {
			tooltip.remove();
		}
	}

	function positionTooltip(tooltip, dayElem) {
		// Получаем размеры и позицию элемента дня
		const dayRect = dayElem.getBoundingClientRect();
		const tooltipRect = tooltip.getBoundingClientRect();
		const containerRect = dayElem.closest(".litepicker").getBoundingClientRect();

		// Определяем, где лучше разместить тултип
		let top = -tooltipRect.height - 10; // По умолчанию сверху
		let left = -(tooltipRect.width / 2) + dayRect.width / 2; // По центру

		// Проверяем, не выходит ли тултип за границы контейнера
		//if (dayRect.top - tooltipRect.height < containerRect.top) {
		//  top = dayRect.height + 10; // Размещаем снизу
		//}

		//if (dayRect.left + left < containerRect.left) {
		//  left = containerRect.left - dayRect.left + 10; // Сдвигаем вправо
		//}
		//
		//if (dayRect.left + left + tooltipRect.width > containerRect.right) {
		//  left = containerRect.right - dayRect.left - tooltipRect.width - 10; // Сдвигаем влево
		//}

		tooltip.style.top = `${top}px`;
		tooltip.style.left = `${left}px`;
	}
})();
