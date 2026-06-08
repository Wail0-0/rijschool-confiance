FROM node:22-alpine

RUN apk add --no-cache nginx

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Bouw de geoptimaliseerde productie-site (esbuild-bundel + landingspagina's)
# en serveer de inhoud van dist/ via nginx.
RUN npm run build \
  && mkdir -p /usr/share/nginx/html \
  && cp -r dist/. /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/http.d/default.conf

ENV PORT=3000
EXPOSE 80

RUN sed -i 's/\r$//' /app/docker-entrypoint.sh && chmod +x /app/docker-entrypoint.sh

CMD ["/app/docker-entrypoint.sh"]
