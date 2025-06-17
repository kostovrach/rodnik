(function () {
	const openBtn = document.querySelector("[data-menu-open]");
	const menu = document.querySelector("#menu");

	if (!openBtn || !menu) return;

	const closeBtn = menu.querySelector("[data-menu-close]");
	if (!closeBtn) return;

	openBtn.addEventListener("click", () => {
		menu.showModal();
		requestAnimationFrame(() => {
			menu.classList.add("anim");
		});
	});

	closeBtn.addEventListener("click", () => {
		menu.classList.remove("anim");
		setTimeout(() => {
			menu.close();
		}, 400);
	});

	menu.addEventListener("click", (e) => {
		if (e.target === menu) {
			menu.classList.remove("anim");
			setTimeout(() => menu.close(), 400);
		}
	});
})();
