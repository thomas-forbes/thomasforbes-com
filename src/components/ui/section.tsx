import type React from 'react';
import { cn } from '@/lib/utils';

export function Section({
  title,
  action,
  children,
  as = 'h2',
  className,
  titleClassName,
}: {
  title: React.ReactNode;
  as?: 'h1' | 'h2' | 'p';
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex items-center justify-between gap-2">
        {as === 'h1' ? (
          <h1
            className={cn('title-gradient font-bold text-5xl', titleClassName)}
          >
            {title}
          </h1>
        ) : as === 'h2' ? (
          <h2 className={cn('font-bold text-2xl', titleClassName)}>{title}</h2>
        ) : as === 'p' ? (
          <p className={cn('font-bold text-lg', titleClassName)}>{title}</p>
        ) : null}
        {action}
      </div>
      {as === 'h1' && <hr />}
      {children}
    </div>
  );
}
