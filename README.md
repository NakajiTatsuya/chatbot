# Chatbot 

## 本リポジトリについて
Reactで開発したチャットボットを、Typescript + React Hooks Form で高パフォーマンス化したリポジトリ。
チャットボットの作り方を学びながら、TypescriptやReact Hooks Formの使い方まで学べる。
ゼロから製作した手順をConfluenceにアップしている。
- https://dragonarrow.atlassian.net/wiki/spaces/~356089614/pages/1118732289

## 環境
- Node
  + 18.1.0
- React
  + 18.0.9
- Material-UI
  + 5.7.0
- react-hook-form
  + 7.31.1
- ESLint
  + 8.15.0
  + 静的解析のスタイルガイドはAirbnbに従っている

(その他詳細)
```
chatbot $ docker-compose exec web node -v
v18.1.0

chatbot $ docker-compose exec web npm list --depth=0
app@0.1.0 /app
+-- @emotion/react@11.9.0
+-- @emotion/styled@11.8.1
+-- @mui/material@5.7.0
+-- @mui/styled-engine-sc@5.7.0
+-- @mui/system@5.7.0
+-- @testing-library/jest-dom@5.16.4
+-- @testing-library/react@13.2.0
+-- @testing-library/user-event@13.5.0
+-- @types/jest@27.5.0
+-- @types/node@16.11.34
+-- @types/react-dom@18.0.3
+-- @types/react@18.0.9
+-- @typescript-eslint/eslint-plugin@5.23.0
+-- @typescript-eslint/parser@5.23.0
+-- eslint-config-airbnb@19.0.4
+-- eslint-plugin-import@2.26.0
+-- eslint-plugin-jsx-a11y@6.5.1
+-- eslint-plugin-react-hooks@4.5.0
+-- eslint-plugin-react@7.29.4
+-- eslint@8.15.0
+-- react-dom@18.1.0
+-- react-hook-form@7.31.1
+-- react-scripts@5.0.1
+-- react@18.1.0
+-- styled-components@5.3.5
+-- typescript@4.6.4
`-- web-vitals@2.1.4
```

# 動作確認
1. `$ docker-compose up -d --build` を実行

2. src/webhookConfig.ts を作成し、自分のSlackのWEBHOOK_URLを入力する
```typescript
const WEBHOOK_URL = 'https://hooks.slack.com/services/xxxxxxxxxxxxxxxxxxxxxx';

export default WEBHOOK_URL;
```

3. http://localhost:3000 にアクセス
