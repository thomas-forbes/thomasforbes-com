'use server';

type Highlight = {
  id: number;
  text: string;
  note: string | null;
  highlighted_at: string;
  updated_at: string;
  is_favorite: boolean;
  readwise_url: string;
  tags: Array<{ name: string }>;
};

type ExportResponse = {
  nextPageCursor: string | null;
  results: Array<{
    user_book_id: number;
    title: string;
    author: string | null;
    highlights: Highlight[];
  }>;
};

const READWISE_TOKEN = process.env.READWISE_TOKEN!;
const BASE = 'https://readwise.io/api/v2/export/';

const revalidate = 60 * 60 * 24;

export async function fetchAllFavorites(): Promise<
  Array<{ book: { id: number; title: string; author: string | null }; h: Highlight }>
> {
  const favorites: Array<{
    book: { id: number; title: string; author: string | null };
    h: Highlight;
  }> = [];

  let cursor: string | null = null;

  while (true) {
    const url = new URL(BASE);
    if (cursor) url.searchParams.set('pageCursor', cursor);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Token ${READWISE_TOKEN}` },
      // cache "force-cache" + revalidate is the default in a route/page with export revalidate
      // but we set it explicitly for clarity
      cache: 'force-cache',
      next: { revalidate },
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Readwise export failed: ${res.status} ${body}`);
    }

    const data = (await res.json()) as ExportResponse;

    for (const book of data.results) {
      for (const h of book.highlights) {
        if (h.is_favorite) {
          favorites.push({
            book: { id: book.user_book_id, title: book.title, author: book.author },
            h,
          });
        }
      }
    }

    cursor = data.nextPageCursor;
    if (!cursor) break;
  }

  const shuffled = [...favorites];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
