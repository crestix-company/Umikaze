# Umikaze-海風

4ページ構成の静的な店舗サイトです。配信対象は `dist/` です。

- ホーム: `index.html`
- お料理・お飲み物: `menu.html`
- 愛犬とご一緒に: `guide.html`
- 営業時間・アクセス: `access.html`

`npm run build` で共通部分と各ページのHTMLを生成します。外部パッケージのインストールは不要です。`npm run verify` で各ページ・素材・リンクと主要な掲載情報を検証します。

CSS、JavaScript、軽量化済み画像は `dist/assets/` で管理しています。写真の原本、制作資料、認証情報は配信に含めません。

Cloudflare Pages等の静的ホスティングでは、ビルド `npm run build`、公開ディレクトリ `dist` を指定します。リポジトリのルートそのものはWebサイトではありません。
