import fs from 'fs/promises';
import path from 'path';

export async function getPhotos() {
  const photosDir = path.join(process.cwd(), 'public', 'photos');

  const files = await fs.readdir(photosDir);
  return files
    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    .sort()
    .toReversed();
}
