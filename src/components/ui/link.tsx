import { cn } from '@/lib/utils';
import NextLink, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

export function Link(
  props: LinkProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
) {
  return (
    <NextLink
      {...props}
      className={cn(
        'text-primary no-underline underline-offset-0 hover:underline hover:underline-offset-4 hover:opacity-70',
        props.className,
      )}
    >
      {props.children}
    </NextLink>
  );
}
