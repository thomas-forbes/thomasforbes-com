import { cn } from '@/lib/utils';
import NextLink, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

export function Link({
  hideVisited,
  selected,
  className,
  ...props
}: LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    hideVisited?: boolean;
    selected?: boolean;
  }) {
  return (
    <NextLink
      {...props}
      className={cn(
        'text-primary no-underline underline-offset-0 hover:underline hover:underline-offset-4 hover:opacity-70 active:scale-[0.97]',
        selected && 'text-pink-500',
        !hideVisited && 'visited:text-secondary',
        className,
      )}
    >
      {props.children}
    </NextLink>
  );
}
