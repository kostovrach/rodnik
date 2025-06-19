(function () {
	const slider = document.querySelector(".index-gallery__slider");
	if (!slider) return;

	const sliderParams = {
		slidesPerView: "auto",
		freeMode: true,
		//mousewheel: true,
	};
	new Swiper(slider, sliderParams);

	Fancybox.bind('[data-fancybox="index-gallery"]', {
		Toolbar: false,
		Carousel: {
			infinite: false,
		},
	});
})();
