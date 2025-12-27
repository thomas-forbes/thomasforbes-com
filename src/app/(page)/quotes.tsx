'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@/components/ui/link';
import { fetchAllFavorites } from '@/lib/quotes';
import { cn } from '@/lib/utils';
import { markdownComponents } from '@/mdx-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState, type HTMLAttributes } from 'react';
import type { Components as ReactMarkdownComponents } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

function QuoteCard({
  quote,
  numQuotes,
  index,
  isZoomed,
  next,
  previous,
  setIsZoomed,
}: {
  quote: Awaited<ReturnType<typeof fetchAllFavorites>>[number];
  numQuotes: number;
  index: number;
  isZoomed: boolean;
  next: () => void;
  previous: () => void;
  setIsZoomed: (isZoomed: boolean) => void;
}) {
  const quoteMarkdownComponents = useMemo<Partial<ReactMarkdownComponents>>(
    () => ({
      ...markdownComponents,
      p: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
        <p
          {...props}
          className={cn(
            className,
            'overflow-hidden',
            isZoomed ? 'line-clamp-none' : 'line-clamp-4',
          )}
        />
      ),
    }),
    [isZoomed],
  );

  const attributionMarkdownComponents = useMemo<
    Partial<ReactMarkdownComponents>
  >(
    () => ({
      ...markdownComponents,
      p: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
        <p
          {...props}
          className={cn(
            className,
            'text-xxs',
            isZoomed ? 'line-clamp-none' : 'line-clamp-1',
          )}
        />
      ),
    }),
    [isZoomed],
  );

  const attributionMarkdown = useMemo(
    () => `${quote.book.title} by ${quote.book.author}`,
    [quote.book.author, quote.book.title],
  );

  return (
    <Card
      className={cn(
        isZoomed && 'quote-fade-in z-20 w-full max-w-xl overflow-scroll',
      )}
    >
      <CardHeader>
        <CardTitle>📙 Favorite Quotes</CardTitle>
        <CardDescription>
          {numQuotes} quotes from{' '}
          <Link href="https://readwise.io/" target="_blank">
            Readwise
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-full w-full flex-1 flex-col items-stretch gap-1.5">
          <div
            className={cn(
              'markdown min-h-28 flex-1 space-y-2 overflow-hidden',
              !isZoomed && 'max-h-24 hover:cursor-zoom-in',
            )}
            onClick={() => !isZoomed && setIsZoomed(true)}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
              components={quoteMarkdownComponents}
            >
              {quote.h.text}
            </ReactMarkdown>
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <Button variant="ghost" size="icon" onClick={previous}>
              <ChevronLeft />
            </Button>
            <ReactMarkdown
              className="truncate"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
              components={attributionMarkdownComponents}
            >
              {attributionMarkdown}
            </ReactMarkdown>
            <Button variant="ghost" size="icon" onClick={next}>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Quotes({
  quotes,
}: {
  quotes: Awaited<ReturnType<typeof fetchAllFavorites>>;
}) {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const next = () => setIndex((index + 1) % quotes.length);
  const previous = () => setIndex((index - 1 + quotes.length) % quotes.length);
  return (
    <>
      <div className="md:col-span-3">
        <QuoteCard
          quote={quotes[index]}
          numQuotes={quotes.length}
          index={index}
          isZoomed={false}
          next={next}
          previous={previous}
          setIsZoomed={setIsZoomed}
        />
      </div>
      {isZoomed && (
        <div
          className={cn(
            isZoomed &&
              'fixed inset-0 z-10 flex items-center justify-center bg-black/80 p-10',
          )}
          onClick={(e) =>
            isZoomed && e.target === e.currentTarget && setIsZoomed(false)
          }
        >
          <QuoteCard
            quote={quotes[index]}
            numQuotes={quotes.length}
            index={index}
            isZoomed={true}
            next={next}
            previous={previous}
            setIsZoomed={setIsZoomed}
          />
        </div>
      )}
    </>
  );
}
