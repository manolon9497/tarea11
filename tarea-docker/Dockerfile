# Usamos Node.js versión ligera
FROM node:18-alpine

# Carpeta dentro del contenedor
WORKDIR /app

# Copiar dependencias e instalar
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Arrancar la app
CMD ["npm", "start"]