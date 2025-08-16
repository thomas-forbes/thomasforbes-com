import { PhotoGrid } from '@/app/(page)/photos/PhotoGrid';
import Navbar from '@/components/navbar';
import { Section } from '@/components/ui/section';
import { getPhotos } from '@/lib/getPhotos';

export default async function Photos() {
  const photos = await getPhotos();
  return (
    <>
      <Section as="h1" title="Photos">
        <Navbar />
        <PhotoGrid photos={photos} />
      </Section>
    </>
  );
}
