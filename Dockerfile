FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html styles.css app.jsx icons.jsx tweaks-panel.jsx image-slot.js /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
