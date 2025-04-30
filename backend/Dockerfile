# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY backend/package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY backend/. ./

# Genera el cliente de Prisma
RUN npx prisma generate

# Construye la aplicación NestJS
RUN npm run build

# Copia el archivo .env
COPY backend/.env ./.env

# Ejecuta las migraciones de Prisma
RUN npx prisma migrate deploy

# Ejecuta el seeder de Prisma
RUN npx prisma db seed

# Define las variables de entorno
ENV NODE_ENV production
ENV PORT 4000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]