'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/components/ui/link';
import { fetchAllFavorites } from '@/lib/quotes';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

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
  return (
    <Card className={cn(isZoomed && 'quote-fade-in z-20 w-full max-w-xl overflow-scroll')}>
      <CardHeader>
        <CardTitle>📙 Favorite Quotes</CardTitle>
        <CardDescription>
          {numQuotes} quotes from{' '}
          <Link href="https://readwise.io/" target="_blank">
            Readwise
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-1.5">
        <div
          className={cn(
            'flex h-full min-h-30 w-full flex-1 flex-row items-center gap-1.5',
            !isZoomed && 'h-30',
          )}
        >
          <Button variant="ghost" size="icon" onClick={previous}>
            <ChevronLeft />
          </Button>
          <div
            key={index}
            className={cn(
              'quote-fade-in flex min-h-0 w-full flex-auto flex-col gap-2 self-stretch',
              !isZoomed && 'hover:cursor-zoom-in',
            )}
            onClick={() => !isZoomed && setIsZoomed(true)}
          >
            <p
              className={cn(
                'min-h-0 flex-1 overflow-hidden',
                isZoomed ? 'line-clamp-none' : 'line-clamp-4',
              )}
            >
              {quote.h.text}
            </p>
            <p className={cn('text-xxs', isZoomed ? 'line-clamp-none' : 'line-clamp-1')}>
              – {quote.book.title} by {quote.book.author}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={next}>
            <ChevronRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function Quotes({ quotes }: { quotes: Awaited<ReturnType<typeof fetchAllFavorites>> }) {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const next = () => setIndex((index + 1) % quotes.length);
  const previous = () => setIndex((index - 1 + quotes.length) % quotes.length);
  return (
    <>
      <QuoteCard
        quote={quotes[index]}
        numQuotes={quotes.length}
        index={index}
        isZoomed={false}
        next={next}
        previous={previous}
        setIsZoomed={setIsZoomed}
      />
      {isZoomed && (
        <div
          className={cn(
            isZoomed && 'fixed inset-0 z-10 flex items-center justify-center bg-black/80 p-10',
          )}
          onClick={(e) => isZoomed && e.target === e.currentTarget && setIsZoomed(false)}
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
