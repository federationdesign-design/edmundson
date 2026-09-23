import { listDriveImages, logDriveFailure, upstreamUrl } from "../../../../lib/drive";

// Streams a gallery image from Google Drive. Only IDs in the current folder
// listing are served, so this cannot be used as an open proxy into Drive.

const NOT_FOUND = () =>
  new Response("Not found", {
    status: 404,
    headers: { "Cache-Control": "public, max-age=300" },
  });

export async function GET(_request: Request, ctx: RouteContext<"/api/work-image/[id]">) {
  const { id } = await ctx.params;
  const files = await listDriveImages();
  const file = files?.find((f) => f.id === id);
  if (!file) return NOT_FOUND();

  const url = upstreamUrl(file);
  if (!url) return NOT_FOUND();

  try {
    const upstream = await fetch(url, { cache: "no-store" });
    const type = upstream.headers.get("content-type") ?? "";
    if (!upstream.ok || !upstream.body || !type.startsWith("image/")) {
      logDriveFailure(
        `image fetch failed with HTTP ${upstream.status} for a listed file`,
      );
      return NOT_FOUND();
    }
    return new Response(upstream.body, {
      headers: {
        "Content-Type": type,
        // A Drive file ID never changes its content.
        "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    logDriveFailure("image request error", error);
    return NOT_FOUND();
  }
}
