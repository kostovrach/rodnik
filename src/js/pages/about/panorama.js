(function () {
	const panoramaContainer = document.getElementById("about-panorama");

	if (!panoramaContainer || typeof pannellum === "undefined") return;

	const scenes = {
		scene1: {
			type: "equirectangular",
			panorama: "assets/img/content/panorama/pano1.jpg",
			hotSpots: [
				{
					pitch: -20,
					yaw: 45,
					type: "scene",
					text: "Следующая точка",
					sceneId: "scene2",
				},
			],
		},
		scene2: {
			type: "equirectangular",
			panorama: "assets/img/content/panorama/pano2.jpg",
			hotSpots: [
				{
					pitch: 0,
					yaw: 45,
					type: "scene",
					text: "Предыдущая точка",
					sceneId: "scene1",
				},
				{
					pitch: 0,
					yaw: -45,
					type: "scene",
					text: "Следующая точка",
					sceneId: "scene3",
				}
			],
		},
		scene3: {
			type: "equirectangular",
			panorama: "assets/img/content/panorama/pano3.jpg",
			hotSpots: [
				{
					pitch: 0,
					yaw: 45,
					type: "scene",
					text: "Предыдущая точка",
					sceneId: "scene3",
				},
				{
					pitch: 0,
					yaw: -45,
					type: "scene",
					text: "Следующая точка",
					sceneId: "scene4",
				}
			],
		},
		scene4: {
			type: "equirectangular",
			panorama: "assets/img/content/panorama/pano4.jpg",
			hotSpots: [
				{
					pitch: 0,
					yaw: 45,
					type: "scene",
					text: "Предыдущая точка",
					sceneId: "scene3",
				},
			],
		},
	};

	if (panoramaContainer) {
		pannellum.viewer("about-panorama", {
			default: {
				firstScene: "scene1",
				sceneFadeDuration: 1000,
				autoLoad: true,
			},
			scenes: scenes,
		});
	}
})();
