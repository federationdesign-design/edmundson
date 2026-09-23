"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import type { WorkPhoto } from "../../lib/workPhotos";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "../icons";
import styles from "./PhotoDialog.module.css";

type PhotoDialogProps = {
  photos: WorkPhoto[];
  /** Index of the open photo, or null when closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

// Modal photo viewer on the native <dialog>: the browser traps focus, makes
// the page behind inert and closes on Escape.
export function PhotoDialog({ photos, index, onIndexChange, onClose }: PhotoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const captionId = useId();
  const isOpen = index !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const count = photos.length;
  const photo = isOpen ? photos[index] : undefined;
  const step = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + count) % count);
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Photo viewer"
      aria-describedby={captionId}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          step(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          step(1);
        }
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className={`${styles.control} ${styles.close}`}
        onClick={() => dialogRef.current?.close()}
      >
        <CloseIcon className={styles.icon} />
        Close
      </button>

      {photo && (
        <figure className={styles.figure}>
          <div className={styles.frame}>
            <Image
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="92vw"
              className={styles.image}
            />
          </div>
          <figcaption id={captionId} className={styles.caption}>
            <span>{photo.alt}</span>
            <span className={styles.count}>
              Photo {index! + 1} of {count}
            </span>
          </figcaption>
        </figure>
      )}

      {count > 1 && (
        <div className={styles.nav}>
          <button type="button" className={styles.control} onClick={() => step(-1)}>
            <ChevronLeftIcon className={styles.icon} />
            Previous
          </button>
          <button type="button" className={styles.control} onClick={() => step(1)}>
            Next
            <ChevronRightIcon className={styles.icon} />
          </button>
        </div>
      )}
    </dialog>
  );
}
