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
RUN npm run build