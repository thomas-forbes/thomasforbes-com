'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import NextLink, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import { useState } from 'react';

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NextLink
      {...props}
      className={cn(
        'text-primary relative inline-block leading-none no-underline transition-all duration-200 hover:opacity-70 active:scale-[0.97]',
        selected && 'text-pink-500',
        !hideVisited && 'visited:text-secondary',
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {props.children}
      <motion.span
        className="absolute -bottom-[2px] left-0 h-[1px] w-full bg-current"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{ transformOrigin: 'left' }}
      />
    </NextLink>
  );
}
