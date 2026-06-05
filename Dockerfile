FROM node:22-alpine

RUN apk add --no-cache nginx

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

RUN mkdir -p /usr/share/nginx/html \
  && cp index.html styles.css app.jsx icons.jsx tweaks-panel.jsx image-slot.js robots.txt sitemap.xml /usr/share/nginx/html/ \
  && cp -r images /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/http.d/default.conf

ENV PORT=3000
EXPOSE 80

RUN sed -i 's/\r$//' /app/docker-entrypoint.sh && chmod +x /app/docker-entrypoint.sh

CMD ["/app/docker-entrypoint.sh"]
