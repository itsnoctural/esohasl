FROM oven/bun:slim AS build

WORKDIR /app
COPY --from=node:lts-slim /usr/local/bin/node /usr/local/bin/node

COPY . .
RUN rm -rf /app/apps/web

RUN bun install
RUN bun run build

FROM oven/bun:slim

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/apps/server/dist /app/dist
COPY --from=build /app/packages /app/packages

EXPOSE 3000
CMD ["bun", "dist/index.js"]