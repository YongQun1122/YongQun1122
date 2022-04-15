import Crypto from "crypto-js";

const cdnSecret = process.env.NEXT_PUBLIC_IMAGE_CDN_SECRET || "";

export const parseImageUrl = (url: string, width?: number, height?: number) => {
  if (!url) return url;
  const { pathname } = new URL(url);

  let cdn = process.env.NEXT_PUBLIC_IMAGE_CDN_URL || null;
  if (!cdn) return url;

  const hasSlash = cdn.substring(cdn.length - 1) === "/";
  if (hasSlash) cdn = cdn.slice(0, -1);

  const filter = "/filters:format(webp)";
  const options = `${width || 0}x${height || 0}`;
  const path = `/${options}${filter}${pathname}`;
  const signature = cdnSecret ? Crypto.HmacSHA256(path, cdnSecret) : "";

  return `${cdn}${path}${signature ? `?signature=${signature}` : ""}`;
};
