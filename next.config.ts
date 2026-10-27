import type { NextConfig } from "next";

/**
 * `BUILD_TARGET=static` 时导出纯静态站点（GitHub Pages 预览）；
 * 默认 standalone 输出，供 Docker 镜像运行 `node server.js`。
 */
const isStatic = process.env.BUILD_TARGET === "static";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: isStatic ? "export" : "standalone",
  basePath: basePath || undefined,
  trailingSlash: isStatic,
  images: { unoptimized: isStatic },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
