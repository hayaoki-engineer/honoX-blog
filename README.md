# プロジェクトのディレクトリ構造

```
app/
├── islands/           　　　　# インタラクティブな操作を行う「islands」コンポーネントを含むディレクトリ
├── routes/            　　　　# ファイルベースのルーティングを管理するディレクトリ
│   ├── index.tsx      　　　　# '/' ルートに対応
│   └── about.tsx      　　　　# '/about' ルートに対応
├── routes/_renderer.tsx # Hono の JSX Renderer Middleware が呼ばれ、アプリケーションのレイアウトとして機能するファイル
├── client.ts          　　　　# クライアントのエントリーポイント
└── server.ts          　　　　# サーバーのエントリーポイント
