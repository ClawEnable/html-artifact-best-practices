<p align="center">
  <a href="README.md">English</a> · <a href="README.zh-CN.md">简体中文</a> · <strong>日本語</strong>
</p>

<h1 align="center">HTML Artifact ベストプラクティス</h1>

<p align="center">
  <strong>スタンドアロン単一ファイル HTML artifact の生成・レビュー・改善のための Agent Skill</strong><br>
  <sub><i>バニラ HTML のみ — フレームワーク不要、CDN 不要、ビルドチェーン不要</i></sub>
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

## クイックスタート

**Claude Code：**
```bash
/plugin marketplace add ClawEnable/html-artifact-best-practices
/plugin install html-artifact-guide@clawenable
```

**Agent Skills CLI：**
```bash
npx skills add ClawEnable/html-artifact-best-practices
```

**試してみる：**
> "3つのデータベースオプションの比較マトリックスを作成して — パフォーマンス、コスト、エコシステムサポートを折りたたみ可能な詳細付きで評価したい"

Agent は HTML が Markdown より価値を追加するかを判断し、適切なパターンを選択して、スタンドアロンの `.html` ファイルを生成します。

## 使い方

新しい artifact を作成：
> "これらのデータベース候補の比較マトリックスを作成し、database-comparison.html として保存してください。"

既存 artifact をレビュー：
> "この HTML artifact を html-artifact-guide のチェックリストに沿ってレビューしてください。"

artifact を改善：
> "この artifact のモバイル可読性、印刷出力、コピー容易性を改善してください。"

HTML が不要な場合は Markdown を使用：
> "この議事録を要約してください。HTML が明確なレビュー価値を追加しない限り Markdown を使ってください。"

生成される artifact は、インライン CSS、バニラ JS、CDN なし、AI 検証の注意書きを含むスタンドアロン `.html` ファイルであるべきです。

## 機能

| 能力 | 説明 |
|:-----|:-----|
| **判定** | HTML が適切か、Markdown で十分かを決定 |
| **生成** | バニラ HTML + インライン CSS + バニラ JS でスタンドアロン artifact を生成 |
| **レビュー** | 既存の artifact の品質、アクセシビリティ、アンチパターンを監査 |
| **改善** | 情報アーキテクチャ、インタラクション品質を最適化し、無駄を削除 |

## なぜこの Skill が必要か

2026年5月、Thariq Shihipar（Anthropic Claude Code チーム）が ["The Unreasonable Effectiveness of HTML"](https://thariqs.github.io/html-effectiveness/) を発表 — 20のインタラクティブデモで、HTML が LLM 出力において Markdown より高い情報密度を提供することを証明しました。[Andrej Karpathy が推薦](https://x.com/karpathy/status/2053872850101285137)（96万+ 閲覧）：*"LLM に 'HTML で回答を構成して' と依頼し、生成されたファイルをブラウザで表示してください。"* [Simon Willison は同日この見解を検証し](https://simonwillison.net/2026/May/8/unreasonable-effectiveness-of-html/)、実際のセキュリティ脆弱性の説明に使用しました。Omar Sar はアーキテクチャフレームを提唱：*"HTML は Markdown を置き換えるものではありません。両者は組み合わせてこそ優れた相乗効果を発揮します。"*

形成されつつあるコンセンサス：**Markdown は情報源（source of truth）、HTML は人間のレビュー画面。** この Skill はその原則をエンジニアリング化 — HTML の過剰使用を防ぐ判定ルール、よくある失敗を捉える10のアンチパターン、11次元の品質チェックリストを含みます。

### 適用場面

- フィルタリング、折りたたみ、並列レイアウト付きの多択比較マトリックス
- インタラクティブなレポート、ダッシュボード、視覚的説明
- リスクマトリックス付きの意思決定支援ページ
- チームレビュー用のロードマップやタイムラインビュー
- 非線形ナビゲーションが必要な研究統合

### 不適用場面

シンプルなドキュメント、ナレッジベース記事、議事録 — Markdown で十分なコンテンツ。

### web-artifacts-builder との違い

| | web-artifacts-builder | html-artifact-guide |
|:--|:--|:--|
| スタック | React、Vite、Tailwind、shadcn/ui | バニラ HTML、インライン CSS、バニラ JS |
| 用途 | 複雑なインタラクティブ Web アプリ | スタンドアロンレビュー/レポート artifact |
| ビルド | init + バンドルが必要 | ビルドチェーン不要、単一ファイル |

## 含まれる内容

- **SKILL.md** — 判定ルール、出力契約、10のアンチパターン、生成/レビューワークフロー
- **8種類の Artifact パターン** — 意思決定ブリーフ、比較マトリックス、リサーチ統合、ダッシュボード、タイムライン、インタラクティブチェックリスト、ビジュアル解説、レビュー画面
- **11次元レビューチェックリスト** — コンテンツ忠実度、情報アーキテクチャ、セマンティック HTML、レスポンシブレイアウト、アクセシビリティ、インタラクション品質、依存関係ポリシー、コピー容易性、印刷対応、視覚的強調、情報源の保持
- **検証器を通過するスタンドアロンテンプレート** — 新規 artifact 向けのレスポンシブ、focus-visible、印刷対応ベースライン
- **トリガー Eval シナリオ** — HTML 生成、Markdown フォールバック、確認が必要な境界をカバーする20件の構造化ケース
- **Artifact 検証器** — メタデータ、依存関係ポリシー、フォーカス、印刷、コピー容易性、モバイルリスクを確認するゼロ依存 Node.js リリースゲート

## インストール

検証済みのインストール経路は Claude Code と Codex CLI です。その他の Agent Skills 互換環境でも動作する可能性はありますが、このリポジトリでは現在検証していません。

<details>
<summary><strong>Claude Code</strong> — Marketplace</summary>

```bash
/plugin marketplace add ClawEnable/html-artifact-best-practices
/plugin install html-artifact-guide@clawenable
```

</details>

<details>
<summary><strong>Claude Code</strong> — Plugin Dir（開発）</summary>

この checkout を現在の Claude Code セッションだけに読み込みます：

```bash
claude --plugin-dir /path/to/html-artifact-best-practices
```

</details>

<details>
<summary><strong>Codex CLI</strong>（OpenAI）</summary>

この Skill を使いたいプロジェクトで実行します：

```bash
npx skills add ClawEnable/html-artifact-best-practices
```

Codex セッションで `$skill-installer` が利用できる場合のインセッションインストール：

```text
$skill-installer install https://github.com/ClawEnable/html-artifact-best-practices/tree/v1.0.2/skills/html-artifact-guide
```

クローン済み checkout からの手動 fallback：

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills/html-artifact-guide"
cp -R skills/html-artifact-guide/. "${CODEX_HOME:-$HOME/.codex}/skills/html-artifact-guide/"
```

インストールまたは更新後は、Codex を再起動するか新しいセッションを開始してください。認識確認：

```bash
codex debug prompt-input "Create a comparison matrix as an HTML artifact" | rg "html-artifact-guide"
```

更新時は、`npx skills add ClawEnable/html-artifact-best-practices` を再実行するか、npx 管理のインストールに対して `npx skills update html-artifact-guide` を実行します。

</details>

<details>
<summary><strong>その他の Agent</strong> — 未検証</summary>

配布対象の Skill は `skills/html-artifact-guide/` です。Agent Skills ディレクトリ形式をサポートする環境ではこのフォルダをインポートできる可能性がありますが、このリポジトリで現在検証しているのは Claude Code と Codex CLI のインストール経路のみです。

</details>

## コントリビュート

[CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。Conventional Commits：`feat:` / `fix:` / `docs:` / `refactor:`。

## ライセンス

[Apache-2.0](LICENSE) — 商用利用、改変、配布が自由に可能です。
<br>Copyright © 2026 ClawEnable
