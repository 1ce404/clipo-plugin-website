# 变更记录

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

## [0.1.0] - 2026-10-27

### 新增

- 从原型（Vite 单页）迁移到 Next.js 16 App Router，首页和博客静态预渲染。
- 首页区块：五个角色接力演示、五个插件、可筛选的案例、能力对比表、三步接入、套餐、常见问题。
- 博客列表和文章页，带分类筛选、上一篇和下一篇、继续阅读。
- 支持 18 种 Agent 的图标墙（LobeHub Icons）。
- SEO：metadata、sitemap、robots、manifest、Organization、SoftwareApplication 和 BlogPosting 结构化数据。
- 质量门槛：ESLint、Prettier、TypeScript 严格模式、Vitest，`npm run check` 和 CI。
- 部署：standalone Docker 镜像；GitHub Pages 静态预览。
