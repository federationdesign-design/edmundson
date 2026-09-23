import Image from "next/image";
import type { WorkPhoto } from "../lib/workPhotos";
import styles from "./WorkGrid.module.css";

type WorkGridProps = {
  photos: WorkPhoto[];
  /** When set, each tile is a button that opens the photo. */
  onSelect?: (index: number, tile: HTMLButtonElement) => void;
  /** Called when an image fails to load, so the caller can drop the tile. */
  onImageError?: (photo: WorkPhoto) => void;
};

const SIZES = "(min-width: 64em) 30vw, (min-width: 40em) 46vw, 92vw";

// Photo grid shared by the Services page (static) and the Our Work gallery
// (interactive): 3 columns on desktop, 2 on tablet, 1 on mobile.
export function WorkGrid({ photos, onSelect, onImageError }: WorkGridProps) {
  return (
    <ul className={styles.grid} role="list">
      {photos.map((photo, index) => {
        const image = (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={SIZES}
            className={styles.image}
            onError={onImageError ? () => onImageError(photo) : undefined}
          />
        );
        return (
          <li key={photo.id} className={styles.item}>
            {onSelect ? (
              <button
                type="button"
                className={styles.tile}
                onClick={(e) => onSelect(index, e.currentTarget)}
                aria-haspopup="dialog"
              >
                {image}
              </button>
            ) : (
              image
            )}
          </li>
        );
      })}
    </ul>
  );
}
