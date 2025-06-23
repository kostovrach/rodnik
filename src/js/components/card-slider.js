(function () {
	const sliderBlocks = document.querySelectorAll(".card-slider-block");
	if (!sliderBlocks.length) return;

	sliderBlocks.forEach((block) => {
		const sliderEl = block.querySelector(".card-slider");
		if (!sliderEl) return;

		const buttonPrev = block.querySelector(".card-slider-button--prev");
		const buttonNext = block.querySelector(".card-slider-button--next");
		const scrollbar = block.querySelector(".card-slider-scrollbar");

		const sliderParams = {
			slidesPerView: "auto",
			spaceBetween: 16,
		};

		if (buttonPrev && buttonNext) {
			sliderParams.navigation = {
				prevEl: buttonPrev,
				nextEl: buttonNext,
			};
		}

		if (scrollbar) {
			sliderParams.scrollbar = {
				el: scrollbar,
				draggable: true,
			};
		}

		new Swiper(sliderEl, sliderParams);
	});
})();
