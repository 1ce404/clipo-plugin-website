const LOCAL_URL = "http://localhost:3000";

/**
 * 读取站点公开地址（不含结尾斜杠）。未配置时回落到本地地址；
 * 生产和预览构建都在 CI 里显式设置 `NEXT_PUBLIC_SITE_URL`。
 */
export function readSiteUrl(env: Record<string, string | undefined> = process.env): string {
  const raw = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return LOCAL_URL;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL 不是合法的 URL：${raw}`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`NEXT_PUBLIC_SITE_URL 只支持 http 或 https：${raw}`);
  }
  return url.origin + url.pathname.replace(/\/$/, "");
}

/**
 * 部署在子路径时的前缀（GitHub Pages 预览为 `/clipo-plugin-website`），本地和正式域名为空。
 * 必须与 next.config.ts 里的 basePath 一致。
 */
export function readBasePath(env: Record<string, string | undefined> = process.env): string {
  const raw = env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
  if (!raw) return "";
  if (!raw.startsWith("/") || raw.endsWith("/")) {
    throw new Error(`NEXT_PUBLIC_BASE_PATH 必须以 / 开头且不以 / 结尾：${raw}`);
  }
  return raw;
}

export const siteUrl = readSiteUrl();
export const basePath = readBasePath();

/**
 * 站内绝对地址，用于 sitemap、OG 和 JSON-LD。
 * `NEXT_PUBLIC_SITE_URL` 已包含部署子路径（例如 GitHub Pages 的 /clipo-plugin-website），这里不再拼 basePath。
 */
export function absoluteUrl(path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return p === "/" ? `${siteUrl}/` : `${siteUrl}${p}`;
}

/** 给 public/ 下的静态资源加上 basePath；next/link 会自动处理页面路径，静态资源不会。 */
export function assetPath(path: string): string {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
