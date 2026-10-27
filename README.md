# Clipo 插件官网

你的 Agent + Clipo = 一支营销团队。

Clipo 不做又一个 Agent，而是把研究、运营、创意、素材、制作五个插件装进用户已经在用的 Codex、WorkBuddy、Claude Code。这个仓库是它的官网。

- 首页：五个角色接力的演示、五个插件、案例、能力对比、接入方式、套餐、常见问题
- 博客：`/blog`，文章是 `src/content/posts.ts` 里的结构化数据

## 快速开始

需要 Node 22（见 `.nvmrc`）。

```bash
nvm use
npm ci
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

## 常用命令

| 命令                                        | 做什么                                                   |
| ------------------------------------------- | -------------------------------------------------------- |
| `npm run dev`                               | 本地开发                                                 |
| `npm run build`                             | 生产构建（默认 standalone 输出）                         |
| `npm run start`                             | 运行生产构建                                             |
| `npm run lint`                              | ESLint                                                   |
| `npm run typecheck`                         | TypeScript 类型检查                                      |
| `npm run format` / `format:check`           | Prettier 格式化 / 检查                                   |
| `npm test` / `test:watch` / `test:coverage` | Vitest 单元测试                                          |
| `npm run check`                             | 提交前完整检查：格式、lint、类型、测试、构建，和 CI 一致 |

## 目录结构

```
src/
  app/                 路由：首页、博客、not-found；sitemap、robots、manifest、结构化数据
  components/          区块和通用组件（PascalCase）
    blog/              博客组件
  config/              站点信息和环境变量（kebab-case）
  content/             所有页面文案和数据，带类型
  lib/                 纯函数和 hooks
  test/                Vitest 全局设置
public/
  agents/              第三方 Agent 图标（LobeHub Icons，MIT）
docs/                  架构说明和变更记录
```

改文案和数据只动 `src/content/`，组件里不写死文字。详见 [docs/architecture.md](docs/architecture.md)。

## 环境变量

复制 `.env.example` 到 `.env.local`。每个变量都标注了「基础必填」或「可选」。

| 变量                    | 说明                                        |
| ----------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | 站点公开地址，用于 canonical、sitemap 和 OG |
| `NEXT_PUBLIC_BASE_PATH` | 部署在子路径时填写，正式域名留空            |
| `BUILD_TARGET`          | 填 `static` 时导出纯静态站点到 `out/`       |

## 部署

**正式环境（Docker）**

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://clipo.cloud -t clipo-plugin-website .
docker run -p 3000:3000 clipo-plugin-website
```

**公开预览（GitHub Pages）**

推送到 `main` 后，`.github/workflows/pages.yml` 会导出静态站点并发布到 GitHub Pages。

## 质量门槛

- CI（`.github/workflows/ci.yml`）在每次推送和 PR 时运行 `npm run check`
- 依赖版本全部精确锁定；`src/config/repository.test.ts` 会检查这一点和其他仓库约定
- 动画尊重系统的「减少动态效果」设置；首页有跳到正文的链接，交互元素都有可读的名称

## 版权

第三方 Agent 的名称和图标归各自所有者所有，图标来自 [LobeHub Icons](https://github.com/lobehub/lobe-icons)。
