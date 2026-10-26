import { PhotoGrid } from '@/app/(page)/photos/PhotoGrid';
import { Section } from '@/components/ui/section';
import { PHOTOS } from '@/lib/photos';

export default function Photos() {
  return (
    <Section as="h1" title="Photos">
      <PhotoGrid photos={PHOTOS} />
    </Section>
  );
}
