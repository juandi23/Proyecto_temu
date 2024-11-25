# Etapa 1: Construcción de la aplicación
FROM node:18 AS build-stage

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json e instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código fuente y construye la aplicación
COPY . .
RUN npm run build

# Etapa 2: Servir la aplicación
FROM nginx:1.25

# Copia los archivos generados en la etapa de construcción a NGINX
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copia un archivo personalizado de configuración de NGINX (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
