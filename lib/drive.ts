import "server-only";
import { LOCAL_WORK_PHOTOS, type WorkPhoto } from "./workPhotos";

// Google Drive feed for the Our Work gallery. Server-only: the API key must
// never reach the browser, and must never appear in logs or error messages.

const FILES_ENDPOINT = "https://www.googleapis.com/drive/v3/files";
export const DRIVE_REVALIDATE_SECONDS = 3600;

const DIRECT_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const HEIC_TYPES = new Set(["image/heic", "image/heif"]);
const HEIC_THUMBNAIL_SIZE = 2400;
const FALLBACK_ALT = "Recent project by Edmondson Lifting";

export type DriveImage = {
  id: string;
  name: string;
  description?: string;
  mimeType: string;
  createdTime: string;
  imageMediaMetadata?: { width?: number; height?: number };
  thumbnailLink?: string;
};

type FilesListResponse = {
  files?: DriveImage[];
  nextPageToken?: string;
};

function config() {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID?.trim() ?? "";
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY?.trim() ?? "";
  // The folder ID is interpolated into a query, so only allow ID characters.
  if (!folderId || !apiKey || !/^[A-Za-z0-9_-]+$/.test(folderId)) return null;
  return { folderId, apiKey };
}

/** Logs without ever including the key, even if it appears in an error message. */
function logFailure(message: string, detail?: unknown) {
  const key = process.env.GOOGLE_DRIVE_API_KEY?.trim();
  let text = detail instanceof Error ? `${detail.name}: ${detail.message}` : "";
  if (key) text = text.split(key).join("[redacted]");
  console.error(`[drive] ${message}${text ? ` (${text})` : ""}`);
}

function isServable(file: DriveImage) {
  if (DIRECT_TYPES.has(file.mimeType)) return true;
  // HEIC is only served as Drive's JPEG thumbnail; without one, skip it.
  return HEIC_TYPES.has(file.mimeType) && Boolean(file.thumbnailLink);
}

/**
 * Lists every servable image in the gallery folder, newest first. Cached for
 * an hour. Returns null when Drive is not configured or the request fails.
 */
export async function listDriveImages(): Promise<DriveImage[] | null> {
  const cfg = config();
  if (!cfg) {
    logFailure(
      "GOOGLE_DRIVE_FOLDER_ID or GOOGLE_DRIVE_API_KEY is not set, showing local photos",
    );
    return null;
  }

  const files: DriveImage[] = [];
  let pageToken: string | undefined;
  try {
    do {
      const params = new URLSearchParams({
        q: `'${cfg.folderId}' in parents and mimeType contains 'image/' and trashed = false`,
        fields:
          "nextPageToken, files(id, name, description, mimeType, createdTime, imageMediaMetadata(width, height), thumbnailLink)",
        orderBy: "createdTime desc",
        pageSize: "1000",
        key: cfg.apiKey,
      });
      if (pageToken) params.set("pageToken", pageToken);
      const res = await fetch(`${FILES_ENDPOINT}?${params}`, {
        next: { revalidate: DRIVE_REVALIDATE_SECONDS, tags: ["drive-gallery"] },
      });
      if (!res.ok) {
        logFailure(`files.list failed with HTTP ${res.status}`);
        return null;
      }
      const page = (await res.json()) as FilesListResponse;
      files.push(...(page.files ?? []));
      pageToken = page.nextPageToken;
    } while (pageToken);
  } catch (error) {
    logFailure("files.list request error", error);
    return null;
  }

  return files
    .filter(isServable)
    .sort((a, b) => b.createdTime.localeCompare(a.createdTime));
}

/** Camera and phone default names say nothing about the photo. */
const CAMERA_NAME =
  /^(img|dsc|dscn|dscf|pxl|mvimg|gopr|dji|p\d|photo|image|screenshot|whatsapp image|scan)[\s_-]*\d/i;

export function altFor(file: Pick<DriveImage, "name" | "description">): string {
  const description = file.description?.trim();
  if (description) return description;

  const readable = file.name
    .replace(/\.[a-z0-9]{2,5}$/i, "") // extension
    .replace(/\s*\(\d+\)$/, "") // "(2)" copy suffix
    .replace(/[_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = readable.match(/[a-z]{3,}/gi) ?? [];
  const looksLikeId = /^[0-9a-f-]{16,}$/i.test(readable.replace(/\s/g, ""));
  if (CAMERA_NAME.test(readable) || looksLikeId || words.length < 2) return FALLBACK_ALT;
  return readable.charAt(0).toUpperCase() + readable.slice(1);
}

/** Where the image route fetches a file's bytes from. The key never leaves the server. */
export function upstreamUrl(file: DriveImage): string | null {
  const cfg = config();
  if (!cfg) return null;
  if (DIRECT_TYPES.has(file.mimeType)) {
    const params = new URLSearchParams({ alt: "media", key: cfg.apiKey });
    return `${FILES_ENDPOINT}/${encodeURIComponent(file.id)}?${params}`;
  }
  if (HEIC_TYPES.has(file.mimeType) && file.thumbnailLink) {
    // Thumbnail links end in a size such as "=s220"; ask for a large JPEG.
    return file.thumbnailLink.replace(/=s\d+$/, "") + `=s${HEIC_THUMBNAIL_SIZE}`;
  }
  return null;
}

export { logFailure as logDriveFailure };

/** Photos for the Our Work gallery: Drive when available, local crops otherwise. */
export async function getWorkPhotos(): Promise<{
  photos: WorkPhoto[];
  source: "drive" | "local";
}> {
  const files = await listDriveImages();
  if (!files || files.length === 0) {
    if (files) logFailure("folder has no usable images, showing local photos");
    return { photos: LOCAL_WORK_PHOTOS, source: "local" };
  }
  return {
    source: "drive",
    photos: files.map((file) => ({
      id: file.id,
      src: `/api/work-image/${encodeURIComponent(file.id)}`,
      alt: altFor(file),
    })),
  };
}
