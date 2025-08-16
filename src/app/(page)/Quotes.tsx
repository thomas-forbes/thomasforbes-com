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
      <CardContent className="space-y-4">
        <div className="flex h-9 w-full items-center gap-2">
          <Button variant="ghost" size="icon" onClick={previous}>
            <ChevronLeft />
          </Button>
          <div className="relative h-full flex-1">
            <div
              className="quote-fade-in absolute inset-0 flex flex-col justify-center text-center font-mono"
              key={index}
            >
              <p className="text-xxs truncate">{quote.book.title}</p>
              <p className="text-xxs truncate">{quote.book.author}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={next}>
            <ChevronRight />
          </Button>
        </div>
        <p
          key={index}
          className={cn(
            'quote-fade-in',
            isZoomed ? 'line-clamp-none' : 'line-clamp-5 hover:cursor-zoom-in',
          )}
          onClick={() => !isZoomed && setIsZoomed(true)}
        >
          {quote.h.text}
        </p>
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
