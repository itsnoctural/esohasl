FROM oven/bun:alpine AS build

WORKDIR /app
ENV NODE_ENV=production

COPY --from=node:lts-alpine /usr/local/bin/node /usr/local/bin/node

COPY . .
RUN rm -rf /app/apps/web

RUN bun install
RUN bun run build

FROM oven/bun:alpine

RUN apk update
RUN apk add ca-certificates
RUN update-ca-certificates

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/apps/server/dist /app/dist
COPY --from=build /app/packages /app/packages

EXPOSE 3000
CMD ["bun", "dist/index.js"]