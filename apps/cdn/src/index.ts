import { cache } from "hono/cache";
import { Hono } from "hono/quick";

type Bindings = {
  ALLOWED_ORIGINS?: string;
  CACHE_CONTROL?: string;
  R2_BUCKET: R2Bucket;
};

const allowedMethods = ["GET", "HEAD", "OPTIONS"];

const defaultHeaders = {
  Allow: allowedMethods.join(", "),
  "Access-Control-Allow-Methods": allowedMethods.join(", "),
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
};

const maxAge = 60 * 60 * 24 * 30; // 30 days

const app = new Hono<{ Bindings: Bindings }>();

app.get(
  "/icons/:key",
  cache({
    cacheName: "icons",
    cacheControl: `max-age=${maxAge}`,
  }),
  async (c) => {
    const key = c.req.param("key");
    const object = await c.env.R2_BUCKET.get(`icons/${key}`);

    if (object) {
      const data = await object.arrayBuffer();

      return c.body(data, 200, {
        ...defaultHeaders,
        "Cache-Control": `public, max-age=${maxAge}`,
        "Last-Modified": object.uploaded.toUTCString(),
        Etag: object.httpEtag,
        "Content-Encoding": object.httpMetadata?.contentEncoding ?? "",
        "Content-Type": object.httpMetadata?.contentType ?? "",
        "Content-Language": object.httpMetadata?.contentLanguage ?? "",
        "Content-Disposition": object.httpMetadata?.contentDisposition ?? "",
        "Content-Length": object.size.toString(),
      });
    }

    // Attempt to get an icon we don't have from Wowhead.
    const response = await fetch(`https://wow.zamimg.com/images/wow/icons/large/${key}`);

    if (response.status === 200) {
      const data = await response.arrayBuffer();

      return c.body(data, 200, {
        ...defaultHeaders,
        "Cache-Control": `public, max-age=${60 * 60 * 24}`,
        "Last-Modified": response.headers.get("last-modified") ?? "",
        Etag: response.headers.get("etag") ?? "",
        "Content-Encoding": response.headers.get("content-encoding") ?? "",
        "Content-Language": response.headers.get("content-language") ?? "",
        "Content-Disposition": response.headers.get("content-disposition") ?? "",
        "Content-Length": response.headers.get("content-length") ?? "",
        "Content-Type": response.headers.get("content-type") ?? "",
      });
    }

    // We couldn't find an icon anywhere.
    return c.notFound();
  },
);

app.get(
  "/videos/*",
  cache({
    cacheName: "videos",
    cacheControl: `max-age=${maxAge}`,
  }),
  async (c) => {
    const key = c.req.path.replace(/^\/videos\//, "");
    const object = await c.env.R2_BUCKET.get(`videos/${key}`);

    if (object) {
      return c.body(object.body, 200, {
        ...defaultHeaders,
        "Cache-Control": `public, max-age=${maxAge}`,
        "Last-Modified": object.uploaded.toUTCString(),
        Etag: object.httpEtag,
        "Content-Encoding": object.httpMetadata?.contentEncoding ?? "",
        "Content-Type": object.httpMetadata?.contentType ?? "",
        "Content-Language": object.httpMetadata?.contentLanguage ?? "",
        "Content-Disposition": object.httpMetadata?.contentDisposition ?? "",
        "Content-Length": object.size.toString(),
      });
    }

    return c.notFound();
  },
);

export default app;
