# Usa una imagen base de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Elimina la configuración por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos HTML, CSS y JavaScript al directorio de Nginx
COPY frontend/. /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]