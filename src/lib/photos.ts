export type Photo = {
	file: string;
	description: string;
	alt?: string;
};

// Displayed in this order. Add descriptions here to enable the text overlay.
export const PHOTOS: readonly Photo[] = [
	{
		file: "2026-09-roller-coaster.webp",
		description: "A day at the theme park",
	},
	{
		file: "2026-07-garden-breakfast.webp",
		description: "Excellent breakfast in Korea",
	},
	{ file: "2026-06-coffee.webp", description: "Being a performative male" },
	{ file: "2026-02-canyon-railway.webp", description: "Type 2 fun" },
	// Taken in 2026; exact months unknown.
	{ file: "2026-forest-road-trip.webp", description: "Wicklow" },
	{ file: "2026-skydiving-plane-exit.webp", description: "Got my B license!" },
	{ file: "2026-fishing-catch.webp", description: "Faroe Islands" },
	{
		file: "2026-mirror-selfie.webp",
		description: "Finishing a board game after 10 hours...",
	},
	{ file: "2026-misty-hike.webp", description: "" },
	{
		file: "2025-10-roadside-robot.webp",
		description: "Bringing a 3d printer home",
	},
	{ file: "2025-08-skydive.webp", description: "Learning to skydive" },
	{ file: "2025-07-rocket.webp", description: "" },
	{ file: "2025-07-chainsaw.webp", description: "" },
	{ file: "2025-06-trail.webp", description: "Off trail adventures in Azores" },
	{ file: "2025-06-camel.webp", description: "Morocco" },
	{ file: "2025-06-galapagos.webp", description: "Galapagos" },
	{ file: "2025-04-nature.webp", description: "" },
	{
		file: "2025-03-mountain.webp",
		description: "Tallest mountain in Portugal",
	},
	{ file: "2025-02-hackathon.webp", description: "" },
	{ file: "2024-09-meeting-rep.webp", description: "" },
	{ file: "2024-07-6-flags.webp", description: "Six Flags!" },
	{
		file: "2024-06-burning.webp",
		description: "Burning secondary school books after exams",
	},
	{ file: "2024-03-allergy.webp", description: "Allergic reaction" },
	{ file: "2024-02-shipping.webp", description: "Late night shipping" },
	{ file: "2024-01-nature.webp", description: "" },
	{ file: "2023-12-nature.webp", description: "Tahoe" },
];
