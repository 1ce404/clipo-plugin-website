import { assetPath } from "@/config/site-url";

/** Clipo 标志（三个插件色圆点）。纯装饰，文字名称由外层提供。 */
export function BrandMark({ size = 26 }: { size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element -- 矢量小图标，无需 next/image
  return <img src={assetPath("/mark.svg")} alt="" width={size} height={size} />;
}
