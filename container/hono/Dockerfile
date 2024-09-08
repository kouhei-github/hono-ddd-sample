FROM oven/bun:latest

WORKDIR /app

# 必要な依存関係をインストール
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# パッケージファイルをコピー
COPY ./hono/package.json ./hono/package-lock.json ./hono/bun.lockb ./


RUN bun install

# アプリケーションの残りの部分をコピー
COPY ./hono .

# アプリケーションが使用するポートを公開
EXPOSE 3000

CMD ["bun", "dev"]