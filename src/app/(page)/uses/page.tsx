import { Link } from '@/components/ui/link';
import { Section } from '@/components/ui/section';
import { COLORS } from '@/lib/types';

const uses: {
  category: string;
  className?: string;
  items: { label: string; href?: string }[];
}[] = [
  {
    category: 'General Software',
    className: COLORS.stone.text,
    items: [
      { label: 'texts.com', href: 'https://texts.com/' },
      { label: 'Overcast (podcasts)' },
      { label: 'Zen (browser)' },
      { label: 'State (meditation app)', href: 'https://www.shiftstate.io/' },
    ],
  },
  {
    category: 'Dev Tools',
    className: COLORS.yellow.text,
    items: [
      { label: 'Cursor (+ vim extension)' },
      { label: 'Lazygit', href: 'https://github.com/jesseduffield/lazygit' },
    ],
  },
  {
    category: 'Productivity',
    className: COLORS.orange.text,
    items: [
      { label: 'Drafts (better apple notes)' },
      { label: 'Linear (personal task management)' },
      { label: 'Notion Calendar' },
    ],
  },
  {
    category: 'Electronics',
    className: COLORS.teal.text,
    items: [
      { label: 'M2 15in Macbook Air' },
      { label: 'iPhone 15 pro' },
      { label: 'Garmin Forerunner 165' },
      { label: 'IEM Earbuds', href: 'https://www.amazon.com/dp/B0BKT8N1Z9' },
    ],
  },
  {
    category: 'Consumables',
    className: COLORS.rose.text,
    items: [
      { label: 'Creatine' },
      { label: 'High dose Omega 3' },
      { label: 'Ashwaganda' },
      { label: 'Magnesium' },
    ],
  },
  {
    category: 'Things',
    className: `italic ${COLORS.emerald.text}`,
    items: [
      {
        label: 'Patagonia Black Hole 32L backpack (love this thing)',
        href: 'https://www.patagonia.com/product/black-hole-pack-32-liters/196924011793.html',
      },
      {
        label: 'Pants',
        href: 'https://shop.lululemon.com/p/men-joggers/Abc-Jogger/_/prod8530240?color=0001&sz=M',
      },
      {
        label: 'Shorts',
        href: 'https://shop.lululemon.com/p/men-shorts/Bowline-Short-5-Woven-MD/_/prod11510140',
      },
      {
        label: 'Shoes',
        href: 'https://www.rei.com/product/229583/hoka-mach-6-road-running-shoes-mens',
      },
      {
        label: 'Razor',
        href: 'https://hensonshaving.com/products/henson-al13-in-jet-black',
      },
    ],
  },
];

export default function Uses() {
  return (
    <Section title="Uses" as="h1">
      <div className="grid gap-4 md:grid-cols-2">
        {uses.map((use) => (
          <Section
            key={use.category}
            title={use.category}
            className="gap-2"
            titleClassName={use.className}
          >
            <ul className="text-muted-foreground list-inside list-disc font-mono">
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
