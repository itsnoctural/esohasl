FROM oven/bun:slim AS build

WORKDIR /app
ENV NODE_ENV=production

COPY --from=node:lts-slim /usr/local/bin/node /usr/local/bin/node

COPY . .
RUN rm -rf /app/apps/web

RUN bun install
RUN bun run build

FROM debian:stable-slim

RUN apt update -y
RUN apt install ca-certificates -y
RUN update-ca-certificates

WORKDIR /app
COPY --from=build /app/packages/db/drizzle /app/drizzle
COPY --from=build /app/apps/server/main /app/main

EXPOSE 3000
CMD ["./main"]