import { asset } from '../lib/state';

type P = { src: string; w: readonly number[]; ratio: number; alt: string };

export function Photo({ photo, sizes, className, eager = false }: { photo: P; sizes: string; className?: string; eager?: boolean }) {
  const largest = photo.w[photo.w.length - 1];
  return (
    <img
      className={className}
      src={asset(`${photo.src}-${photo.w[0]}.jpg`)}
      srcSet={photo.w.map((w) => `${asset(`${photo.src}-${w}.jpg`)} ${w}w`).join(', ')}
      sizes={sizes}
      width={largest}
      height={Math.round(largest / photo.ratio)}
      alt={photo.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
