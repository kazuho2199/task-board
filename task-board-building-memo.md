# タスクボード 構築メモ

作成日: 2026-06-23  
リポジトリ: https://github.com/kazuho2199/task-board  
公開URL: https://kazuho2199.github.io/task-board/

---

## 1. CLAUDE.md の作成

プロジェクト初期設定として `CLAUDE.md` を作成。以下の内容を記載した。

- プロジェクト概要
- Git & GitHub 運用ルール（**変更のたびに必ずプッシュ**）
- コミットメッセージ規則（`feat:` / `fix:` / `refactor:` など）
- 注意事項（`.env` のコミット禁止、force push 禁止）

---

## 2. Git 初期化 & GitHub プッシュ

```bash
git init
git remote add origin https://github.com/kazuho2199/task-board.git
git add CLAUDE.md
git commit -m "docs: CLAUDE.md を追加"
git branch -M main
git pull origin main --allow-unrelated-histories  # リモートに README.md が存在したためマージ
git push -u origin main
```

**ポイント:** リモートリポジトリにすでに `README.md` が存在していたため、  
`--allow-unrelated-histories` オプションでマージしてからプッシュした。

---

## 3. React タスクボードアプリの作成

### 技術選定

`npm create vite@latest` がインタラクティブプロンプトで止まったため、  
必要なファイルをすべて手動で作成した。

### 作成ファイル一覧

| ファイル | 内容 |
|----------|------|
| `package.json` | React 18 + Vite 6 の依存定義 |
| `vite.config.js` | Vite 設定（React プラグイン） |
| `index.html` | HTML エントリーポイント（`lang="ja"`） |
| `src/main.jsx` | React DOM マウント |
| `src/App.jsx` | メインコンポーネント（ロジック） |
| `src/App.css` | スタイル（Plain CSS） |
| `.gitignore` | `node_modules` / `dist` / `.env` を除外 |

### 実装した機能

- テキスト入力でタスク追加（Enter キー対応）
- チェックボックスで完了 / 未完了を切り替え
- 完了タスクをグレー表示＋取り消し線
- ✕ ボタンでタスク削除
- `3 / 5 件完了` のようなサマリー表示

### App.jsx の主要ロジック

```jsx
// タスクの状態管理
const [tasks, setTasks] = useState([])

// タスク追加
function addTask() {
  const text = inputText.trim()
  if (!text) return
  setTasks(prev => [...prev, { id: nextId, text, completed: false }])
  setNextId(id => id + 1)
  setInputText('')
}

// 完了トグル
function toggleTask(id) {
  setTasks(prev =>
    prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  )
}

// 削除
function deleteTask(id) {
  setTasks(prev => prev.filter(task => task.id !== id))
}
```

### 確認方法

```bash
npm install
npm run dev   # http://localhost:5173 で確認
npm run build # ビルド成功を確認
```

---

## 4. localStorage による永続化

ページリロード後もタスクが消えないよう `localStorage` に保存・読み込みを追加。

### 変更内容（`src/App.jsx`）

```jsx
const STORAGE_KEY = 'task-board-tasks'

// 起動時に localStorage から読み込み
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

// tasks が変わるたびに自動保存
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}, [tasks])
```

**ポイント:** ID 重複を防ぐため、リロード後も保存済みタスクの最大 ID + 1 から採番する  
`nextIdFrom()` 関数も追加した。

---

## 5. GitHub Pages へのデプロイ設定

### 変更ファイル

**`vite.config.js`** — ベースパスを追加

```js
export default defineConfig({
  plugins: [react()],
  base: '/task-board/',  // GitHub Pages のサブパスに合わせる
})
```

**`.github/workflows/deploy.yml`** — 自動デプロイワークフロー

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### ワークフロー push 時のトラブル

`.github/workflows/` への push には PAT の **`workflow` スコープ**が必要。  
スコープを付与後に `git push origin main` で解決。

### GitHub 側の設定手順

1. リポジトリの **Settings → Pages**
2. **Source** を `GitHub Actions` に変更

以降は `main` への push で自動ビルド & デプロイが実行される。

---

## 6. CLAUDE.md の更新

プロジェクトの実態に合わせて以下を追記した。

- **デプロイ先** — 本番URL・ローカルURL・自動デプロイの仕組み
- **技術スタック一覧**（React / Vite / Plain CSS / localStorage / GitHub Actions）
- **命名規約**
  - コンポーネント・ファイル名: PascalCase
  - CSS クラス名: kebab-case
  - 関数・変数: camelCase
  - 定数: UPPER_SNAKE_CASE
- **ディレクトリ構成** — 現在の実際の構成に更新

---

## コミット履歴

| コミット | 内容 |
|----------|------|
| `6276801` | `docs: CLAUDE.md を追加` |
| `5f3d914` | `feat: React タスクボードアプリを実装 (Vite + React)` |
| `d5cf094` | `feat: タスクをローカルストレージに永続化` |
| `891663a` | `ci: GitHub Pages 自動デプロイを設定` |
| `361c4e5` | `docs: CLAUDE.md にデプロイ先・技術スタック・命名規約を追記` |
