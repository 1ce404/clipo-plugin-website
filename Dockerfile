# syntax=docker/dockerfile:1

# Clipo 插件官网：Next.js standalone 镜像。
# 构建：docker build --build-arg NEXT_PUBLIC_SITE_URL=https://clipo.cloud -t clipo-plugin-website .
# 运行：docker run -p 3000:3000 clipo-plugin-website

FROM node:22.23.1-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# 只装依赖，利用缓存
FROM base AS deps
COPY package.json package-lock.json .npmrc ./
RUN npm ci

# 构建；站点地址在构建时写进 canonical、sitemap 和 OG
FROM base AS builder
ARG NEXT_PUBLIC_SITE_URL
RUN test -n "$NEXT_PUBLIC_SITE_URL" || (echo "缺少构建参数 NEXT_PUBLIC_SITE_URL" && exit 1)
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 运行：只带 standalone 产物，非 root 用户
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
