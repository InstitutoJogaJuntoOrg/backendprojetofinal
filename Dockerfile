# Usar a imagem oficial do Node.js
FROM node:18

# Definir diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar o arquivo package.json (e package-lock.json se disponível)
COPY package*.json ./

# Instalar dependências da aplicação
RUN npm install

# Copiar todo o código da aplicação para o container
COPY . .

# Expôr a porta que a aplicação Node.js está rodando (por exemplo, 3000)
EXPOSE 3300

# Comando para rodar a aplicação
CMD ["npm", "run", "start:dev"]
