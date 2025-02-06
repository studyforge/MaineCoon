FROM node:22-alpine AS base
WORKDIR /app

FROM base AS dependencies
ADD package.json package-lock.json ./
RUN npm ci

FROM base AS prod-dependencies
ADD package.json package-lock.json ./
RUN npm ci --omit=dev

FROM base AS build
COPY --from=dependencies /app/node_modules /app/node_modules
ADD . .
RUN node ace build

FROM gcr.io/distroless/nodejs22-debian12:nonroot
WORKDIR /app
ENV NODE_ENV=production
COPY --from=prod-dependencies /app/node_modules node_modules
COPY --from=build /app/build .
EXPOSE 3333
CMD ["./bin/server.js"]