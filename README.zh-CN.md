<p align="center">
  <a href="README.md">English</a> · <strong>简体中文</strong> · <a href="README.ja.md">日本語</a>
</p>

<h1 align="center">HTML Artifact 最佳实践</h1>

<p align="center">
  <strong>一个 Agent Skill，用于生成、审查和改进独立单文件 HTML artifact</strong><br>
  <sub><i>仅使用原生 HTML — 无框架、无 CDN、无构建链</i></sub>
</p>

<p align="center">
  <a href="https://github.com/ClawEnable/html-artifact-best-practices/releases">
    <img src="https://img.shields.io/github/v/release/ClawEnable/html-artifact-best-practices?style=flat-square&label=release&color=2563eb" alt="Release">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-Apache%202.0-brightgreen?style=flat-square" alt="License">
  </a>
  <img src="https://img.shields.io/badge/dependencies-zero-16a34a?style=flat-square" alt="Dependencies">
</p>

---

## 快速开始

**Claude Code：**
```bash
/plugin marketplace add ClawEnable/html-artifact-best-practices
/plugin install html-artifact-guide
```

**任意 Agent（npx）：**
```bash
npx skills add ClawEnable/html-artifact-best-practices
```

**然后尝试：**
> "为这 3 个数据库方案创建一个对比矩阵 — 我需要评估性能、成本和生态支持，带可折叠详情"

Agent 会判断 HTML 是否比 Markdown 更有价值，选择合适的模式，生成独立的 `.html` 文件。

## 功能

| 能力 | 说明 |
|:-----|:-----|
| **判断** | 决定是否适合使用 HTML，还是 Markdown 已经足够 |
| **创建** | 使用原生 HTML + 内联 CSS + 原生 JS 生成独立 artifact |
| **审查** | 审计现有 artifact 的质量、可访问性和反模式 |
| **改进** | 优化信息架构、交互质量，去除冗余 |

## 为什么需要这个 Skill

2026 年 5 月，Thariq Shihipar（Anthropic Claude Code 团队）发表了 ["The Unreasonable Effectiveness of HTML"](https://thariqs.github.io/html-effectiveness/) — 20 个交互式 demo 证明 HTML 在 LLM 输出中提供比 Markdown 更高的信息密度。[Andrej Karpathy 转发推荐](https://x.com/karpathy/status/2053872850101285137)（96 万+ 浏览量）：*"让你的 LLM '用 HTML 组织回复'，然后在浏览器中查看生成的文件。"* [Simon Willison 同日验证了这一观点](https://simonwillison.net/2026/May/8/unreasonable-effectiveness-of-html/)，用它解释了一个真实的安全漏洞。Omar Sar 提出了架构框架：*"HTML 不是替代 Markdown。它们组合使用效果更好。"*

正在形成的共识：**Markdown 是信息源；HTML 是人类审阅界面。** 本 Skill 将这一原则工程化 — 包含防止 HTML 过度使用的判断规则、捕获常见失败的 10 个反模式，以及 11 维质量检查清单。

### 适用场景

- 多选项对比矩阵，支持筛选、折叠、并排布局
- 交互式报告、仪表板或可视化说明
- 带风险矩阵的决策支持页面
- 面向团队审阅的路线图或时间线视图
- 需要非线性导航的研究综合

### 不适用场景

简单文档、知识库文章、会议纪要 — Markdown 能处理好的内容。

### 与 web-artifacts-builder 的区别

| | web-artifacts-builder | html-artifact-guide |
|:--|:--|:--|
| 技术栈 | React、Vite、Tailwind、shadcn/ui | 原生 HTML、内联 CSS、原生 JS |
| 适用场景 | 复杂交互式 Web 应用 | 独立审阅/报告 artifact |
| 构建 | 需要 init + 打包 | 无构建链，单文件 |

## 包含内容

- **SKILL.md** — 判断规则、输出契约、10 个反模式、创建/审查工作流
- **8 种 Artifact 模式** — 决策简报、对比矩阵、研究综合、仪表板、时间线、交互检查清单、可视化解释、审阅界面
- **11 维审查清单** — 内容保真度、信息架构、语义 HTML、响应式布局、可访问性、交互质量、依赖策略、可复制性、打印就绪、视觉强调、信息源保留
- **独立模板** — 新 artifact 的最小 HTML 基线
- **触发测试场景** — 5 个应触发、3 个不应触发、3 个边界场景

## 安装

<details>
<summary><strong>Claude Code</strong> — Marketplace</summary>

```bash
/plugin marketplace add ClawEnable/html-artifact-best-practices
/plugin install html-artifact-guide
```

</details>

<details>
<summary><strong>Claude Code</strong> — Plugin Dir（开发）</summary>

```bash
claude --plugin-dir /path/to/html-artifact-best-practices
```

</details>

<details>
<summary><strong>Codex CLI</strong>（OpenAI）</summary>

```bash
# 启用 skills（仅首次）
codex --enable skills

# 手动安装
mkdir -p ~/.codex/skills/html-artifact-guide
cp -r skills/html-artifact-guide/* ~/.codex/skills/html-artifact-guide/
```

</details>

<details>
<summary><strong>Gemini CLI</strong></summary>

```bash
gemini skills install https://github.com/ClawEnable/html-artifact-best-practices

# 仅工作区范围
gemini skills install https://github.com/ClawEnable/html-artifact-best-practices --scope workspace
```

</details>

<details>
<summary><strong>Cursor</strong></summary>

```bash
# 项目级
mkdir -p .cursor/skills/html-artifact-guide
cp -r skills/html-artifact-guide/* .cursor/skills/html-artifact-guide/

# 或在 Settings > Rules and Commands 中使用 "Import Agent Skills"
```

</details>

<details>
<summary><strong>OpenClaw</strong></summary>

```bash
# 通过 CLI
openclaw skills add /path/to/html-artifact-best-practices/skills/html-artifact-guide

# 或手动
mkdir -p ~/.openclaw/workspace/skills/html-artifact-guide
cp -r skills/html-artifact-guide/* ~/.openclaw/workspace/skills/html-artifact-guide/
```

</details>

<details>
<summary><strong>Hermes</strong></summary>

```bash
# 全局
mkdir -p ~/.hermes/skills/html-artifact-guide
cp -r skills/html-artifact-guide/* ~/.hermes/skills/html-artifact-guide/

# 项目级（在你的项目根目录执行）
mkdir -p skills/html-artifact-guide
cp -r /path/to/html-artifact-best-practices/skills/html-artifact-guide/* skills/html-artifact-guide/

hermes reload
```

</details>

<details>
<summary><strong>跨 Agent</strong>（npx skills add）</summary>

支持 Claude Code、Codex、Cursor、Copilot 及其他 Agent CLI。

```bash
npx skills add ClawEnable/html-artifact-best-practices        # 当前项目
npx skills add ClawEnable/html-artifact-best-practices -g      # 全局
npx skills add ClawEnable/html-artifact-best-practices -a claude-code  # 指定 Agent
```

</details>

<details>
<summary><strong>手动安装</strong></summary>

```bash
git clone https://github.com/ClawEnable/html-artifact-best-practices.git \
  ~/.claude/skills/html-artifact-best-practices
```

</details>

## 贡献

参见 [CONTRIBUTING.md](CONTRIBUTING.md)。约定式提交：`feat:` / `fix:` / `docs:` / `refactor:`。

## 许可证

[Apache-2.0](LICENSE) — 可自由用于商业用途、修改和分发。
<br>Copyright © 2026 ClawEnable
