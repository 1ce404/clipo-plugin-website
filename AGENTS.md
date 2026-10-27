# AGENTS.md

给在这个仓库里工作的 AI Agent 和工程师的约定。

## 分支

- `main` 是默认分支，也是公开预览（GitHub Pages）的来源。
- 改动前先确认当前分支。不要强推，不要改写已经推送的历史。
- 本地提交不等于发布。推送和部署需要明确授权。

## 每次修改之后

运行完整检查，全部通过再提交：

```bash
npm run check
```

它依次执行 Prettier 检查、ESLint、TypeScript、Vitest 和生产构建，和 CI 一致。

## 写代码的规则

- **文案和数据只放在 `src/content/`**。组件里不写死文字，方便统一修改和测试。新增内容时补上 `src/content/content.test.ts` 里对应的约束。
- **站点信息只从 `src/config/site-profile.ts` 取**，地址只从 `src/config/site-url.ts` 取。
- **静态资源路径用 `assetPath()`**。页面链接用 `next/link`，它会自动处理 basePath。
- **默认写服务端组件**。只有用到状态、事件或动画的组件才加 `"use client"`。
- **动画**：用 `src/lib/motion.ts` 里的 `ease` 和 `spring`；只对 transform 和 opacity 做动画；所有动效都要处理 `usePrefersReducedMotion()`。
- **颜色**只用 `globals.css` 里的 token。插件色通过 `.t-<plugin>` 类设置 `--c`。
- **可访问性**：图标和装饰加 `aria-hidden`；按钮和标签要有可读的名称；表格和列表用正确的语义标签。
- **依赖**：版本精确锁定，不用 `latest` 或 `^`。新增依赖前先确认现有依赖能不能做到。
- **命名**：组件文件 PascalCase，其余模块 kebab-case；测试和被测文件放在一起，命名 `*.test.ts(x)`。

## 提交信息

用 Conventional Commits：`feat:`、`fix:`、`docs:`、`refactor:`、`test:`、`chore:`，可以带范围，例如 `feat(blog): 新增文章筛选`。

## 内容边界

- 案例、价格、安装命令和支持的 Agent 列表目前是示意内容，修改前与产品确认。
- 不要承诺投放效果；模拟结果不等于真实调研。
- 不要在仓库里提交密钥、内部链接或用户数据。
