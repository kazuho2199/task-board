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

## 開発環境

- OS: Windows 11
- Shell: PowerShell (primary) / Git Bash

---

## ディレクトリ構成

```
task-board/
├── CLAUDE.md       # このファイル
└── ...             # 今後追加予定
```
