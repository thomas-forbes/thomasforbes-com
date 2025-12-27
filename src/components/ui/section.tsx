import { cn } from '@/lib/utils';
import React from 'react';

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
            className={cn('title-gradient text-5xl font-bold', titleClassName)}
          >
            {title}
          </h1>
        ) : as === 'h2' ? (
          <h2 className={cn('text-2xl font-bold', titleClassName)}>{title}</h2>
        ) : as === 'p' ? (
          <p className={cn('text-lg font-bold', titleClassName)}>{title}</p>
        ) : null}
        {action}
      </div>
      {as === 'h1' && <hr />}
      {children}
    </div>
  );
}
