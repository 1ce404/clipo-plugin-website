/** 首屏安装区可切换的宿主 Agent。 */
export const hosts = [
  { id: "codex", name: "Codex", install: "codex plugin add clipo", command: true },
  { id: "workbuddy", name: "WorkBuddy", install: "在技能市场搜索 Clipo，一键添加", command: false },
  { id: "claude", name: "Claude Code", install: "claude plugin install clipo", command: true },
] as const;

export type Host = (typeof hosts)[number];
export type HostId = Host["id"];

export const defaultHost: Host = hosts[0];

/**
 * 「支持的 Agent」图标墙。图标来自 LobeHub Icons（MIT），名称和图标归各自所有者所有。
 * `icon` 对应 `public/agents/<icon>.svg`。
 */
export const agents = [
  { name: "Codex", icon: "codex" },
  { name: "Claude Code", icon: "claudecode" },
  { name: "WorkBuddy", icon: "workbuddy" },
  { name: "Cursor", icon: "cursor" },
  { name: "Grok", icon: "grok" },
  { name: "Grok Bot", icon: "grokbot" },
  { name: "Trae", icon: "trae" },
  { name: "CodeBuddy", icon: "codebuddy" },
  { name: "Gemini CLI", icon: "geminicli" },
  { name: "Kimi", icon: "kimi" },
  { name: "扣子", icon: "coze" },
  { name: "Qwen Code", icon: "qwen" },
  { name: "Windsurf", icon: "windsurf" },
  { name: "GitHub Copilot", icon: "githubcopilot" },
  { name: "Kiro", icon: "kiro" },
  { name: "Cline", icon: "cline" },
  { name: "Roo Code", icon: "roocode" },
  { name: "OpenCode", icon: "opencode" },
] as const satisfies readonly { name: string; icon: string }[];

export type Agent = (typeof agents)[number];
