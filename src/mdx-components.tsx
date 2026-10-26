import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';
import { CodeBlock } from '@/components/code-block';
import { Link } from '@/components/ui/link';
import { cn } from '@/lib/utils';

const markdownComponents: MDXComponents = {
  a: ({ children, href }) => (
    <Link
      href={href ?? '/'}
      target={href?.startsWith('/') ? undefined : '_blank'}
    >
      {children}
    </Link>
  ),
  h1: ({ children }) => <h1 className="font-bold text-5xl">{children}</h1>,
  h2: ({ children }) => <h2 className="pt-4 font-bold text-4xl">{children}</h2>,
  h3: ({ children }) => <h3 className="pt-2 font-bold text-3xl">{children}</h3>,
  p: ({ children }) => <p>{children}</p>,
  ul: ({ children }) => <ul className="list-inside list-disc">{children}</ul>,
  ol: ({ children }) => (
    <ol className="list-outside list-decimal pl-6">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="[&>ol]:pl-4 [&>ol]:opacity-80 [&>ul]:pl-4 [&>ul]:opacity-80">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="inline-flex w-full items-start gap-3 rounded-xl border border-amber-700/20 bg-amber-500/10 px-4 py-3 font-mono text-amber-900 italic dark:border-amber-500/20 dark:text-amber-200">
      <span className="text-amber-600 dark:text-amber-500">&gt;</span>{' '}
      {children}
    </blockquote>
  ),
  code: ({
    className,
    ...props
  }: {
    children?: ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => <code className={cn('px-1', className)} {...props} />,
  pre: CodeBlock,
};

export { markdownComponents };

export function useMDXComponents(): MDXComponents {
  return markdownComponents;
}
