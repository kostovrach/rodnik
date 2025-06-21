(function () {
	const ratingBlock = document.querySelector(".modal-form__form-review-rate");
	if (!ratingBlock) return;

	const stars = ratingBlock.querySelectorAll(".modal-form__form-review-rate-item");
	const input = ratingBlock.querySelector('input[name="rating"]');

	let selectedRating = 0;

	stars.forEach((star) => {
		const value = parseInt(star.dataset.value);

		star.addEventListener("mouseenter", () => {
			updateStars(value, "hovered");
		});

		star.addEventListener("mouseleave", () => {
			updateStars(selectedRating, "active");
		});

		star.addEventListener("click", () => {
			if (selectedRating === value) {
				selectedRating = 0;
			} else {
				selectedRating = value;
			}
			input.value = selectedRating;
			updateStars(selectedRating, "active");
		});
	});

	function updateStars(upTo, cls) {
		stars.forEach((star) => {
			const val = parseInt(star.dataset.value);
			star.classList.remove("active", "hovered");
			if (cls === "active" && val <= selectedRating) {
				star.classList.add("active");
			}
			if (cls === "hovered" && val <= upTo) {
				star.classList.add("hovered");
			}
		});
	}
})();
