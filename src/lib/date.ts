/** 把 ISO 日期 `YYYY-MM-DD` 格式化成「2026 年 10 月 28 日」，不依赖运行环境时区。 */
export function formatChineseDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) throw new Error(`日期格式应为 YYYY-MM-DD：${iso}`);
  const [, y, m, d] = match;
  return `${y} 年 ${Number(m)} 月 ${Number(d)} 日`;
}
