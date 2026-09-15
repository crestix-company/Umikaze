# Umikaze-海風

**[ホームページを見る](https://crestix-company.github.io/Umikaze/)**

4ページ構成の静的な店舗サイトです。配信対象は `dist/` です。

- ホーム: `index.html`
- お料理・お飲み物: `menu.html`
- 愛犬とご一緒に: `guide.html`
- 営業時間・アクセス: `access.html`

`npm run build` で共通部分と各ページのHTMLを生成します。外部パッケージのインストールは不要です。`npm run verify` で各ページ・素材・リンクと主要な掲載情報を検証します。

CSS、JavaScript、軽量化済み画像は `dist/assets/` で管理しています。写真の原本、制作資料、認証情報は配信に含めません。

## Cloudflare Pages

Cloudflareの既存プロジェクト `umikaze` は `crestix-company/Umikaze` の `main` と連携しています。`main` へプッシュすると自動的にビルド・公開されます。

- ビルドコマンド: `npm run build`
- 公開ディレクトリ: `dist`（`wrangler.json` の `pages_build_output_dir` で固定）
- ルートディレクトリ: リポジトリ直下
- 公開先: https://umikaze-f3u.pages.dev/

`out` は生成しません。Cloudflareはリポジトリ内の `wrangler.json` を設定の正として使用します。Workers用のデプロイコマンドやAPIキーは不要です。`npm run build` の後に動作テストとページ・画像・動画・リンク検証が実行され、失敗した場合は公開を止めます。

公開後の検証: `node scripts/verify.mjs https://umikaze-f3u.pages.dev/`。公開完了はCloudflareの結果と実際のURLで確認してください。リポジトリのルートそのものはWebサイトではありません。

## GitHub Pages

公開URL: https://crestix-company.github.io/Umikaze/

Pagesの公開元は **GitHub Actions** に設定します。`main` へのプッシュで `.github/workflows/pages.yml` がビルド・動作テスト・リンク検証を行い、**`dist/` だけ**を公開します。ブランチ直下の公開やJekyllは使用しません。

公開後にも全ページ・画像・動画・スタイル・スクリプトを実際のURLから取得し、ビルド結果と一致することを自動検証します。GitHub Pagesでは `SITE_BASE_PATH=/Umikaze/` を渡し、404ページからのホームリンクも公開先に合わせます。通常のルート配信はこの指定が不要です。
