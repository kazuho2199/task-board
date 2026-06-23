# Task Board — Project Guidelines

## Overview

タスクボード管理アプリケーション。

---

## Git & GitHub 運用ルール

### 基本方針
**コードを変更するたびに、必ずGitHubにプッシュすること。**

### 手順

1. 変更をステージング・コミット
   ```
   git add <変更ファイル>
   git commit -m "コミットメッセージ"
   ```

2. GitHubへプッシュ
   ```
   git push origin main
   ```

### コミットメッセージの規則
- `feat:` 新機能の追加
- `fix:` バグ修正
- `refactor:` リファクタリング
- `style:` スタイル・フォーマット変更
- `docs:` ドキュメント変更
- `test:` テストの追加・修正

例: `feat: タスクの優先度フィルター機能を追加`

### 注意事項
- `.env` やシークレットキーを含むファイルは絶対にコミットしない
- `main` ブランチへの直接 force push は禁止
- コミット前にテストが通ることを確認する

---

## デプロイ先

| 環境 | URL |
|------|-----|
| 本番 (GitHub Pages) | https://kazuho2199.github.io/task-board/ |
| ローカル開発 | http://localhost:5173 |

デプロイは `main` ブランチへのプッシュで GitHub Actions が自動実行する。
設定ファイル: `.github/workflows/deploy.yml`

---

## 技術スタック

| カテゴリ | 技術 |
|----------|------|
| UI ライブラリ | React 18 |
| ビルドツール | Vite 6 |
| 言語 | JavaScript (JSX) |
| スタイリング | Plain CSS |
| 状態管理 | React `useState` / `useEffect` |
| データ永続化 | `localStorage` |
| CI/CD | GitHub Actions |
| ホスティング | GitHub Pages |

---

## コンポーネント命名規約

- **ファイル名・コンポーネント名**: PascalCase (`App.jsx`, `TaskItem.jsx`)
- **CSS クラス名**: kebab-case (`task-item`, `add-button`)
- **関数・変数名**: camelCase (`addTask`, `toggleTask`, `inputText`)
- **定数**: UPPER_SNAKE_CASE (`STORAGE_KEY`)
- **1ファイル1コンポーネント**を基本とし、ファイル名とデフォルトエクスポートの名前を一致させる

---

## 開発環境

- OS: Windows 11
- Shell: PowerShell (primary) / Git Bash
- Node.js: v24

### ローカル起動

```
npm install   # 初回のみ
npm run dev   # 開発サーバー起動
npm run build # 本番ビルド
```

---

## ディレクトリ構成

```
task-board/
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Pages 自動デプロイ
├── src/
│   ├── App.jsx         # メインコンポーネント
│   ├── App.css         # スタイル
│   └── main.jsx        # エントリーポイント
├── index.html
├── vite.config.js
├── package.json
└── CLAUDE.md
```
