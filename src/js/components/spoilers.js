(function () {
  const containers = document.querySelectorAll(".js-spoiler-container");
  if (!containers.length) return;

  containers.forEach((container) => {
    const items = container.querySelectorAll(".js-spoiler-item");
    items.forEach((item) => {
      const content = item.querySelector(".js-spoiler-content");
      item.addEventListener("click", function () {
        const isActive = this.classList.toggle("active");

        if (!content) return;

        if (isActive) {

          content.style.height = content.scrollHeight + "px";
          content.style.opacity = "1";

          content.addEventListener("transitionend", function handler(e) {
            if (e.propertyName === "height") {
              content.style.height = "auto";
              content.removeEventListener("transitionend", handler);
            }
          });
        } else {

          content.style.height = content.scrollHeight + "px";

          requestAnimationFrame(() => {
            content.style.height = "0";
            content.style.opacity = "0";
          });
        }
      });
    });
  });
})();
