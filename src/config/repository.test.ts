import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const read = (file: string) => readFileSync(join(root, file), "utf8");

/** 守住仓库约定：这些配置一旦被改坏，构建或部署会在别处才暴露问题。 */
describe("仓库配置", () => {
  const pkg = JSON.parse(read("package.json")) as {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    scripts: Record<string, string>;
    engines: { node: string };
  };

  it("依赖版本全部精确锁定，不用 latest 或范围", () => {
    const all = { ...pkg.dependencies, ...pkg.devDependencies };
    for (const [name, version] of Object.entries(all)) {
      expect(version, name).toMatch(/^\d+\.\d+\.\d+$/);
    }
  });

  it("check 脚本覆盖格式、lint、类型、测试和构建", () => {
    for (const step of ["format:check", "lint", "typecheck", "test", "build"]) {
      expect(pkg.scripts.check).toContain(step);
    }
  });

  it(".nvmrc 的 Node 版本满足 engines", () => {
    const nvmrc = read(".nvmrc").trim();
    expect(nvmrc.split(".")[0]).toBe("22");
    expect(pkg.engines.node).toContain("22");
  });

  it("环境变量示例按 ######## 分段，并标注必填或可选", () => {
    for (const file of [".env.example", ".env.production.example"]) {
      const text = read(file);
      expect(text, file).toMatch(/^#{40}$/m);
      expect(text, file).toContain("NEXT_PUBLIC_SITE_URL");
      expect(text, file).toMatch(/\[(基础必填|可选)\]/);
    }
  });

  it("Dockerfile 使用 standalone 输出、npm ci 并以非 root 用户运行", () => {
    const dockerfile = read("Dockerfile");
    expect(dockerfile).toContain("npm ci");
    expect(dockerfile).toContain(".next/standalone");
    expect(dockerfile).toMatch(/USER\s+nextjs/);
    expect(read("next.config.ts")).toContain('"standalone"');
  });

  it("CI 运行完整检查", () => {
    expect(read(".github/workflows/ci.yml")).toContain("npm run check");
  });
});
