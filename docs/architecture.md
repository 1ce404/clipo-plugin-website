# 架构说明

## 技术选型

| 方面     | 选择                          | 原因                                                            |
| -------- | ----------------------------- | --------------------------------------------------------------- |
| 框架     | Next.js 16 App Router         | 与 alphato-website 一致；首页和博客静态预渲染，SEO 路由开箱即用 |
| 样式     | 单个 `globals.css` + CSS 变量 | 页面不大，token 集中管理；不引入 Tailwind 或组件库              |
| 动画     | `motion`（Framer Motion）     | 滚动联动、layout 动画、弹簧曲线                                 |
| 平滑滚动 | `lenis`                       | 全站一致的滚动手感                                              |
| 测试     | Vitest + Testing Library      | 和 alphato-website 一致                                         |

## 数据流

```
src/content/*.ts   带类型的文案和数据（as const satisfies ...）
      │
      ▼
src/components/    读取 content 渲染；服务端组件为主
      │
      ▼
src/app/           路由组合区块，生成 metadata、sitemap、JSON-LD
```

- `content/` 只放数据和纯函数（筛选、分组、查找），不依赖 React。
- `lib/` 放与内容无关的工具：日期格式化、接力演示的进度计算、hooks、动效常量。
- `config/` 放站点信息和环境变量读取；环境变量在读取时校验，出错给出明确的中文提示。

## 客户端组件

只有这些组件是客户端组件：用到滚动、动画、状态或浏览器 API。

| 组件                                                       | 原因                   |
| ---------------------------------------------------------- | ---------------------- |
| `Hero`、`Lights`                                           | 轮换动画、指针跟随     |
| `RelaySection`                                             | 滚动进度驱动的粘性演示 |
| `CasesSection`、`blog/BlogIndex`、`FilterTabs`             | 筛选状态               |
| `CompareSection`                                           | 进入视口时逐行出现     |
| `InstallCommand`、`AgentStack`、`FaqSection`、`SiteHeader` | 交互状态               |
| `SmoothScroll`、`Reveal`、`blog/ArticleIntro`              | 动效                   |

其余（`PluginsSection`、`InstallSection`、`PricingSection`、`FinalCta`、`SiteFooter`、博客文章页）都是服务端组件。

## 两种构建

|          | 默认               | `BUILD_TARGET=static`           |
| -------- | ------------------ | ------------------------------- |
| 输出     | `.next/standalone` | `out/` 纯静态文件               |
| 用途     | Docker 正式部署    | GitHub Pages 公开预览           |
| basePath | 无                 | 由 `NEXT_PUBLIC_BASE_PATH` 决定 |

两种构建都把首页和所有博客文章预渲染成 HTML。

## 设计 token

定义在 `src/app/globals.css` 顶部：

- 中性色：`--white`、`--mist`、`--ink`、`--muted`、`--faint`、`--line`
- 插件色：`--signal`、`--play`、`--idea`、`--asset`、`--remix`；组件里用 `.t-<plugin>` 设置 `--c`
- 字体：`--latin`（Bricolage Grotesque）、`--cjk`（苹方 / Noto Sans SC）、`--mono`（JetBrains Mono）
- 缓动：`--ease`，与 `src/lib/motion.ts` 的 `ease` 保持一致

全站唯一的装饰是五个插件色的柔光（`Lights`）；首页唯一的重头戏是粘性的接力演示（`RelaySection`）。
