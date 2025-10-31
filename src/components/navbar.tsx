'use client';

import { Link } from '@/components/ui/link';
import { MAILTO_URL } from '@/lib/types';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="grid grid-cols-3 place-items-center gap-5 sm:flex [&>:nth-child(3n+1)]:justify-self-start [&>:nth-child(3n+2)]:justify-self-center [&>:nth-child(3n+3)]:justify-self-end">
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
        { label: '/other', href: '/other' },
        {
          label: '^email',
          href: MAILTO_URL,
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
          selected={pathname === href}
          className="font-mono text-nowrap"
          hideVisited
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
