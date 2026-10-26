import { Link } from "@/components/ui/link";
import { Section } from "@/components/ui/section";
import { COLORS } from "@/lib/types";

const uses: {
	category: string;
	className?: string;
	items: { label: string; href?: string }[];
}[] = [
	{
		category: "General Software",
		className: COLORS.stone.text,
		items: [
			{
				label: "Beeper (all messaging platforms in one app)",
				href: "https://www.beeper.com",
			},
			{ label: "Overcast (podcasts)" },
			{ label: "Helium (browser)", href: "https://helium.computer" },
			{ label: "State (breathwork)", href: "https://www.shiftstate.io/" },
		],
	},
	{
		category: "Neat Utilities",
		className: COLORS.yellow.text,
		items: [
			{
				label: "Shottr (screenshots)",
				href: "https://shottr.cc/",
			},
			{
				label: "Rectangle (window management)",
				href: "https://rectangleapp.com/",
			},
			{
				label: "InstantSpaceSwitcher",
				href: "https://github.com/jurplel/InstantSpaceSwitcher",
			},
			{
				label: "fish (shell)",
				href: "https://fishshell.com/",
			},
			{
				label: "Karabiner (swap backspace and \\ keys)",
				href: "https://karabiner-elements.pqrs.org/",
			},
		],
	},
	{
		category: "Productivity",
		className: COLORS.orange.text,
		items: [
			{ label: "Drafts (better apple notes)" },
			{ label: "Linear (personal task management)" },
			{ label: "Notion Calendar" },
			{
				label: "Horo (menubar stopwatch)",
				href: "https://apps.apple.com/us/app/horo-timer-for-menu-bar/id1437226581?mt=12",
			},
		],
	},
	{
		category: "Electronics",
		className: COLORS.teal.text,
		items: [
			{ label: "M2 15in Macbook Air" },
			{ label: "iPhone 15 pro" },
			{ label: "Garmin Forerunner 165" },
			{
				label: "Nothing Headphone (1)",
				href: "https://us.nothing.tech/products/headphone-1",
			},
			{ label: "IEM Earbuds", href: "https://www.amazon.com/dp/B0BKT8N1Z9" },
		],
	},
	{
		category: "Consumables",
		className: COLORS.rose.text,
		items: [
			{ label: "Creatine" },
			{ label: "High dose Omega 3" },
			{ label: "Ashwaganda" },
			{ label: "Magnesium" },
		],
	},
	{
		category: "Things",
		className: `italic ${COLORS.emerald.text}`,
		items: [
			{
				label: "Patagonia Black Hole 32L backpack (love this thing)",
				href: "https://www.patagonia.com/product/black-hole-pack-32-liters/196924011793.html",
			},
			{
				label: "Pants",
				href: "https://shop.lululemon.com/p/men-joggers/Abc-Jogger/_/prod8530240?color=0001&sz=M",
			},
			{
				label: "Shorts",
				href: "https://shop.lululemon.com/p/men-shorts/Bowline-Short-5-Woven-MD/_/prod11510140",
			},
			{
				label: "Shoes",
				href: "https://www.rei.com/product/229583/hoka-mach-6-road-running-shoes-mens",
			},
			{
				label: "Razor",
				href: "https://hensonshaving.com/products/henson-al13-in-jet-black",
			},
		],
	},
];

export default function Uses() {
	return (
		<Section title="Uses" as="h1">
			<p className="font-mono text-muted-foreground">
				My configs live in my{" "}
				<Link href="https://github.com/thomas-forbes/dotfiles" target="_blank">
					dotfiles
				</Link>
				.
			</p>
			<div className="grid gap-4 md:grid-cols-2">
				{uses.map((use) => (
					<Section
						key={use.category}
						title={use.category}
						className="gap-2"
						titleClassName={use.className}
					>
						<ul className="list-outside list-disc pl-5 font-mono text-muted-foreground">
							{use.items.map((item) => (
								<li key={item.label}>
									{item.href ? (
										<Link href={item.href} target="_blank">
											{item.label}
										</Link>
									) : (
										item.label
									)}
								</li>
							))}
						</ul>
					</Section>
				))}
			</div>
		</Section>
	);
}
