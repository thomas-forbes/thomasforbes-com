'use client';

import { PhotoPreview } from '@/components/photo-preview';
import { useWindowSize } from 'react-use';

export function PhotoGrid({ photos }: { photos: string[] }) {
  const { width } = useWindowSize();
  const columns = width > 768 ? 3 : 2;

  const photosPerColumn = Array.from({ length: columns }, () => [] as string[]);
  for (let i = 0; i < photos.length; i++) {
    photosPerColumn[i % columns].push(photos[i]);
  }
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {photosPerColumn.map((column, index) => (
        <div key={index} className="grid h-fit gap-4">
          {column.map((photo) => (
            <PhotoPreview key={photo} file={photo} className="aspect-auto" />
          ))}
        </div>
      ))}
    </div>
  );
}
