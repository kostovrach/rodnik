(function () {
	if (!document.querySelector('.about-feedback')) return;

	let reviewsData = [];

	async function loadReviewsData() {
		try {
			const response = await fetch("./js/feedback.json");
			if (!response.ok) {
				throw new Error("Не удалось загрузить данные отзывов");
			}
			const data = await response.json();
			reviewsData = data.reviews;
			return reviewsData;
		} catch (error) {
			reviewsData = [
				{
					name: "Тестовый отзыв",
					rating: 5,
					text: "Данные отзывов не загружены. Обратитесь к администратору сайта",
				},
			];
			return reviewsData;
		}
	}
	function createStars(rating) {
		let starsHTML = "";
		for (let i = 1; i <= 5; i++) {
			if (i <= rating) {
				starsHTML += '<span class="about-feedback__slide-rating-star icon-rate-star"></span>';
			} else {
				starsHTML += '<span class="about-feedback__slide-rating-star empty icon-rate-star"></span>';
			}
		}
		return starsHTML;
	}

	function createReviewCard(review) {
		return `
                <div class="about-feedback__slide-wrapper swiper-slide">
                    <div class="about-feedback__slide">
                        <div class="about-feedback__slide-header">
                            <div class="about-feedback__slide-name">${review.name}</div>
                            <div class="about-feedback__slide-rating">${createStars(review.rating)}</div>
                        </div>
                        <div class="about-feedback__slide-text">${review.text}</div>
                    </div>
                </div>
            `;
	}

	function distributeReviews(reviews) {
		const columns = [[], [], []];
		reviews.forEach((review, index) => {
			columns[index % 3].push(review);
		});
		return columns;
	}

	async function initSliders() {
		await loadReviewsData();

		const columns = distributeReviews(reviewsData);

		columns.forEach((columnReviews, index) => {
			const wrapper = document.getElementById(`about-wrapper${index + 1}`);
			const reviewsHTML = columnReviews.map((review) => createReviewCard(review)).join("");

			wrapper.innerHTML = reviewsHTML + reviewsHTML;
		});

		const swipers = [];

		for (let i = 1; i <= 3; i++) {
			const direction = i % 2 === 1 ? "normal" : "reverse";

			const swiper = new Swiper(`#about-slider${i}`, {
				direction: "vertical",
				loop: true,
				autoplay: {
					delay: 0,
					disableOnInteraction: false,
					reverseDirection: direction === "reverse",
				},
				speed: 20000,
				slidesPerView: "auto",
				spaceBetween: 16,
				freeMode: true,
			});

			const swiperElement = document.getElementById(`about-slider${i}`);
			swiperElement.addEventListener("mouseenter", () => {
				swiper.autoplay.stop();
			});

			swiperElement.addEventListener("mouseleave", () => {
				swiper.autoplay.start();
			});

			swipers.push(swiper);
		}

		function handleResize() {
			const width = window.innerWidth;

			if (width <= 768) {
				swipers[1].destroy(true, true);
				swipers[2].destroy(true, true);
				document.querySelector(".about-feedback__body").style.gridTemplateColumns = "1fr";
			} else if (width <= 1024) {
				if (swipers[2] && !swipers[2].destroyed) {
					swipers[2].destroy(true, true);
				}
				document.querySelector(".about-feedback__body").style.gridTemplateColumns = "repeat(2, 1fr)";
			} else {
				document.querySelector(".about-feedback__body").style.gridTemplateColumns = "repeat(3, 1fr)";
			}
		}

		let resizeTimeout;
		window.addEventListener("resize", () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(handleResize, 250);
		});

		handleResize();
	}

	document.addEventListener("DOMContentLoaded", initSliders);
})();
