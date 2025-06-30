(function () {
	const slider = document.querySelector(".about-gallery__slider");
	if (!slider) return;

	const buttonPrev = document.querySelector(".about-gallery__button--prev");
	const buttonNext = document.querySelector(".about-gallery__button--next");

	const counter = document.querySelector(".about-gallery__counter");
	const counterCurrent = document.querySelector(".about-gallery__counter-current");
	const counterTotal = document.querySelector(".about-gallery__counter-total");

	function updateControls(swiper) {
		if (!counter) return;
		if (counterCurrent) counterCurrent.textContent = swiper.realIndex + 1;
		if (counterTotal) counterTotal.textContent = swiper.slides.length;
	}

	const swiper = new Swiper(slider, {
		slidesPerView: 1,
		speed: 800,
        parallax: true,
		navigation: {
			prevEl: buttonPrev,
			nextEl: buttonNext,
		},
		crossFade: true,
		effect: "creative",
		creativeEffect: {
			next: {
				translate: ["70%", 0, 0],
				opacity: .7,
			},
		    prev: {
				translate: ["-50%", 0, 0],
		        opacity: 0,
		    }
		},
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        }
	});

	swiper.on("slideChange", () => updateControls(swiper));

	updateControls(swiper);

	Fancybox.bind('[data-fancybox="about-gallery"]', {
		Toolbar: false,
		Carousel: {
			infinite: false,
		},
		Video: {
			autoplay: false,
		},
	});
})();
