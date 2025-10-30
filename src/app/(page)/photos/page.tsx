import { PhotoGrid } from '@/app/(page)/photos/PhotoGrid';
import { Section } from '@/components/ui/section';
import { getPhotos } from '@/lib/getPhotos';

export default async function Photos() {
  const photos = await getPhotos();
  return (
    <Section as="h1" title="Photos">
      <PhotoGrid photos={photos} />
    </Section>
  );
}
