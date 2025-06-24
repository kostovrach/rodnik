(function () {
	const mainSlider = document.querySelector(".room-info__gallery-slider");
	const thumbsSlider = document.querySelector(".room-info__gallery-thumbs");

	if (!mainSlider || !thumbsSlider) return;

	const thumbsSwiper = new Swiper(thumbsSlider, {
		spaceBetween: 8,
		slidesPerView: "auto",
		freeMode: true,
		watchSlidesProgress: true,
		mousewheel: true,
	});

	new Swiper(mainSlider, {
		spaceBetween: 16,
		navigation: {
			nextEl: ".room-info__gallery-button--next",
			prevEl: ".room-info__gallery-button--prev",
		},
		thumbs: {
			swiper: thumbsSwiper,
		},
	});

	Fancybox.bind('[data-fancybox="room-gallery"]', {
		Video: {
			autoplay: false,
		},
	});
})();
