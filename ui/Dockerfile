FROM node:22-alpine AS base
WORKDIR /app

FROM base AS dependencies
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS prod-dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM base AS build
COPY --from=dependencies /app/node_modules /app/node_modules
COPY . .
RUN npm run build

FROM nginx:alpine
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot
COPY --from=build --chown=nonroot:nonroot /app/dist /usr/share/nginx/html
COPY --chown=nonroot:nonroot /nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /var/cache/nginx /var/log/nginx /var/run/nginx && \
    chown -R nonroot:nonroot /var/cache/nginx /var/log/nginx /var/run/nginx
USER nonroot
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]