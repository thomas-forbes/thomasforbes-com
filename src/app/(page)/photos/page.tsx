import Navbar from '@/components/navbar';
import { PhotoPreview } from '@/components/PhotoPreview';
import { Section } from '@/components/ui/section';
import { getPhotos } from '@/lib/getPhotos';

export default async function Photos() {
  const photos = await getPhotos();
  const columns = 3;

  const photosPerColumn = Array.from({ length: columns }, () => [] as string[]);
  for (let i = 0; i < photos.length; i++) {
    photosPerColumn[i % columns].push(photos[i]);
  }
  return (
    <>
      <Section as="h1" title="Photos">
        <Navbar />
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {photosPerColumn.map((column, index) => (
            <div key={index} className="grid h-fit gap-4">
              {column.map((photo) => (
                <PhotoPreview key={photo} file={photo} className="aspect-auto" />
              ))}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
