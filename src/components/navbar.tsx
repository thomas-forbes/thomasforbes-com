'use client';

import { Link } from '@/components/ui/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="flex gap-3">
      {[
        {
          label: '/index',
          href: '/',
        },
        {
          label: '/uses',
          href: '/uses',
        },
        {
          label: '/photos',
          href: '/photos',
        },
        {
          label: '^email',
          href: 'mailto:hi@thomasforbes.com',
          target: '_blank',
        },
        {
          label: '^github',
          href: 'https://github.com/thomas-forbes',
          target: '_blank',
        },
      ].map(({ label, href, target }) => (
        <Link
          key={label}
          href={href}
          target={target}
          className={cn('font-mono', pathname === href && 'text-secondary')}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
