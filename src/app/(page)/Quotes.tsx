'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/components/ui/link';
import { fetchAllFavorites } from '@/lib/quotes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function Quotes({ quotes }: { quotes: Awaited<ReturnType<typeof fetchAllFavorites>> }) {
  const [index, setIndex] = useState(0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>📙 Favorite Quotes</CardTitle>
        <CardDescription>
          {quotes.length} quotes from{' '}
          <Link href="https://readwise.io/" target="_blank">
            Readwise
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex h-9 w-full items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIndex((index - 1 + quotes.length) % quotes.length)}
          >
            <ChevronLeft />
          </Button>
          <div className="relative h-full flex-1">
            <div
              className="quote-fade-in absolute inset-0 flex flex-col justify-center text-center font-mono"
              key={index}
            >
              <p className="text-xxs truncate">{quotes[index].book.title}</p>
              <p className="text-xxs truncate">{quotes[index].book.author}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIndex((index + 1) % quotes.length)}>
            <ChevronRight />
          </Button>
        </div>
        <p key={index} className="quote-fade-in line-clamp-5">
          {quotes[index].h.text}
        </p>
      </CardContent>
    </Card>
  );
}
