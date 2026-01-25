# 1. Usamos una imagen de Node ligera
FROM node:22-alpine

# 2. Creamos el directorio de la app
WORKDIR /app

# 3. Copiamos los archivos de dependencias
COPY package*.json ./

# 4. Instalamos las dependencias
RUN npm install

# 5. COPIAMOS LA CARPETA PRISMA (Antes que el resto del código)
# Esto es vital para que el generador tenga el schema.prisma
COPY prisma ./prisma/

# 6. GENERAMOS EL CLIENTE
# Aquí es donde se crea tu carpeta 'generated/client' dentro del contenedor
RUN npx prisma generate

# 7. Copiamos el resto de tu código
COPY . .

# 8. Exponemos el puerto de Next.js
EXPOSE 3000

# 9. Comando para iniciar en modo desarrollo
CMD ["npm", "run", "dev"]