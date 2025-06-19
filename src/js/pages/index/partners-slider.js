(function () {
	const wrapper = document.querySelector(".index-partners__slider-wrapper");
	const sliderEl = document.querySelector(".index-partners__slider");

	if (!wrapper || !sliderEl) return;

	const originalSlides = Array.from(wrapper.querySelectorAll(".index-partners__slide"));

	const slideTotalWidth = originalSlides.reduce((sum, slide) => {
		return sum + slide.offsetWidth;
	}, 0);

	const targetWidth = window.innerWidth * 2.5;

	let currentWidth = slideTotalWidth;

	while (currentWidth < targetWidth) {
		originalSlides.forEach((slide) => {
			const clone = slide.cloneNode(true);
			clone.classList.add("index-partners__slide--duplicate");
			wrapper.appendChild(clone);
			currentWidth += slide.offsetWidth;
		});
	}

	const clientsSliderParams = {
		spaceBetween: 16,
		slidesPerView: "auto",
		allowTouchMove: false,
		waitForTransition: false,
        loop: true,
		speed: 8000,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
			pauseOnMouseEnter: false,
		},
	};

	new Swiper(sliderEl, clientsSliderParams);
})();
