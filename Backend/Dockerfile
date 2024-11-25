# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto en el que se ejecutará la app (por ejemplo, 3000)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
