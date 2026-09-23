"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { WorkPhoto } from "../../lib/workPhotos";
import button from "../Button.module.css";
import { WorkGrid } from "../WorkGrid";
import { PhotoDialog } from "./PhotoDialog";
import styles from "./Gallery.module.css";

const PAGE_SIZE = 24;

export function Gallery({ photos: allPhotos }: { photos: WorkPhoto[] }) {
  // Tiles whose image failed to load are dropped rather than shown broken.
  const [failed, setFailed] = useState<ReadonlySet<string>>(new Set());
  const photos = useMemo(
    () => allPhotos.filter((photo) => !failed.has(photo.id)),
    [allPhotos, failed],
  );
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const shown = photos.slice(0, visible);

  const onImageError = useCallback((photo: WorkPhoto) => {
    setFailed((prev) => new Set(prev).add(photo.id));
  }, []);

  const onSelect = useCallback((index: number, tile: HTMLButtonElement) => {
    opener.current = tile;
    setOpenIndex(index);
  }, []);

  const onClose = useCallback(() => {
    setOpenIndex(null);
    opener.current?.focus();
  }, []);

  function showMore() {
    setFocusIndex(visible);
    setVisible((v) => v + PAGE_SIZE);
  }

  // After "Show more", move focus to the first newly revealed photo.
  useEffect(() => {
    if (focusIndex === null) return;
    gridRef.current
      ?.querySelectorAll<HTMLButtonElement>("li button")
      [focusIndex]?.focus();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFocusIndex(null);
  }, [focusIndex]);

  return (
    <>
      <div ref={gridRef}>
        <WorkGrid photos={shown} onSelect={onSelect} onImageError={onImageError} />
      </div>
      {visible < photos.length && (
        <div className={styles.more}>
          <button
            type="button"
            className={`${button.button} ${button.outline}`}
            onClick={showMore}
          >
            Show more
          </button>
        </div>
      )}
      <PhotoDialog
        photos={shown}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={onClose}
      />
    </>
  );
}
