import { cn } from '@/lib/utils';
import Image from 'next/image';

export function PhotoPreview({ file, className }: { file: string; className?: string }) {
  return (
    <Image
      className={cn('aspect-square rounded-lg object-cover drop-shadow-md', className)}
      src={`/photos/${file}`}
      alt={`Photo ${file}`}
      width={300}
      height={300}
    />
  );
}
