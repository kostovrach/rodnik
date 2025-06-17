(function () {
	const containers = document.querySelectorAll(".js-spoiler-container");
	if (!containers.length) return;

	containers.forEach((container) => {
		const items = container.querySelectorAll(".js-spoiler-item");
		items.forEach((item) => {
			item.addEventListener("click", function () {
				this.classList.toggle("active");
			});
		});
	});
})();
