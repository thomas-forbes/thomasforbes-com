import { PhotoPreview } from '@/components/photo-preview';
import type { Photo } from '@/lib/photos';

export function PhotoGrid({ photos }: { photos: readonly Photo[] }) {
  const datedPhotos = photos.map((photo) => ({
    photo,
    date: /^(\d{4})-(?:(\d{2})-)?/.exec(photo.file),
  }));
  datedPhotos.sort((a, b) => {
    const dateA = a.date ? `${a.date[1]}-${a.date[2] ?? '00'}` : '';
    const dateB = b.date ? `${b.date[1]}-${b.date[2] ?? '00'}` : '';
    return dateB.localeCompare(dateA);
  });

  const photosByYear = new Map<string, Photo[]>();
  for (const { photo, date } of datedPhotos) {
    const year = date?.[1] ?? 'Undated';
    const group = photosByYear.get(year) ?? [];
    group.push(photo);
    photosByYear.set(year, group);
  }

  return (
    <div className="flex flex-col gap-10">
      {Array.from(photosByYear, ([year, yearPhotos]) => (
        <section
          key={year}
          aria-labelledby={`photos-${year}`}
          className="space-y-4"
        >
          <h2 id={`photos-${year}`} className="font-bold text-2xl">
            {year}
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {yearPhotos.map((photo) => (
              <PhotoPreview key={photo.file} photo={photo} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
