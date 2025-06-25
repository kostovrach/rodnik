(function () {
	///////////////////////// Counter /////////////////////////
	const countEl = document.querySelector(".stocks-stocks__count");
	const items = document.querySelectorAll(".stocks-stocks__body > li");

	if (!countEl || !items.length) return;

	const endValue = items.length;
	const duration = 1000;
	const frameRate = 60;
	const totalFrames = Math.round((duration / 1000) * frameRate);
	let frame = 0;

	const counter = setInterval(() => {
		frame++;
		const progress = frame / totalFrames;
		const currentCount = Math.round(endValue * easeOutQuad(progress));

		countEl.textContent = currentCount;

		if (frame >= totalFrames) {
			clearInterval(counter);
		}
	}, 1000 / frameRate);

	function easeOutQuad(t) {
		return t * (2 - t);
	}
})();
(function () {
	///////////////////////// Clipboard /////////////////////////
	document.querySelectorAll(".stocks-stocks__body > li > div > button").forEach((button) => {
		button.addEventListener("click", () => {
			const span = button.querySelector("span");
			if (!span) return;

			const text = span.textContent;

			navigator.clipboard
				.writeText(text)
				.then(() => {
					button.dataset.original = button.innerHTML;
					button.textContent = "Скопировано!";

					setTimeout(() => {
						button.innerHTML = button.dataset.original;
					}, 2000);
				})
				.catch((err) => {
					console.error("Ошибка при копировании:", err);
				});
		});
	});
})();
