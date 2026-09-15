# Umikaze-海風

**[ホームページを見る](https://crestix-company.github.io/Umikaze/)**

4ページ構成の静的な店舗サイトです。配信対象は `dist/` です。

- ホーム: `index.html`
- お料理・お飲み物: `menu.html`
- 愛犬とご一緒に: `guide.html`
- 営業時間・アクセス: `access.html`

`npm run build` で共通部分と各ページのHTMLを生成します。外部パッケージのインストールは不要です。`npm run verify` で各ページ・素材・リンクと主要な掲載情報を検証します。

CSS、JavaScript、軽量化済み画像は `dist/assets/` で管理しています。写真の原本、制作資料、認証情報は配信に含めません。

Cloudflare Pages等の静的ホスティングでは、ビルド `npm run build`、公開ディレクトリ `dist` を指定します。リポジトリのルートそのものはWebサイトではありません。

## GitHub Pages

公開URL: https://crestix-company.github.io/Umikaze/

Pagesの公開元は **GitHub Actions** に設定します。`main` へのプッシュで `.github/workflows/pages.yml` がビルド・動作テスト・リンク検証を行い、**`dist/` だけ**を公開します。ブランチ直下の公開やJekyllは使用しません。

公開後にも全ページ・画像・動画・スタイル・スクリプトを実際のURLから取得し、ビルド結果と一致することを自動検証します。GitHub Pagesでは `SITE_BASE_PATH=/Umikaze/` を渡し、404ページからのホームリンクも公開先に合わせます。通常のルート配信はこの指定が不要です。
