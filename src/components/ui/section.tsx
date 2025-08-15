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
  title: string;
  as?: 'h1' | 'h2';
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex items-center justify-between gap-2">
        {as === 'h1' ? (
          <h1 className={cn('text-5xl font-bold', titleClassName)}>{title}</h1>
        ) : (
          <h2 className={cn('text-2xl font-bold', titleClassName)}>{title}</h2>
        )}
        {action}
      </div>
      {children}
    </div>
  );
}
